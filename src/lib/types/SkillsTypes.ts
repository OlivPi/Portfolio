import { Prisma } from '@prisma/client';

export const skillsSelect = Prisma.validator<Prisma.SkillSelect>()({
  id: true,
  type: true,
  name: true,
  icon: true
})
export type SkillsSummary = Prisma.SkillGetPayload<{ select: typeof skillsSelect}>
