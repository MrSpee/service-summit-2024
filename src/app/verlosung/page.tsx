'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getLeads, updateLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

const emojis = ['😎', '🦸', '🚀', '💡', '🔥', '⚡', '🌟', '🦾', '🧠', '🔮']
const superheroNames = [
  'Captain Awesome', 'Wonder Whiz', 'Mega Mind', 'Sonic Boom', 'Pixel Ninja',
  'Data Dynamo', 'Code Crusher', 'Logic Laser', 'Quantum Quasar', 'Cyber Sentinel'
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function RafflePage() {
  const [participants, setParticipants] = useState<Lead[]>([])
  const [winners, setWinners] = useState<Lead[]>([])
  const [isRaffleInProgress, setIsRaffleInProgress] = useState(false)
  const [raffleComplete, setRaffleComplete] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)

  useEffect(() => {
    const fetchParticipants = async () => {
      const leads = await getLeads()
      const validLeads = leads.filter(lead => lead.inDraw && lead.firstName)
      setParticipants(validLeads)
      setParticipantCount(validLeads.length)
    }
    fetchParticipants()
  }, [])

  const startRaffle = () => {
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
          // Update the winner status in the database
          await updateLeadAction(winner.id, { isWinner: true })
          revealWinners(index + 1)
        }, 2000)
      } else {
        setIsRaffleInProgress(false)
        setRaffleComplete(true)
      }
    }

    revealWinners(0)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Deloitte & Cognigy - Conversational AI Quiz</h1>
          <h2 className="text-2xl mb-8">Verlosung unter {participantCount} Teilnehmer</h2>
          
          {winners.length > 0 && (
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4">Unsere Gewinner</h3>
              <div className="flex justify-center space-x-4">
                {winners.map((winner, index) => (
                  <motion.div
                    key={winner.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-lg shadow-lg text-center w-64 h-64 flex flex-col justify-between border-4 border-yellow-400 animate-pulse"
                  >
                    <p className="text-4xl mb-2">{emojis[index % emojis.length]}</p>
                    <div>
                      <p className="font-bold text-xl">{winner.firstName}</p>
                      <p className="font-bold text-lg">{winner.lastName}</p>
                    </div>
                    <p className="text-sm text-gray-600">{superheroNames[index % superheroNames.length]}</p>
                    <p className="text-lg text-yellow-600 mt-2">Gewinner {index + 1}</p>
                  </motion.div>
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
            {isRaffleInProgress ? 'Verlosung läuft...' : 
             raffleComplete ? 'Verlosung abgeschlossen' : 'Verlosung starten'}
          </Button>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
            <AnimatePresence>
              {participants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  exit={{ scale: 0, opacity: 0 }}
                  layout
                  className="bg-white p-2 rounded-lg shadow-lg text-center aspect-[3/4] flex flex-col justify-between"
                >
                  <p className="text-2xl">{emojis[index % emojis.length]}</p>
                  <p className="font-bold text-xs">{participant.firstName}</p>
                  <p className="text-xs text-gray-600">{superheroNames[index % superheroNames.length]}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}