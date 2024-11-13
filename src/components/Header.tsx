import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 border-b">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-4">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-white rounded-full p-1"
          >
            <rect x="5" y="5" width="40" height="40" rx="20" fill="#4A90E2" />
            <rect x="15" y="15" width="8" height="8" rx="2" fill="white" />
            <rect x="27" y="15" width="8" height="8" rx="2" fill="white" />
            <path d="M15 30H35" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 35H30" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="19" cy="19" r="2" fill="#4A90E2" />
            <circle cx="31" cy="19" r="2" fill="#4A90E2" />
          </svg>
          <div className="text-white">
            <h1 className="text-2xl font-bold">Service Summit 2024 Hamburg</h1>
            <p className="text-sm mt-1">Conversational AI | Mehr als nur Antworten – schaffen Sie Verbindungen, die sich auszahlen</p>
          </div>
        </Link>
      </div>
    </header>
  )
}