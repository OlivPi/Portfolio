import { Prisma } from '@prisma/client';
import {tree} from "next/dist/build/templates/app-page";

export const skillsSelect = Prisma.validator<Prisma.SkillsSelect>()({
  id: true,
  type: true,
  name: true,
  icon: true
})
export type SkillsSummary = Prisma.SkillsGetPayload<{ select: typeof skillsSelect}>
