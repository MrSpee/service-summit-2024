import { kv } from '@vercel/kv'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  registrationDate: string
  quizScore: number
  notes?: string
  inDraw: boolean
}

export async function addLead(lead: Omit<Lead, 'id'>): Promise<string> {
  const id = `lead:${Date.now()}`
  await kv.set(id, { ...lead, id })
  return id
}

export async function getLead(id: string): Promise<Lead | null> {
  return kv.get<Lead>(id)
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<void> {
  const lead = await getLead(id)
  if (lead) {
    await kv.set(id, { ...lead, ...updates })
  }
}

export async function getAllLeads(): Promise<Lead[]> {
  const keys = await kv.keys('lead:*')
  const leads = await Promise.all(keys.map(key => kv.get<Lead>(key)))
  return leads.filter((lead): lead is Lead => lead !== null)
}

export async function deleteLead(id: string): Promise<void> {
  await kv.del(id)
}