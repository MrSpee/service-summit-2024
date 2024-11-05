"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { getLeads, updateLeadAction, deleteLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const fetchedLeads = await getLeads()
        setLeads(fetchedLeads)
        setLoading(false)
      } catch (err) {
        console.error('Fehler beim Laden der Leads:', err)
        setError('Fehler beim Laden der Leads. Bitte versuchen Sie es später erneut.')
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const handleUpdateLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedLead) return

    const formData = new FormData(e.currentTarget)
    const updatedNotes = formData.get('notes') as string
    const updatedInDraw = formData.get('inDraw') === 'on'

    try {
      const updatedLead = {
        ...selectedLead,
        notes: updatedNotes,
        inDraw: updatedInDraw
      }
      await updateLeadAction(selectedLead.id, formData)
      setLeads(leads.map(lead => lead.id === selectedLead.id ? updatedLead : lead))
      setSelectedLead(updatedLead)
    } catch (err) {
      console.error('Fehler beim Aktualisieren des Leads:', err)
      setError('Fehler beim Aktualisieren des Leads. Bitte versuchen Sie es später erneut.')
    }
  }

  const handleDeleteLead = async () => {
    if (!selectedLead) return

    if (confirm('Sind Sie sicher, dass Sie diesen Lead löschen möchten?')) {
      try {
        await deleteLeadAction(selectedLead.id)
        setLeads(leads.filter(lead => lead.id !== selectedLead.id))
        setSelectedLead(null)
      } catch (err) {
        console.error('Fehler beim Löschen des Leads:', err)
        setError('Fehler beim Löschen des Leads. Bitte versuchen Sie es später erneut.')
      }
    }
  }

  if (loading) {
    return <div>Lade Daten...</div>
  }

  if (error) {
    return <div>Fehler: {error}</div>
  }

  if (leads.length === 0) {
    return <div>Keine Leads gefunden.</div>
  }

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Teilnehmerliste</h2>
        <ul>
          {leads.map((lead) => (
            <li key={lead.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{lead.firstName} {lead.lastName}</h3>
                  <p>{lead.email}</p>
                  <p>Quiz-Punktzahl: {lead.quizScore}</p>
                  <p>Registrierungsdatum: {new Date(lead.registrationDate).toLocaleString('de-DE')}</p>
                  <p>An Verlosung teilnehmen: {lead.inDraw ? 'Ja' : 'Nein'}</p>
                </div>
                <Button onClick={() => setSelectedLead(lead)}>Details</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Separator orientation="vertical" className="mx-4" />
      <div className="w-1/2 pl-4">
        {selectedLead ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lead Details</h2>
            <form onSubmit={handleUpdateLead}>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Vorname:</label>
                <p>{selectedLead.firstName}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Nachname:</label>
                <p>{selectedLead.lastName}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">E-Mail:</label>
                <p>{selectedLead.email}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Quiz-Punktzahl:</label>
                <p>{selectedLead.quizScore}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Registrierungsdatum:</label>
                <p>{new Date(selectedLead.registrationDate).toLocaleString('de-DE')}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Notizen:</label>
                <Textarea
                  name="notes"
                  defaultValue={selectedLead.notes || ''}
                  className="w-full"
                />
              </div>
              <div className="mb-4 flex items-center">
                <Checkbox
                  id="inDraw"
                  name="inDraw"
                  defaultChecked={selectedLead.inDraw}
                />
                <label htmlFor="inDraw" className="ml-2">An Verlosung teilnehmen</label>
              </div>
              <div className="flex justify-between">
                <Button type="submit">Aktualisieren</Button>
                <Button type="button" onClick={handleDeleteLead} variant="destructive">Löschen</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Wählen Sie einen Lead aus, um Details anzuzeigen</p>
          </div>
        )}
      </div>
    </div>
  )
}