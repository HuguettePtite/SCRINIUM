import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Wand2, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageProcessingProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function ImageProcessing({ onBack, onConfirm }: ImageProcessingProps) {
  const [brightness, setBrightness] = useState(50);
  const [sharpness, setSharpness] = useState(70);
  const [dividerPosition, setDividerPosition] = useState(50);

  const mockImageUrl = "https://images.unsplash.com/photo-1614117055705-6f8506aaea11?q=80&w=1080";

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
          Procesado de Imagen
        </h1>
        <div className="w-9" />
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative overflow-hidden bg-[#1a1510] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4 border-[#2b2520]">
          {/* Before Image (Left/Full) */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={mockImageUrl}
              alt="Original"
              className="w-full h-full object-cover filter sepia-[0.3] brightness-[0.7]"
            />
            {/* "Original" Label */}
            <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] text-white/70 font-serif uppercase tracking-widest">
              Original
            </div>
          </div>

          {/* After Image (Right/Clipped) */}
          <div 
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 0 0 ${dividerPosition}%)` }}
          >
            <div className="absolute inset-0 bg-white">
              <ImageWithFallback
                src={mockImageUrl}
                alt="Processed"
                className="w-full h-full object-cover grayscale contrast-[1.5] brightness-[1.2]"
                style={{ 
                  filter: `contrast(${1 + sharpness/100}) brightness(${0.8 + brightness/100}) grayscale(1)` 
                }}
              />
            </div>
            {/* "IA: Procesada" Label */}
            <div className="absolute top-4 right-4 px-2 py-1 bg-[#D4A574]/80 backdrop-blur-md rounded text-[10px] text-[#2b2520] font-serif uppercase tracking-widest font-bold">
              IA: Procesada
            </div>
          </div>

          {/* Slider Divider */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#D4A574] cursor-ew-resize"
            style={{ left: `${dividerPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4A574] shadow-lg flex items-center justify-center border-2 border-[#2b2520]">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-[#2b2520]" />
                <div className="w-0.5 h-3 bg-[#2b2520]" />
              </div>
            </div>
          </div>

          {/* IA Floating Tag */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            style={{ 
              backgroundColor: 'var(--ink-charcoal)', 
              border: '1px solid var(--gold-accent)' 
            }}
          >
            <Sparkles className="w-4 h-4 text-[#D4A574]" />
            <span className="text-[10px] text-white font-serif tracking-wide">
              IA: Corrigiendo exposición y contraste académico
            </span>
          </motion.div>

          {/* Mouse handler for divider */}
          <div 
            className="absolute inset-0 z-40 cursor-ew-resize"
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                setDividerPosition(Math.max(0, Math.min(100, x)));
              }
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              const x = ((touch.clientX - rect.left) / rect.width) * 100;
              setDividerPosition(Math.max(0, Math.min(100, x)));
            }}
          />
        </div>
      </main>

      {/* Controls Area */}
      <footer className="px-6 py-8 space-y-8" style={{ backgroundColor: 'var(--parchment)' }}>
        {/* Sliders */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest font-serif opacity-70">Brillo de Pergamino</label>
              <span className="text-xs font-serif">{brightness}%</span>
            </div>
            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-0.5 bg-[#2b2520]/10" />
              <input 
                type="range" 
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute h-0.5 bg-[#D4A574]" 
                style={{ width: `${brightness}%` }}
              />
              <div 
                className="absolute w-4 h-4 rounded-full border-2 border-[#D4A574] bg-white shadow-sm"
                style={{ left: `calc(${brightness}% - 8px)` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest font-serif opacity-70">Nitidez de Tinta</label>
              <span className="text-xs font-serif">{sharpness}%</span>
            </div>
            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-0.5 bg-[#2b2520]/10" />
              <input 
                type="range" 
                value={sharpness}
                onChange={(e) => setSharpness(parseInt(e.target.value))}
                className="w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute h-0.5 bg-[#D4A574]" 
                style={{ width: `${sharpness}%` }}
              />
              <div 
                className="absolute w-4 h-4 rounded-full border-2 border-[#D4A574] bg-white shadow-sm"
                style={{ left: `calc(${sharpness}% - 8px)` }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onConfirm}
          className="w-full py-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          style={{ 
            backgroundColor: 'var(--ink-charcoal)',
            color: 'var(--cream)',
            border: '1px solid var(--gold-accent)',
            borderRadius: '2px'
          }}
        >
          <Wand2 className="w-5 h-5 text-[#D4A574]" strokeWidth={1.5} />
          <span className="font-serif tracking-widest uppercase text-sm font-bold">Confirmar Limpieza</span>
          <Check className="w-4 h-4 opacity-50" />
        </button>
      </footer>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
}
