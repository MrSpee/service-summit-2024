"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { getLeads, updateLeadAction, deleteLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
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
      await updateLeadAction(lead.id, formData)
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
      } catch (err) {
        console.error('Fehler beim Löschen des Leads:', err)
        setError('Fehler beim Löschen des Leads. Bitte versuchen Sie es später erneut.')
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
        <Accordion type="single" collapsible className="w-full space-y-4">
          {leads.map((lead) => (
            <AccordionItem 
              key={lead.id} 
              value={lead.id} 
              className={`border ${lead.isWinner ? 'border-4 border-yellow-400' : 'border-gray-300'} rounded-lg overflow-hidden shadow-md`}
            >
              <AccordionTrigger className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-200">
                <span className="font-semibold">{lead.firstName} {lead.lastName}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(lead.registrationDate), 'dd.MM.yyyy HH:mm', { locale: de })}
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white">
                <form onSubmit={(e) => handleUpdateLead(e, lead)} className="space-y-4">
                  <div>
                    <label className="block font-bold">E-Mail:</label>
                    <p>{lead.email}</p>
                  </div>
                  <div>
                    <label className="block font-bold">Quiz-Punktzahl:</label>
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