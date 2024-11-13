import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin } from 'lucide-react'

export default function VortragPage() {
  const sessions = [
    { 
      date: '20.11.2024', 
      times: ['13:45', '16:00'],
      day: 'Mittwoch'
    },
    { 
      date: '21.11.2024', 
      times: ['09:45', '13:45'],
      day: 'Donnerstag'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-600 leading-tight">
              Genervte Kunden? <br/> Überarbeitete Mitarbeiter?
              <br />
              Wann ziehen Sie die Reißleine?
            </h1>
            <p className="text-2xl text-gray-700">
              Wie Conversational AI Ihre Service-Probleme in Chancen verwandelt
            </p>
          </div>

          {/* Main Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Details</CardTitle>
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
                                {time} Uhr
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
              <CardTitle className="text-2xl text-blue-600">Warum lohnt sich dieser Vortrag?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-lg text-gray-700">
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