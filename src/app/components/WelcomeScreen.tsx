import { BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply'
        }}
      ></div>

      {/* Spacer top */}
      <div className="flex-1"></div>

      {/* Center content */}
      <div className="max-w-md w-full flex flex-col items-center text-center z-10">
        {/* Logo title - Elegant heavy serif */}
        <h1 className="mb-4" style={{ 
          fontFamily: 'Baskerville, "Libre Baskerville", "Playfair Display", Georgia, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '3.5rem',
          fontWeight: '700',
          letterSpacing: '0.03em',
          lineHeight: '1.1'
        }}>
          Scrinium
        </h1>

        {/* Slogan - Handwritten thin typography */}
        <p className="mb-2" style={{
          fontFamily: 'cursive, "Dancing Script", "Brush Script MT", serif',
          color: 'var(--ink-charcoal)',
          opacity: 0.7,
          fontSize: '1.4rem',
          fontWeight: '300',
          fontStyle: 'italic',
          letterSpacing: '0.02em'
        }}>
          Tu estuche digital
        </p>
      </div>

      {/* Spacer middle */}
      <div className="flex-1"></div>

      {/* Bottom button - Minimalist with thin borders */}
      <div className="w-full max-w-md">
        <button
          onClick={onNext}
          className="w-full px-8 py-3.5 transition-all duration-300 hover:shadow-md"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--ink-charcoal)',
            fontFamily: 'Georgia, Garamond, serif',
            fontSize: '1rem',
            letterSpacing: '0.05em',
            border: '1px solid var(--ink-charcoal)',
            borderRadius: '2px'
          }}
        >
          Comenzar mi viaje
        </button>
      </div>
    </div>
  );
}