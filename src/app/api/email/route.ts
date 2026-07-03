import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
} as const
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Limite par IP : 5 envois par heure. Stockage en mémoire, donc réinitialisé
// à chaque nouvelle instance serverless — suffisant pour freiner le spam basique.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  )
  if (timestamps.length >= RATE_LIMIT) {
    requestLog.set(ip, timestamps)
    return true
  }
  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return false
}

function validate(
  body: Record<string, unknown>
): { error: string } | { data: Record<keyof typeof MAX_LENGTHS, string> } {
  const data = {} as Record<keyof typeof MAX_LENGTHS, string>
  for (const field of Object.keys(
    MAX_LENGTHS
  ) as (keyof typeof MAX_LENGTHS)[]) {
    const value = body[field]
    if (typeof value !== 'string' || !value.trim()) {
      return {
        error:
          'Tous les champs (nom, email, sujet, message) sont obligatoires.',
      }
    }
    if (value.length > MAX_LENGTHS[field]) {
      return { error: `Le champ « ${field} » est trop long.` }
    }
    data[field] = value.trim()
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return { error: "L'adresse email n'est pas valide." }
  }
  return { data }
}

export async function POST(request: NextRequest) {
  const EMAIL_HOST = process.env.SMTP_HOST
  const EMAIL_PORT = process.env.SMTP_PORT
  const EMAIL_USER = process.env.SMTP_USER
  const EMAIL_PASS = process.env.SMTP_PASS

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    console.error(
      "Variables d'environnement SMTP_HOST, SMTP_USER ou SMTP_PASS manquantes."
    )
    return NextResponse.json(
      { error: "Le service d'envoi d'email est indisponible." },
      { status: 500 }
    )
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez plus tard.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()

    // Champ caché rempli uniquement par les bots : on répond OK sans rien envoyer.
    if (body.company) {
      return NextResponse.json({ message: 'E-mail envoyé avec succès' })
    }

    const result = validate(body)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    const { name, email, subject, message } = result.data

    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const mailOptions: Mail.Options = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: `Message de ${name} (${email}) - Sujet: ${subject}`,
      text: message,
    }

    await transport.sendMail(mailOptions)

    return NextResponse.json({ message: 'E-mail envoyé avec succès' })
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'e-mail:", err)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'e-mail. Réessayez plus tard." },
      { status: 500 }
    )
  }
}
