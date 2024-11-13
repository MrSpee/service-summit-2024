import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-blue-600">Datenschutzerklärung</CardTitle>
          </CardHeader>
          <CardContent className="prose">
            <p>Wir freuen uns über Ihr Interesse an unserem Angebot. Der Schutz Ihrer persönlichen Daten ist uns wichtig. Mit dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten im Rahmen der Nutzung unserer Website.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Verantwortlicher:</h2>
            <p>Verantwortlicher im Sinne der DSGVO</p>

            <p>Verantwortlicher im Sinne des Art.4 Abs. 7 EU Datenschutzgrundverordnung (DSGVO) für die Verarbeitung Ihrer personenbezogenen Daten im Zusammenhang mit allen Leistungen, die nicht von Deloitte Legal erbracht werden, ist die:</p>

            <p className="font-bold">
              Deloitte GmbH Wirtschaftsprüfungsgesellschaft<br />
              Rosenheimer Platz 4<br />
              81669 München
            </p>

            <p>Verantwortlicher im Sinne des Art.4 Abs. 7 EU Datenschutzgrundverordnung (DSGVO) für die Verarbeitung Ihrer personenbezogenen Daten im Zusammenhang mit allen Leistungen, welche die Deloitte Legal erbringt, ist die:</p>

            <p className="font-bold">
              Deloitte Legal Rechtsanwaltsgesellschaft mbH<br />
              Erna-Scheffler-Straße 2<br />
              40476 Düsseldorf
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Zweck der Datenverarbeitung:</h2>
            <p>Wir verarbeiten Ihre personenbezogenen Daten, um Ihnen die Nutzung unserer Website zu ermöglichen, Ihre Anfragen zu bearbeiten und Ihnen Informationen über unsere Produkte und Dienstleistungen zukommen zu lassen.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Rechtsgrundlage:</h2>
            <p>Die Rechtsgrundlage für die Verarbeitung Ihrer personenbezogenen Daten ergibt sich aus Art. 6 DSGVO.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Empfänger:</h2>
            <p>Ihre Daten werden gegebenenfalls an Dienstleister weitergegeben, die wir zur Erfüllung unserer Aufgaben einsetzen.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Speicherdauer:</h2>
            <p>Ihre Daten werden solange gespeichert, wie es für die Erfüllung der genannten Zwecke erforderlich ist.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Ihre Rechte:</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Sie können der Verarbeitung Ihrer Daten widersprechen und haben ein Recht auf Datenübertragbarkeit.</p>

            <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Kontakt:</h2>
            <p>Wenn Sie Fragen zum Datenschutz haben, können Sie sich jederzeit an uns wenden:</p>
            <p className="font-bold">E-Mail: privacy@deloitte.de oder kontakt@deloitte.de</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}