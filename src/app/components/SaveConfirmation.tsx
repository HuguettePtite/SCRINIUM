import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cloud, Library, CheckCircle2, Sparkles, X, FileText } from 'lucide-react';

interface SaveConfirmationProps {
  fileName: string;
  onClose: () => void;
  onConfirm: (options: { local: boolean; cloud: boolean }) => void;
}

export function SaveConfirmation({ fileName, onClose, onConfirm }: SaveConfirmationProps) {
  const [localSave, setLocalSave] = useState(true);
  const [cloudSave, setCloudSave] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsComplete(true);
      setTimeout(() => {
        onConfirm({ local: localSave, cloud: cloudSave });
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2b2520]/70 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-sm bg-[#FDF5E6] rounded-sm shadow-2xl border border-[#8B4513]/30 overflow-hidden"
      >
        {/* Title Bar */}
        <div className="px-6 py-4 border-b border-[#8B4513]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B4513]" />
            <h3 className="font-serif text-lg font-bold text-[#2b2520]">Asegurar Documento</h3>
          </div>
          <button onClick={onClose} className="text-[#8B4513]/40 hover:text-[#8B4513]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* File Info */}
          <div className="flex items-center gap-3 p-3 bg-[#8B4513]/5 border border-[#8B4513]/10 rounded-sm">
            <FileText className="w-5 h-5 text-[#8B4513]/60" />
            <div className="flex-1 overflow-hidden">
              <p className="font-serif text-xs font-bold text-[#2b2520] truncate">{fileName}</p>
              <p className="text-[9px] uppercase tracking-widest text-[#8B4513]/50">Listo para archivar</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Scrinium Option */}
            <div 
              onClick={() => setLocalSave(!localSave)}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <div className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${localSave ? 'bg-[#8B4513] border-[#8B4513]' : 'border-[#8B4513]/30 bg-white'}`}>
                {localSave && <CheckCircle2 className="w-3.5 h-3.5 text-[#FDF5E6]" />}
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-[#2b2520]">Guardar en Scrinium</p>
                <p className="font-serif italic text-xs text-[#2b2520]/60">Añadir a mi estantería permanente</p>
              </div>
            </div>

            {/* Cloud Option */}
            <div className="space-y-2">
              <div 
                onClick={() => setCloudSave(!cloudSave)}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${cloudSave ? 'bg-[#8B4513] border-[#8B4513]' : 'border-[#8B4513]/30 bg-white'}`}>
                  {cloudSave && <CheckCircle2 className="w-3.5 h-3.5 text-[#FDF5E6]" />}
                </div>
                <div>
                  <p className="font-serif text-sm font-bold text-[#2b2520]">Sincronizar con Google Drive</p>
                  <p className="font-serif italic text-xs text-[#2b2520]/60">Subir copia de seguridad a la nube</p>
                </div>
              </div>
              
              {cloudSave && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-8 p-2 bg-[#8B4513]/5 border-l-2 border-[#8B4513]/20"
                >
                  <p className="text-[9px] font-mono text-[#8B4513]/70">Ruta: /Mi unidad/Scrinium_Archive/</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* AI Message */}
          <div className="p-3 bg-white border border-[#D4A574]/30 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1">
              <Sparkles className="w-3 h-3 text-[#D4A574] opacity-40" />
            </div>
            <p className="font-serif text-[11px] leading-relaxed text-[#2b2520]/80 italic">
              <span className="font-bold not-italic text-[#8B4513]">IA:</span> He optimizado el peso del archivo para que la subida a Drive sea instantánea.
            </p>
          </div>

          {/* Action Button / Animation Overlay */}
          <div className="relative pt-4">
            <AnimatePresence>
              {isSyncing && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#FDF5E6]/80">
                  <div className="relative w-full h-20 flex justify-between items-center px-10">
                    <motion.div 
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: -60, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute left-1/2 -translate-x-1/2"
                    >
                      <FileText className="w-8 h-8 text-[#8B4513]" />
                    </motion.div>
                    <Library className="w-10 h-10 text-[#8B4513]/20" />
                    <Cloud className="w-10 h-10 text-[#8B4513]/20" />
                    <motion.div 
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 60, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute left-1/2 -translate-x-1/2"
                    >
                      <FileText className="w-8 h-8 text-[#8B4513]" />
                    </motion.div>
                  </div>
                </div>
              )}

              {isComplete && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FDF5E6] gap-2">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-6 py-2 border-2 border-[#2b2520] rounded-full rotate-[-5deg] shadow-sm"
                  >
                    <span className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-[#2b2520]">Sincronizado</span>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSave}
              disabled={isSyncing || isComplete || (!localSave && !cloudSave)}
              className="w-full py-4 bg-[#8B4513] text-[#FDF5E6] rounded-sm font-serif text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              {localSave && cloudSave ? 'Guardar en ambos sitios' : 'Asegurar Documento'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
