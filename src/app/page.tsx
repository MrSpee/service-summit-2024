'use client'

import { useState } from 'react'
import { Quiz } from '@/components/Quiz'
import { RegistrationForm } from '@/components/RegistrationForm'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const handleQuizComplete = (completedScore: number) => {
    setQuizCompleted(true)
    setScore(completedScore)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Deloitte & Cognigy<br />präsentieren das ultimative Conversational AI Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <Quiz onComplete={handleQuizComplete} />
            ) : (
              <RegistrationForm score={score} totalQuestions={5} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}