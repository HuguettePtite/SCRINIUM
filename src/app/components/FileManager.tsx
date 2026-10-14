import { useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, FileType, Cloud, ArrowLeft, File, Check, Link } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { FileUploadSuccess } from './FileUploadSuccess';
import { DriveExportModal } from './DriveExportModal';
import { motion, AnimatePresence } from 'motion/react';

interface FileManagerProps {
  onBack: () => void;
}

const fileTypes = ['PDF', 'Imágenes', 'Docs', 'Drive'];

const recentFiles = [
  { id: 1, name: 'Apuntes_Filologia_II.pdf', type: 'PDF', size: '2.4 MB', date: '20 Ene 2026' },
  { id: 2, name: 'Literatura_Medieval.pdf', type: 'PDF', size: '1.8 MB', date: '18 Ene 2026' },
  { id: 3, name: 'Poesia_Romantica_Siglo_XIX.pdf', type: 'PDF', size: '3.1 MB', date: '15 Ene 2026' },
  { id: 4, name: 'Analisis_Keats_Odas.pdf', type: 'PDF', size: '1.2 MB', date: '12 Ene 2026' },
];

export function FileManager({ onBack }: FileManagerProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('PDF');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [driveSyncStatus, setDriveSyncStatus] = useState<'idle' | 'loading' | 'completed'>('idle');

  const handleChipClick = (type: string) => {
    if (type === 'Drive') {
      if (selectedFiles.length > 0) {
        setShowDriveModal(true);
      } else {
        setSelectedFilter(type);
      }
    } else {
      setSelectedFilter(type);
    }
  };

  const handleDriveExport = () => {
    setShowDriveModal(false);
    setDriveSyncStatus('loading');
    setTimeout(() => {
      setDriveSyncStatus('completed');
    }, 3000);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Aquí se manejaría la carga del archivo
    console.log('Files dropped');
    setShowSuccess(true);
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleUpload = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <FileUploadSuccess 
        onBack={() => setShowSuccess(false)} 
        onGoHome={onBack}
        onGenerateViewer={() => {
          console.log('Generar visor bilingüe');
          // Aquí iría la navegación al visor bilingüe
        }}
      />
    );
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
            onClick={onBack}
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
              Subir Archivos
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
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="mb-6" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '1.75rem',
            fontWeight: '400',
            letterSpacing: '0.02em'
          }}>
            Gestor de Archivos
          </h1>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="mb-8 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: isDragging ? 'rgba(212, 165, 116, 0.1)' : 'var(--parchment)',
              border: isDragging 
                ? '2px dashed var(--gold-accent)' 
                : '2px dashed rgba(43, 37, 32, 0.2)',
              padding: '3rem 2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative corner flourishes */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '40px',
              height: '40px',
              borderTop: '2px solid rgba(43, 37, 32, 0.15)',
              borderLeft: '2px solid rgba(43, 37, 32, 0.15)',
            }} />
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '40px',
              height: '40px',
              borderTop: '2px solid rgba(43, 37, 32, 0.15)',
              borderRight: '2px solid rgba(43, 37, 32, 0.15)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              width: '40px',
              height: '40px',
              borderBottom: '2px solid rgba(43, 37, 32, 0.15)',
              borderLeft: '2px solid rgba(43, 37, 32, 0.15)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '40px',
              height: '40px',
              borderBottom: '2px solid rgba(43, 37, 32, 0.15)',
              borderRight: '2px solid rgba(43, 37, 32, 0.15)',
            }} />

            <div className="flex flex-col items-center justify-center gap-4">
              <Upload 
                className="w-12 h-12" 
                strokeWidth={1.5}
                style={{ color: 'var(--ink-charcoal)', opacity: 0.5 }}
              />
              <div className="text-center">
                <p className="mb-2" style={{
                  fontFamily: 'Georgia, Garamond, serif',
                  color: 'var(--ink-charcoal)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.02em'
                }}>
                  Arrastra tus pergaminos digitales aquí
                </p>
                <p style={{
                  fontFamily: 'Georgia, Garamond, serif',
                  color: 'var(--ink-charcoal)',
                  fontSize: '0.9rem',
                  opacity: 0.6
                }}>
                  o
                </p>
              </div>
              <button
                className="px-6 py-2.5 rounded-sm transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--ink-charcoal)',
                  color: 'var(--cream)',
                  border: '1px solid var(--gold-accent)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.03em'
                }}
              >
                Seleccionar archivos desde este dispositivo
              </button>
            </div>
          </div>

          {/* File Type Filters */}
          <div className="mb-6">
            <h2 className="mb-3" style={{
              fontFamily: 'Georgia, Garamond, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1rem',
              fontWeight: '500',
              letterSpacing: '0.02em'
            }}>
              Filtros
            </h2>
            <div className="flex gap-2 flex-wrap">
              {fileTypes.map((type) => {
                const isDrive = type === 'Drive';
                const isActive = selectedFilter === type;
                
                return (
                  <button
                    key={type}
                    onClick={() => handleChipClick(type)}
                    className="px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 relative overflow-hidden group"
                    style={{
                      backgroundColor: driveSyncStatus === 'completed' && isDrive 
                        ? '#D4A574' 
                        : (isActive ? 'var(--ink-charcoal)' : 'transparent'),
                      color: (isActive || (driveSyncStatus === 'completed' && isDrive)) ? 'var(--cream)' : 'var(--ink-charcoal)',
                      border: `1px solid ${isActive ? 'var(--gold-accent)' : 'rgba(43, 37, 32, 0.2)'}`,
                      fontFamily: 'Georgia, Garamond, serif',
                      fontSize: '0.85rem',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      {isDrive && driveSyncStatus === 'loading' && (
                        <div className="relative w-3 h-3">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                              cx="6"
                              cy="6"
                              r="5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="31.4"
                              className="animate-sync-ink"
                            />
                          </svg>
                        </div>
                      )}
                      {isDrive && driveSyncStatus === 'completed' && <Link className="w-3 h-3" />}
                      <span>{type}</span>
                    </div>

                    {/* Completion Pulse */}
                    {isDrive && driveSyncStatus === 'completed' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        className="absolute inset-0 bg-white/30 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {showDriveModal && (
              <DriveExportModal 
                onClose={() => setShowDriveModal(false)}
                onExport={handleDriveExport}
              />
            )}
          </AnimatePresence>

          {/* Recent Files */}
          <div>
            <h2 className="mb-4" style={{
              fontFamily: 'Georgia, Garamond, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1.2rem',
              fontWeight: '500',
              letterSpacing: '0.02em'
            }}>
              Archivos Recientes
            </h2>
            
            <div className="space-y-3">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => toggleFileSelection(file.id)}
                  className="flex items-center gap-4 p-4 rounded-sm transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: selectedFiles.includes(file.id) 
                      ? 'rgba(212, 165, 116, 0.15)' 
                      : 'var(--parchment)',
                    border: selectedFiles.includes(file.id)
                      ? '1px solid var(--gold-accent)'
                      : '1px solid rgba(43, 37, 32, 0.1)',
                  }}
                >
                  {/* File Icon */}
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(43, 37, 32, 0.05)' }}
                  >
                    <FileText 
                      className="w-5 h-5" 
                      strokeWidth={1.5}
                      style={{ color: 'var(--ink-charcoal)', opacity: 0.7 }}
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate mb-1" style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      color: 'var(--ink-charcoal)',
                      fontSize: '0.95rem',
                      fontWeight: '500'
                    }}>
                      {file.name}
                    </p>
                    <div className="flex gap-3 text-sm">
                      <span style={{
                        fontFamily: 'Georgia, Garamond, serif',
                        color: 'var(--ink-charcoal)',
                        opacity: 0.5,
                        fontSize: '0.8rem'
                      }}>
                        {file.size}
                      </span>
                      <span style={{
                        fontFamily: 'Georgia, Garamond, serif',
                        color: 'var(--ink-charcoal)',
                        opacity: 0.5,
                        fontSize: '0.8rem'
                      }}>
                        {file.date}
                      </span>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedFiles.includes(file.id) && (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--gold-accent)' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--cream)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Action Button - Fixed at bottom right */}
      {selectedFiles.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleUpload}
            className="px-8 py-3 rounded-sm shadow-xl transition-all duration-200 hover:shadow-2xl flex items-center gap-2"
            style={{
              backgroundColor: 'var(--ink-charcoal)',
              color: 'var(--cream)',
              border: '2px solid var(--gold-accent)',
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '1rem',
              letterSpacing: '0.03em',
              fontWeight: '500'
            }}
          >
            <Upload className="w-5 h-5" strokeWidth={2} />
            Cargar en el Estuche ({selectedFiles.length})
          </button>
        </div>
      )}

      <style>{`
        @keyframes sync-ink {
          from { stroke-dashoffset: 31.4; }
          to { stroke-dashoffset: 0; }
        }
        .animate-sync-ink {
          animation: sync-ink 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}