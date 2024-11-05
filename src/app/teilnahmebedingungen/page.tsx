import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teilnahmebedingungen</h1>
        <div className="prose max-w-none">
          <h2>1. Teilnahmeberechtigung</h2>
          <p>Teilnahmeberechtigt sind alle Personen, die zum Zeitpunkt der Teilnahme mindestens 18 Jahre alt sind und ihren Wohnsitz in Deutschland haben.</p>

          <h2>2. Ablauf der Verlosung</h2>
          <p>Die Teilnahme erfolgt ausschließlich über das erfolgreiche Abschließen des Conversational AI Quiz auf unserer Website. Jeder Teilnehmer kann nur einmal an der Verlosung teilnehmen.</p>

          <h2>3. Gewinnermittlung</h2>
          <p>Die Gewinner werden durch Zufallsziehung ermittelt. Die Auslosung findet täglich am 20. und 21. November um 16:30 Uhr am Deloitte Stand statt.</p>

          <h2>4. Benachrichtigung der Gewinner</h2>
          <p>Die Gewinner werden per E-Mail benachrichtigt. Sollte sich ein Gewinner nicht innerhalb von 7 Tagen nach der Benachrichtigung melden, verfällt der Gewinn und es wird ein neuer Gewinner ausgelost.</p>

          <h2>5. Datenschutz</h2>
          <p>Die im Rahmen der Verlosung erhobenen Daten werden ausschließlich für die Durchführung der Verlosung verwendet und nach Abschluss der Verlosung gelöscht. Weitere Informationen finden Sie in unserer Datenschutzerklärung.</p>

          <h2>6. Änderungen der Teilnahmebedingungen</h2>
          <p>Wir behalten uns vor, die Teilnahmebedingungen jederzeit zu ändern oder die Verlosung ohne Angabe von Gründen abzubrechen.</p>

          <h2>7. Rechtsweg</h2>
          <p>Der Rechtsweg ist ausgeschlossen.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}