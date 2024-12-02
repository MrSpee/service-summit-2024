import { useState } from 'react'
import { addLead } from '../app/actions'

interface RegistrationProps {
  score: number
  totalQuestions: number
}

export function Registration({ score, totalQuestions }: RegistrationProps) {
  const [firstName, setFirstName] = useState('')
  const [consent, setConsent] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegistrationError(null)

    try {
      const result = await addLead(firstName, score)
      if (result.success) {
        setRegistrationComplete(true)
        setShowRegistration(false)
      } else {
        setRegistrationError(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setRegistrationError('An unexpected error occurred. Please try again.')
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage === 100) {
      return "Wow! Du bist ein wahres Weihnachtsgenie! 🎄🌟"
    } else if (percentage >= 80) {
      return "Fantastisch! Du kennst dich richtig gut aus! 🎅"
    } else if (percentage >= 60) {
      return "Gut gemacht! Du hast ein solides Weihnachtswissen! 🦌"
    } else if (percentage >= 40) {
      return "Nicht schlecht! Du bist auf dem richtigen Weg! ☃️"
    } else {
      return "Hey, du hast mitgemacht und das zählt! 🎁"
    }
  }

  return (
    <div className="bg-snow-white p-4 rounded-lg shadow-lg w-full max-w-md border-2 border-christmas-green">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-christmas-green mb-3">
        Quiz abgeschlossen!
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-christmas-red mb-3">
        {getScoreMessage()}
      </p>
      <p className="text-base sm:text-lg text-pine-green mb-3">
        Du hast {score} von {totalQuestions} Fragen richtig beantwortet.
      </p>
      <p className="text-sm sm:text-base text-pine-green mb-4 font-semibold">
        Aber keine Sorge! Unabhängig von deiner Punktzahl hast du die gleiche Chance, einen unserer fantastischen Weihnachtspreise zu gewinnen. Jeder Teilnehmer hat die gleiche Gewinnchance!
      </p>
      {!showRegistration && !registrationComplete && (
        <button
          onClick={() => setShowRegistration(true)}
          className="mt-3 bg-christmas-red text-snow-white p-2 rounded hover:bg-cranberry transition-colors text-sm sm:text-base w-full"
        >
          Wirf deinen Namen in den Lostopf!
        </button>
      )}
      {showRegistration && (
        <form onSubmit={handleRegistration} className="mt-3 text-left">
          <div className="mb-3">
            <label htmlFor="firstName" className="block text-pine-green text-sm font-bold mb-1">
              Vorname
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-pine-green leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mr-2 leading-tight"
                required
              />
              <span className="text-sm text-pine-green">
                Ich bin einverstanden, groß abzustauben!
              </span>
            </label>
          </div>
          {registrationError && (
            <p className="text-red-500 text-sm mt-2">{registrationError}</p>
          )}
          <button
            type="submit"
            className="bg-christmas-green text-snow-white p-2 rounded hover:bg-pine-green transition-colors text-sm sm:text-base w-full"
          >
            Registrieren
          </button>
        </form>
      )}
      {registrationComplete && (
        <div className="mt-3 text-center">
          <p className="text-lg text-christmas-green font-bold">
            Vielen Dank für deine Teilnahme!
          </p>
          <p className="text-base text-pine-green mt-2">
          Die Verlosung findet am 12.12. um 12:12 statt (ca. 10 Mins). Ein Invite folgt. Wenn du nicht dabei sein kannst, werden wir dich per Email benachrichtigen, falls du einer der Gewinner bist. Viel Glück 🍀🦄🎅
          </p>
        </div>
      )}
    </div>
  )
}

