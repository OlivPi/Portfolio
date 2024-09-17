import { Prisma } from '@prisma/client';

export const experienceSelect = Prisma.validator<Prisma.ExperienceSelect>()({
  id: true,
  company: true,
  city: true,
  role: true,
  type: true,
  tasks: true,
  logo: true,
  startDate: true,
  endDate: true,
});

export type ExperienceSummary = Prisma.ExperienceGetPayload<{select: typeof experienceSelect;}>;