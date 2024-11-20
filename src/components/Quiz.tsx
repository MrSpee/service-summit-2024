'use client'

import React from 'react'
import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from 'lucide-react'

const questions = [
  {
    topic: "Grundlagen",
    question: "Größter Vorteil von Conversational AI im Kundenservice?",
    options: [
      "Verringerung der Anrufhäufigkeit",
      "Automatisierung von Standardanfragen für komplexere Interaktionen",
      "Kundenbindung durch interaktive Unterhaltung",
      "Automatischer \"Bitte warten\"-Modus mit Musik"
    ],
    correctAnswer: 1,
    tip: "Denken Sie daran: KI ist wie ein fleißiger Praktikant, der nie Kaffee trinkt, nie müde wird und immer lächelt... auch montags um 8 Uhr!"
  },
  {
    topic: "Technologie",
    question: "Häufigste Technologie für Sprachverarbeitung in Conversational AI?",
    options: [
      "Machine Learning-Bildanalyse",
      "Natural Language Processing (NLP)",
      "Echtzeit-Datenvisualisierung",
      "Blockchain für Sprachmuster"
    ],
    correctAnswer: 1,
    tip: "Stellen Sie sich vor, Sie hätten einen Supercomputer, der Ihre Witze versteht... und trotzdem darüber lacht!"
  },
  {
    topic: "Anwendungen",
    question: "Wo verbessert Conversational AI die Kundenerfahrung am meisten?",
    options: [
      "Automatisierte Wettervorhersagen",
      "Effizientes Kundenservice-Management",
      "Erstellung von Finanzberichten",
      "Steuerung logistischer Prozesse"
    ],
    correctAnswer: 1,
    tip: "Denken Sie an den Bereich, wo Menschen am verzweifeltsten nach Hilfe suchen... nein, nicht beim Zusammenbauen von IKEA-Möbeln!"
  },
  {
    topic: "Implementierung",
    question: "Wichtigster Aspekt bei der Wahl eines Conversational AI-Partners?",
    options: [
      "Branchenreputation",
      "Anzahl der Zertifikate",
      "Verfügbarkeit für Schulungen",
      "Fähigkeit zu umfassenden End-to-End-Lösungen"
    ],
    correctAnswer: 3,
    tip: "Suchen Sie jemanden, der Ihr Projekt von A bis Z begleitet... nicht nur jemanden, der Ihnen beibringt, wie man 'Hallo Welt!' auf KI-isch sagt!"
  },
  {
    topic: "Agentic AI",
    question: "Was kann Cognigy's Agentic AI NICHT?",
    options: [
      "Selbstständiges Analysieren und Vorschlagen",
      "Autonome Entscheidungsfindung und Tool-Nutzung",
      "Kollaboration mit KI-Agenten und Menschen",
      "Servieren von hyperpersonalisiertem Kaffee"
    ],
    correctAnswer: 3,
    tip: "KI kann vieles, aber manche Dinge bleiben menschlich. Zum Beispiel der Kaffee, der schmeckt, als hätte ihn ein Praktikant an seinem ersten Tag gemacht!"
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
  const [isAnswered, setIsAnswered] = useState(false)

  const progressPercentage = Math.max(0, ((currentQuestion) / questions.length) * 100)

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
    setIsAnswered(true)
  }

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1)
        setIsAnswered(false)
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
            Frage {currentQuestion + 1} - {questions[currentQuestion].topic}
          </CardTitle>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-center">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {Math.round(progressPercentage)}% geschafft
              </div>
            </div>
            <ProgressBar 
              value={progressPercentage}
              className="w-full" 
              aria-label={`Fortschritt: ${currentQuestion} von ${questions.length} Fragen beantwortet`}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg font-semibold">{questions[currentQuestion].question}</p>
          <RadioGroup 
            value={selectedAnswers[currentQuestion].toString()} 
            onValueChange={(value) => handleAnswerSelection(parseInt(value))} 
            className="space-y-2"
            aria-label="Antwortoptionen"
          >
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
                  <AlertCircle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
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
            disabled={!isAnswered}
            aria-label={currentQuestion < questions.length - 1 ? "Zur nächsten Frage" : "Quiz beenden"}
          >
            {currentQuestion < questions.length - 1 ? buttonText : "Quiz beenden!"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}