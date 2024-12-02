'use client'
import { useState } from 'react'
import questions from './data/questions'
import { correctMessages, incorrectMessages } from './data/feedbackMessages'
import { addLead } from '../app/actions'

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [consent, setConsent] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
      setFeedback(correctMessages[Math.floor(Math.random() * correctMessages.length)])
    } else {
      setFeedback(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)])
    }
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      setShowFeedback(false)
    } else {
      setShowScore(true)
    }
  }

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

  const getPerformanceTitle = (score: number, totalQuestions: number) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Weihnachts-Wizard! 🧙‍♂️🎄";
    if (percentage >= 90) return "Festlicher Fuchs! 🦊🎅";
    if (percentage >= 80) return "Rentier-Raser! 🦌💨";
    if (percentage >= 70) return "Glühwein-Genie! 🍷🧠";
    if (percentage >= 60) return "Lebkuchen-Liebhaber! 🍪❤️";
    if (percentage >= 50) return "Geschenk-Guru! 🎁😎";
    if (percentage >= 40) return "Tannenbaum-Tänzer! 🕺🎄";
    if (percentage >= 30) return "Schneeflöckchen-Schüler! ❄️📚";
    if (percentage >= 20) return "Weihnachtskeks-Wanderer! 🍪🚶";
    if (percentage >= 10) return "Schlitten-Schieber! 🛷💪";
    return "Christbaum-Chaot! 🎄😅";
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-christmas-red mb-2">
          Bereit für die Weihnachts-Challenge?
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-pine-green">
          Alliance Manager, zeigt euer Festtagswissen schneller als eure Vertragsabschlüsse!
        </p>
      </div>
      {showScore ? (
        <div className="text-center bg-snow-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-christmas-green">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-christmas-green mb-2">
            {getPerformanceTitle(score, questions.length)}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-christmas-gold">
            Du hast {score} von {questions.length} Fragen richtig beantwortet!
          </p>
          <p className="mt-2 text-sm sm:text-base text-pine-green">
            {score === questions.length
              ? "Perfekt! Du bist Deloitte's Weihnachtsexperte!"
              : score > questions.length / 2
              ? "Gut gemacht! Fast so präzise wie unsere Wirtschaftsprüfer!"
              : "Naja, Rom wurde auch nicht an einem Tag gebaut. Wie wäre es mit einer Beratung zu Weihnachtsbräuchen?"}
          </p>
          {!showRegistration && !registrationComplete && (
            <button
              onClick={() => setShowRegistration(true)}
              className="mt-4 bg-christmas-red text-snow-white p-2 rounded hover:bg-cranberry transition-colors text-sm sm:text-base w-full"
            >
              Jetzt registrieren und groß abstauben!
            </button>
          )}
          {showRegistration && (
            <form onSubmit={handleRegistration} className="mt-4 text-left">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-pine-green text-sm font-bold mb-2">
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
              <div className="mb-4">
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
            <div className="mt-4 text-center">
              <p className="text-lg text-christmas-green font-bold">
                Vielen Dank für deine Teilnahme!
              </p>
              <p className="text-base text-pine-green mt-2">
                Du bist jetzt im Lostopf. Wir drücken dir die Daumen!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-snow-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-christmas-green">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-2 text-christmas-green">
            Frage {currentQuestion + 1}/{questions.length}
          </h2>
          <div className="w-full bg-pine-green rounded-full h-2 mb-3">
            <div 
              className="bg-christmas-red h-2 rounded-full" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-base sm:text-lg mb-4 text-pine-green">{questions[currentQuestion].questionText}</p>
          <div className="grid grid-cols-1 gap-2">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answerOption.isCorrect)}
                className="bg-christmas-red text-snow-white p-2 rounded hover:bg-cranberry transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showFeedback}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-4 text-center">
              <p className="text-sm text-pine-green italic mb-2">{feedback}</p>
              <p className="text-sm text-christmas-green font-semibold mb-2">
                Richtige Antwort: {questions[currentQuestion].answerOptions.find(option => option.isCorrect)?.answerText}
              </p>
              <button
                onClick={handleNextQuestion}
                className="mt-2 bg-christmas-green text-snow-white p-2 rounded hover:bg-pine-green transition-colors text-sm sm:text-base w-full"
              >
                Nächste Frage
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

