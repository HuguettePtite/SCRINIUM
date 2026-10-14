import { motion } from 'motion/react';
import { Folder, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';

interface OrganizeInCaseProps {
  documentName: string;
  onConfirm: () => void;
  onBack: () => void;
}

export function OrganizeInCase({ documentName, onConfirm, onBack }: OrganizeInCaseProps) {
  const folders = [
    { id: 'letras', name: 'Apuntes de Letras', active: true },
    { id: 'ovidio', name: 'Textos de Ovidio', active: false },
    { id: 'latin', name: 'Seminario de Latín', active: false },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink-charcoal) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 transition-colors">
          <ArrowLeft className="w-6 h-6" style={{ color: 'var(--ink-charcoal)' }} />
        </button>
        <h2 className="font-serif text-xl italic" style={{ color: 'var(--ink-charcoal)' }}>Organizar en el Estuche</h2>
        <div className="w-10" />
      </div>

      <div className="w-full max-w-lg mt-12 relative">
        {/* AI Tooltip */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-lg shadow-lg border border-amber-200/50 flex items-center gap-2 z-30"
          style={{ backgroundColor: '#FFF9E6', color: '#B45309' }}
        >
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-serif italic">IA: Organizando por autor y fecha detectada automáticamente</span>
        </motion.div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          {folders.map((folder) => (
            <div key={folder.id} className="relative group">
              {/* Glow effect for active folder */}
              {folder.active && (
                <motion.div 
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4 bg-amber-400/20 blur-xl rounded-full z-0"
                />
              )}
              
              <div 
                className={`relative z-10 p-4 rounded-lg flex flex-col items-center gap-3 transition-all duration-500 shadow-[4px_4px_15px_rgba(0,0,0,0.1)] border-b-4 ${folder.active ? 'scale-105' : 'opacity-80'}`}
                style={{ 
                  backgroundColor: '#3D2B1F', // Leather color
                  borderColor: '#2A1D15',
                }}
              >
                {/* Brass Label Effect */}
                <div className="w-full bg-[#D4A574] px-2 py-1 rounded-sm border border-[#A67C52] shadow-inner mb-2">
                  <p className="text-[9px] text-center font-serif font-bold uppercase tracking-wider text-[#2A1D15] truncate">
                    {folder.name}
                  </p>
                </div>
                
                <Folder className={`w-12 h-12 ${folder.active ? 'text-[#D4A574]' : 'text-[#8D6E63]'} opacity-80`} strokeWidth={1.5} />
                
                {/* Visual slot indicator */}
                <div className="w-full h-1 bg-black/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: folder.active ? "100%" : "0%" }}
                    className="h-full bg-[#D4A574]/40"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Document Animation */}
        <motion.div 
          initial={{ x: 100, y: 100, opacity: 0, scale: 0.8 }}
          animate={{ 
            x: -120, 
            y: -10, 
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-0 bottom-0 z-20 pointer-events-none"
        >
          <div className="bg-white p-3 shadow-2xl border border-gray-200 rotate-6" style={{ width: '80px', height: '110px' }}>
            <div className="space-y-1">
              <div className="h-1 w-full bg-gray-100" />
              <div className="h-1 w-full bg-gray-100" />
              <div className="h-1 w-3/4 bg-gray-100" />
              <div className="h-4 w-full bg-gray-50 mt-2" />
              <div className="h-1 w-full bg-gray-100 mt-2" />
            </div>
            <p className="text-[6px] font-serif font-bold mt-2 truncate text-gray-400">{documentName}</p>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Area */}
      <div className="mt-24 flex flex-col items-center gap-6">
        <div className="relative">
          {/* Wax Seal Decoration */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-4 -top-4 z-10 w-12 h-12 flex items-center justify-center cursor-pointer hover:rotate-12 transition-transform"
          >
            <div className="absolute inset-0 bg-[#A62C2B] rounded-full blur-[1px] shadow-lg border-2 border-[#82201F]" />
            <div className="relative z-10 text-[#FDF5E6] font-serif font-bold text-xs transform -rotate-12">S</div>
            <div className="absolute inset-0 bg-white/10 rounded-full" />
          </motion.div>

          <button
            onClick={onConfirm}
            className="px-10 py-4 rounded-sm font-serif text-sm font-bold tracking-[0.2em] uppercase transition-all active:scale-95 shadow-[0_8px_25px_rgba(43,37,32,0.2)] hover:shadow-[0_12px_35px_rgba(43,37,32,0.3)]"
            style={{ 
              backgroundColor: 'var(--ink-charcoal)',
              color: 'var(--cream)',
              border: '1px solid var(--gold-accent)'
            }}
          >
            Confirmar ubicación
          </button>
        </div>

        <p className="text-[10px] font-serif italic opacity-40 uppercase tracking-widest text-center">
          El estuche se cerrará permanentemente <br/> tras la confirmación
        </p>
      </div>

      <style>{`
        @keyframes shine {
          from { transform: translateX(-100%) rotate(45deg); }
          to { transform: translateX(200%) rotate(45deg); }
        }
        .leather-texture {
          background-image: url("https://www.transparenttextures.com/patterns/leather.png");
        }
      `}</style>
    </div>
  );
}
