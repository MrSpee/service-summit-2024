import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
        </div>
      </nav>
      <AdminDashboard />
    </div>
  )
}

