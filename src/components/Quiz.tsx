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
    question: "Was ist einer der größten Vorteile von Conversational AI im Kundenservice?",
    options: [
      "Verringerung der Anrufhäufigkeit, wodurch Teams entlastet werden.",
      "Automatisierung von Standardanfragen, wodurch Mitarbeiter mehr Zeit für wertschöpfende und komplexe Kundeninteraktionen haben.",
      "Erhöhung der Kundenbindung durch interaktive und spielerische Unterhaltung.",
      "Automatisches Einschalten des \"Bitte warten\"-Modus mit stilvoller Musik."
    ],
    correctAnswer: 1,
    tip: "Denken Sie darüber nach, wie Conversational AI die Effizienz im Kundenservice steigern kann."
  },
  {
    topic: "Technologie",
    question: "Welche der folgenden Technologien wird am häufigsten genutzt, um die Sprachverarbeitung in Conversational AI zu ermöglichen?",
    options: [
      "Machine Learning-basierte Bildanalyse",
      "Natural Language Processing (NLP) zur Analyse und Interpretation menschlicher Sprache",
      "Erweiterte Echtzeit-Datenvisualisierung",
      "Blockchain zur Verifizierung von Sprachmustern"
    ],
    correctAnswer: 1,
    tip: "Überlegen Sie, welche Technologie es einem Computer ermöglicht, menschliche Sprache zu verstehen und darauf zu reagieren."
  },
  {
    topic: "Anwendungen",
    question: "In welchem dieser Bereiche kann Conversational AI die Kundenerfahrung besonders verbessern?",
    options: [
      "Automatisierte Wettervorhersagen für spezielle Zielgruppen",
      "Effizientes Kundenservice-Management für Versicherungen, mit optimierten Antwortzeiten und erhöhter Kundenzufriedenheit",
      "Unterstützung bei der Erstellung von Finanzberichten für multinationale Konzerne",
      "Analyse und Steuerung von logistischen Prozessen im Supply Chain Management"
    ],
    correctAnswer: 1,
    tip: "Denken Sie an den Bereich, in dem die Interaktion mit Kunden besonders wichtig ist."
  },
  {
    topic: "Implementierung",
    question: "Welcher Aspekt ist entscheidend, um einen Implementierungspartner für Conversational AI erfolgreich auszuwählen?",
    options: [
      "Die Reputation des Partners in der Branche",
      "Die Fähigkeit des Partners, umfassende End-to-End-Lösungen zu bieten – von der strategischen Beratung bis hin zur erfolgreichen Umsetzung",
      "Die Anzahl der Zertifikate des Partners in verwandten Technologien",
      "Die Verfügbarkeit des Partners für kurzfristige technische Schulungen"
    ],
    correctAnswer: 1,
    tip: "Überlegen Sie, was für den langfristigen Erfolg und die effektive Umsetzung eines Conversational AI-Projekts am wichtigsten ist."
  },
  {
    topic: "Agentic AI",
    question: "Was kann die neue Generation der AI Bots namens Agentic AI von Cognigy NICHT?",
    options: [
      "Menschenähnliches Denkvermögen: Selbstständiges Analysieren von Anfragen und Vorschlagen der besten Vorgehensweise.",
      "Autonome Entscheidungsfindung: Dynamische Navigation und Nutzung von Tools zur erfolgreichen Erledigung von Aufgaben.",
      "Kollaborative KI: KI-Agenten können sich mit anderen KI-Agenten und Menschen beraten, um die effizientesten und genauesten Lösungen zu finden.",
      "Servieren deines hyperpersonalisierten Kaffees, z.B. dein koffeinfreier Kaffee mit Hafermilch"
    ],
    correctAnswer: 3,
    tip: "Überlegen Sie, welche Fähigkeiten realistisch für eine KI-basierte Workforce sind und welche eher in den Bereich der Science-Fiction gehören."
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
            Frage {currentQuestion + 1} - {questions[currentQuestion].topic}
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
    </div>
  )
}