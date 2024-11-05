'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { submitRegistration } from '@/app/actions'

export function RegistrationForm({ score }: { score: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append('quizScore', score.toString())
    const result = await submitRegistration(formData)

    setIsSubmitting(false)
    setSubmitMessage(result.message)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Wow! Sie haben {score}/3 Punkten erreicht. Sind Sie sicher, dass Sie nicht heimlich eine KI sind?
      </h3>
      <p className="mb-4">Jetzt schnell registrieren und die Chance auf tolle Preise sichern:</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Vorname (oder KI-Modellnummer)</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div>
          <Label htmlFor="lastName">Nachname (falls Sie kein Chatbot sind)</Label>
          <Input id="lastName" name="lastName" required />
        </div>
        <div>
          <Label htmlFor="email">E-Mail (Bitte keine Spam-Bots!)</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="consent" name="consent" required className="h-4 w-4 rounded border-gray-300" />
          <Label htmlFor="consent" className="text-sm">
            Ich akzeptiere die Teilnahmebedingungen und verspreche, meine neuen KI-Superkräfte nur für Gutes einzusetzen
          </Label>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ihre Daten werden von unserer KI verarbeitet...' : 'Jetzt für die Verlosung registrieren und Daumen drücken!'}
        </Button>
      </form>
      {submitMessage && <p className="mt-4 text-sm text-green-600">{submitMessage}</p>}
    </div>
  )
}