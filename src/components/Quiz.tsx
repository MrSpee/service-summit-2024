'use client'

import React from 'react'
import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'

const questions = [
  {
    topic: "Grundlagen",
    question: "Wie hängen Conversational AI und Generative AI zusammen?",
    options: [
      "Zusammen ermöglichen sie völlig neue Kundendialoge - als würde man mit einem superintelligenten Papagei chatten, der auch noch kreativ ist!",
      "Sie haben so viel gemeinsam wie ein Toaster und ein Kühlschrank - beide sind elektrisch, das war's",
      "GenAI macht nur Bilder von Welpen, während C.AI nur über das Wetter reden kann",
      "Sie sind wie Öl und Wasser - wollen einfach nicht zusammenarbeiten"
    ],
    correctAnswer: 0,
    tip: "Denken Sie an moderne Plattformen wie Character.ai - wer hätte gedacht, dass KI so unterhaltsam sein kann?"
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
    question: "Welche dieser KI-Anwendungen klingt am unwahrscheinlichsten?",
    options: [
      "Ein KI-Therapeut, der Ihre Probleme mit Dad-Jokes löst",
      "Ein virtueller Reiseberater, der Ihnen Urlaubsziele vorschlägt",
      "Ein KI-Sprachlehrer, der 20 Sprachen gleichzeitig spricht",
      "Ein KI-Barista, der Ihren Kaffee telepathisch zubereitet"
    ],
    correctAnswer: 3,
    tip: "Auch wenn KI erstaunlich viel kann - Gedankenlesen und Kaffeekochen gehören (noch) nicht dazu!"
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

const ProgressBar = Progress

interface QuizProps {
  onComplete: (score: number) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [showTip, setShowTip] = useState(false)

  const buttonText = useMemo(() => {
    const phrases = [
      "Weiter geht's!",
      "Nächste Runde!",
      "Vorwärts, Genie!",
      "Zeig's uns!",
      "Auf zum Gipfel!",
      "Keine Bremsen!",
      "Volles Risiko!",
      "Nächster Streich!",
      "Volle Kraft!",
      "Zünde Stufe 2!"
    ];
    return phrases[currentQuestion % phrases.length];
  }, [currentQuestion]);

  const handleAnswerSelection = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
    setShowTip(false)
  }

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1)
      } else {
        const score = selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length
        onComplete(score)
      }
    } else {
      setShowTip(true)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Frage {currentQuestion + 1} ({questions[currentQuestion].topic})
          </CardTitle>
          <ProgressBar 
            value={(currentQuestion / questions.length) * 100} 
            className="w-full" 
          />
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg font-semibold">{questions[currentQuestion].question}</p>
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
          <Button 
            onClick={handleNextQuestion} 
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800"
          >
            {currentQuestion < questions.length - 1 ? buttonText : "Quiz beenden!"}
          </Button>
        </CardFooter>
      </Card>
      <div className="flex justify-center items-center space-x-8">
        <Image
          src="/deloitte-logo.png"
          alt="Deloitte Logo"
          width={150}
          height={50}
          className="object-contain"
        />
        <Image
          src="/cognigy-logo.png"
          alt="Cognigy Logo"
          width={200}
          height={50}
          className="object-contain"
        />
      </div>
    </div>
  )
}