'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function parseTasks(raw: string): string[] {
  return raw
    .split('\n')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

function parseDate(raw: FormDataEntryValue | null): Date | null {
  if (!raw || raw === '') return null
  return new Date(raw as string)
}

export async function createExperience(formData: FormData) {
  await prisma.experience.create({
    data: {
      company: formData.get('company') as string,
      city: formData.get('city') as string,
      role: formData.get('role') as string,
      tasks: parseTasks(formData.get('tasks') as string),
      logo: formData.get('logo') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: parseDate(formData.get('endDate')),
      type: formData.get('type') as string,
    },
  })

  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
  redirect('/admin/experiences')
}

export async function updateExperience(id: number, formData: FormData) {
  await prisma.experience.update({
    where: { id },
    data: {
      company: formData.get('company') as string,
      city: formData.get('city') as string,
      role: formData.get('role') as string,
      tasks: parseTasks(formData.get('tasks') as string),
      logo: formData.get('logo') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: parseDate(formData.get('endDate')),
      type: formData.get('type') as string,
    },
  })

  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
  redirect('/admin/experiences')
}

export async function deleteExperience(id: number) {
  await prisma.experience.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/web-projects')
  revalidatePath('/event-com')
}
