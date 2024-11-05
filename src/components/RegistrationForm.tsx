'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { submitRegistration } from '@/app/actions'
import React from 'react'

interface RegistrationFormProps {
  score: number
  totalQuestions: number
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ score, totalQuestions }) => {
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
        Beeindruckend! Sie haben {score} von {totalQuestions} Punkten erreicht. Ihr Fachwissen im Bereich KI ist wirklich herausragend.
      </h3>
      <p className="mb-4">Nutzen Sie jetzt die Gelegenheit, sich für exklusive Preise zu qualifizieren:</p>
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
          <Label htmlFor="email">E-Mail-Adresse</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="consent" name="consent" required className="h-4 w-4 rounded border-gray-300" />
          <Label htmlFor="consent" className="text-sm">
            Ich stimme den Teilnahmebedingungen zu und verpflichte mich, mein KI-Wissen verantwortungsvoll einzusetzen
          </Label>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ihre Anmeldung wird verarbeitet...' : 'Jetzt für die exklusive Verlosung registrieren'}
        </Button>
      </form>
      {submitMessage && <p className="mt-4 text-sm text-green-600">{submitMessage}</p>}
    </div>
  )
}