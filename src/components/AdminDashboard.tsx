'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Separator } from './ui/separator'
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
      setError('Fehler beim Laden der Leads. Bitte versuchen Sie es später erneut.')
      console.error('Fehler beim Laden der Leads:', err)
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
      setSelectedLead(prevLead => {
        if (prevLead) {
          return {
            ...prevLead,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            notes: formData.get('notes') as string,
            inDraw: formData.get('inDraw') === 'on'
          }
        }
        return null
      })
    } catch (err) {
      setError('Fehler beim Aktualisieren des Leads.')
      console.error('Fehler beim Aktualisieren des Leads:', err)
    }
  }

  async function handleDeleteLead(id: string) {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Lead löschen möchten?')) {
      try {
        await deleteLeadAction(id)
        await fetchLeads()
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null)
        }
      } catch (err) {
        setError('Fehler beim Löschen des Leads.')
        console.error('Fehler beim Löschen des Leads:', err)
      }
    }
  }

  async function handleToggleInDraw(lead: Lead) {
    try {
      const updatedInDraw = !lead.inDraw
      const formData = new FormData()
      formData.append('inDraw', updatedInDraw.toString())
      await updateLeadAction(lead.id, formData)
      setLeads(prevLeads => 
        prevLeads.map(l => 
          l.id === lead.id ? { ...l, inDraw: updatedInDraw } : l
        )
      )
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead(prevLead => prevLead ? { ...prevLead, inDraw: updatedInDraw } : null)
      }
    } catch (err) {
      setError('Fehler beim Aktualisieren des Verlosungsstatus.')
      console.error('Fehler beim Aktualisieren des Verlosungsstatus:', err)
    }
  }

  function handleSelectLead(lead: Lead) {
    setSelectedLead(lead)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return <div className="text-center py-10">Laden...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Leads</h2>
          {leads.length === 0 ? (
            <p>Keine Leads vorhanden.</p>
          ) : (
            <ul className="space-y-2">
              {leads.map(lead => (
                <li key={lead.id} className="bg-white p-4 rounded shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{lead.firstName} {lead.lastName}</span>
                    <Button onClick={() => handleSelectLead(lead)}>Details</Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Angemeldet am: {formatDate(lead.registrationDate)}
                  </div>
                  <div className="flex items-center mt-2">
                    <Checkbox
                      id={`inDraw-${lead.id}`}
                      checked={lead.inDraw}
                      onCheckedChange={() => handleToggleInDraw(lead)}
                    />
                    <Label htmlFor={`inDraw-${lead.id}`} className="ml-2">
                      An Verlosung teilnehmen
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="lg:w-1/2">
          {selectedLead ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Lead Details</h2>
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
                  <Label htmlFor="notes">Notizen</Label>
                  <Input id="notes" name="notes" defaultValue={selectedLead.notes || ''} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inDraw"
                    name="inDraw"
                    checked={selectedLead.inDraw}
                    onCheckedChange={(checked) => {
                      setSelectedLead(prev => prev ? {...prev, inDraw: checked as boolean} : null)
                    }}
                  />
                  <Label htmlFor="inDraw">An Verlosung teilnehmen</Label>
                </div>
                <div className="flex justify-between">
                  <Button type="submit">Aktualisieren</Button>
                  <Button type="button" variant="destructive" onClick={() => handleDeleteLead(selectedLead.id)}>
                    Lead löschen
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Wählen Sie einen Lead aus, um die Details anzuzeigen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}