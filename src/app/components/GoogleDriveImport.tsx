import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, FileText, FileCode, FileType, Check, Cloud, Filter } from 'lucide-react';

interface GoogleDriveImportProps {
  onClose: () => void;
  onImport: (file: { name: string, type: string }) => void;
}

const mockFiles = [
  { id: '1', name: 'Ensayo_Final_Humanidades.docx', type: 'DOCX', size: '2.4 MB', date: 'Hace 2 horas' },
  { id: '2', name: 'Escaneos_Biblioteca_Central.pdf', type: 'PDF', size: '15.8 MB', date: 'Ayer' },
  { id: '3', name: 'Notas_Seminario_Dante.gdoc', type: 'GDOC', size: '12 KB', date: '15 ene 2026' },
  { id: '4', name: 'Traduccion_Ovidio_Libro_II.pdf', type: 'PDF', size: '4.1 MB', date: '10 ene 2026' },
];

export function GoogleDriveImport({ onClose, onImport }: GoogleDriveImportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pdf' | 'doc'>('all');

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'pdf' && file.type === 'PDF') || 
      (filter === 'doc' && (file.type === 'DOCX' || file.type === 'GDOC'));
    return matchesSearch && matchesFilter;
  });

  const selectedFile = mockFiles.find(f => f.id === selectedFileId);

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2b2520]/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg flex flex-col shadow-2xl overflow-hidden"
        style={{ 
          backgroundColor: '#FDF5E6',
          border: '1px solid #8B4513',
          borderRadius: '8px',
          maxHeight: '85vh'
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#8B4513]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded bg-[#D4A574]/10 border border-[#D4A574]/20">
              <Cloud className="w-6 h-6 text-[#8B4513] opacity-60" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2b2520] leading-none">Mis Pergaminos en la Nube</h3>
              <p className="font-serif italic text-[10px] text-[#2b2520]/50 mt-1 uppercase tracking-widest">Sincronizado con Google Drive</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#8B4513]/5 rounded-full transition-colors text-[#8B4513]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 space-y-4 bg-[#8B4513]/5 border-b border-[#8B4513]/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B4513]/40" />
            <input 
              type="text"
              placeholder="Busca en todo tu Drive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#8B4513]/20 rounded-sm font-serif text-sm outline-none focus:border-[#8B4513]/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]/60 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filtrar:
            </span>
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${filter === 'all' ? 'bg-[#8B4513] text-[#FDF5E6]' : 'bg-transparent text-[#8B4513] border border-[#8B4513]/20'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('pdf')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${filter === 'pdf' ? 'bg-[#8B4513] text-[#FDF5E6]' : 'bg-transparent text-[#8B4513] border border-[#8B4513]/20'}`}
            >
              Solo PDFs
            </button>
            <button 
              onClick={() => setFilter('doc')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${filter === 'doc' ? 'bg-[#8B4513] text-[#FDF5E6]' : 'bg-transparent text-[#8B4513] border border-[#8B4513]/20'}`}
            >
              Documentos de Texto
            </button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-2">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full p-4 flex items-center gap-4 text-left transition-all border rounded-sm group ${selectedFileId === file.id ? 'border-[#8B4513] bg-white shadow-md' : 'border-transparent hover:bg-[#8B4513]/5'}`}
                >
                  <div className={`p-2 rounded bg-white border border-[#8B4513]/10 ${selectedFileId === file.id ? 'border-[#8B4513]/30' : ''}`}>
                    {file.type === 'PDF' ? <FileText className="w-5 h-5 text-red-700/60" /> : <FileCode className="w-5 h-5 text-blue-700/60" />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-serif text-sm font-bold text-[#2b2520] truncate">{file.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#2b2520]/50 font-serif italic">{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-[#2b2520]/20" />
                      <span className="text-[10px] text-[#2b2520]/50 font-serif italic">{file.date}</span>
                    </div>
                  </div>
                  {selectedFileId === file.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-4 h-4 text-[#8B4513]" />
                    </motion.div>
                  )}
                </button>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif italic text-sm text-[#2b2520]/40">No se han encontrado pergaminos que coincidan...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-[#8B4513]/10 bg-[#FDF5E6] flex items-center justify-between">
          <div className="text-[10px] font-serif italic text-[#8B4513]/60">
            {selectedFile ? `Has seleccionado 1 archivo` : 'Selecciona un archivo para continuar'}
          </div>
          <button
            disabled={!selectedFileId}
            onClick={() => selectedFile && onImport({ name: selectedFile.name, type: selectedFile.type })}
            className="px-8 py-3 bg-[#8B4513] text-[#FDF5E6] rounded-sm font-serif text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
          >
            Compartir al Scrinium
          </button>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 69, 19, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
