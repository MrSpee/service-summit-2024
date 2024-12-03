"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { getLeads, updateLeadAction, deleteLeadAction } from '@/app/actions'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

interface Lead {
  id: string;
  firstName: string;
  quizScore: number;
  registrationDate: string;
  inDraw: boolean;
  isWinner: boolean;
  notes: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const handleUpdateLead = async (e: React.FormEvent<HTMLFormElement>, lead: Lead) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const updatedNotes = formData.get('notes') as string
    const updatedInDraw = formData.get('inDraw') === 'on'
    const updatedIsWinner = formData.get('isWinner') === 'on'

    try {
      const updatedLead = {
        ...lead,
        notes: updatedNotes,
        inDraw: updatedInDraw,
        isWinner: updatedIsWinner
      }
      await updateLeadAction(lead.id, { notes: updatedNotes, inDraw: updatedInDraw, isWinner: updatedIsWinner })
      setLeads(leads.map(l => l.id === lead.id ? updatedLead : l))
    } catch (err) {
      console.error('Fehler beim Aktualisieren des Leads:', err)
      setError('Fehler beim Aktualisieren des Leads. Bitte versuchen Sie es später erneut.')
    }
  }

  const handleDeleteLead = async (lead: Lead) => {
    if (confirm('Sind Sie sicher, dass Sie diesen Lead löschen möchten?')) {
      try {
        await deleteLeadAction(lead.id)
        setLeads(leads.filter(l => l.id !== lead.id))
        setSelectedLeads(selectedLeads.filter(id => id !== lead.id))
      } catch (err) {
        console.error('Fehler beim Löschen des Leads:', err)
        setError('Fehler beim Löschen des Leads. Bitte versuchen Sie es später erneut.')
      }
    }
  }

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  const handleDeleteSelectedLeads = async () => {
    if (selectedLeads.length === 0) {
      setError('Bitte wählen Sie mindestens einen Lead zum Löschen aus.')
      return
    }

    if (confirm(`Sind Sie sicher, dass Sie ${selectedLeads.length} Lead(s) löschen möchten?`)) {
      try {
        await Promise.all(selectedLeads.map(id => deleteLeadAction(id)))
        setLeads(leads.filter(lead => !selectedLeads.includes(lead.id)))
        setSelectedLeads([])
      } catch (err) {
        console.error('Fehler beim Löschen der ausgewählten Leads:', err)
        setError('Fehler beim Löschen der ausgewählten Leads. Bitte versuchen Sie es später erneut.')
      }
    }
  }

  const totalLeads = leads.length
  const participantsInDraw = leads.filter(lead => lead.inDraw).length
  const winners = leads.filter(lead => lead.isWinner).length

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white">Lade Daten...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white text-red-500">Fehler: {error}</div>
  }

  if (leads.length === 0) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white">Keine Leads gefunden.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-xl font-semibold">Gesamtzahl der Leads</p>
              <p className="text-3xl font-bold">{totalLeads}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">Teilnehmer an der Verlosung</p>
              <p className="text-3xl font-bold">{participantsInDraw}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">Gewinner</p>
              <p className="text-3xl font-bold">{winners}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 pt-8">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-lg font-semibold">{selectedLeads.length} Lead(s) ausgewählt</p>
          <Button 
            onClick={handleDeleteSelectedLeads} 
            variant="destructive" 
            disabled={selectedLeads.length === 0}
          >
            Ausgewählte Leads löschen
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {leads.map((lead) => (
            <AccordionItem 
              key={lead.id} 
              value={lead.id} 
              className={`border ${lead.isWinner ? 'border-4 border-yellow-400' : 'border-gray-300'} rounded-lg overflow-hidden shadow-md`}
            >
              <div className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200">
                <Checkbox
                  checked={selectedLeads.includes(lead.id)}
                  onCheckedChange={() => handleSelectLead(lead.id)}
                  className="mr-4"
                />
                <AccordionTrigger className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-semibold">{lead.firstName}</span>
                    <span className="text-sm text-gray-500 mt-1">
                      {format(new Date(lead.registrationDate), 'dd.MM.yyyy HH:mm', { locale: de })}
                    </span>
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent className="p-4 bg-white">
                <form onSubmit={(e) => handleUpdateLead(e, lead)} className="space-y-4">
                  <div>
                    <label className="block font-bold">Vorname:</label>
                    <p>{lead.firstName}</p>
                  </div>
                  <div>
                    <label className="block font-bold">Teilnahme an der Verlosung:</label>
                    <p>{lead.inDraw ? 'Ja' : 'Nein'}</p>
                  </div>
                  <div>
                    <label className="block font-bold">Richtige Antworten:</label>
                    <p>{lead.quizScore}</p>
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Notizen:</label>
                    <Textarea
                      name="notes"
                      defaultValue={lead.notes || ''}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`inDraw-${lead.id}`}
                      name="inDraw"
                      defaultChecked={lead.inDraw}
                    />
                    <label htmlFor={`inDraw-${lead.id}`}>An Verlosung teilnehmen</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`isWinner-${lead.id}`}
                      name="isWinner"
                      defaultChecked={lead.isWinner}
                    />
                    <label htmlFor={`isWinner-${lead.id}`}>Gewinner</label>
                  </div>
                  <div className="flex justify-between">
                    <Button type="submit">Aktualisieren</Button>
                    <Button type="button" onClick={() => handleDeleteLead(lead)} variant="destructive">Löschen</Button>
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

