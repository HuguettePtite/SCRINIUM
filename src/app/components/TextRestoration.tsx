import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Eraser, Sparkles, Save, History, MousePointer2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TextRestorationProps {
  onBack: () => void;
  onSave: (type: 'facsimile' | 'restored') => void;
}

export function TextRestoration({ onBack, onSave }: TextRestorationProps) {
  const [isErasing, setIsErasing] = useState(true);
  const [brushPos, setBrushPos] = useState({ x: 40, y: 50 });
  const mockImageUrl = "https://images.unsplash.com/photo-1614117055705-6f8506aaea11?q=80&w=1080";

  // Simulate brush movement for the "magic erasing" demo
  useEffect(() => {
    const interval = setInterval(() => {
      setBrushPos(prev => ({
        x: prev.x + (Math.random() - 0.5) * 5,
        y: prev.y + (Math.random() - 0.5) * 5
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--parchment)' }}>
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
        <button onClick={onBack} className="p-2" style={{ color: 'var(--ink-charcoal)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 style={{
          fontFamily: '"Old Standard TT", Georgia, serif',
          fontSize: '1.1rem',
          color: 'var(--ink-charcoal)',
          fontWeight: '600'
        }}>
          Restauración de Texto
        </h1>
        <div className="w-9" />
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 relative overflow-hidden bg-[#2b2520] flex items-center justify-center p-6">
        <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white">
          {/* Base Clean Image */}
          <ImageWithFallback
            src={mockImageUrl}
            alt="Cleaned text"
            className="w-full h-full object-cover grayscale opacity-100"
            style={{ filter: 'contrast(1.2) brightness(1.1)' }}
          />

          {/* Overlays for smudges/marginalia */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Simulated ink blot */}
            <motion.div 
              animate={{ opacity: isErasing ? 0.1 : 0.8 }}
              transition={{ duration: 2 }}
              className="absolute top-1/3 left-1/4 w-32 h-20 bg-[#2b2520] blur-xl rounded-full mix-blend-multiply opacity-60"
            />
            
            {/* Simulated handwritten note */}
            <motion.div 
              animate={{ opacity: isErasing ? 0.05 : 0.6 }}
              transition={{ duration: 3 }}
              className="absolute bottom-1/4 right-10 w-40 h-10 border-b border-[#2b2520]/40 rotate-[-5deg]"
            >
              <p className="font-serif italic text-[10px] text-[#2b2520] opacity-40">Anotación marginal...</p>
            </motion.div>
          </div>

          {/* Magic Erasing Effect (Brush Path) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              animate={{ 
                x: `${brushPos.x}%`, 
                y: `${brushPos.y}%`,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-[#D4A574] bg-[#D4A574]/10 backdrop-blur-[2px] shadow-[0_0_20px_#D4A574]"
            >
              <Eraser className="w-5 h-5 text-[#D4A574] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* AI Detection Message Bubble */}
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute bottom-8 left-6 right-6 z-30 p-4 rounded-lg shadow-xl"
              style={{ 
                backgroundColor: 'rgba(43, 37, 32, 0.95)',
                border: '1px solid var(--gold-accent)'
              }}
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#D4A574]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/90 font-serif leading-relaxed">
                    IA detectando anotaciones marginales... ¿Deseas borrarlas para una lectura limpia?
                  </p>
                  <div className="mt-2 flex gap-3">
                    <button 
                      onClick={() => setIsErasing(true)}
                      className="text-[10px] text-[#D4A574] font-bold uppercase tracking-widest hover:underline"
                    >
                      Borrarlas ahora
                    </button>
                    <button 
                      onClick={() => setIsErasing(false)}
                      className="text-[10px] text-white/40 font-bold uppercase tracking-widest hover:underline"
                    >
                      Ignorar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Tool Bar */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#D4A574]">
            <Eraser className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/5 flex items-center justify-center text-white/40">
            <MousePointer2 className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/5 flex items-center justify-center text-white/40">
            <History className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </main>

      {/* Save Options Footer */}
      <footer className="px-6 py-8 flex flex-col gap-4" style={{ backgroundColor: 'var(--parchment)' }}>
        <div className="flex gap-4">
          <button 
            onClick={() => onSave('facsimile')}
            className="flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--ink-charcoal)',
              border: '1.5px solid rgba(43, 37, 32, 0.2)',
              borderRadius: '2px'
            }}
          >
            <span className="font-serif tracking-widest uppercase text-[10px] font-bold">Guardar como</span>
            <span className="font-serif italic text-sm">facsímil</span>
          </button>

          <button 
            onClick={() => onSave('restored')}
            className="flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
            style={{ 
              backgroundColor: 'var(--ink-charcoal)',
              color: 'var(--cream)',
              border: '1px solid var(--gold-accent)',
              borderRadius: '2px'
            }}
          >
            <Save className="w-4 h-4 text-[#D4A574] mb-1" />
            <span className="font-serif tracking-widest uppercase text-[10px] font-bold">Guardar como</span>
            <span className="font-serif italic text-sm">texto restaurado</span>
          </button>
        </div>
        
        <p className="text-center text-[10px] font-serif opacity-40 italic">
          Scrinium preserva la esencia del manuscrito mientras optimiza su legibilidad.
        </p>
      </footer>
    </div>
  );
}
