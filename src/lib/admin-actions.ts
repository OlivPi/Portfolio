'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { parseExperienceForm } from '@/lib/experience-validation'

export async function createExperience(formData: FormData) {
  await requireAdmin()
  await prisma.experience.create({
    data: parseExperienceForm(formData),
  })

  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
  redirect('/admin/experiences')
}

export async function updateExperience(id: number, formData: FormData) {
  await requireAdmin()
  await prisma.experience.update({
    where: { id },
    data: parseExperienceForm(formData),
  })

  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
  redirect('/admin/experiences')
}

export async function deleteExperience(id: number) {
  await requireAdmin()
  await prisma.experience.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
}
