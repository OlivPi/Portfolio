import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const experience1 = await prisma.experience.upsert({
        where: { id: 1 },
        update: {},
        create: {
            company: 'Tech Corp',
            city: 'New York',
            role: 'Software Engineer',
            description: 'Worked on various projects involving web development.',
            tasks: ['Developed APIs', 'Implemented front-end interfaces', 'Collaborated with UX designers'],
            logo: 'techcorp-logo.png',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2022-01-01'),
        },
    })

    const skill1 = await prisma.skill.upsert({
        where: { id: 1 },
        update: {},
        create: {
            type: 'Programming Language',
            name: 'JavaScript',
            icon: 'javascript-icon.png',
        },
    })

    const project1 = await prisma.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            type: 'Web Development',
            name: 'Personal Portfolio',
            image: 'portfolio.png',
            description: 'A personal portfolio website to showcase my work and skills.',
            link: 'https://myportfolio.com',
        },
    })

    const education1 = await prisma.education.upsert({
        where: { id: 1 },
        update: {},
        create: {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'MIT',
            details: 'Focused on software engineering and artificial intelligence.',
            image: 'mit-logo.png',
            link: 'https://mit.edu',
        },
    })

    const interest1 = await prisma.interest.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Photography',
            description: 'Passionate about capturing moments and landscapes.',
            image: 'photography.png',
            link: 'https://instagram.com/myphotography',
        },
    })

    const reference1 = await prisma.reference.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'John Doe',
            company: 'Tech Innovations',
            role: 'Team Lead',
            description: 'John was my team lead during my time at Tech Innovations.',
            image: 'johndoe.png',
            link: 'https://linkedin.com/in/johndoe',
        },
    })

    const contactMessage1 = await prisma.contactMessage.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Jane Smith',
            subject: 'Interested in collaboration',
            email: 'janesmith@example.com',
            message: 'Hi, I would like to collaborate on a new project. Let me know if you are interested.',
        },
    })

    console.log({ experience1, skill1, project1, education1, interest1, reference1, contactMessage1 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })