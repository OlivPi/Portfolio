import { Prisma } from '@prisma/client';

export const educationSelect = Prisma.validator<Prisma.EducationSelect>()({
  id: true,
  degree: true,
  institution: true,
  details: true,
  dates: true,
  createdAt: true,
  updatedAt: true,
});

export type EducationSummary = Prisma.EducationGetPayload<{select: typeof educationSelect;}>;