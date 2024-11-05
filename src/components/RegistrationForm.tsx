'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { submitRegistration } from '@/app/actions'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

interface RegistrationFormProps {
  score: number
  totalQuestions: number
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ score, totalQuestions }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
        <p className="mb-4">{allCorrect ? "Nutzen Sie jetzt die Chance, an unserer exklusiven Verlosung teilzunehmen und spannende Gadgets zu gewinnen!" : "Leider haben Sie nicht alle Fragen richtig beantwortet. Keine Sorge, Rom wurde auch nicht an einem Tag erbaut! Versuchen Sie es erneut und werden Sie zum Conversational AI-Meister!"}</p>
        {allCorrect && !confirmationMessage && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">Vorname</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div>
              <Label htmlFor="lastName">Nachname</Label>
              <Input id="lastName" name="lastName" required />
            </div>
            <div>
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ich akzeptiere die <Link href="/teilnahmebedingungen" className="text-primary hover:underline font-semibold">Teilnahmebedingungen</Link> und <Link href="/datenschutz" className="text-primary hover:underline font-semibold">Datenschutzbestimmungen</Link>
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Wird verarbeitet...' : 'An der Verlosung teilnehmen'}
            </Button>
          </form>
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
                    Die Gewinner werden täglich am 20. und 21. November um 16:30 Uhr am Deloitte Stand ausgelost. 
                    Wir werden alle Gewinner auch per E-Mail informieren. Viel Glück!
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