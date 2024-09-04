import { PrismaClient } from '@prisma/client'
import { ExperienceSummary, experienceSelect } from '@/lib/types/ExperiencesTypes';
import {skillsSelect, SkillsSummary} from "@/lib/types/SkillsTypes";
import {personalInformationSelect, PersonalInformationSummary} from "@/lib/types/PersonalInformation";
import {projectSelect, ProjectSummary} from "@/lib/types/ProjectTypes";

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

export async function getPersonalInformations(): Promise<PersonalInformationSummary[]> {
  return prisma.personalInformation.findMany({
    select: personalInformationSelect
  })
}

export async function getProjects(type: string): Promise<ProjectSummary[]> {
       return prisma.project.findMany({
         where: { type },
        select: projectSelect
      })
}
