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
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
              Deloitte & Cognigy präsentieren
              <br />
              das Conversational AI Quiz
              <br />
              <span className="text-xl sm:text-2xl font-semibold text-gray-700">
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
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8">
          <Image
            src="/deloitte-logo.png"
            alt="Deloitte Logo"
            width={120}
            height={40}
            className="object-contain w-32 sm:w-44 md:w-[180px]"
          />
          <Image
            src="/cognigy-logo.png"
            alt="Cognigy Logo"
            width={160}
            height={40}
            className="object-contain w-40 sm:w-56 md:w-[240px]"
          />
        </div>
        <Teaser />
      </main>
    </div>
  )
}