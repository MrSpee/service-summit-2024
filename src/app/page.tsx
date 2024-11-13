'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Quiz } from '@/components/Quiz'
import { RegistrationForm } from '@/components/RegistrationForm'
import Teaser from '@/components/Teaser'
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
            <CardTitle className="text-3xl font-bold text-center text-blue-600">
              Deloitte & Cognigy präsentieren
              <br />
              das Conversational AI Quiz
              <br />
              <span className="text-2xl font-semibold text-gray-700">
                Testen Sie Ihr Wissen und
                <br />
                gewinnen Sie tolle Preise!
              </span>
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
        <div className="flex justify-center items-center space-x-8 mt-8">
          <Image
            src="/deloitte-logo.png"
            alt="Deloitte Logo"
            width={180}
            height={60}
            className="object-contain"
          />
          <Image
            src="/cognigy-logo.png"
            alt="Cognigy Logo"
            width={240}
            height={60}
            className="object-contain"
          />
        </div>
        <Teaser />
      </main>
    </div>
  )
}