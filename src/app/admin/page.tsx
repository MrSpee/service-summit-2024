import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import { logout } from '@/app/actions'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Service Summit 2024',
  description: 'Verwalten Sie Ihre KI-Flüsterer und potenziellen Tech-Milliardäre',
}

export default async function AdminPage() {
  const cookieStore = await cookies(); // Promise auflösen
  const authToken = cookieStore.get('auth_token')

  if (!authToken) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminDashboard />
      <form action={logout} className="p-4 bg-gray-100">
        <button type="submit" className="text-blue-600 hover:underline">
          Logout
        </button>
      </form>
    </div>
  )
}