export function Header() {
  return (
    <header className="bg-christmas-red text-snow-white p-2 sm:p-3 shadow-md relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-christmas-pattern"></div>
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Deloitte Weihnachts-Quiz</h1>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className="text-christmas-gold font-semibold text-xs sm:text-sm">Frohe Festtage!</span>
          <svg className="w-16 h-8 sm:w-20 sm:h-10" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sleigh */}
            <path d="M70 35 Q75 25 80 35 L90 35 Q95 25 90 15 L70 15 Q65 25 70 35Z" fill="#8B4513" />
            <path d="M65 35 L95 35" stroke="#8B4513" strokeWidth="2" />
            
            {/* Reindeer */}
            <path d="M10 35 Q15 20 20 35 M15 27 L25 27" stroke="#8B4513" strokeWidth="2" />
            <circle cx="17" cy="22" r="2" fill="#8B4513" />
            <path d="M13 18 L15 14 M21 18 L19 14" stroke="#8B4513" strokeWidth="1" />
            
            {/* Reins */}
            <path d="M25 30 Q45 10 70 30" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>
    </header>
  )
}

