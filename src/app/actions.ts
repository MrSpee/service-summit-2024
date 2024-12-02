'use server'

import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'

// Check if required environment variables are set
const isKVConfigured = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

export async function addLead(firstName: string, quizScore: number) {
  if (!isKVConfigured) {
    console.error('Vercel KV is not configured. Please set the required environment variables.')
    return { success: false, error: 'Database not configured' }
  }

  try {
    const leadId = nanoid()
    const newLead = {
      id: leadId,
      firstName,
      quizScore,
      registrationDate: new Date().toISOString(),
      inDraw: true,
      isWinner: false,
      notes: ''
    }

    await kv.set(`lead:${leadId}`, JSON.stringify(newLead))
    return { success: true, leadId }
  } catch (error) {
    console.error('Error adding lead:', error)
    return { success: false, error: 'Failed to add lead' }
  }
}

export async function getLeads() {
  if (!isKVConfigured) {
    console.error('Vercel KV is not configured. Please set the required environment variables.')
    return []
  }

  try {
    const keys = await kv.keys('lead:*')
    const leads = await Promise.all(keys.map(async (key) => {
      const lead = await kv.get(key)
      if (typeof lead === 'string') {
        try {
          return JSON.parse(lead)
        } catch (error) {
          console.error(`Error parsing lead with key ${key}:`, error)
          return null
        }
      } else if (lead && typeof lead === 'object') {
        return lead
      }
      return null
    }))
    return leads.filter(lead => lead !== null)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

export async function updateLeadAction(id: string, data: { notes?: string, inDraw?: boolean, isWinner?: boolean }) {
  if (!isKVConfigured) {
    console.error('Vercel KV is not configured. Please set the required environment variables.')
    return
  }

  try {
    const lead = await kv.get(`lead:${id}`)
    if (!lead) throw new Error('Lead not found')

    let parsedLead
    if (typeof lead === 'string') {
      parsedLead = JSON.parse(lead)
    } else if (lead && typeof lead === 'object') {
      parsedLead = lead
    } else {
      throw new Error('Invalid lead data')
    }

    const updatedLead = {
      ...parsedLead,
      notes: data.notes !== undefined ? data.notes : parsedLead.notes,
      inDraw: data.inDraw !== undefined ? data.inDraw : parsedLead.inDraw,
      isWinner: data.isWinner !== undefined ? data.isWinner : parsedLead.isWinner
    }

    await kv.set(`lead:${id}`, JSON.stringify(updatedLead))
  } catch (error) {
    console.error('Error updating lead:', error)
    throw error
  }
}

export async function deleteLeadAction(id: string) {
  if (!isKVConfigured) {
    console.error('Vercel KV is not configured. Please set the required environment variables.')
    return
  }

  try {
    await kv.del(`lead:${id}`)
  } catch (error) {
    console.error('Error deleting lead:', error)
    throw error
  }
}

export async function checkPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD
}

