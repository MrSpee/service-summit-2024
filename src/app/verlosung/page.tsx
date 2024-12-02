'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getLeads, updateLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

// Adjustable timing constants (in milliseconds)
const CARD_REVEAL_DURATION = 1000; // Total duration for revealing all cards
const SHUFFLE_DURATION = 5000; // Duration for shuffle animation
const WINNER_REVEAL_INTERVAL = 1000; // Time between revealing each winner
const INITIAL_WAIT_PERIOD = 5000; // 5 seconds wait before first winner is drawn

const christmasEmojis = ['🎅', '🎄', '🎁', '⛄', '❄️', '🦌', '🔔', '🕯️', '🍪', '🥛', '🧦', '🎉', '🌟', '🍭', '🧣', '🧤', '☃️', '🏂', '🛷', '🎿']

const christmasHeroes = [
  'Weihnachtsmann', 'Rentier', 'Geschenke-Elf', 'Schnee-Engel',
  'Lebkuchen-Bäcker', 'Licht-Zauberer', 'Schlitten-Pilot', 'Wunschzettel-Leser',
  'Christbaum-Schmücker', 'Glühwein-Meister', 'Weihnachtslied-Sänger', 'Mistelzweig-Hänger',
  'Kerzen-Entzünder', 'Festtagsbraten-Koch', 'Geschenkpapier-Künstler', 'Adventskranz-Gestalter',
  'Schneemann-Bauer', 'Eiszapfen-Zähler', 'Weihnachtsmarkt-Organisator', 'Weihnachtsstern-Sucher'
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
  const heroTerm = christmasHeroes[index % christmasHeroes.length]
  return (
    <motion.div 
      className="card-container" 
      layout
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120
      }}
    >
      <motion.div
        className="card-inner"
        initial={false}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Card className="card-face card-back bg-gradient-to-b from-christmas-red to-christmas-green">
          <CardContent className="flex items-center justify-center h-full">
            <span className="text-4xl">🎄</span>
          </CardContent>
        </Card>
        <Card className="card-face card-front">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-3xl mb-2">{christmasEmojis[index % christmasEmojis.length]}</p>
            <p className="text-xs text-gray-600 mb-1">{heroTerm}</p>
            <p className="font-bold text-lg">{participant.firstName}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

const AnimatedButton: React.FC<{ 
  onClick: () => void, 
  disabled: boolean, 
  isWaiting: boolean, 
  children: React.ReactNode 
}> = ({ onClick, disabled, isWaiting, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden text-2xl py-6 px-12 text-snow-white font-bold rounded-full 
        transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        ${isWaiting ? 'animate-pulse' : 'bg-gradient-to-r from-christmas-red to-christmas-green hover:from-cranberry hover:to-pine-green'}
      `}
      style={{
        backgroundImage: isWaiting 
          ? 'linear-gradient(-45deg, #C41E3A, #165B33, #FFD700, #BB0A21)' 
          : undefined,
        backgroundSize: '400% 400%',
        animation: isWaiting ? 'gradient 15s ease infinite, pulse 2s infinite' : undefined
      }}
    >
      {children}
    </button>
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
  const [isShuffling, setIsShuffling] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchParticipants = async () => {
      const leads = await getLeads()
      const validLeads = leads.filter(lead => lead.inDraw && lead.firstName)
      setParticipants(shuffleArray(validLeads))
      setParticipantCount(validLeads.length)
    }
    fetchParticipants()
  }, [])

  const calculateWinningChance = useCallback((totalParticipants: number, numberOfPrizes: number = 3): string => {
    if (totalParticipants === 0) return '0%'
    const chance = (numberOfPrizes / totalParticipants) * 100
    return chance.toFixed(2) + '%'
  }, [])

  const startVisualShuffle = useCallback(() => {
    setIsShuffling(true)
    const shuffleStep = () => {
      setParticipants(prevParticipants => {
        const shuffled = [...prevParticipants]
        for (let i = 0; i < 2; i++) {
          const idx1 = Math.floor(Math.random() * shuffled.length)
          const idx2 = Math.floor(Math.random() * shuffled.length)
          const temp = shuffled[idx1]
          shuffled[idx1] = shuffled[idx2]
          shuffled[idx2] = temp
        }
        return shuffled
      })
    }

    shuffleIntervalRef.current = setInterval(shuffleStep, 500)

    setTimeout(() => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current)
      }
      setIsShuffling(false)
    }, SHUFFLE_DURATION)
  }, [])

  const revealCards = useCallback(() => {
    setIsRevealing(true)
    const intervalDuration = CARD_REVEAL_DURATION / participants.length

    participants.forEach((participant, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, participant.id])
        if (index === participants.length - 1) {
          setIsRevealing(false)
          startVisualShuffle()
        }
      }, index * intervalDuration)
    })
  }, [participants, startVisualShuffle])

  const startRaffle = useCallback(() => {
    if (isRevealing || isShuffling) {
      return
    }
    if (revealedCards.length === 0) {
      revealCards()
      return
    }

    setIsRaffleInProgress(true)
    setIsWaiting(true)
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

    setTimeout(() => {
      setIsWaiting(false)
      revealWinners(0)
    }, INITIAL_WAIT_PERIOD)
  }, [isRevealing, isShuffling, revealedCards, participants, revealCards])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-snow-white to-christmas-gold">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-christmas-red">Deloitte BDM Community - Weihnachts-Quiz</h1>
          <h2 className="text-2xl mb-4 text-pine-green">Verlosung der 3 Hauptgewinne unter {participantCount} Teilnehmern</h2>
          <p className="text-xl mb-8 text-cranberry">Deine Gewinnchance ist: {calculateWinningChance(participantCount)}</p>
          
          {winners.length > 0 && (
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 text-christmas-green">Unsere Gewinner</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center">
                {winners.map((winner, index) => (
                  <Card key={winner.id} className="p-4 w-64 h-64 flex flex-col justify-between border-4 border-christmas-gold animate-pulse">
                    <CardContent>
                      <p className="text-4xl mb-2">{christmasEmojis[index % christmasEmojis.length]}</p>
                      <p className="text-sm text-gray-600 mb-1">{christmasHeroes[index % christmasHeroes.length]}</p>
                      <p className="font-bold text-xl">{winner.firstName}</p>
                      <p className="text-lg text-christmas-red mt-2">Gewinner {index + 1}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {raffleComplete && (
            <section className="mb-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-christmas-green">Herzlichen Glückwunsch!</h3>
              <p className="text-xl text-pine-green">Bitte schreibt mir eure Adressen damit der Weihnachtsmann diese in sein Rentier-Navi eintragen kann!</p>
            </section>
          )}

          <div className="flex flex-col items-center space-y-4 mb-4">
            <AnimatedButton
              onClick={startRaffle}
              disabled={isRaffleInProgress || raffleComplete || participants.length < 3 || isRevealing || isShuffling}
              isWaiting={isWaiting}
            >
              {isRevealing ? 'Weihnachtskarten werden aufgedeckt...' :
               isShuffling ? 'Karten werden gemischt...' :
               isWaiting ? 'Weihnachtsspannung steigt...' :
               isRaffleInProgress ? 'Verlosung läuft...' : raffleComplete ? 'Verlosung abgeschlossen' :
               revealedCards.length === 0 ? 'Weihnachtskarten aufdecken' : 'Verlosung starten'}
            </AnimatedButton>
          </div>
          
          <AnimatePresence>
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
              {participants.map((participant, index) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  isRevealed={revealedCards.includes(participant.id)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
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
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

