'use client'

import { useState } from 'react'
import { Quiz } from './Quiz'
import { RegistrationForm } from './RegistrationForm'

export default function LandingPage() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Service Summit 2024</h1>
        <h2 className="text-xl text-center mb-8">Das ultimative Conversational AI Quiz</h2>
        
        {!quizCompleted ? (
          <Quiz onComplete={(score) => {
            setQuizCompleted(true)
            setScore(score)
          }} />
        ) : (
          <RegistrationForm score={score} />
        )}
      </main>
    </div>
  )
}