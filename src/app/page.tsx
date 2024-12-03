'use client'

import { useState, useEffect } from 'react'
import questions from './data/questions'
import { correctMessages, incorrectMessages } from './data/feedbackMessages'
import { Registration } from '../components/Registration'
import confetti from 'canvas-confetti'
import Snowfall from 'react-snowfall'

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const christmasDate = new Date(new Date().getFullYear(), 11, 25)
    const timer = setInterval(() => {
      const now = new Date()
      const difference = christmasDate.getTime() - now.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft(`🎄 ${days}d ${hours}h ${minutes}m ${seconds}s until Christmas! 🎅`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
      setFeedback(correctMessages[Math.floor(Math.random() * correctMessages.length)])
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setFeedback(incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)])
    }
    setExplanation(questions[currentQuestion].explanation)
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      setShowFeedback(false)
      setExplanation('')
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-4 text-center relative">
      <Snowfall snowflakeCount={200} />
      <div className="text-christmas-red font-bold mb-4 animate-bounce">
        {timeLeft}
      </div>
      {!showScore && (
        <div className="max-w-md mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-christmas-red mb-4">
            Unser festliches BDM Community Quiz 🎄✨
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-pine-green mb-4">
            Ho ho ho, liebe BDM Community! Taucht ein in unser weihnachtliches Quizvergnügen und testet euer Festtagswissen! 🎅🏼🎁
          </p>
          <p className="text-sm sm:text-base md:text-lg text-christmas-green font-semibold">
            Macht mit und gewinnt tolle Preise! Jeder Teilnehmer hat die gleiche Chance zu gewinnen, unabhängig von der Anzahl der richtigen Antworten. 🍀🎉
          </p>
        </div>
      )}
      {showScore ? (
        <Registration score={score} totalQuestions={questions.length} />
      ) : (
        <div className="bg-snow-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-christmas-green relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-christmas-red via-christmas-green to-christmas-gold"></div>
          <h2 className="text-lg sm:text-xl md:text-2xl mb-2 text-christmas-green">
            Frage {currentQuestion + 1}/{questions.length} 🎯
          </h2>
          <div className="w-full bg-pine-green rounded-full h-2 mb-3">
            <div 
              className="bg-christmas-red h-2 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg mb-4 text-pine-green">{questions[currentQuestion].questionText}</p>
          <div className="grid grid-cols-1 gap-2">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answerOption.isCorrect)}
                className="bg-christmas-red text-snow-white p-2 rounded hover:bg-cranberry transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showFeedback}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-pine-green italic mb-2">{feedback}</p>
              <p className="text-xs sm:text-sm text-christmas-green font-semibold mb-2">
                Richtige Antwort: {questions[currentQuestion].answerOptions.find(option => option.isCorrect)?.answerText}
              </p>
              <p className="text-xs sm:text-sm text-pine-green mb-2">{explanation}</p>
              <button
                onClick={handleNextQuestion}
                className="mt-2 bg-christmas-green text-snow-white p-2 rounded hover:bg-pine-green transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base w-full"
              >
                {currentQuestion === questions.length - 1 ? '🎁 Auswertung' : '🦌 Nächste Frage'}
              </button>
            </div>
          )}
        </div>
      )}
      <style jsx global>{`
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23C41E3A"><path d="M12 2L9.5 8.5H14.5L12 2ZM9.5 8.5L6 15H18L14.5 8.5H9.5Z"/></svg>'), auto;
        }
        button:hover {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23165B33"><path d="M12 2L9.5 8.5H14.5L12 2ZM9.5 8.5L6 15H18L14.5 8.5H9.5Z"/></svg>'), pointer;
        }
      `}</style>
    </div>
  )
}

