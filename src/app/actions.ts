'use server'

import { revalidatePath } from 'next/cache'
import { addLead, updateLead, getAllLeads, deleteLead, Lead } from '@/lib/kv-utils'

export async function submitRegistration(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const quizScore = parseInt(formData.get('quizScore') as string, 10)


  revalidatePath('/')
  return { message: 'Vielen Dank für Ihre Teilnahme! Ihre Registrierung wurde erfolgreich abgeschlossen.' }
}

export async function getLeads(): Promise<Lead[]> {
  return getAllLeads()
}

export async function updateLeadAction(id: string, formData: FormData) {
  const notes = formData.get('notes') as string
  const inDraw = formData.get('inDraw') === 'on'

  await updateLead(id, { notes, inDraw })
  revalidatePath('/admin')
  return { message: 'Lead erfolgreich aktualisiert. Vielen Dank für Ihre sorgfältige Arbeit.' }
}

export async function deleteLeadAction(id: string) {
  await deleteLead(id)
  revalidatePath('/admin')
  return { message: 'Lead erfolgreich gelöscht. Hoffen wir, es war kein zukünftiger Tech-Milliardär!' }
}