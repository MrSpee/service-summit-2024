'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getLeads, updateLeadAction } from '@/app/actions'
import { Lead } from '@/lib/kv-utils'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react'

// Adjustable timing constants (in milliseconds)
const CARD_REVEAL_DURATION = 10000; // Total duration for revealing all cards
const SHUFFLE_DURATION = 5000; // Duration for shuffle animation
const WINNER_REVEAL_INTERVAL = 3000; // Time between revealing each winner
const INITIAL_WAIT_PERIOD = 5000; // 5 seconds wait before first winner is drawn

// Music file paths
const CARD_REVEAL_MUSIC = '/card-reveal-music.mp3';
const RAFFLE_MUSIC = '/raffle-music.mp3';

const emojis = ['😎', '🦸', '🚀', '💡', '🔥', '⚡', '🌟', '🦾', '🧠', '🔮', '🤖', '💬', '🗨️', '📱', '💻', '🎙️', '🔊', '👾', '🤯', '🌈', '🎭', '🎮', '🕹️', '📡', '🛰️', '🔬', '🔭', '💎', '🔋', '🔌']

const kundendienstHelden = [
  'Superschnelle', 'Lösungs', 'Freundliche', 'Gedulds',
  'Hilfs', 'Erklärungs', 'Problemlöser', 'Zuhör',
  'Beratungs', 'Empathie', 'Telefon', 'Chat-Champion',
  'E-Mail-Experte', 'Kundenversteher', 'Servicewunder',
  'Beschwerdeflüsterer', 'Antwort-Ass', 'Feedback-Fee',
  'Qualitäts', 'Warteschlangen-Wunder', 'Ticket-Titan',
  'Support-Superstar', 'Prozess-Profi', 'Multitasking-Meister',
  'Eskalations-Experte', 'Kundenglück-Künstler', 'Lächel-Legende',
  'Wissensdatenbank-Wächter', 'Kundenzufriedenheits-Zauberer',
  'Servicekompetenz-König'
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
  const heroTerm = kundendienstHelden[index % kundendienstHelden.length]
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
        relative overflow-hidden text-2xl py-6 px-12 text-white font-bold rounded-full 
        transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        ${isWaiting ? 'animate-pulse' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'}
      `}
      style={{
        backgroundImage: isWaiting 
          ? 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)' 
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
  const [isMuted, setIsMuted] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
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

  const calculateWinningChance = useCallback((totalParticipants: number, numberOfPrizes: number = 6): string => {
    if (totalParticipants === 0) return '0%'
    const chance = (numberOfPrizes / totalParticipants) * 100
    return chance.toFixed(2) + '%'
  }, [])

  const playMusic = useCallback((musicFile: string) => {
    if (audioRef.current) {
      if (audioRef.current.src !== musicFile) {
        audioRef.current.src = musicFile
      }
      audioRef.current.currentTime = 0
      audioRef.current.loop = true
      audioRef.current.muted = isMuted
      audioRef.current.play().catch(error => console.error('Audio playback failed:', error))
      setIsMusicPlaying(true)
    }
  }, [isMuted])

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsMusicPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }, [isMuted])

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
    playMusic(CARD_REVEAL_MUSIC)
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
  }, [participants, playMusic, startVisualShuffle])

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
    playMusic(RAFFLE_MUSIC)
    const shuffledParticipants = shuffleArray([...participants])
    const selectedWinners = shuffledParticipants.slice(0, 6)
    
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
  }, [isRevealing, isShuffling, revealedCards, participants, revealCards, playMusic])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Deloitte & Cognigy - Conversational AI Quiz</h1>
          <h2 className="text-2xl mb-4">Verlosung der 6 Hauptgewinne unter {participantCount} Teilnehmer</h2>
          <p className="text-xl mb-8">Deine Gewinnchance ist: {calculateWinningChance(participantCount)}</p>
          
          {winners.length > 0 && (
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4">Unsere Gewinner</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {winners.map((winner, index) => (
                  <Card key={winner.id} className="p-4 w-64 h-64 flex flex-col justify-between border-4 border-yellow-400 animate-pulse">
                    <CardContent>
                      <p className="text-4xl mb-2">{emojis[index % emojis.length]}</p>
                      <p className="text-sm text-gray-600 mb-1">{kundendienstHelden[index % kundendienstHelden.length]}</p>
                      <p className="font-bold text-xl">{winner.firstName} {winner.lastName}</p>
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

          <div className="flex flex-col items-center space-y-4 mb-4">
            <AnimatedButton
              onClick={startRaffle}
              disabled={isRaffleInProgress || raffleComplete || participants.length < 6 || isRevealing || isShuffling}
              isWaiting={isWaiting}
            >
              {isRevealing ? 'Karten werden aufgedeckt...' :
               isShuffling ? 'Karten werden gemischt...' :
               isWaiting ? 'Spannung steigt...' :
               isRaffleInProgress ? 'Verlosung läuft...' : raffleComplete ? 'Verlosung abgeschlossen' :
               revealedCards.length === 0 ? 'Lose aufdecken' : 'Verlosung starten'}
            </AnimatedButton>
            <div className="flex space-x-4">
              <Button
                onClick={toggleMute}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center"
                aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
              >
                {isMuted ? <VolumeX className="mr-2" size={24} /> : <Volume2 className="mr-2" size={24} />}
                {isMuted ? "Ton ein" : "Ton aus"}
              </Button>
              <Button
                onClick={isMusicPlaying ? stopMusic : () => playMusic(RAFFLE_MUSIC)}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center"
                aria-label={isMusicPlaying ? "Musik stoppen" : "Musik abspielen"}
              >
                {isMusicPlaying ? <Music2 className="mr-2" size={24} /> : <Music className="mr-2" size={24} />}
                {isMusicPlaying ? "Musik stoppen" : "Musik spielen"}
              </Button>
            </div>
          </div>
          
          <AnimatePresence>
            <motion.div layout className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
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
      <audio ref={audioRef} />
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