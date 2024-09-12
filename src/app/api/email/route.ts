import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const EMAIL_HOST = process.env.SMTP_HOST;
const EMAIL_PORT = process.env.SMTP_PORT;
const EMAIL_USER = process.env.SMTP_USER;
const EMAIL_PASS = process.env.SMTP_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("Les variables d'environnement 'MY_EMAIL' et 'EMAIL_PASS' doivent être définies.");
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, subject, message } = await request.json();

    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs (nom, email, sujet, message) sont obligatoires." },
        { status: 400 }
      );
    }

    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions: Mail.Options = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `Message de ${name} (${email}) - Sujet: ${subject}`,
      text: message,
    };

    await transport.sendMail(mailOptions);

    return NextResponse.json({ message: 'E-mail envoyé avec succès' });
  } catch (err: any) {
    console.error("Erreur lors de l'envoi de l'e-mail:", err.message || err);
    return NextResponse.json(
      { error: err.message || 'Erreur lors de l\'envoi de l\'e-mail' },
      { status: 500 }
    );
  }
}