'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { submitRegistration } from '@/app/actions'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface RegistrationFormProps {
  score: number
  totalQuestions: number
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ score, totalQuestions }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedContact, setAcceptedContact] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email) {
      setEmailError('E-Mail-Adresse ist erforderlich')
    } else if (!regex.test(email)) {
      setEmailError('Ungültige E-Mail-Adresse')
    } else {
      setEmailError(null)
    }
  }

  useEffect(() => {
    if (email) {
      validateEmail(email)
    }
  }, [email])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    validateEmail(email)
    if (emailError) {
      return
    }
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append('quizScore', score.toString())
    const result = await submitRegistration(formData)

    setIsSubmitting(false)
    setConfirmationMessage(result.message)
  }

  const allCorrect = score === totalQuestions

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">🏆 Ergebnis 🏆</CardTitle>
        <CardDescription className="text-lg mt-2 text-center">Sie haben {score} von {totalQuestions} Fragen richtig beantwortet.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Herzlichen Glückwunsch!</h2>
          <p className="text-lg">Sie haben das Quiz erfolgreich abgeschlossen.</p>
        </div>
        <p className="mb-4 text-center">{allCorrect ? "🚀 Verpassen Sie nicht Ihre exklusive Chance! 🎁 Sichern Sie sich jetzt einen Platz in unserer Verlosung von spannenden Gadgets!" : "Leider haben Sie nicht alle Fragen richtig beantwortet. Keine Sorge, Rom wurde auch nicht an einem Tag erbaut! Versuchen Sie es erneut und werden Sie zum Conversational AI-Meister!"}</p>
        {allCorrect && !confirmationMessage && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Vorname</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nachname</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {emailError && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {emailError}
                  </div>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="contact" 
                  checked={acceptedContact} 
                  onCheckedChange={(checked) => setAcceptedContact(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="contact"
                  className="text-sm text-gray-600"
                >
                  Ich bin damit einverstanden, dass Deloitte mich einmalig per E-Mail bezüglich dieser Registrierung kontaktieren darf. Dies umfasst das Ergebnis der Verlosung sowie ein Update zur Conversational AI Zusammenarbeit von Deloitte & Cognigy.
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms} 
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  Ich akzeptiere die <Link href="/teilnahmebedingungen" className="text-blue-600 hover:underline font-semibold">Teilnahmebedingungen</Link> und <Link href="/datenschutz" className="text-blue-600 hover:underline font-semibold">Datenschutzbestimmungen</Link>
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting || !!emailError || !acceptedTerms || !acceptedContact}
              >
                {isSubmitting ? 'Wird verarbeitet...' : 'An der Verlosung teilnehmen'}
              </Button>
            </form>
          </div>
        )}
        {confirmationMessage && (
          <>
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-md" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{confirmationMessage}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-md" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Die Gewinner werden täglich um 15:45 Uhr am Deloitte Stand ausgelost. 
                    Wir werden alle Gewinner auch per E-Mail informieren. Wir drücken die Daumen!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Erfahren Sie mehr über unseren Vortrag: Conversational AI in 10 Minuten - und sichern Sie sich Ihren Platz!{' '}
                    <Link href="/vortrag" className="text-blue-600 hover:underline font-semibold">
                      Klicken Sie hier für Details und Termine
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {!allCorrect && (
          <Button onClick={() => window.location.reload()} className="w-full">
            Quiz erneut starten
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}