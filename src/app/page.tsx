'use client'
import { useState } from 'react'
import questions from './data/questions'

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1)

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

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
          <h2 className="text-xl sm:text-2xl md:text-3xl text-christmas-green mb-2">Ho Ho Ho! Quizmaster-Ergebnis:</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-christmas-gold">
            Sie haben {score} von {questions.length} Fragen richtig beantwortet!
          </p>
          <p className="mt-2 text-sm sm:text-base text-pine-green">
            {score === questions.length
              ? "Perfekt! Sie sind Deloitte's Weihnachtsexperte!"
              : score > questions.length / 2
              ? "Gut gemacht! Fast so präzise wie unsere Wirtschaftsprüfer!"
              : "Naja, Rom wurde auch nicht an einem Tag gebaut. Wie wäre es mit einer Beratung zu Weihnachtsbräuchen?"}
          </p>
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
                className="bg-christmas-red text-snow-white p-2 rounded hover:bg-cranberry transition-colors text-sm sm:text-base"
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

