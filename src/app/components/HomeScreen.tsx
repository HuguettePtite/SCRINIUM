import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Library, BookMarked, Settings, FileText, PenLine, Camera, Cloud, ShieldCheck, Download, Loader2, Feather } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileManager } from './FileManager';
import { CameraInterface } from './CameraInterface';
import { ImageProcessing } from './ImageProcessing';
import { TextRestoration } from './TextRestoration';
import { DocumentConfirmation } from './DocumentConfirmation';
import { DocumentReader } from './DocumentReader';
import { GoogleDriveImport } from './GoogleDriveImport';
import { SaveConfirmation } from './SaveConfirmation';
import { DivineComedyReader } from './DivineComedyReader';
import { TranscribeTextModal } from './TranscribeTextModal';
import { AudioWidget } from './AudioWidget';

const categories = ['Libros', 'Importar', 'Época', 'Géneros', 'Idiomas', 'Fragmentos', 'Notas', 'Subrayados'];

const books = [
  {
    id: 1,
    title: 'Las Metamorfosis',
    author: 'Ovidio',
    coverUrl: 'https://images.unsplash.com/photo-1613830106697-469644951c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbW9ycGhvc2lzJTIwb3ZpZCUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjkxMTE0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Venus y Adonis',
    author: 'Shakespeare',
    coverUrl: 'https://images.unsplash.com/photo-1707547707885-f8e23fc58192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFrZXNwZWFyZSUyMHZlbnVzJTIwYWRvbmlzfGVufDF8fHx8MTc2OTExMTQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'La Divina Comedia',
    author: 'Dante Alighieri',
    coverUrl: 'https://images.unsplash.com/photo-1586256173882-30a42cc5be36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZpbmUlMjBjb21lZHklMjBkYW50ZSUyMGJvb2t8ZW58MXx8fHwxNzY5MTExNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Libros');
  const [activeTab, setActiveTab] = useState('biblioteca');
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showRestoration, setShowRestoration] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDrive, setShowDrive] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState<{name: string, type: string} | null>(null);
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [showDivineComedy, setShowDivineComedy] = useState(false);
  const [notification, setNotification] = useState<{message: string, folder: string} | null>(null);
  const [documents, setDocuments] = useState<Array<{name: string, author: string, type: string}>>([]);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [showArrivalModal, setShowArrivalModal] = useState<{name: string} | null>(null);
  const [showTranscribeModal, setShowTranscribeModal] = useState(false);

  const searchResults = [
    { id: 'res1', title: 'Edición Crítica (1924)', source: 'Repositorio UNAM (PDF)', type: 'PDF' },
    { id: 'res2', title: 'Tristia: Loeb Classical Library', source: 'JSTOR (Epub)', type: 'Epub' },
    { id: 'res3', title: 'Versión Bilingüe', source: 'Biblioteca Digital Perseus (Texto plano)', type: 'Texto plano' },
  ];

  const handleDownload = (res: typeof searchResults[0]) => {
    setIsDownloading(res.id);
    setTimeout(() => {
      setDocuments(prev => [{ name: res.title, author: 'Ovidio', type: res.type, isNew: true }, ...prev]);
      setIsDownloading(null);
      setSearchQuery('');
      setShowArrivalModal({ name: res.title });
    }, 2500);
  };

  const importOptions = [
    { id: 1, label: 'Subir Archivo', icon: FileText },
    { id: 2, label: 'Escribir/Pegar Texto', icon: PenLine },
    { id: 3, label: 'Escanear con Cámara', icon: Camera },
    { id: 4, label: 'Conectar Google Drive', icon: Cloud },
  ];

  const handleImportOptionClick = (optionId: number) => {
    setShowImportMenu(false);
    if (optionId === 1) {
      setShowFileManager(true);
    } else if (optionId === 2) {
      setShowTranscribeModal(true);
    } else if (optionId === 3) {
      setShowCamera(true);
    } else if (optionId === 4) {
      setShowDrive(true);
    }
  };

  if (showFileManager) {
    return (
      <>
        <FileManager 
          onBack={() => setShowFileManager(false)} 
          onImport={(file) => {
            setShowFileManager(false);
            setShowSaveConfirmation(file);
          }}
        />
        {showSaveConfirmation && (
          <SaveConfirmation 
            fileName={showSaveConfirmation.name}
            onClose={() => setShowSaveConfirmation(null)}
            onConfirm={(options) => {
              setDocuments(prev => [{ name: showSaveConfirmation.name, author: 'Importado', type: showSaveConfirmation.type, isNew: true }, ...prev]);
              setShowSaveConfirmation(null);
              setShowArrivalModal({ name: showSaveConfirmation.name });
            }}
          />
        )}
      </>
    );
  }

  if (showCamera) {
    return <CameraInterface onClose={() => setShowCamera(false)} onCapture={() => {
      setShowCamera(false);
      setShowProcessing(true);
    }} />;
  }

  if (showProcessing) {
    return <ImageProcessing 
      onBack={() => setShowProcessing(false)} 
      onConfirm={() => {
        setShowProcessing(false);
        setShowRestoration(true);
      }} 
    />;
  }

  if (showRestoration) {
    return (
      <>
        <TextRestoration 
          onBack={() => setShowRestoration(false)} 
          onSave={(type) => {
            if (type === 'restored') {
              setShowConfirmation(true);
            } else {
              setShowRestoration(false);
            }
          }} 
        />
        {showConfirmation && (
          <DocumentConfirmation 
            onCancel={() => setShowConfirmation(false)}
            onConfirm={(data) => {
              setDocuments(prev => [data, ...prev]);
              setShowConfirmation(false);
              setShowRestoration(false);
            }}
          />
        )}
      </>
    );
  }

  if (showDivineComedy) {
    return <DivineComedyReader onBack={() => setShowDivineComedy(false)} />;
  }

  if (activeDocument) {
    return (
      <DocumentReader 
        documentName={activeDocument} 
        onBack={(folderName) => {
          setActiveDocument(null);
          if (folderName && typeof folderName === 'string') {
            setNotification({
              message: 'Documento preservado. Sus apuntes han sido ubicados con éxito en el estante de',
              folder: folderName
            });
            setTimeout(() => setNotification(null), 3500);
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Success Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md"
          >
            <div 
              className="p-6 shadow-2xl flex items-center gap-4 relative overflow-hidden"
              style={{ 
                backgroundColor: '#FDF5E6',
                border: '1.5px solid #8B4513',
                borderRadius: '8px'
              }}
            >
              {/* Decorative Wax Seal Icon */}
              <div className="shrink-0 w-12 h-12 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#A62C2B] rounded-full shadow-md" />
                <span className="relative z-10 text-white font-serif font-bold text-lg">S</span>
                <div className="absolute inset-0 bg-white/10 rounded-full" />
              </div>

              <div className="flex-1">
                <p 
                  className="font-serif italic text-sm leading-relaxed"
                  style={{ color: '#2b2520' }}
                >
                  {notification.message} <span className="font-bold not-italic" style={{ color: '#8B4513' }}>{notification.folder}</span>.
                </p>
              </div>

              {/* Background texture for the "note" */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none leather-texture" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrival Modal */}
      <AnimatePresence>
        {showDrive && (
          <GoogleDriveImport 
            onClose={() => setShowDrive(false)}
            onImport={(file) => {
              setShowDrive(false);
              setShowSaveConfirmation(file);
            }}
          />
        )}
        {showSaveConfirmation && (
          <SaveConfirmation 
            fileName={showSaveConfirmation.name}
            onClose={() => setShowSaveConfirmation(null)}
            onConfirm={(options) => {
              setDocuments(prev => [{ name: showSaveConfirmation.name, author: 'Importado', type: showSaveConfirmation.type, isNew: true }, ...prev]);
              setShowSaveConfirmation(null);
              setShowArrivalModal({ name: showSaveConfirmation.name });
            }}
          />
        )}
        {showArrivalModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArrivalModal(null)}
              className="absolute inset-0 bg-[#2b2520]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#FDF5E6] p-8 rounded-sm shadow-2xl border border-[#8B4513]/20 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D4A574]/10 flex items-center justify-center border border-[#D4A574]/30">
                  <BookOpen className="w-8 h-8 text-[#8B4513]" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2b2520] mb-2">Ovidio ha llegado</h3>
              <p className="font-serif italic text-sm text-[#2b2520]/70 mb-8 leading-relaxed">
                "{showArrivalModal.name}" ha sido ubicado en su estante. ¿Deseas comenzar la lectura o seguir investigando?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setActiveDocument(showArrivalModal.name);
                    setShowArrivalModal(null);
                  }}
                  className="w-full py-3 bg-[#8B4513] text-[#FDF5E6] rounded-sm font-serif text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                >
                  Comenzar Lectura
                </button>
                <button 
                  onClick={() => setShowArrivalModal(null)}
                  className="w-full py-3 bg-transparent text-[#8B4513] border border-[#8B4513]/20 rounded-sm font-serif text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Seguir Investigando
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document Confirmation Modal */}
      {showConfirmation && (
        <DocumentConfirmation
          onCancel={() => setShowConfirmation(false)}
          onConfirm={(data) => {
            setShowConfirmation(false);
            setShowRestoration(false);
          }}
        />
      )}

      {/* Transcribe / Paste Text Modal */}
      {showTranscribeModal && (
        <TranscribeTextModal
          onClose={() => setShowTranscribeModal(false)}
          onSave={(data) => {
            setDocuments(prev => [{ name: data.title || 'Pasaje sin título', author: data.author || 'Anónimo', type: 'Texto' }, ...prev]);
            setShowTranscribeModal(false);
          }}
        />
      )}
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--parchment)' }}>
        {/* Top bar with logo */}
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <div></div>
          <button 
            onClick={() => {
              setActiveTab('biblioteca');
              setSearchQuery('');
              setSelectedCategory('Libros');
            }}
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
          <div></div>
        </div>

        {/* Search bar */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
              style={{ color: 'var(--ink-charcoal)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar obras, autores..."
              className="w-full pl-10 pr-4 py-2.5 rounded-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: 'var(--cream)',
                color: 'var(--ink-charcoal)',
                border: '1px solid rgba(43, 37, 32, 0.15)',
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="px-4 pb-3 border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => category === 'Importar' && setShowImportMenu(true)}
                onMouseLeave={() => category === 'Importar' && setShowImportMenu(false)}
                className="px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-200"
                style={{
                  backgroundColor: selectedCategory === category ? 'var(--ink-charcoal)' : 'transparent',
                  color: selectedCategory === category ? 'var(--cream)' : 'var(--ink-charcoal)',
                  border: `1px solid ${selectedCategory === category ? 'var(--gold-accent)' : 'rgba(43, 37, 32, 0.2)'}`,
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.02em',
                  position: 'relative'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Import Dropdown Menu - Positioned outside header to avoid overflow issues */}
      {showImportMenu && (
        <div 
          className="fixed z-[100] animate-fadeIn"
          style={{
            top: '158px', // Positioned below the chips
            left: '132px', // Positioned below the "Importar" chip
            minWidth: '240px'
          }}
          onMouseEnter={() => setShowImportMenu(true)}
          onMouseLeave={() => setShowImportMenu(false)}
        >
          <div 
            className="rounded-lg shadow-xl overflow-hidden"
            style={{
              backgroundColor: 'var(--parchment)',
              border: '1.5px solid rgba(43, 37, 32, 0.2)',
              boxShadow: '0 8px 24px rgba(43, 37, 32, 0.25)'
            }}
          >
            {/* Menu Options */}
            <div className="py-2">
              {importOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleImportOptionClick(option.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-all duration-200"
                    style={{
                      color: 'var(--ink-charcoal)',
                      fontFamily: 'Georgia, Garamond, serif',
                      fontSize: '0.9rem',
                      letterSpacing: '0.01em',
                      backgroundColor: 'transparent',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(43, 37, 32, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <IconComponent 
                      className="w-5 h-5 flex-shrink-0" 
                      strokeWidth={1.5}
                      style={{ color: 'var(--ink-charcoal)', opacity: 0.7 }}
                    />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Slogan at bottom */}
            <div 
              className="px-4 py-2 border-t text-center"
              style={{
                borderColor: 'rgba(43, 37, 32, 0.1)',
                backgroundColor: 'rgba(43, 37, 32, 0.02)'
              }}
            >
              <p style={{
                fontFamily: 'Georgia, Garamond, serif',
                fontStyle: 'italic',
                fontSize: '0.7rem',
                color: 'var(--ink-charcoal)',
                opacity: 0.5,
                letterSpacing: '0.02em'
              }}>
                Tu estuche digital
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main content - Estanterías o Resultados de Búsqueda */}
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {searchQuery.toLowerCase().includes('ovidio') || searchQuery.toLowerCase().includes('tristes') ? (
            <div className="animate-fadeIn">
              <h2 className="mb-6 font-serif italic opacity-60 text-sm uppercase tracking-widest">
                Catálogo: Resultados para "{searchQuery}"
              </h2>
              <div className="space-y-4">
                {searchResults.map((res) => (
                  <div 
                    key={res.id}
                    className="group relative p-5 bg-[#FDF5E6] border border-[#8B4513]/10 rounded-sm hover:border-[#8B4513]/30 transition-all shadow-[0_2px_10px_rgba(139,69,19,0.05)]"
                    style={{ borderLeft: '4px solid #D4A574' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-serif text-lg font-bold text-[#2b2520]">{res.title}</h3>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-[#D4A574]/10 border border-[#D4A574]/30">
                            <ShieldCheck className="w-3 h-3 text-[#8B4513]" />
                            <span className="text-[8px] font-bold uppercase text-[#8B4513] tracking-tighter">Fuente Certificada</span>
                          </div>
                        </div>
                        <p className="font-serif italic text-sm text-[#2b2520]/60">{res.source}</p>
                      </div>
                      
                      <div className="shrink-0 flex items-center h-full">
                        <button 
                          onClick={() => handleDownload(res)}
                          disabled={isDownloading !== null}
                          className="md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2.5 bg-[#8B4513] text-[#FDF5E6] rounded-sm font-serif text-[10px] font-bold tracking-[0.1em] uppercase active:scale-95 disabled:opacity-100 min-w-[160px] justify-center"
                        >
                          {isDownloading === res.id ? (
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ 
                                  rotate: [0, -20, 0],
                                  x: [0, 5, 0],
                                  y: [0, -2, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                              >
                                <Feather className="w-3 h-3" />
                              </motion.div>
                              <span className="animate-pulse">Registrando...</span>
                            </div>
                          ) : (
                            <>
                              <Download className="w-3 h-3" />
                              <span>Descargar al Scrinium</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Decorative archive card corner */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#8B4513]/20" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className="mb-4" style={{
                fontFamily: 'Georgia, Garamond, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '1.5rem',
                fontWeight: '400',
                letterSpacing: '0.02em'
              }}>
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Estanterías'}
              </h2>

              {/* Books container */}
              <div className="estanterias-container grid grid-cols-1 gap-6">
                {/* New documents added via import */}
                {documents.map((doc, index) => (
                  <div 
                    key={`new-doc-${index}`}
                    className="flex gap-4 p-4 rounded-sm transition-shadow duration-300 hover:shadow-md border-2 border-[#D4A574]/30 relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--parchment)',
                    }}
                  >
                    {(doc as any).isNew && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-[#8B4513] text-[#FDF5E6] text-[8px] font-bold uppercase tracking-widest px-3 py-1 -rotate-0 shadow-sm">
                          Nuevo
                        </div>
                      </div>
                    )}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-32 bg-white flex items-center justify-center rounded-sm shadow-sm border border-rgba(43, 37, 32, 0.2)">
                        <FileText className="w-10 h-10 text-[#D4A574] opacity-50" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="mb-1" style={{
                          fontFamily: 'Georgia, Garamond, serif',
                          color: 'var(--ink-charcoal)',
                          fontSize: '1.1rem',
                          fontWeight: '500',
                          letterSpacing: '0.01em'
                        }}>
                          {doc.name}
                        </h3>
                        <p className="mb-3" style={{
                          fontFamily: 'Georgia, Garamond, serif',
                          color: 'var(--ink-charcoal)',
                          opacity: 0.7,
                          fontSize: '0.9rem',
                          fontStyle: 'italic'
                        }}>
                          {doc.author} • {doc.type}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveDocument(doc.name)}
                        className="self-start px-6 py-2 rounded-sm transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: 'var(--ink-charcoal)',
                          color: 'var(--cream)',
                          border: '1px solid var(--gold-accent)',
                          fontFamily: 'Georgia, Garamond, serif',
                          fontSize: '0.9rem',
                          letterSpacing: '0.03em'
                        }}
                      >
                        Leer
                      </button>
                    </div>
                  </div>
                ))}

                {books.map((book) => (
                  <div 
                    key={book.id}
                    className="flex gap-4 p-4 rounded-sm transition-shadow duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: 'var(--parchment)',
                      border: '1px solid rgba(43, 37, 32, 0.1)'
                    }}
                  >
                    {/* Book cover */}
                    <div className="flex-shrink-0">
                      <ImageWithFallback
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded-sm shadow-sm"
                        style={{ border: '1px solid rgba(43, 37, 32, 0.2)' }}
                      />
                    </div>

                    {/* Book info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="mb-1" style={{
                          fontFamily: 'Georgia, Garamond, serif',
                          color: 'var(--ink-charcoal)',
                          fontSize: '1.1rem',
                          fontWeight: '500',
                          letterSpacing: '0.01em'
                        }}>
                          {book.title}
                        </h3>
                        <p className="mb-3" style={{
                          fontFamily: 'Georgia, Garamond, serif',
                          color: 'var(--ink-charcoal)',
                          opacity: 0.7,
                          fontSize: '0.9rem',
                          fontStyle: 'italic'
                        }}>
                          {book.author}
                        </p>
                      </div>

                      {/* Read button */}
                      <button
                        onClick={() => {
                          if (book.title === 'La Divina Comedia') {
                            setShowDivineComedy(true);
                          } else {
                            setActiveDocument(book.title);
                          }
                        }}
                        className="self-start px-6 py-2 rounded-sm transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: 'var(--ink-charcoal)',
                          color: 'var(--cream)',
                          border: '1px solid var(--gold-accent)',
                          fontFamily: 'Georgia, Garamond, serif',
                          fontSize: '0.9rem',
                          letterSpacing: '0.03em'
                        }}
                      >
                        Leer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Bottom navbar */}
      <nav 
        className="navbar fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: 'var(--parchment)',
          borderColor: 'rgba(43, 37, 32, 0.15)'
        }}
      >
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => setActiveTab('biblioteca')}
            className="flex flex-col items-center gap-1 transition-all duration-200"
            style={{
              color: activeTab === 'biblioteca' ? 'var(--ink-charcoal)' : 'rgba(43, 37, 32, 0.5)'
            }}
          >
            <Library className="w-5 h-5" />
            <span style={{
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.02em'
            }}>
              Biblioteca
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lectura')}
            className="flex flex-col items-center gap-1 transition-all duration-200"
            style={{
              color: activeTab === 'lectura' ? 'var(--ink-charcoal)' : 'rgba(43, 37, 32, 0.5)'
            }}
          >
            <BookMarked className="w-5 h-5" />
            <span style={{
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.02em'
            }}>
              Lectura actual
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ajustes')}
            className="flex flex-col items-center gap-1 transition-all duration-200"
            style={{
              color: activeTab === 'ajustes' ? 'var(--ink-charcoal)' : 'rgba(43, 37, 32, 0.5)'
            }}
          >
            <Settings className="w-5 h-5" />
            <span style={{
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.02em'
            }}>
              Ajustes
            </span>
          </button>
        </div>
      </nav>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <AudioWidget />
    </div>
  );
}