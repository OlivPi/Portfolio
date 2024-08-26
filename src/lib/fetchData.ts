import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function fetchExperiences() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return await prisma.experience.findMany()
    }
    return []
  } catch (error) {
    console.error('Erreur lors de la récupération des expériences:', error)
    return []
  }
}

export async function fetchSkills() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return await prisma.skill.findMany()
    }
    return []
  } catch (error) {
    console.error('Erreur lors de la récupération des Compétences:', error)
    return []
  }
}

export async function fetchProjects() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return await prisma.project.findMany()
    }
    return []
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return []
  }
}

export async function fetchReferences() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return await prisma.reference.findMany()
    }
    return []
  } catch (error) {
    console.error('Erreur lors de la récupération des references:', error)
    return []
  }
}
