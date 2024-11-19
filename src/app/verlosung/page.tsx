'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getLeads, updateLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

// Adjustable timing constants (in milliseconds)
const CARD_REVEAL_DURATION = 10000; // Total duration for revealing all cards
const WINNER_REVEAL_INTERVAL = 2000; // Time between revealing each winner

const emojis = ['😎', '🦸', '🚀', '💡', '🔥', '⚡', '🌟', '🦾', '🧠', '🔮', '🤖', '💬', '🗨️', '📱', '💻', '🎙️', '🔊', '👾', '🤯', '🌈', '🎭', '🎮', '🕹️', '📡', '🛰️', '🔬', '🔭', '💎', '🔋', '🔌']

const superheroNames = [
  'Captain Chatbot', 'Wonder AI', 'Iron Logic', 'The Incredible Code', 'Spider-Network',
  'Black Bandwidth', 'Thor Thunderscript', 'Doctor Strange Query', 'Ant-Algorithm',
  'Scarlet Syntax', 'Vision Voice', 'Hulk Heuristic', 'Falcon Function', 'Winter Webhook',
  'Star-Lord String', 'Gamora GPU', 'Drax Data', 'Rocket RAM', 'Groot Graph',
  'Wasp Widget', 'Hawkeye Hash', 'Black Panther Processor', 'Captain Compiler',
  'Bucky Buffer', 'Loki Loop', 'Nebula Neural Net', 'Mantis Machine Learning',
  'Valkyrie Variable', 'Okoye Object', 'Shuri Shader'
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const ParticipantCard: React.FC<{ participant: Lead, isRevealed: boolean, index: number }> = ({ participant, isRevealed, index }) => {
  return (
    <div className="card-container">
      <motion.div
        className="card-inner"
        initial={false}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Card className="card-face card-back bg-gradient-to-b from-black to-blue-600">
          <CardContent className="flex items-center justify-center h-full">
            <div className="rounded-full bg-white p-2">
              <img src="/Bot_Cartoon.png" alt="Bot Cartoon" className="w-16 h-16" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-face card-front">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-3xl mb-2">{emojis[index % emojis.length]}</p>
            <p className="font-bold text-lg mb-1">{participant.firstName}</p>
            <p className="text-xs text-gray-600">{superheroNames[index % superheroNames.length]}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function RafflePage() {
  const [participants, setParticipants] = useState<Lead[]>([])
  const [winners, setWinners] = useState<Lead[]>([])
  const [isRaffleInProgress, setIsRaffleInProgress] = useState(false)
  const [raffleComplete, setRaffleComplete] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [revealedCards, setRevealedCards] = useState<string[]>([])
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    const fetchParticipants = async () => {
      const leads = await getLeads()
      const validLeads = leads.filter(lead => lead.inDraw && lead.firstName)
      setParticipants(validLeads)
      setParticipantCount(validLeads.length)
    }
    fetchParticipants()
  }, [])

  const calculateWinningChance = useCallback((totalParticipants: number, numberOfPrizes: number = 3): string => {
    if (totalParticipants === 0) return '0%'
    const chance = (numberOfPrizes / totalParticipants) * 100
    return chance.toFixed(2) + '%'
  }, [])

  const revealCards = useCallback(() => {
    setIsRevealing(true)
    const shuffledParticipants = shuffleArray([...participants])
    const intervalDuration = CARD_REVEAL_DURATION / shuffledParticipants.length

    shuffledParticipants.forEach((participant, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, participant.id])
        if (index === shuffledParticipants.length - 1) {
          setIsRevealing(false)
        }
      }, index * intervalDuration)
    })
  }, [participants])

  const startRaffle = useCallback(() => {
    if (isRevealing) return
    if (revealedCards.length === 0) {
      revealCards()
      return
    }

    setIsRaffleInProgress(true)
    const shuffledParticipants = shuffleArray([...participants])
    const selectedWinners = shuffledParticipants.slice(0, 3)
    
    const revealWinners = async (index: number) => {
      if (index < selectedWinners.length) {
        const winner = selectedWinners[index]
        setTimeout(async () => {
          setWinners(prev => [...prev, winner])
          setParticipants(prev => prev.filter(p => p.id !== winner.id))
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
          await updateLeadAction(winner.id, { isWinner: true })
          revealWinners(index + 1)
        }, WINNER_REVEAL_INTERVAL)
      } else {
        setIsRaffleInProgress(false)
        setRaffleComplete(true)
      }
    }

    revealWinners(0)
  }, [isRevealing, revealedCards, participants, revealCards])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Deloitte & Cognigy - Conversational AI Quiz</h1>
          <h2 className="text-2xl mb-4">Verlosung der 3 Hauptgewinne unter {participantCount} Teilnehmer</h2>
          <p className="text-xl mb-8">Deine Gewinnchance ist: {calculateWinningChance(participantCount)}</p>
          
          {winners.length > 0 && (
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4">Unsere Gewinner</h3>
              <div className="flex justify-center space-x-4">
                {winners.map((winner, index) => (
                  <Card key={winner.id} className="p-4 w-64 h-64 flex flex-col justify-between border-4 border-yellow-400 animate-pulse">
                    <CardContent>
                      <p className="text-4xl mb-2">{emojis[index % emojis.length]}</p>
                      <p className="font-bold text-xl">{winner.firstName} {winner.lastName}</p>
                      <p className="text-sm text-gray-600">{superheroNames[index % superheroNames.length]}</p>
                      <p className="text-lg text-yellow-600 mt-2">Gewinner {index + 1}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {raffleComplete && (
            <section className="mb-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Herzlichen Glückwunsch!</h3>
              <p className="text-xl">Bitte holt eure Gewinne am Deloitte Stand ab.</p>
            </section>
          )}

          <Button 
            onClick={startRaffle} 
            disabled={isRaffleInProgress || raffleComplete || participants.length < 3}
            className="text-2xl py-6 px-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 mb-4"
          >
            {isRevealing ? 'Karten werden aufgedeckt...' :
             isRaffleInProgress ? 'Verlosung läuft...' : 
             raffleComplete ? 'Verlosung abgeschlossen' : 
             revealedCards.length === 0 ? 'Lose aufdecken' : 'Verlosung starten'}
          </Button>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {participants.map((participant, index) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                isRevealed={revealedCards.includes(participant.id)}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
      <style jsx global>{`
        .card-container {
          width: 120px;
          height: 160px;
          perspective: 1000px;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-back {
          color: white;
        }
        .card-front {
          background-color: white;
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}