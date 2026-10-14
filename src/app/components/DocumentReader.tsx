import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Eye, PenTool, Highlighter, Share2, MoreVertical, Sparkles, Save, FileText, Type, FileEdit, Check, Cloud, Link, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { OrganizeInCase } from './OrganizeInCase';
import { DriveExportModal } from './DriveExportModal';

interface DocumentReaderProps {
  documentName: string;
  onBack: (folderName?: string) => void;
}

export function DocumentReader({ documentName, onBack }: DocumentReaderProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showOrganize, setShowOrganize] = useState(false);
  const [showDriveExport, setShowDriveExport] = useState(false);
  const [driveStatus, setDriveStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'txt' | 'doc' | null>(null);
  const mockOriginalImage = "https://images.unsplash.com/photo-1614117055705-6f8506aaea11?q=80&w=1080";

  const exportOptions = [
    { id: 'pdf', title: 'PDF', desc: 'Documento portable (Ideal para imprimir)', icon: FileText },
    { id: 'txt', title: 'TXT', desc: 'Texto plano (Solo caracteres para análisis filológico)', icon: Type },
    { id: 'doc', title: 'DOC', desc: 'Documento editable (Para trabajo en procesador de textos)', icon: FileEdit },
  ];

  const handleDriveExport = () => {
    setDriveStatus('syncing');
    setShowDriveExport(false);
    setTimeout(() => {
      setDriveStatus('synced');
    }, 2500);
  };

  if (showOrganize) {
    return (
      <OrganizeInCase 
        documentName={documentName} 
        onConfirm={() => onBack('Apuntes de Letras')} 
        onBack={() => setShowOrganize(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2b2520] relative">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between border-b relative z-10" style={{ backgroundColor: 'var(--parchment)', borderColor: 'rgba(43, 37, 32, 0.1)' }}>
        <button onClick={() => onBack()} className="p-2 -ml-2" style={{ color: 'var(--ink-charcoal)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center flex-1 px-4 flex flex-col items-center">
          <button 
            onClick={() => onBack()}
            className="flex items-center gap-1.5 hover:opacity-60 transition-opacity cursor-pointer mb-0.5"
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--ink-charcoal)' }} />
            <span style={{
              fontFamily: 'Baskerville, "Libre Baskerville", "Playfair Display", Georgia, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.02em'
            }}>
              Scrinium
            </span>
          </button>
          <h1 className="truncate font-serif text-[10px] font-bold tracking-tight uppercase opacity-60" style={{ color: 'var(--ink-charcoal)' }}>
            {documentName}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowDriveExport(true)}
            disabled={driveStatus === 'syncing'}
            className={`export-notes-chip flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 relative ${driveStatus === 'synced' ? 'bg-[#A0522D]/10 border-[#A0522D]/40' : 'bg-white/50 border-[#8B4513]/10'}`}
          >
            <div className="relative">
              {driveStatus === 'syncing' && (
                <svg className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] -rotate-90">
                  <circle
                    cx="13"
                    cy="13"
                    r="11"
                    fill="none"
                    stroke="#A0522D"
                    strokeWidth="2"
                    strokeDasharray="69"
                    className="animate-draw"
                  />
                </svg>
              )}
              {driveStatus === 'synced' ? (
                <Link className="w-3.5 h-3.5 text-[#A0522D]" />
              ) : (
                <Cloud className={`w-3.5 h-3.5 ${driveStatus === 'syncing' ? 'text-[#A0522D]' : 'text-[#8B4513]/60'}`} />
              )}
            </div>
            <span className={`export-notes-text text-[10px] font-serif font-bold uppercase tracking-widest ${driveStatus === 'synced' ? 'text-[#A0522D]' : 'text-[#2b2520]/80'}`}>
              {driveStatus === 'synced' ? 'Sincronizado' : 'Exportar Notas'}
            </span>
          </button>
          
          <button className="p-2" style={{ color: 'var(--ink-charcoal)' }}>
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Reading Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
        <div 
          className="documento-restaurado-container relative w-full max-w-2xl min-h-[85vh] shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{ 
            backgroundColor: '#FDF5E6',
            borderRadius: '2px 4px 3px 6px', // Irregular hand-cut paper feel
            padding: '40px'
          }}
        >
          {/* Magic X-Ray Overlay (Original Image) */}
          <AnimatePresence>
            {showOriginal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                <ImageWithFallback 
                  src={mockOriginalImage} 
                  alt="Original version"
                  className="w-full h-full object-cover grayscale"
                  style={{ filter: 'sepia(0.5) contrast(1.5)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Restored Text Content */}
          <motion.article 
            animate={{ opacity: showOriginal ? 0.4 : 1 }}
            className="relative z-10 space-y-6"
            style={{ 
              fontFamily: 'Georgia, Garamond, serif',
              color: 'var(--ink-charcoal)',
              lineHeight: '1.8',
              fontSize: '1.1rem'
            }}
          >
            <h2 className="text-2xl font-bold border-b border-[#2b2520]/10 pb-4 mb-8">Liber I: Annotations on Metamorphoses</h2>
            
            <p>
              In nova fert animus mutatas dicere formas corpora; di, coeptis (nam vos mutastis et illas) adspirate meis primaque ab origine mundi ad mea perpetuum deducite tempora carmen!
            </p>

            <p>
              Ante mare et terras et quod tegit omnia caelum unus erat toto naturae vultus in orbe, quem dixere chaos: rudis indigestaque moles nec quicquam nisi pondus iners congestaque eodem non bene iunctarum discordia semina rerum.
            </p>

            <div className="my-10 p-6 border-l-2 border-[#D4A574] bg-[#D4A574]/5 italic">
              <p className="text-sm opacity-80">
                Nota: Ovidio establece aquí la cosmogonía clásica. El caos no es desorden destructivo, sino la falta de diferenciación de los elementos. La restauración ha eliminado las manchas de café de la esquina superior.
              </p>
            </div>

            <p>
              Nullus adhuc mundo praebebat lumina Titan, nec nova crescendo reparabat cornua Phoebe, nec circumfuso pendebat in aere tellus ponderibus librata suis, nec bracchia longo margine terrarum porrexerat Amphitrite.
            </p>

            <p>
              Utque erat et tellus illic et pontus et aer, sic erat instabilis tellus, innabilis unda, lucis egens aer; nulli sua forma manebat, obstabatque aliis aliud, quia corpore in uno frigida pugnabant calidis, umentia siccis, mollia cum duris, sine pondere, habentia pondus.
            </p>
          </motion.article>

          {/* X-Ray Toggle Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
              onTouchStart={() => setShowOriginal(true)}
              onTouchEnd={() => setShowOriginal(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#2b2520]/20 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm"
              style={{ backgroundColor: showOriginal ? 'var(--ink-charcoal)' : 'rgba(253, 245, 230, 0.8)', color: showOriginal ? 'var(--cream)' : 'var(--ink-charcoal)' }}
            >
              <Eye className="w-3 h-3" />
              {showOriginal ? 'Viendo Original' : 'Ver Original'}
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showDriveExport && (
          <DriveExportModal 
            onClose={() => setShowDriveExport(false)}
            onExport={handleDriveExport}
          />
        )}
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-[320px] h-[450px] flex flex-col shadow-2xl"
              style={{ 
                backgroundColor: '#F5F5DC', // Smooth parchment
                border: '1px solid #8B4513',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h3 className="text-center font-serif text-lg font-bold mb-6" style={{ color: '#5D4037' }}>
                Guardar Documento
              </h3>

              <div className="flex-1 space-y-3">
                {exportOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedFormat === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedFormat(option.id as any)}
                      className="w-full p-3 rounded-lg flex items-start gap-3 transition-colors text-left group"
                      style={{ 
                        backgroundColor: isSelected ? 'rgba(139, 69, 19, 0.15)' : 'transparent',
                        border: isSelected ? '1px solid #8B4513' : '1px solid rgba(139, 69, 19, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div className="p-2 rounded bg-white/50 border border-[#8B4513]/20 shadow-sm group-hover:bg-white transition-colors">
                        <Icon className="w-5 h-5" style={{ color: '#8B4513' }} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-bold text-sm" style={{ color: '#5D4037' }}>{option.title}</p>
                        <p className="font-serif text-[10px] leading-tight opacity-70 mt-0.5" style={{ color: '#5D4037' }}>{option.desc}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#8B4513] self-center" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-[#8B4513]/10">
                <p className="text-[10px] font-serif italic text-center leading-relaxed mb-4" style={{ color: '#8B4513', opacity: 0.8 }}>
                  IA: Se recomienda PDF para conservar la limpieza de los trazos de Ovidio
                </p>
                <button
                  disabled={!selectedFormat}
                  onClick={() => {
                    setShowSaveModal(false);
                    setShowOrganize(true);
                  }}
                  className="w-full py-3 rounded-md font-serif text-sm font-bold tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                  style={{ 
                    backgroundColor: '#8B4513',
                    color: '#F5F5DC',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  CONFIRMAR FORMATO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Controls */}
      <footer className="px-6 py-5 border-t flex items-center justify-between" style={{ backgroundColor: 'var(--parchment)', borderColor: 'rgba(43, 37, 32, 0.1)' }}>
        <div className="flex items-center gap-6">
          <button className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-[#D4A574]/10 transition-colors">
              <PenTool className="w-5 h-5 text-[#2b2520]" />
            </div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider opacity-60">Anotar</span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-[#D4A574]/10 transition-colors">
              <Highlighter className="w-5 h-5 text-[#2b2520]" />
            </div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider opacity-60">Subrayar</span>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-[#D4A574]/10 transition-colors">
              <Share2 className="w-5 h-5 text-[#2b2520]" />
            </div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider opacity-60">Compartir</span>
          </button>

          <button 
            onClick={() => setShowSaveModal(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full group-hover:bg-[#D4A574]/10 transition-colors">
              <Save className="w-5 h-5 text-[#2b2520]" />
            </div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider opacity-60">Estante</span>
          </button>
        </div>

        <div className="h-10 w-[1px] bg-[#2b2520]/10" />

        <button className="w-12 h-12 bg-[#D4A574]/20 rounded-full flex items-center justify-center border border-[#D4A574]/40 shrink-0">
           <Sparkles className="w-6 h-6 text-[#D4A574]" />
        </button>
      </footer>

      <style>{`
        .export-notes-chip:hover {
          background-color: #fcf9f2 !important; /* Lighter parchment */
          border-color: rgba(139, 69, 19, 0.2);
        }
        .export-notes-chip:hover .export-notes-text {
          text-decoration: underline;
          text-decoration-style: dashed;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(43, 37, 32, 0.4);
        }
        .documento-restaurado-container {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 100px rgba(43, 37, 32, 0.02);
        }
        @keyframes draw {
          from { stroke-dashoffset: 69; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          animation: draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @media (max-width: 640px) {
          .documento-restaurado-container {
            padding: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
