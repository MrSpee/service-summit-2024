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
    isWinner: false,
  })

  revalidatePath('/')
  return { message: 'Vielen Dank für Ihre Teilnahme. Ihre Registrierung wurde erfolgreich abgeschlossen.' }
}

export async function getLeads(): Promise<Lead[]> {
  return getAllLeads()
}

export async function updateLeadAction(id: string, data: FormData | Partial<Lead>) {
  let updateData: Partial<Lead>

  if (data instanceof FormData) {
    updateData = {
      notes: data.get('notes') as string | undefined,
      inDraw: data.get('inDraw') === 'on',
      isWinner: data.get('isWinner') === 'on',
    }
  } else {
    updateData = data
  }

  await updateLead(id, updateData)
  revalidatePath('/admin')
  revalidatePath('/verlosung')
  return { message: 'Lead erfolgreich aktualisiert. Vielen Dank für Ihre sorgfältige Arbeit.' }
}

export async function deleteLeadAction(id: string) {
  await deleteLead(id)
  revalidatePath('/admin')
  return { message: 'Lead erfolgreich gelöscht.' }
}

export async function updateWinnerStatus(id: string, isWinner: boolean) {
  await updateLead(id, { isWinner })
  revalidatePath('/admin')
  revalidatePath('/verlosung')
  return { message: isWinner ? 'Gewinner erfolgreich markiert.' : 'Gewinnerstatus erfolgreich entfernt.' }
}