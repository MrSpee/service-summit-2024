'use client'

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

interface QuizProps {
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [showTip, setShowTip] = useState(false)

  const buttonText = useMemo(() => {
    const phrases = [
      "Weiter geht's!",
      "Nächste Runde!",
      "Auf zur nächsten Frage!",
      "Zeig's uns!",
      "Auf zum Gipfel!",
      "Keine Bremsen!",
      "Nächster Schritt!"
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

  const progressStyle: React.CSSProperties = {
    backgroundColor: 'rgba(59, 130, 246, 0.5)', // Light blue background
    '--tw-progress-fill': 'rgb(0, 99, 155)' // Maritime blue fill
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Frage {currentQuestion + 1} ({questions[currentQuestion].topic})
        </CardTitle>
        <Progress 
          value={(currentQuestion / questions.length) * 100} 
          className="w-full" 
          style={progressStyle} 
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
  )
}