import { Metadata } from 'next'
import LandingPage from '../components/LandingPage'

export const metadata: Metadata = {
  title: 'Service Summit 2024 - Conversational AI Quiz',
  description: 'Participate in our Conversational AI quiz and win exciting prizes at Service Summit 2024 in Hamburg!',
}

export default function Home() {
  return <LandingPage />
}