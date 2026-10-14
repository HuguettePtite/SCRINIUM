import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, RotateCw, Headphones, Mic2, WifiOff } from 'lucide-react';

interface ListeningModeProps {
  onClose: () => void;
  title: string;
  canto: string;
}

export function ListeningMode({ onClose, title, canto }: ListeningModeProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [voiceType, setVoiceType] = useState<'dante' | 'narrative'>('dante');
  const [progress, setProgress] = useState(35);
  const [currentTercet, setCurrentTercet] = useState(0);

  // Mock auto-advance for the demo
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 0.5 : 0));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const tercets = [
    {
      it: "Nel mezzo del cammin di nostra vita\nmi ritrovai per una selva oscura,\nché la diritta via era smarrita.",
      es: "En el medio del camino de nuestra vida\nme encontré por una selva oscura,\nporque la recta vía era perdida."
    },
    {
      it: "Ahi quanto a dir qual era è cosa dura\nesta selva selvaggia e aspra e forte\nche nel pensier rinova la paura!",
      es: "¡Ay, cuánto decir cuál era es cosa dura\nesta selva salvaje, áspera y fuerte,\nque en el pensamiento renueva el miedo!"
    }
  ];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] flex flex-col bg-[#2b2520] text-[#e8e0d5]"
      style={{
        background: 'radial-gradient(circle at center, #3d342c 0%, #1a1613 100%)'
      }}
    >
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#A62C2B] flex items-center justify-center shadow-lg border border-white/10 relative">
             <div className="absolute inset-0 bg-black/20 rounded-full" />
             <span className="relative z-10 font-serif font-bold text-[10px] text-white/90 leading-tight text-center">OFF<br/>LINE</span>
          </div>
          <div>
            <h2 className="font-serif text-[10px] uppercase tracking-[0.2em] opacity-50">{title}</h2>
            <p className="font-serif italic text-xs tracking-wider">{canto}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 opacity-60" />
        </button>
      </header>

      {/* Synchronized Text Area */}
      <main className="flex-1 flex flex-col justify-center px-8 space-y-12">
        {/* Italian Original */}
        <div className="relative">
          <motion.div 
            layout
            className="p-6 rounded-lg relative overflow-hidden"
          >
            {/* Amber Highlight Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              className="absolute inset-0 bg-[#FFBF00] blur-xl"
            />
            <div className="relative z-10 space-y-2">
              <span className="block font-serif text-[9px] uppercase tracking-widest text-[#FFBF00] mb-4">Originale Toscano</span>
              {tercets[currentTercet].it.split('\n').map((line, i) => (
                <p key={i} className="font-serif text-xl md:text-2xl leading-relaxed text-white">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Spanish Translation */}
        <div className="relative">
          <motion.div 
            layout
            className="p-6 rounded-lg relative overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              className="absolute inset-0 bg-[#FFBF00] blur-xl"
            />
            <div className="relative z-10 space-y-2 opacity-80">
              <span className="block font-serif text-[9px] uppercase tracking-widest text-[#FFBF00]/60 mb-4">Traducción de Estudio</span>
              {tercets[currentTercet].es.split('\n').map((line, i) => (
                <p key={i} className="font-serif text-lg md:text-xl italic leading-relaxed text-[#e8e0d5]">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Voice Selection */}
      <div className="px-8 mb-8 flex justify-center gap-4">
        <button 
          onClick={() => setVoiceType('dante')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${voiceType === 'dante' ? 'bg-[#8B4513]/20 border-[#8B4513] text-[#FFBF00]' : 'border-white/10 text-white/40'}`}
        >
          <Headphones className="w-3 h-3" />
          <span className="font-serif text-[10px] uppercase font-bold tracking-widest">Voz de Dante</span>
        </button>
        <button 
          onClick={() => setVoiceType('narrative')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${voiceType === 'narrative' ? 'bg-[#8B4513]/20 border-[#8B4513] text-[#FFBF00]' : 'border-white/10 text-white/40'}`}
        >
          <Mic2 className="w-3 h-3" />
          <span className="font-serif text-[10px] uppercase font-bold tracking-widest">Voz Narrativa</span>
        </button>
      </div>

      {/* Progress Bar (Silk Thread) */}
      <div className="px-8 mb-12 relative h-6 group">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-[1px] bg-white/10" />
          <motion.div 
            className="absolute left-0 h-[2px] bg-[#A62C2B] shadow-[0_0_8px_rgba(166,44,43,0.5)]"
            style={{ width: `${progress}%` }}
          />
          {/* Silk Knot Seeker */}
          <motion.div 
            className="absolute h-3 w-3 bg-[#A62C2B] rounded-full shadow-lg border border-white/20"
            style={{ left: `${progress}%`, marginLeft: '-6px' }}
          >
             <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
          </motion.div>
        </div>
        <div className="absolute -bottom-2 w-full flex justify-between px-1">
           <span className="text-[9px] font-serif opacity-40">12:45</span>
           <span className="text-[9px] font-serif opacity-40">-28:12</span>
        </div>
      </div>

      {/* Massive Audio Controls (Etched Metal Style) */}
      <footer className="pb-16 px-8 flex items-center justify-around">
        <button 
          onClick={() => setProgress(Math.max(0, progress - 5))}
          className="etched-metal-btn w-16 h-16 flex items-center justify-center active:scale-95 transition-transform"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="etched-metal-btn w-24 h-24 flex items-center justify-center active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
        </button>

        <button 
          onClick={() => setProgress(Math.min(100, progress + 5))}
          className="etched-metal-btn w-16 h-16 flex items-center justify-center active:scale-95 transition-transform"
        >
          <RotateCw className="w-6 h-6" />
        </button>
      </footer>

      <style>{`
        .etched-metal-btn {
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a574 0%, #8b4513 50%, #5d4037 100%);
          color: #2b2520;
          box-shadow: 
            0 8px 16px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.4),
            inset 0 -2px 4px rgba(0,0,0,0.4);
          border: 1px solid rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }
        .etched-metal-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
        }
        .etched-metal-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.2;
          pointer-events: none;
        }
      `}</style>
    </motion.div>
  );
}
