import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">&copy; 2024 Service Summit. Alle Rechte vorbehalten.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/teilnahmebedingungen" className="text-sm text-foreground hover:text-primary">Teilnahmebedingungen</Link></li>
              <li><Link href="/datenschutz" className="text-sm text-foreground hover:text-primary">Datenschutz</Link></li>
              <li><Link href="/impressum" className="text-sm text-foreground hover:text-primary">Impressum</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}