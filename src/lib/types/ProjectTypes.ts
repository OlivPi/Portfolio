import {Prisma} from '@prisma/client';

export const projectSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  type: true,
  name: true,
  image: true,
  description: true,
  structure: true,
  link: true,
  skills: true,
})
export type ProjectSummary = Prisma.ProjectGetPayload<{select: typeof projectSelect}>