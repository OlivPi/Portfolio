import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getExperiences() {
  try {
    return await prisma.experience.findMany()
  } catch (error) {
    console.error('Erreur lors de la récupération des expériences:', error)
    return []
  }
}

export async function getSkills() {
  try {
    return await prisma.skill.findMany()
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error)
    return []
  }
}

export async function getProjects() {
  try {
      return await prisma.project.findMany()
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return []
  }
}

export async function getReferences() {
  try {
      return await prisma.reference.findMany()
  } catch (error) {
    console.error('Erreur lors de la récupération des references:', error)
    return []
  }
}
