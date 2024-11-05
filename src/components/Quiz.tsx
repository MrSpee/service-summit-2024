'use client'

import { useState } from 'react'
import { Button } from './ui/button'

const questions = [
  {
    question: "Was ist Conversational AI?",
    options: [
      "Ein neuer Kaffeeautomat",
      "KI, die menschenähnliche Gespräche führt",
      "Eine Programmiersprache für Kaffeemaschinen",
      "Ein Datenbankmanagement-System für Smalltalk"
    ],
    correctAnswer: 1
  },
  {
    question: "Welches ist KEIN typischer Bestandteil von Conversational AI?",
    options: [
      "Natürliche Sprachverarbeitung (NLP)",
      "Maschinelles Lernen",
      "Quantencomputing",
      "Spracherkennung"
    ],
    correctAnswer: 2
  },
  {
    question: "Was ist der Hauptvorteil von Conversational AI im Kundenservice?",
    options: [
      "Sie ersetzt komplett menschliche Mitarbeiter",
      "Sie ist 24/7 verfügbar und nie müde",
      "Sie ist billiger als eine normale Website",
      "Sie funktioniert nur für einfache Anfragen"
    ],
    correctAnswer: 1
  }
]

export function Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0))
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
      <div className="space-y-2">
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left justify-start"
            variant="outline"
          >
            {option}
          </Button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Frage {currentQuestion + 1} von {questions.length} - Keine Sorge, es gibt keine Minuspunkte für Kreativität!
      </p>
    </div>
  )
}