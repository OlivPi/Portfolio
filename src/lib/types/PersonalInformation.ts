import { Prisma } from '@prisma/client';

export const personalInformationSelect = Prisma.validator<Prisma.PersonalInformationSelect>()({
    id: true,
    email: true,
    name: true,
    title: true,
    location: true,
    phone: true,
    age: true,
    drivingLicense: true,
})
export type PersonalInformationSummary = Prisma.PersonalInformationGetPayload<{ select: typeof personalInformationSelect}>