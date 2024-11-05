'use server'

import { revalidatePath } from 'next/cache'
import { addLead, updateLead, getAllLeads, deleteLead, Lead } from '@/lib/kv-utils'

export async function submitRegistration(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const quizScore = parseInt(formData.get('quizScore') as string, 10)

  await addLead({
    firstName,
    lastName,
    email,
    quizScore,
    registrationDate: new Date().toISOString(),
    inDraw: true,
  })

  revalidatePath('/')
  return { message: 'Fantastisch! Sie sind jetzt offiziell im Rennen um den Titel "KI-Flüsterer des Jahres". Mögen die Algorithmen mit Ihnen sein!' }
}

export async function getLeads(): Promise<Lead[]> {
  return getAllLeads()
}

export async function updateLeadAction(id: string, formData: FormData) {
  const notes = formData.get('notes') as string
  const inDraw = formData.get('inDraw') === 'on'

  await updateLead(id, { notes, inDraw })
  revalidatePath('/admin')
  return { message: 'Lead erfolgreich aktualisiert. Die KI ist beeindruckt von Ihrer Effizienz!' }
}

export async function deleteLeadAction(id: string) {
  await deleteLead(id)
  revalidatePath('/admin')
  return { message: 'Lead erfolgreich gelöscht.' }
}