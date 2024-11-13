import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">&copy; 2024 Deloitte Consulting GmbH. Alle Rechte vorbehalten.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/teilnahmebedingungen" className="text-sm text-foreground hover:text-primary">Teilnahmebedingungen</Link></li>
              <li><Link href="/datenschutz" className="text-sm text-foreground hover:text-primary">Datenschutz</Link></li>
              <li><Link href="/impressum" className="text-sm text-foreground hover:text-primary">Impressum</Link></li>
            </ul>
          </nav>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>
            Deloitte refers to one or more of Deloitte Touche Tohmatsu Limited (DTTL), its global network of member firms, and their related entities (collectively, the "Deloitte organization"). DTTL (also referred to as "Deloitte Global") and each of its member firms and related entities are legally separate and independent entities, which cannot obligate or bind each other in respect of third parties. DTTL and each DTTL member firm and related entity is liable only for its own acts and omissions, and not those of each other. Please see <a href="https://www.deloitte.com/de/UeberUns" className="text-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">www.deloitte.com/de/UeberUns</a> to learn more.
          </p>
        </div>
      </div>
    </footer>
  )
}