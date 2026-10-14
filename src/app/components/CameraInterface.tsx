import { motion } from 'motion/react';
import { X, Zap, FileText, Image as ImageIcon, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CameraInterfaceProps {
  onClose: () => void;
  onCapture: () => void;
}

export function CameraInterface({ onClose, onCapture }: CameraInterfaceProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden">
      {/* Camera Viewport */}
      <div className="relative flex-1 w-full bg-[#1a1a1a] flex items-center justify-center">
        {/* Mock Camera Feed - Unsplash image of old manuscript */}
        <div className="absolute inset-0 w-full h-full opacity-80">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1614117055705-6f8506aaea11?q=80&w=1080"
            alt="Camera feed"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scan Guides - Victorian Style Corners */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <div className="relative w-full max-w-md aspect-[3/4] border border-white/20">
            {/* Top Left Corner */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#D4A574]" />
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4A574]/50" />
            
            {/* Top Right Corner */}
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#D4A574]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4A574]/50" />
            
            {/* Bottom Left Corner */}
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#D4A574]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4A574]/50" />
            
            {/* Bottom Right Corner */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#D4A574]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4A574]/50" />

            {/* AI Scan Line Animation */}
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A574] to-transparent shadow-[0_0_15px_#D4A574] z-10"
            />
            
            {/* Floating OCR Particles/Dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-[#D4A574] rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col gap-4">
            <button className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-black/40 text-[#D4A574] backdrop-blur-sm border border-[#D4A574]/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="h-48 bg-black flex items-center justify-around px-8">
        <button className="flex flex-col items-center gap-2 text-white/60">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-serif">Galería</span>
        </button>

        <div className="relative">
          {/* Shutter Button - Antique Style */}
          <button 
            onClick={onCapture}
            className="group relative w-24 h-24 rounded-full flex items-center justify-center p-2"
            style={{
              background: 'radial-gradient(circle, #2b2520 0%, #1a1510 100%)',
              boxShadow: '0 0 0 4px rgba(212, 165, 116, 0.2), inset 0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            <div 
              className="w-full h-full rounded-full border-2 border-[#D4A574]/40 flex items-center justify-center transition-all group-active:scale-95 group-active:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #3d352d 0%, #1a1510 100%)'
              }}
            >
              {/* Scrinium Logo Icon in Shutter */}
              <div className="text-[#D4A574] opacity-80 flex flex-col items-center">
                <Camera className="w-8 h-8 mb-0.5" strokeWidth={1.5} />
                <span className="text-[8px] font-serif tracking-tighter uppercase font-bold">Scrinium</span>
              </div>
            </div>
            
            {/* Decorative Inner Ring */}
            <div className="absolute inset-4 rounded-full border border-[#D4A574]/10 pointer-events-none" />
          </button>
        </div>

        <div className="w-12 h-12 flex items-center justify-center opacity-40">
           <div className="w-1 h-1 rounded-full bg-white mx-0.5" />
           <div className="w-1 h-1 rounded-full bg-white mx-0.5" />
           <div className="w-1 h-1 rounded-full bg-white mx-0.5" />
        </div>
      </div>

      {/* Aesthetic Border/Frame Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-black border-opacity-20" />
    </div>
  );
}
