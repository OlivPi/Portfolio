# My Web Portfolio

A Next.js portfolio project built with TypeScript, React, Tailwind CSS for styling, GSAP for animations, and Prisma for database management. The project includes a fully functional contact form integrated with an email API, and uses reusable components for a modular and scalable architecture.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- **React and TypeScript**: For a strong typing system and efficient component-based development.
- **Next.js**: For server-side rendering and optimized performance.
- **Tailwind CSS**: For utility-first, responsive, and easy-to-customize styling.
- **GSAP**: For smooth animations and enhanced user interaction.
- **Prisma**: For type-safe database management with seeding capabilities.
- **Email API**: Integrated contact form for sending emails using custom API routes.
- **Modular Components**: Reusable components for a clean and maintainable codebase.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Database**: Prisma with PostgreSQL (or your preferred database)
- **Testing**: Jest

## Project Structure

Here's an overview of the key folders in this project:
```
portfolio/
├── .next/                 # Next.js build output
├── tests/             # Unit and integration tests
├── data/                  # Data files for the application
│   └── resumeData.json    # JSON file containing resume data
├── prisma/                # Prisma database configuration
│   ├── migrations/        # Database migrations
│   ├── schema.prisma      # Prisma schema definition
│   └── seed.ts            # Script to seed the database
├── public/                # Public assets
│   └── projects/          # Project-specific images and assets
├── src/                   # Main source code
│   ├── app/               # Next.js app directory
│   │   ├── api/           # API routes
│   │   │   └── email/     # Email API for the contact form
│   │   │       └── route.ts  # Email sending logic
│   │   ├── contact/       # Contact page components
│   │   ├── event-com/     # Event-related components
│   │   ├── ui/            # UI components
│   │   └── web-projects/  # Web projects sections
│   ├── components/        # Reusable React components
│   │   ├── Carousel/      # Carousel component
│   │   ├── Competences/   # Skills display components
│   │   ├── ContactForm/   # Contact form components
│   │   ├── Educations/    # Education section components
│   │   ├── Experiences/   # Experience section components
│   │   ├── Footer/        # Footer components
│   │   ├── Header/        # Header components
│   │   ├── Menu/          # Navigation menu components
│   │   ├── ProfileInfos/  # Profile information components
│   │   ├── ProjectCard/   # Project card display components
│   │   └── Titles/        # Section title components
│   ├── Context/           # Context providers for state management
│   │   └── TransitionContext.tsx # Context for handling page transitions
│   ├── lib/               # Library files
│   │   ├── types/         # Type definitions
│   │   └── prisma.ts      # Prisma client setup
│   └── utils/             # Utility functions
│       ├── animations/    # Animation utilities using GSAP
│       ├── i18n.ts        # Internationalization setup
│       └── send-email.ts  # Helper functions for sending emails
├── .env                   # Environment variables
├── jest.config.js         # Jest configuration file
├── next.config.mjs        # Next.js configuration file
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Installation

Follow these steps to get the project running on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Clone the repository:**
    ```bash
    npm install

3. **Set up environment variables:**
   Create a .env file in the root directory and add your environment variables (e.g., database URL for Prisma and any email service configurations):
    ```dotenv
    DATABASE_URL=your-database-url
    EMAIL_SERVICE_API_KEY=your-email-service-api-key

## Database setup

1. **Run Prisma migrations to set up the database schema:**
    ```bash
    npx prisma migrate dev --name init

2. **Seed the database with initial data:**
    ```bash
    npx prisma db seed
The seed file (prisma/seed.ts) is used to populate the database with initial data.   

## Usage

To start the development server, run:
```bash
  npm run dev
 ```
The application will be available at http://localhost:3000.

## Testing 
To run tests using Jest, use the following command:
```bash
  npx prisma db seed
```
Tests are located in the __tests__ folder and follow a standard structure for easy maintainability.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

	1.	Fork the repository.
	2.	Create a new branch: git checkout -b feature/YourFeature
	3.	Commit your changes: git commit -m 'Add some feature'
	4.	Push to the branch: git push origin feature/YourFeature
	5.	Open a pull request.
