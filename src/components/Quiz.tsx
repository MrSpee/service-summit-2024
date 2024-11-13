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
      "Mehr Kaffeepausen für das Team, weil die Kunden seltener anrufen.",
      "Automatisierung von Routineanfragen, wodurch die Mitarbeiter Zeit für komplexere Anliegen haben.",
      "Das System erzählt lustige Witze, um die Kunden zu unterhalten.",
      "Der Server singt beim Starten die Unternehmenshymne."
    ],
    correctAnswer: 1,
    tip: "Denken Sie darüber nach, wie Conversational AI die Effizienz im Kundenservice steigern kann."
  },
  {
    topic: "Technologie",
    question: "Welche Technologie ist ein wesentlicher Bestandteil von Conversational AI, um Kundenanfragen zu verstehen?",
    options: [
      "Augmented Reality, damit der Computer bunte Bilder malt.",
      "Natürliche Sprachverarbeitung (NLP), um menschliche Sprache zu analysieren und zu interpretieren.",
      "Virtuelle Realität, damit Kundenservice-Avatare in 3D erscheinen.",
      "Eine Glaskugel, die die Absichten der Kunden vorhersieht."
    ],
    correctAnswer: 1,
    tip: "Überlegen Sie, welche Technologie es einem Computer ermöglicht, menschliche Sprache zu verstehen und darauf zu reagieren."
  },
  {
    topic: "Anwendungen",
    question: "In welchem dieser Bereiche wird Conversational AI häufig eingesetzt?",
    options: [
      "Zur Vorhersage der nächsten Börsenkrise.",
      "Im Kundenservice zur Automatisierung von Anfragen und Verbesserung des Kundenerlebnisses.",
      "Beim Haareschneiden in virtuellen Friseursalons.",
      "Als musikalische Begleitung bei Teambuilding-Workshops."
    ],
    correctAnswer: 1,
    tip: "Denken Sie an den Bereich, in dem die Interaktion mit Kunden besonders wichtig ist."
  },
  {
    topic: "Implementierung",
    question: "Worauf sollte man bei der Implementierung eines Conversational AI-Projekts besonders achten?",
    options: [
      "Dass das System lustige Emojis senden kann.",
      "Auf die Wahl des richtigen Snacks für das Kick-off-Meeting.",
      "Auf die Wahl eines erfahrenen Partners, damit das Projekt effizient umgesetzt und das volle Potenzial von Conversational AI ausgeschöpft wird.",
      "Dass das System hin und wieder eine Motivationsrede hält."
    ],
    correctAnswer: 2,
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