import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

import { kv } from '@vercel/kv'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  registrationDate: string
  quizScore: number
  notes?: string
  inDraw: boolean
}

const sampleLeads: Omit<Lead, 'id'>[] = [
  {
    firstName: "Anna",
    lastName: "Müller",
    email: "anna.mueller@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 2,
    notes: "Interessiert an KI-Lösungen für Kundenservice",
    inDraw: true
  },
  {
    firstName: "Thomas",
    lastName: "Schmidt",
    email: "thomas.schmidt@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 3,
    inDraw: true
  },
  {
    firstName: "Laura",
    lastName: "Weber",
    email: "laura.weber@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 1,
    notes: "Möchte mehr über Chatbots erfahren",
    inDraw: false
  },
  {
    firstName: "Michael",
    lastName: "Becker",
    email: "michael.becker@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 2,
    inDraw: true
  },
  {
    firstName: "Sarah",
    lastName: "Koch",
    email: "sarah.koch@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 3,
    notes: "Sucht nach KI-Lösungen für Datenanalyse",
    inDraw: true
  },
  {
    firstName: "Felix",
    lastName: "Wagner",
    email: "felix.wagner@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 2,
    inDraw: false
  },
  {
    firstName: "Lisa",
    lastName: "Hoffmann",
    email: "lisa.hoffmann@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 1,
    notes: "Interessiert an KI im Marketing",
    inDraw: true
  },
  {
    firstName: "David",
    lastName: "Schulz",
    email: "david.schulz@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 3,
    inDraw: true
  },
  {
    firstName: "Julia",
    lastName: "Fischer",
    email: "julia.fischer@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 2,
    notes: "Möchte KI in der Produktentwicklung einsetzen",
    inDraw: false
  },
  {
    firstName: "Markus",
    lastName: "Schäfer",
    email: "markus.schaefer@example.com",
    registrationDate: new Date().toISOString(),
    quizScore: 1,
    inDraw: true
  }
]

async function addSampleLeads() {
  for (const lead of sampleLeads) {
    const id = `lead:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    await kv.set(id, { ...lead, id })
    console.log(`Added lead: ${lead.firstName} ${lead.lastName}`)
  }
  console.log('All sample leads have been added to the database.')
}

addSampleLeads()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error adding sample leads:', error)
    process.exit(1)
  })