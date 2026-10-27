# Portfolio

Portfolio personnel construit avec Next.js 16 (App Router), TypeScript et Prisma/PostgreSQL. Le contenu (expériences, projets, formations, compétences) est lu depuis la base de données, avec un dashboard d'administration protégé par mot de passe pour gérer les expériences.

## Fonctionnalités

- Pages publiques : accueil, projets web, événementiel (`event-com`), contact
- Formulaire de contact envoyé par e-mail via SMTP (Nodemailer)
- Animations GSAP et transitions de page
- Thème clair/sombre, carousel responsive (swipe mobile)
- Textes via `next-intl` (`locales/fr.json`, `locales/en.json` ; la locale est actuellement fixée à `fr` dans `src/utils/i18n.ts`)
- Dashboard d'administration (`/admin`) : CRUD des expériences — voir [docs/admin-dashboard.md](docs/admin-dashboard.md)
- Sitemap généré (`src/app/sitemap.ts`)

## Stack

| Domaine | Outils |
| --- | --- |
| Framework | Next.js 16, React 18 |
| Langage | TypeScript |
| Style | Tailwind CSS, SCSS (modules), styled-components |
| Animations | GSAP, react-transition-group |
| Base de données | PostgreSQL via Prisma 5 |
| E-mail | Nodemailer |
| Tests | Jest, Testing Library |

## Structure

```
src/
├── app/
│   ├── (portfolio)/   # Pages publiques (accueil, contact, event-com, web-projects)
│   ├── (admin)/admin/ # Dashboard d'administration (login, experiences)
│   ├── api/email/     # Route d'envoi du formulaire de contact
│   └── ui/            # Polices et styles globaux
├── components/        # Composants réutilisables (Carousel, Header, ProjectCard…)
├── Context/           # TransitionContext
├── lib/               # Prisma, fetchData, actions et auth admin, types
├── utils/             # Animations GSAP, i18n, envoi d'e-mails
└── middleware.ts      # Protection des routes /admin/*
prisma/                # schema.prisma, migrations, seed.ts
data/resumeData.json   # Données sources utilisées par le seed
locales/               # Traductions fr / en
scripts/               # optimize-images.mjs
docs/                  # Documentation complémentaire
__tests__/             # Tests Jest
```

## Démarrage

Prérequis : Node.js 20+ et une base PostgreSQL.

```bash
git clone <url-du-repo>
cd Portfolio
npm install
```

Créer un fichier `.env` à la racine :

```dotenv
# Base de données
POSTGRES_URL=postgresql://user:password@host:5432/db
POSTGRES_URL_NON_POOLING=postgresql://user:password@host:5432/db

# SMTP (formulaire de contact)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Dashboard d'administration
ADMIN_PASSWORD=
ADMIN_TOKEN=
```

`ADMIN_TOKEN` est la valeur du cookie de session ; utiliser une chaîne aléatoire longue (par ex. `openssl rand -hex 32`). Le modifier invalide toutes les sessions.

Initialiser la base :

```bash
npx prisma migrate dev   # applique les migrations
npx prisma db seed       # charge les données initiales
```

Lancer le serveur de développement :

```bash
npm run dev
```

Le site est disponible sur http://localhost:3000 et l'administration sur http://localhost:3000/admin.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | `prisma generate` puis build de production |
| `npm start` | Lance le build de production |
| `npm run lint` | ESLint |
| `npm test` | Tests Jest |
| `npm run generate` | Génère le client Prisma |
| `node scripts/optimize-images.mjs` | Optimise les images de `public/` avec sharp |

## Modèle de données

Défini dans [prisma/schema.prisma](prisma/schema.prisma) : `PersonalInformation`, `Language`, `Experience`, `Skill`, `Project`, `ProjectSkill`, `Education`, `Interest`, `ContactMessage`.

## Administration

Les routes `/admin/*` sont protégées par [src/middleware.ts](src/middleware.ts) : le cookie `admin_token` (httpOnly, 7 jours) doit correspondre à `ADMIN_TOKEN`. La connexion se fait sur `/admin/login` avec `ADMIN_PASSWORD`. Détails d'usage dans [docs/admin-dashboard.md](docs/admin-dashboard.md).

## Feuille de route

- Étendre le dashboard aux projets, formations et compétences
