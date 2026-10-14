import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Tag, Languages, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';

interface DocumentConfirmationProps {
  onConfirm: (data: { name: string; author: string; language: string; type: string }) => void;
  onCancel: () => void;
}

export function DocumentConfirmation({ onConfirm, onCancel }: DocumentConfirmationProps) {
  const [docName, setDocName] = useState('Apuntes_Ovidio_Clase_Limpio');
  const [isAnimating, setIsAnimating] = useState(false);

  const metadata = {
    author: 'Ovidio',
    language: 'Latín',
    type: 'Apuntes de clase'
  };

  const handleFinalize = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onConfirm({ name: docName, ...metadata });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6 bg-[#2b2520]/60 backdrop-blur-sm">
      <AnimatePresence>
        {!isAnimating ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            className="w-full max-w-sm rounded-sm overflow-hidden shadow-2xl"
            style={{ backgroundColor: 'var(--parchment)', border: '1px solid var(--gold-accent)' }}
          >
            {/* Header / Identity */}
            <div className="p-6 text-center border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
              <div className="w-16 h-16 bg-[#D4A574]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4A574]/30">
                <BookOpen className="w-8 h-8 text-[#D4A574]" />
              </div>
              <h2 className="font-serif text-lg font-bold text-[#2b2520] mb-1">Nuevo Tesoro Detectado</h2>
              <p className="text-xs font-serif italic opacity-60">Asigna un nombre a tu documento restaurado</p>
            </div>

            {/* Input Section */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-serif font-bold opacity-50">Nombre del archivo</label>
                <input 
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-white/50 border-b-2 border-[#D4A574]/30 py-2 px-1 font-serif text-sm focus:outline-none focus:border-[#D4A574] transition-colors"
                />
              </div>

              {/* AI Metadata Tags */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-serif font-bold opacity-50">Metadatos Académicos (IA)</label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-3 p-2 rounded bg-white/40 border border-[#2b2520]/5">
                    <Tag className="w-4 h-4 text-[#D4A574]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] opacity-40 leading-none">Autor detectado</span>
                      <span className="text-xs font-serif font-bold">{metadata.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded bg-white/40 border border-[#2b2520]/5">
                    <Languages className="w-4 h-4 text-[#D4A574]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] opacity-40 leading-none">Idioma</span>
                      <span className="text-xs font-serif font-bold">{metadata.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded bg-white/40 border border-[#2b2520]/5">
                    <GraduationCap className="w-4 h-4 text-[#D4A574]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] opacity-40 leading-none">Tipo</span>
                      <span className="text-xs font-serif font-bold">{metadata.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-white/30 flex gap-3">
              <button 
                onClick={onCancel}
                className="flex-1 py-3 text-[10px] font-serif uppercase tracking-widest opacity-40 font-bold"
              >
                Descartar
              </button>
              <button 
                onClick={handleFinalize}
                className="flex-[2] py-3 bg-[#2b2520] text-[#F5F5DC] rounded-sm flex items-center justify-center gap-2 border border-[#D4A574] active:scale-[0.98] transition-transform"
              >
                <span className="text-xs font-serif uppercase tracking-widest font-bold">Colocar en mi Scrinium</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Fly-away animation */}
             <motion.div 
               initial={{ scale: 1, y: 0, opacity: 1 }}
               animate={{ 
                 scale: 0.2, 
                 y: 400, 
                 x: -100, 
                 opacity: 0,
                 rotate: 15
               }}
               transition={{ duration: 1.2, ease: "easeInOut" }}
               className="w-48 h-64 bg-white shadow-2xl flex flex-col p-4 border-2 border-[#D4A574]"
             >
                <div className="w-full h-32 bg-[#2b2520]/5 mb-4" />
                <div className="h-2 w-full bg-[#2b2520]/10 mb-2" />
                <div className="h-2 w-3/4 bg-[#2b2520]/10 mb-2" />
                <div className="h-2 w-1/2 bg-[#2b2520]/10" />
                <div className="mt-auto flex justify-end">
                   <CheckCircle2 className="w-8 h-8 text-[#D4A574]" />
                </div>
             </motion.div>
             
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="absolute inset-0 flex items-center justify-center pointer-events-none"
             >
                <span className="text-white font-serif italic text-lg tracking-widest">Añadiendo a la estantería...</span>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
