import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Datenschutzbestimmungen</h1>
        <div className="prose max-w-none">
          <h2>1. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p>Wir erheben und verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen. Bei der Teilnahme an unserem Quiz werden folgende Daten erhoben: Name, E-Mail-Adresse und Quiz-Ergebnisse.</p>

          <h2>2. Zweck der Datenverarbeitung</h2>
          <p>Die erhobenen Daten werden ausschließlich zur Durchführung des Quiz und der damit verbundenen Verlosung verwendet. Im Falle eines Gewinns werden die Daten zur Kontaktaufnahme und Gewinnübermittlung genutzt.</p>

          <h2>3. Speicherdauer</h2>
          <p>Die Daten werden nur so lange gespeichert, wie es für die Durchführung des Quiz und der Verlosung erforderlich ist. Nach Abschluss der Verlosung werden die Daten gelöscht, es sei denn, es bestehen gesetzliche Aufbewahrungspflichten.</p>

          <h2>4. Weitergabe von Daten</h2>
          <p>Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, es sei denn, wir sind gesetzlich dazu verpflichtet.</p>

          <h2>5. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Zudem haben Sie ein Widerspruchsrecht gegen die Verarbeitung und ein Recht auf Datenübertragbarkeit.</p>

          <h2>6. Kontakt</h2>
          <p>Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten können Sie sich jederzeit an uns wenden.</p>

          <h2>7. Änderungen der Datenschutzbestimmungen</h2>
          <p>Wir behalten uns vor, diese Datenschutzbestimmungen jederzeit unter Beachtung der geltenden Datenschutzvorschriften zu ändern.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}