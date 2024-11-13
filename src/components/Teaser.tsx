import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function Teaser() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl p-6 mt-8 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight text-center">
        Genervte Kunden? <br />Überarbeitete Mitarbeiter?
      </h2>
      <p className="text-sm sm:text-base mb-6 text-center">
        Wie Conversational AI Ihre Service-Probleme in Chancen verwandelt
      </p>
      <div className="flex justify-center">
        <Link href="/vortrag" passHref>
          <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300 text-sm sm:text-base py-2 px-4 rounded-full flex items-center justify-center">
            Mehr Infos
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}