import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from "path";
import {ResumeData} from "@/lib/types/resumeTypes";

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(process.cwd(), 'data', 'resumeData.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data : ResumeData = JSON.parse(jsonData);

    const personalInfo = await prisma.personalInformation.upsert({
        where: {
            email: data.personalInformation.email,
        },
        update: {
            name: data.personalInformation.name,
            email: data.personalInformation.email,
            title: data.personalInformation.title,
            location: data.personalInformation.location,
            phone: data.personalInformation.phone,
            age: data.personalInformation.age,
            drivingLicense: data.personalInformation.drivingLicense,
            updatedAt: new Date(),
            languages: {
                deleteMany: {},
                create: Object.entries(data.personalInformation.languages).map(([language, proficiency]) => ({
                    language,
                    proficiency: proficiency as string,
                })),
            },
        },
        create: {
            name: data.personalInformation.name,
            title: data.personalInformation.title,
            location: data.personalInformation.location,
            phone: data.personalInformation.phone,
            email: data.personalInformation.email,
            age: data.personalInformation.age,
            drivingLicense: data.personalInformation.drivingLicense,
            languages: {
                create: Object.entries(data.personalInformation.languages).map(([language, proficiency]) => ({
                    language,
                    proficiency: proficiency as string,
                })),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });

    console.log('Personal Information upserted:', personalInfo);

    for (const experience of data.experiences) {
        if (experience.id !== undefined && experience.id !== null) {
            const exp = await prisma.experience.upsert({
                where: {
                    id: experience.id,
                    company: experience.company
                },
                update: {
                    company: experience.company,
                    city: experience.city,
                    role: experience.role,
                    tasks: experience.tasks,
                    logo: experience.logo,
                    startDate: new Date(experience.startDate),
                    endDate: experience.endDate ? new Date(experience.endDate) : null,
                },
                create: {
                    company: experience.company,
                    city: experience.city,
                    role: experience.role,
                    tasks: experience.tasks,
                    logo: experience.logo,
                    startDate: new Date(experience.startDate),
                    endDate: experience.endDate ? new Date(experience.endDate) : null,
                },
            });
        }
        console.log(`Expériences upserted: ${experience.company}`);
    }

    for (const [category, skills] of Object.entries(data.skills)) {
        for (const skill of skills) {
            const sk = await prisma.skill.upsert({
                where: {
                    name: skill.name
                },
                update: {
                    icon: skill.icon,
                    updatedAt: new Date(),
                },
                create: {
                    type: category,
                    name: skill.name,
                    icon: skill.icon,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
        }
    }

    for (const education of data.education) {
        const edu = await prisma.education.upsert({
            where: {
                id: education.id,
                degree: education.degree
            },
            update: {
                dates: education.dates,
                details: education.details,
                updatedAt: new Date(),
            },
            create: {
                degree: education.degree,
                institution: education.institution,
                dates: education.dates,
                details: education.details || '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        console.log(`Education upserted: ${education.degree}`);
    }

    for (const interest of data.interests) {
        const inter = await prisma.interest.upsert({
            where: {
                id: interest.id,
                type: interest.type
            },
            update: {
                icon: interest.icon,
                updatedAt: new Date(),
            },
            create: {
                type: interest.type,
                description: interest.description,
                icon: interest.icon,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }
        for (const projectData of data.projects) {
            const project = await prisma.project.upsert({
                where: {
                    id: projectData.id,
                    name: projectData.name
                },
                update: {
                    type: projectData.type,
                    description: projectData.description,
                    image: projectData.image,
                    structure: projectData.structure,
                    link: projectData.link,
                    skills: {
                        connect: projectData.skills.map((skillName: string) => ({
                            name: skillName
                        }))
                    },
                    updatedAt: new Date()
                },
                create: {
                    name: projectData.name,
                    type: projectData.type,
                    description: projectData.description,
                    image: projectData.image,
                    structure: projectData.structure,
                    link: projectData.link,
                    skills: {
                        connect: projectData.skills.map((skillName: string) => ({
                            name: skillName
                        }))
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            console.log(`Project upserted: ${project.name}`);
        }

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

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });