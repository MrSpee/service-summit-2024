import { Metadata } from 'next'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Service Summit 2024',
  description: 'Verwalten Sie Ihre KI-Flüsterer und potenziellen Tech-Milliardäre',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard - Service Summit 2024</h1>
        <p>Willkommen im Kontrollzentrum der KI-Revolution!</p>
      </header>

      <main className="flex-grow">
        <AdminDashboard />
      </main>

      <footer className="bg-gray-100 text-center p-4">
        <p>&copy; 2024 Service Summit - Angetrieben von KI, Kaffee und den Träumen von Techies</p>
        <p>Denken Sie daran: Hinter jedem großartigen Admin steht eine noch großartigere KI!</p>
      </footer>
    </div>
  )
}