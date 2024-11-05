'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { getLeads, updateLeadAction, deleteLeadAction } from '@/app/actions'
import type { Lead } from '@/lib/kv-utils'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedLeads = await getLeads()
      setLeads(fetchedLeads)
    } catch (err) {
      setError('Ups! Unsere KI hatte einen Kurzschluss beim Laden der Leads. Bitte versuchen Sie es später noch einmal.')
      console.error('Error fetching leads:', err)
    }
    setIsLoading(false)
  }

  async function handleUpdateLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedLead) return

    const formData = new FormData(e.currentTarget)
    try {
      await updateLeadAction(selectedLead.id, formData)
      await fetchLeads()
      setSelectedLead(null)
    } catch (err) {
      setError('Oh nein! Die KI weigert sich, diesen Lead zu aktualisieren. Vielleicht mag sie ihn besonders?')
      console.error('Error updating lead:', err)
    }
  }

  async function handleDeleteLead(id: string) {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Lead löschen möchten? Unsere KI wird traurig sein, einen Freund zu verlieren!')) {
      try {
        await deleteLeadAction(id)
        await fetchLeads()
      } catch (err) {
        setError('Hoppla! Die KI hat sich entschieden, diesen Lead zu behalten. Versuchen Sie es später noch einmal.')
        console.error('Error deleting lead:', err)
      }
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Laden... Unsere KI-Hamster rennen so schnell sie können!</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Hier regiert die KI (und Sie natürlich)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Unsere potenziellen KI-Overlords (auch bekannt als Leads)</h2>
          {leads.length === 0 ? (
            <p>Noch keine Leads vorhanden. Zeit, die Marketing-KI zu aktivieren!</p>
          ) : (
            <ul className="space-y-2">
              {leads.map(lead => (
                <li key={lead.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
                  <span>{lead.firstName} {lead.lastName}</span>
                  <div>
                    <Button onClick={() => setSelectedLead(lead)} className="mr-2">Bearbeiten (vorsichtig!)</Button>
                    <Button onClick={() => handleDeleteLead(lead.id)} variant="destructive">Löschen (nur im Notfall!)</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedLead && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Lead bearbeiten (Seien Sie nett, es könnte Ihre zukünftige KI-Chefin sein)</h2>
            <form onSubmit={handleUpdateLead} className="space-y-4">
              <div>
                <Label htmlFor="firstName">Vorname</Label>
                <Input id="firstName" name="firstName" defaultValue={selectedLead.firstName} />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname</Label>
                <Input id="lastName" name="lastName" defaultValue={selectedLead.lastName} />
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" name="email" type="email" defaultValue={selectedLead.email} />
              </div>
              <div>
                <Label htmlFor="notes">Notizen (Bitte keine Geheimnisse, die KI liest mit)</Label>
                <Input id="notes" name="notes" defaultValue={selectedLead.notes || ''} />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inDraw"
                  name="inDraw"
                  defaultChecked={selectedLead.inDraw}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="inDraw">An Verlosung teilnehmen (Möge die Wahrscheinlichkeit mit diesem Lead sein)</Label>
              </div>
              <Button type="submit">Aktualisieren und hoffen, dass die KI es gut findet</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}