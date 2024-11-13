export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Datenschutzhinweise</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 space-y-8">
            <p className="text-gray-600 italic">Zuletzt aktualisiert: 13 September 2024</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">EINLEITUNG</h2>
              <p className="text-gray-700">
                In der nachfolgenden „Datenschutzerklärung" und in den „Informationen über die Verarbeitung von personenbezogenen Daten gemäß Art. 13, 14 DSGVO" wird erläutert, welche Daten wir über Sie erfassen, wofür wir diese Daten benötigen und an wen wir diese Daten weitergeben. Darüber hinaus beinhalten sie auch Ihre Rechte in Bezug auf Ihre Daten und die Ansprechpartner, an die Sie sich für weitere Informationen oder Anfragen wenden können.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">I. DATENSCHUTZERKLÄRUNG</h2>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Für wen gilt diese Datenschutzerklärung und was wird durch sie abgedeckt?</h3>
              <p className="text-gray-700">
                Diese Datenschutzerklärung gilt ausschließlich für die spezifische Website der deloitte.com/de, wofür sich die Deloitte GmbH Wirtschaftsprüfungsgesellschaft mit Sitz in München und die in unserem Eigentum stehenden oder von uns beherrschten Unternehmen („Deloitte", „wir", „uns" oder „unser") verantwortlich zeichnen, sowie für solche Applikationen („Deloitte-Apps") und weitere Websites, welche von Deloitte angeboten werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Welche Daten werden von uns erhoben?</h2>
              <p className="text-gray-700 mb-2">
                Wir erheben verschiedene Arten von personenbezogenen Daten, einschließlich, aber nicht beschränkt auf:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Kontaktinformationen (z.B. Name, E-Mail-Adresse, Telefonnummer)</li>
                <li>Berufliche Informationen (z.B. Jobtitel, Unternehmen)</li>
                <li>Technische Daten (z.B. IP-Adresse, Browsertyp)</li>
                <li>Nutzungsdaten unserer Website und Dienste</li>
              </ul>
            </section>

            {/* Add more sections here, following the same structure */}

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Kontakt</h2>
              <p className="text-gray-700 mb-2">
                Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter:
              </p>
              <address className="text-gray-700 not-italic">
                Deloitte GmbH Wirtschaftsprüfungsgesellschaft<br />
                Datenschutzbeauftragter<br />
                Rosenheimer Platz 4<br />
                81669 München<br />
                E-Mail: privacy@deloitte.de
              </address>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}