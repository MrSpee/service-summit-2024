"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { submitRegistration } from '@/app/actions'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

const questions = [
  {
    topic: "Grundlagen",
    question: "Was ist der Hauptunterschied zwischen einem Chatbot und einem Conversational AI-System?",
    options: [
      "Chatbots können nur vorprogrammierte Antworten geben, während Conversational AI lernen und sich anpassen kann.",
      "Conversational AI ist immer offline, Chatbots sind immer online.",
      "Chatbots verstehen komplexe Kontexte besser als Conversational AI.",
      "Es gibt keinen Unterschied, die Begriffe sind austauschbar."
    ],
    correctAnswer: 0,
    tip: "Denken Sie darüber nach, welches System flexibler auf unerwartete Eingaben reagieren kann."
  },
  {
    topic: "Technologie",
    question: "Welche Technologie bildet die Grundlage für die meisten modernen Conversational AI-Systeme?",
    options: [
      "Regelbasierte Systeme",
      "Neuronale Netze und Deep Learning",
      "Einfache if-then Statements",
      "Quantencomputer"
    ],
    correctAnswer: 1,
    tip: "Überlegen Sie, welche Technologie am besten mit großen Datenmengen und komplexen Mustern umgehen kann."
  },
  {
    topic: "Anwendungen",
    question: "Was ist NICHT typischerweise eine Anwendung von Conversational AI?",
    options: [
      "Kundenservice-Chatbots",
      "Virtuelle persönliche Assistenten",
      "Automatische Übersetzungsdienste",
      "Kaffeemaschinen programmieren"
    ],
    correctAnswer: 3,
    tip: "Denken Sie darüber nach, welche Option am wenigsten mit Sprache und Kommunikation zu tun hat."
  },
  {
    topic: "Herausforderungen",
    question: "Welche Herausforderung stellt sich NICHT typischerweise bei der Entwicklung von Conversational AI?",
    options: [
      "Verständnis von Kontext und Nuancen",
      "Umgang mit verschiedenen Sprachen und Dialekten",
      "Sicherstellung der Datenschutzkonformität",
      "Optimierung der Kaffeequalität"
    ],
    correctAnswer: 3,
    tip: "Konzentrieren Sie sich auf die Aspekte, die direkt mit der Verarbeitung und dem Verständnis von Sprache zusammenhängen."
  },
  {
    topic: "Integration",
    question: "Welcher Aspekt ist am wichtigsten für eine erfolgreiche Integration von Conversational AI in Unternehmen?",
    options: [
      "Die AI muss Witze erzählen können",
      "Nahtlose Integration in bestehende Systeme und Prozesse",
      "Die AI muss eine menschliche Stimme imitieren können",
      "Möglichst viele Emojis in den Antworten"
    ],
    correctAnswer: 1,
    tip: "Überlegen Sie, was für Unternehmen am wertvollsten ist: Effizienz oder Unterhaltung?"
  }
]

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleAnswerSelection = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
    setShowTip(false)
  }

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResults(true)
      }
    } else {
      setShowTip(true)
    }
  }

  const allCorrect = selectedAnswers.every((answer, index) => answer === questions[index].correctAnswer)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (allCorrect && acceptedTerms) {
      const formData = new FormData(event.currentTarget)
      formData.append('quizScore', selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length.toString())
      const result = await submitRegistration(formData)
      setConfirmationMessage(result.message)
    } else if (!acceptedTerms) {
      setConfirmationMessage("Bitte akzeptieren Sie die Teilnahmebedingungen und Datenschutzbestimmungen.")
    } else {
      setConfirmationMessage("Bitte beantworten Sie alle Fragen korrekt, um an der Verlosung teilzunehmen.")
    }
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🏆 Ergebnis 🏆</CardTitle>
          <CardDescription className="text-lg mt-2 text-center">Sie haben {selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} von {questions.length} Fragen richtig beantwortet.</CardDescription>
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
                <input type="text" id="firstName" name="firstName" required className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md" />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname</Label>
                <input type="text" id="lastName" name="lastName" required className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md" />
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <input type="email" id="email" name="email" required className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md" />
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
              <Button type="submit" className="w-full">An der Verlosung teilnehmen</Button>
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
                      Wir werden alle Gewinner auch per E-Mail informieren. Mögen die Algorithmen mit Ihnen sein!
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {!allCorrect && (
            <Button onClick={() => {setCurrentQuestion(0); setSelectedAnswers(new Array(questions.length).fill(-1)); setShowResults(false); setConfirmationMessage(null);}} className="w-full">
              Quiz erneut starten
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{questions[currentQuestion].topic}</CardTitle>
        <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
        <h2 className="text-lg font-semibold mt-2">Frage {currentQuestion + 1}</h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">{questions[currentQuestion].question}</p>
        <RadioGroup value={selectedAnswers[currentQuestion].toString()} onValueChange={(value) => handleAnswerSelection(parseInt(value))} className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
        {showTip && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{questions[currentQuestion].tip}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion} className="w-full">
          {currentQuestion < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
        </Button>
      </CardFooter>
    </Card>
  )
}