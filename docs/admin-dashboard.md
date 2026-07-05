# Dashboard d'administration

Interface de gestion du contenu du portfolio. Permet d'ajouter, modifier et supprimer des expériences sans passer par la base de données directement.

---

## Prérequis

Avant la première utilisation, configurer les variables d'environnement dans le fichier `.env` :

```env
ADMIN_PASSWORD=ton-mot-de-passe-secret
ADMIN_TOKEN=token-généré-automatiquement
```

> `ADMIN_TOKEN` a été généré automatiquement à l'installation. Ne pas le modifier sauf si tu veux invalider toutes les sessions actives.

---

## Connexion

1. Aller sur `/admin/login`
2. Saisir le mot de passe défini dans `ADMIN_PASSWORD`
3. La session dure **7 jours** — pas besoin de se reconnecter entre les visites

Pour se déconnecter, cliquer sur **Déconnexion** en bas de la barre latérale.

---

## Gestion des expériences

### Accès

`/admin/experiences`

Liste toutes les expériences triées par date décroissante (la plus récente en premier).

---

### Ajouter une expérience

1. Cliquer sur **+ Ajouter**
2. Remplir le formulaire (voir détail des champs ci-dessous)
3. Cliquer sur **Créer**

La page d'accueil et les pages concernées sont mises à jour automatiquement.

---

### Modifier une expérience

1. Cliquer sur **Modifier** sur la ligne de l'expérience
2. Modifier les champs souhaités
3. Cliquer sur **Enregistrer**

---

### Supprimer une expérience

1. Cliquer sur **Supprimer** sur la ligne de l'expérience
2. Confirmer dans la boîte de dialogue

> ⚠️ La suppression est irréversible.

---

## Détail des champs du formulaire

| Champ | Obligatoire | Description |
|-------|-------------|-------------|
| **Entreprise** | Oui | Nom de l'employeur ou du client |
| **Ville** | Oui | Localisation du poste |
| **Intitulé du poste** | Oui | Ton rôle (ex: Chef de projet, Développeur front-end) |
| **Type** | Oui | Détermine sur quelle(s) page(s) l'expérience apparaît |
| **Date de début** | Oui | Format JJ/MM/AAAA |
| **Date de fin** | Non | Laisser vide si le poste est toujours en cours |
| **Missions** | Oui | Une mission par ligne — chaque ligne devient un élément de liste |
| **Logo** | Oui | Nom du fichier image placé dans `/public` (ex: `logo-entreprise.png`) |

---

## Types d'expérience et visibilité

Le champ **Type** contrôle sur quelles pages du portfolio l'expérience est affichée :

| Type | Page d'accueil | Projets Web | Événementiel |
|------|:--------------:|:-----------:|:------------:|
| `Salarié` | ✓ | — | — |
| `Développement web` | ✓ | ✓ | — |
| `Événement` | ✓ | — | ✓ |
| `Freelance` | ✓ | — | — |

> La page d'accueil affiche **toutes** les expériences sans filtre.

---

## Ajouter un logo

Le champ Logo attend le nom d'un fichier présent dans le dossier `/public` du projet.

Étapes :
1. Placer le fichier image dans `/public` (ex: `/public/logo-entreprise.png`)
2. Dans le formulaire, saisir uniquement le nom du fichier : `logo-entreprise.png`

Formats recommandés : `.png` ou `.svg`, fond transparent de préférence.

---

## Architecture technique

```
src/
├── app/
│   ├── (portfolio)/          # Pages publiques du portfolio
│   │   ├── layout.tsx        # Header, Footer, animations de page
│   │   ├── page.tsx          # Accueil
│   │   ├── web-projects/
│   │   ├── event-com/
│   │   └── contact/
│   └── (admin)/              # Dashboard (layout séparé, pas d'animations)
│       └── admin/
│           ├── layout.tsx    # Sidebar de navigation
│           ├── login/        # Page de connexion
│           └── experiences/  # CRUD expériences
├── lib/
│   ├── admin-auth.ts         # Actions serveur : login / logout
│   └── admin-actions.ts      # Actions serveur : CRUD expériences
└── middleware.ts             # Protection des routes /admin/*
```

**Authentification** : mot de passe comparé côté serveur → cookie `httpOnly` posé avec la valeur de `ADMIN_TOKEN`. Le middleware Edge vérifie ce cookie sur chaque requête vers `/admin/*`.

**Mutations** : toutes les opérations (create, update, delete) utilisent des Server Actions Next.js — pas d'API REST intermédiaire. Après chaque mutation, `revalidatePath` invalide le cache des pages publiques concernées.

---

## Étendre le dashboard

Pour ajouter la gestion d'un autre modèle (Projets, Formations, Compétences) :

1. Créer `src/lib/admin-actions-[model].ts` avec les Server Actions CRUD
2. Créer `src/app/(admin)/admin/[model]/` avec les pages liste, new et edit
3. Ajouter le lien dans `src/app/(admin)/admin/layout.tsx`
