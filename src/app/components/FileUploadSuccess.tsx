import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { BilingualViewer } from './BilingualViewer';

interface FileUploadSuccessProps {
  onBack: () => void;
  onGoHome: () => void;
  onGenerateViewer: () => void;
}

const uploadedFiles = [
  {
    id: 1,
    name: 'Ovidio_Met_Libro1.pdf',
    aiDetection: 'Texto en Latín detectado',
    size: '1.5 MB'
  },
  {
    id: 2,
    name: 'Traduccion_Met_Esp.pdf',
    aiDetection: 'Traducción al Español detectada',
    size: '1.3 MB'
  }
];

export function FileUploadSuccess({ onBack, onGoHome, onGenerateViewer }: FileUploadSuccessProps) {
  const [showViewer, setShowViewer] = useState(false);

  if (showViewer) {
    return <BilingualViewer onBack={() => setShowViewer(false)} onGoHome={onGoHome} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--parchment)' }}>
        {/* Top bar with logo */}
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-all duration-200"
            style={{ color: 'var(--ink-charcoal)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--ink-charcoal)' }} />
            <span style={{
              fontFamily: 'Baskerville, "Libre Baskerville", "Playfair Display", Georgia, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1.25rem',
              fontWeight: '700',
              letterSpacing: '0.02em'
            }}>
              Scrinium
            </span>
          </button>
          <div style={{ width: '32px' }}></div>
        </div>

        {/* Subtitle */}
        <div className="px-4 py-2 text-center border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <p style={{
            fontFamily: 'Georgia, Garamond, serif',
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: 'var(--ink-charcoal)',
            opacity: 0.6,
            letterSpacing: '0.02em'
          }}>
            Tu estuche digital
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(212, 165, 116, 0.2)',
                  border: '2px solid var(--gold-accent)'
                }}
              >
                <CheckCircle2 
                  className="w-8 h-8" 
                  style={{ color: 'var(--gold-accent)' }}
                  strokeWidth={2}
                />
              </div>
            </div>
            <h1 className="mb-2" style={{
              fontFamily: 'Georgia, Garamond, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1.75rem',
              fontWeight: '400',
              letterSpacing: '0.02em'
            }}>
              Archivos Guardados en el Estuche
            </h1>
            <p style={{
              fontFamily: 'Georgia, Garamond, serif',
              fontStyle: 'italic',
              color: 'var(--ink-charcoal)',
              opacity: 0.6,
              fontSize: '0.95rem'
            }}>
              Tus pergaminos digitales están seguros
            </p>
          </div>

          {/* Uploaded Files Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="rounded-lg p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--parchment)',
                  border: '2px solid var(--gold-accent)',
                  boxShadow: '0 4px 12px rgba(43, 37, 32, 0.08)'
                }}
              >
                {/* File Header with Check */}
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className="flex-shrink-0 mt-1"
                    style={{
                      color: 'var(--gold-accent)'
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(212, 165, 116, 0.3))'
                      }}
                    >
                      {/* Ornate seal-style checkmark */}
                      <circle 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <circle 
                        cx="12" 
                        cy="12" 
                        r="7" 
                        stroke="currentColor" 
                        strokeWidth="1"
                        fill="none"
                        opacity="0.3"
                      />
                      <path 
                        d="M8 12.5l2.5 2.5 5.5-5.5" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 break-words" style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      color: 'var(--ink-charcoal)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      letterSpacing: '0.01em'
                    }}>
                      {file.name}
                    </h3>
                    <p style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      color: 'var(--ink-charcoal)',
                      opacity: 0.5,
                      fontSize: '0.8rem'
                    }}>
                      {file.size}
                    </p>
                  </div>
                </div>

                {/* AI Detection Badge */}
                <div 
                  className="rounded px-3 py-2 flex items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(43, 37, 32, 0.04)',
                    border: '1px solid rgba(43, 37, 32, 0.1)'
                  }}
                >
                  <Sparkles 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: 'var(--gold-accent)' }}
                    strokeWidth={1.5}
                  />
                  <p style={{
                    fontFamily: 'Georgia, Garamond, serif',
                    fontStyle: 'italic',
                    color: 'var(--ink-charcoal)',
                    fontSize: '0.85rem',
                    opacity: 0.7
                  }}>
                    IA: {file.aiDetection}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button with Glow Effect */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-sm blur-lg animate-pulse"
                style={{
                  backgroundColor: 'var(--gold-accent)',
                  opacity: 0.2,
                  transform: 'scale(1.05)'
                }}
              />
              
              {/* Main Button */}
              <button
                onClick={() => setShowViewer(true)}
                className="relative px-10 py-4 rounded-sm transition-all duration-300 hover:shadow-2xl flex items-center gap-3"
                style={{
                  backgroundColor: 'var(--ink-charcoal)',
                  color: 'var(--cream)',
                  border: '2px solid var(--gold-accent)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '1.1rem',
                  letterSpacing: '0.03em',
                  fontWeight: '500',
                  boxShadow: '0 4px 16px rgba(212, 165, 116, 0.3)'
                }}
              >
                <Sparkles className="w-5 h-5" strokeWidth={2} />
                Generar Visor Bilingüe
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(43, 37, 32, 0.03)',
                border: '1px solid rgba(43, 37, 32, 0.1)'
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--gold-accent)' }}
              />
              <p style={{
                fontFamily: 'Georgia, Garamond, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '0.85rem',
                opacity: 0.6,
                letterSpacing: '0.01em'
              }}>
                Archivos seguros en tu biblioteca personal
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}