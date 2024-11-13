'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function VortragPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{date: string, start: string, end: string} | null>(null)

  const sessions = [
    { 
      date: '20.11.2024', 
      times: [
        { start: '13:45', end: '13:55' },
        { start: '16:00', end: '16:10' }
      ],
      day: 'Mittwoch'
    },
    { 
      date: '21.11.2024', 
      times: [
        { start: '09:45', end: '09:55' },
        { start: '13:45', end: '13:55' }
      ],
      day: 'Donnerstag'
    }
  ]

  const handleAddToCalendar = (date: string, startTime: string, endTime: string) => {
    setSelectedEvent({ date, start: startTime, end: endTime })
    setIsDialogOpen(true)
  }

  const generateCalendarLink = (type: 'google' | 'outlook' | 'ical') => {
    if (!selectedEvent) return ''
    const { date, start, end } = selectedEvent
    const [day, month, year] = date.split('.')
    const startDateTime = `${year}-${month}-${day}T${start}:00`
    const endDateTime = `${year}-${month}-${day}T${end}:00`
    const event = {
      title: "Schnell erklärt: Conversational AI - Deloitte und Cognigy",
      description: "Wie Conversational AI Ihre Service-Probleme in Chancen verwandelt",
      location: "Deloitte Stand, Service Summit Hamburg",
      startDate: startDateTime,
      endDate: endDateTime,
    }

    switch (type) {
      case 'google':
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${encodeURIComponent(event.startDate.replace(/-/g, ''))},${encodeURIComponent(event.endDate.replace(/-/g, ''))}`
      case 'outlook':
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&startdt=${encodeURIComponent(event.startDate)}&enddt=${encodeURIComponent(event.endDate)}`
      case 'ical':
        return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${encodeURIComponent(window.location.href)}
DTSTART:${event.startDate.replace(/-/g, '').replace(/:/g, '')}
DTEND:${event.endDate.replace(/-/g, '').replace(/:/g, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 leading-tight">
              Impulsvortrag: <br/>Conversational AI in 10 Minuten
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
            Genervte Kunden? <br/> Überarbeitete Mitarbeiter? <br/> Wann ziehen Sie die Reißleine? <br/>Wie Conversational AI Ihre Service-Probleme in Chancen verwandelt
            </p>
          </div>

          {/* Main Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Veranstaltungsort</h3>
                  <p className="text-gray-600">Deloitte Stand, Service Summit Hamburg</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Dauer</h3>
                  <p className="text-gray-600">ca. 10 Minuten</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start space-x-3">
                <CalendarDays className="w-6 h-6 text-blue-600 mt-1" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg mb-2">Termine</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessions.map((session, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-600">{session.day}, {session.date}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {session.times.map((time, timeIndex) => (
                              <li key={timeIndex} className="bg-white p-2 rounded-md shadow-sm">
                                <div className="flex justify-between items-center">
                                  <span>{time.start} Uhr</span>
                                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddToCalendar(session.date, time.start, time.end)}
                                      >
                                        Reminder
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Zum Kalender hinzufügen</DialogTitle>
                                      </DialogHeader>
                                      <div className="py-4">
                                        <p>Wählen Sie Ihren bevorzugten Kalender-Service:</p>
                                        <div className="mt-4 space-y-2">
                                          <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => window.open(generateCalendarLink('google'), '_blank')}
                                          >
                                            Google Calendar
                                          </Button>
                                          <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => window.open(generateCalendarLink('outlook'), '_blank')}
                                          >
                                            Outlook
                                          </Button>
                                          <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => {
                                              const link = document.createElement('a')
                                              link.href = generateCalendarLink('ical')
                                              link.download = 'event.ics'
                                              document.body.appendChild(link)
                                              link.click()
                                              document.body.removeChild(link)
                                            }}
                                          >
                                            iCal
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revised Additional Information Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-blue-600">Warum lohnt sich dieser Vortrag?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-base sm:text-lg text-gray-700">
                In unserem kompakten 10-minütigen Vortrag erfahren Sie, wie moderne Conversational AI 
                und KI-Agenten Ihre Kundenservice-Herausforderungen in echte Chancen verwandeln. 
                Entdecken Sie:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                <li>Wie KI-Agenten Ihre Mitarbeiter von repetitiven Aufgaben entlasten</li>
                <li>Strategien zur schnelleren und effizienteren Bearbeitung von Kundenanfragen</li>
                <li>Methoden zur Gewährleistung einer 24/7 Service-Qualität</li>
                <li>Wege zur Kostenreduzierung bei gleichzeitiger Steigerung der Kundenzufriedenheit</li>
                <li>Best Practices für den Start eines erfolgreichen Conversational AI Projekts</li>
                <li>Einblicke in die neuesten Entwicklungen bei KI-Agenten und deren Anwendungsmöglichkeiten</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}