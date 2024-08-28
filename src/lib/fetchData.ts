import { PrismaClient } from '@prisma/client'
import { ExperienceSummary, experienceSelect } from '@/lib/types/ExperiencesTypes';
import {skillsSelect, SkillsSummary} from "@/lib/types/SkillsTypes";

const prisma = new PrismaClient()

export async function getExperiences(): Promise<ExperienceSummary[]> {
  return prisma.experience.findMany({
    select: experienceSelect
  });
}

export async function getSkills(): Promise<SkillsSummary[]> {
return prisma.skill.findMany({
  select: skillsSelect
})
}

export async function getProjects() {
  try {
      return await prisma.project.findMany()
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return []
  }
}
