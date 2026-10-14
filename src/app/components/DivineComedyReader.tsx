import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Speaker, Music, Headphones, Volume2, BookOpen } from 'lucide-react';
import { ListeningMode } from './ListeningMode';

interface DivineComedyReaderProps {
  onBack: () => void;
}

export function DivineComedyReader({ onBack }: DivineComedyReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showListeningMode, setShowListeningMode] = useState(false);

  const italianText = [
    {
      verse: "Nel mezzo del cammin di nostra vita",
      isStart: true
    },
    { verse: "mi ritrovai per una selva oscura," },
    { verse: "ché la diritta via era smarrita." },
    { verse: "" },
    { verse: "Ahi quanto a dir qual era è cosa dura" },
    { verse: "esta selva selvaggia e aspra e forte" },
    { verse: "che nel pensier rinova la paura!" },
    { verse: "" },
    { verse: "Tant' è amara che poco è più morte;" },
    { verse: "ma per trattar del ben ch'i' vi trovai," },
    { verse: "dirò de l'altre cose ch'i' v'ho scorte." }
  ];

  const spanishText = [
    { verse: "En el medio del camino de nuestra vida" },
    { verse: "me encontré por una selva oscura," },
    { verse: "porque la recta vía era perdida." },
    { verse: "" },
    { verse: "¡Ay, cuánto decir cuál era es cosa dura" },
    { verse: "esta selva salvaje, áspera y fuerte," },
    { verse: "que en el pensamiento renueva el miedo!" },
    { verse: "" },
    { verse: "Tan amarga es que poco lo es más la muerte;" },
    { verse: "pero para tratar del bien que allí encontré," },
    { verse: "diré de las otras cosas que allí he visto." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#e8e0d5] relative overflow-hidden">
      {/* Top Identity Margin */}
      <header className="px-8 py-6 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer group">
          <BookOpen className="w-4 h-4 text-[#8B4513] group-hover:scale-110 transition-transform" />
          <span style={{
            fontFamily: 'Baskerville, "Libre Baskerville", "Playfair Display", Georgia, serif',
            color: '#2b2520',
            fontSize: '1.1rem',
            fontWeight: '700',
            letterSpacing: '0.02em'
          }}>
            Scrinium
          </span>
        </button>
        <div className="flex flex-col items-center opacity-40">
          <span className="font-serif text-[11px] uppercase tracking-[0.3em] font-bold">La Divina Commedia</span>
          <span className="font-serif italic text-[9px] tracking-[0.1em]">Inferno • Canto I</span>
        </div>
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      {/* Book Container */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 md:left-8 z-10 p-4 rounded-full hover:bg-black/5 transition-colors opacity-30 hover:opacity-100"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={1} />
        </button>
        
        <button 
          className="absolute right-4 md:right-8 z-10 p-4 rounded-full hover:bg-black/5 transition-colors opacity-30 hover:opacity-100"
          onClick={() => setCurrentPage(p => p + 1)}
        >
          <ChevronRight className="w-8 h-8" strokeWidth={1} />
        </button>

        <div className="flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[80vh] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden relative">
          {/* Central Fold Shadow */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-r from-transparent via-black/10 to-transparent z-10 pointer-events-none" />
          
          {/* Left Page (Italian) */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-start bg-[#fdfaf6] relative">
            <h3 className="font-serif text-[10px] uppercase tracking-widest opacity-30 mb-12 text-center md:text-left">Originale (Toscano)</h3>
            
            <div className="font-serif text-[#2b2520] leading-relaxed text-lg md:text-xl space-y-1">
              {italianText.map((line, i) => (
                <div key={i} className="flex items-baseline gap-1">
                  {line.isStart ? (
                    <div className="flex items-start">
                      <span className="drop-cap-medieval">N</span>
                      <span className="mt-2 ml-1">{line.verse.slice(1)}</span>
                    </div>
                  ) : (
                    <p className={line.verse === "" ? "h-6" : ""}>{line.verse}</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Page Number */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 font-serif text-[10px]">
              {currentPage * 2 - 1}
            </div>
          </div>

          {/* Right Page (Spanish) */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-start bg-[#fdfaf6]">
            <h3 className="font-serif text-[10px] uppercase tracking-widest opacity-30 mb-12 text-center md:text-left">Traducción al Español</h3>
            
            <div className="font-serif text-[#2b2520] leading-relaxed text-lg md:text-xl space-y-1 italic opacity-90">
              {spanishText.map((line, i) => (
                <p key={i} className={line.verse === "" ? "h-6" : ""}>{line.verse}</p>
              ))}
            </div>

            {/* Page Number */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-3/4 opacity-20 font-serif text-[10px]">
              {currentPage * 2}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Tools */}
      <footer className="h-32 flex items-center justify-center bg-gradient-to-t from-black/5 to-transparent px-8">
        <div className="relative group">
          {/* Pulse/Glow Effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[#8B4513]/20 rounded-full blur-xl"
          />
          
          <button
            onClick={() => setShowListeningMode(true)}
            className="relative z-10 flex flex-col items-center gap-2 group transition-all"
          >
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${isPlaying ? 'bg-[#8B4513] border-[#8B4513] text-white' : 'bg-[#FDF5E6] border-[#8B4513]/30 text-[#8B4513]'}`}
            >
              {/* Gramophone Icon Simulation */}
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/>
                  <path d="M11 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  <path d="M11 5v-3"/>
                  <path d="M11 2h4"/>
                  <path d="M18 12h3"/>
                  <path d="M18 12a3 3 0 0 0-3-3"/>
                  <path d="M21 12v3"/>
                </svg>
                {isPlaying && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-[#8B4513] rounded-full animate-pulse" />
                  </motion.div>
                )}
              </div>
            </div>
            <span className="font-serif text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">Escucha Activa</span>
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {showListeningMode && (
          <ListeningMode 
            onClose={() => setShowListeningMode(false)}
            title="La Divina Commedia"
            canto="Inferno • Canto I"
          />
        )}
      </AnimatePresence>

      <style>{`
        .drop-cap-medieval {
          font-family: 'MedievalSharp', 'Georgia', serif;
          font-size: 4.5rem;
          line-height: 1;
          float: left;
          margin-right: 0.2em;
          margin-top: -0.1em;
          color: #8B4513;
          background: linear-gradient(135deg, #8B4513 0%, #D4A574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 0px rgba(139, 69, 19, 0.1);
          position: relative;
        }
        .drop-cap-medieval::before {
          content: 'N';
          position: absolute;
          left: -2px;
          top: -2px;
          color: rgba(139, 69, 19, 0.05);
          -webkit-text-fill-color: initial;
          z-index: -1;
        }
        @media (max-width: 768px) {
          .drop-cap-medieval {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
}
