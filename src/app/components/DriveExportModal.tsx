import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cloud, FileText, FileEdit, Folder, Check, ChevronRight, ChevronDown } from 'lucide-react';

interface DriveExportModalProps {
  onClose: () => void;
  onExport: (format: string) => void;
}

const mockHierarchy = [
  { 
    id: 'f1', 
    name: 'Investigación_Ovidio', 
    children: [
      { id: 'f1-1', name: 'Libro_I_Anotaciones' },
      { id: 'f1-2', name: 'Comparativa_Traducciones' }
    ]
  },
  { id: 'f2', name: 'Scrinium_Archive', children: [] },
  { id: 'f3', name: 'Humanidades_Clásicas', children: [] },
];

export function DriveExportModal({ onClose, onExport }: DriveExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'mirror' | 'study' | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('f2');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['f1']);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const formats = [
    { 
      id: 'mirror', 
      title: 'Versión Espejo (PDF)', 
      desc: 'Conserva las dos columnas de Latín y Español.',
      icon: FileText 
    },
    { 
      id: 'study', 
      title: 'Documento de Estudio (Docx)', 
      desc: 'Texto corrido con notas al pie generadas por la IA.',
      icon: FileEdit 
    }
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2b2520]/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="relative w-full max-w-md bg-[#FDF5E6] rounded-sm shadow-2xl border border-[#8B4513]/30 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#8B4513]/10 flex items-center justify-between bg-[#FDF5E6]">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#8B4513]" />
            <h3 className="font-serif text-sm font-bold text-[#2b2520]">Exportar a Google Drive</h3>
          </div>
          <button onClick={onClose} className="text-[#8B4513]/40 hover:text-[#8B4513]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto max-h-[80vh]">
          {/* Format Selection */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513]/60">1. Seleccionar Formato Bilingüe</p>
            <div className="grid grid-cols-1 gap-3">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id as any)}
                  className={`w-full p-4 rounded-sm border flex items-start gap-4 transition-all text-left group ${selectedFormat === format.id ? 'border-[#8B4513] bg-white shadow-sm' : 'border-[#8B4513]/10 hover:bg-[#8B4513]/5'}`}
                >
                  <div className={`p-2.5 rounded ${selectedFormat === format.id ? 'bg-[#8B4513]/10 text-[#8B4513]' : 'bg-white text-[#8B4513]/40'}`}>
                    <format.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-xs font-bold text-[#2b2520]">{format.title}</p>
                    <p className="font-serif italic text-[10px] text-[#2b2520]/60 mt-0.5 leading-tight">{format.desc}</p>
                  </div>
                  {selectedFormat === format.id && (
                    <div className="w-5 h-5 bg-[#8B4513] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Folder Hierarchy */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513]/60">2. Destino en la Nube</p>
            <div className="border border-[#8B4513]/10 bg-white rounded-sm p-3 font-serif">
              {mockHierarchy.map((folder) => (
                <div key={folder.id} className="space-y-1">
                  <div 
                    className={`flex items-center gap-2 py-1.5 px-2 rounded-sm cursor-pointer transition-colors ${selectedFolder === folder.id ? 'bg-[#8B4513]/10' : 'hover:bg-[#8B4513]/5'}`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFolder(folder.id); }}
                      className="p-1 text-[#8B4513]/40"
                    >
                      {folder.children.length > 0 ? (
                        expandedFolders.includes(folder.id) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
                      ) : <div className="w-3" />}
                    </button>
                    <Folder className={`w-4 h-4 ${selectedFolder === folder.id ? 'text-[#8B4513]' : 'text-[#8B4513]/30'}`} />
                    <span className={`text-[11px] ${selectedFolder === folder.id ? 'font-bold text-[#8B4513]' : 'text-[#2b2520]/80'}`}>
                      {folder.name}
                    </span>
                  </div>
                  
                  {expandedFolders.includes(folder.id) && folder.children.length > 0 && (
                    <div className="ml-6 space-y-1 border-l border-[#8B4513]/10">
                      {folder.children.map(child => (
                        <div 
                          key={child.id}
                          className={`flex items-center gap-2 py-1 px-3 ml-2 rounded-sm cursor-pointer ${selectedFolder === child.id ? 'bg-[#8B4513]/10' : 'hover:bg-[#8B4513]/5'}`}
                          onClick={() => setSelectedFolder(child.id)}
                        >
                          <Folder className={`w-3.5 h-3.5 ${selectedFolder === child.id ? 'text-[#8B4513]' : 'text-[#8B4513]/30'}`} />
                          <span className={`text-[10px] ${selectedFolder === child.id ? 'font-bold text-[#8B4513]' : 'text-[#2b2520]/70'}`}>
                            {child.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedFormat}
            onClick={() => selectedFormat && onExport(selectedFormat)}
            className="w-full py-4 bg-[#8B4513] text-[#FDF5E6] rounded-sm font-serif text-[11px] font-bold uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
          >
            Sincronizar con Drive
          </button>
        </div>
      </motion.div>
    </div>
  );
}
