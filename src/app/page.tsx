'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Quiz } from '@/components/Quiz'
import { RegistrationForm } from '@/components/RegistrationForm'
import Teaser from '@/components/Teaser'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

export default function LandingPage() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleQuizComplete = (completedScore: number) => {
    setQuizCompleted(true)
    setScore(completedScore)
  }

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal)
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
            </CardTitle>
            <p className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mt-2">
              Testen Sie Ihr Wissen und
              <br />
              gewinnen Sie{' '}
              <span 
                className="text-blue-600 underline cursor-pointer" 
                onClick={toggleInfoModal}
                onKeyPress={(e) => e.key === 'Enter' && toggleInfoModal()}
                tabIndex={0}
                role="button"
                aria-label="Mehr Informationen zu den Preisen"
              >
                tolle Preise
              </span>
              !
            </p>
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
            width={180}
            height={60}
            className="object-contain w-32 sm:w-44 md:w-[180px]"
          />
          <Image
            src="/cognigy-logo.png"
            alt="Cognigy Logo"
            width={240}
            height={60}
            className="object-contain w-40 sm:w-56 md:w-[240px]"
          />
        </div>
        <Teaser />
      </main>

      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Informationen zur Verlosung</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleInfoModal}
                aria-label="Schließen"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p>Die Verlosung der wertvollen Preise findet täglich um 15:45 Uhr am Deloitte Stand statt.</p>
          </div>
        </div>
      )}
    </div>
  )
}