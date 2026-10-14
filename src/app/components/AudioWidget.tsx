import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Headphones, Play, Pause, SkipBack, SkipForward, X, ChevronUp } from 'lucide-react';

const recentTracks = [
  {
    id: 'metamorfosis',
    title: 'Las Metamorfosis',
    author: 'Ovidio',
    duration: '42:18',
    progress: 0.34,
  },
  {
    id: 'divina',
    title: 'Divina Commedia',
    author: 'Dante Alighieri',
    duration: '1:12:05',
    progress: 0,
  },
  {
    id: 'escaneado',
    title: 'Fragmento escaneado',
    author: 'Autor desconocido',
    duration: '3:47',
    progress: 0,
  },
];

const speeds = [0.75, 1, 1.25, 1.5, 2];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function parseDuration(str: string): number {
  const parts = str.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
}

export function AudioWidget() {
  const [open, setOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(recentTracks[0]);
  const [pronunciation, setPronunciation] = useState<'restituida' | 'eclesiastica'>('restituida');
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(
    Math.floor(parseDuration(recentTracks[0].duration) * recentTracks[0].progress)
  );
  const [speedIdx, setSpeedIdx] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const totalSeconds = parseDuration(activeTrack.duration);
  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;
  const speed = speeds[speedIdx];

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= totalSeconds) {
            setPlaying(false);
            return totalSeconds;
          }
          return prev + speed * 0.25;
        });
      }, 250);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, speed, totalSeconds]);

  const selectTrack = (track: typeof recentTracks[0]) => {
    setActiveTrack(track);
    setElapsed(Math.floor(parseDuration(track.duration) * track.progress));
    setPlaying(true);
  };

  const skip = (delta: number) => {
    setElapsed(prev => Math.max(0, Math.min(totalSeconds, prev + delta)));
  };

  const cycleSpeed = () => setSpeedIdx(i => (i + 1) % speeds.length);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setElapsed(Math.floor(ratio * totalSeconds));
  };

  // Close when clicking outside the drawer
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const widget = (
    <div style={{ position: 'fixed', bottom: '88px', right: '20px', zIndex: 8000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          width: '340px',
          backgroundColor: '#FAF6EE',
          border: '1px solid #D4C5A9',
          borderRadius: '10px',
          boxShadow: '0 16px 48px rgba(28,28,30,0.22)',
          overflow: 'hidden',
          transformOrigin: 'bottom right',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(12px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease',
        }}
      >
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid #EDE4D0' }}>
          <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355' }}>
            Lectura en voz alta
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #D4C5A9', backgroundColor: 'transparent', color: '#8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X style={{ width: '11px', height: '11px' }} />
          </button>
        </div>

        {/* Mini player */}
        <div style={{ padding: '16px 16px 12px' }}>
          {/* Track info */}
          <div style={{ marginBottom: '14px' }}>
            <p style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '1rem', fontWeight: 400, color: '#1C1C1E', margin: '0 0 2px', lineHeight: 1.3 }}>
              {activeTrack.title}
            </p>
            <p style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.78rem', color: '#8B7355', margin: 0 }}>
              {activeTrack.author}
            </p>
          </div>

          {/* Pronunciation selector */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {(['restituida', 'eclesiastica'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPronunciation(p)}
                style={{
                  flex: 1,
                  padding: '5px 0',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '0.74rem',
                  letterSpacing: '0.04em',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  backgroundColor: pronunciation === p ? '#1C1C1E' : 'transparent',
                  color: pronunciation === p ? '#FAF6EE' : '#8B7355',
                  border: pronunciation === p ? '1px solid #1C1C1E' : '1px solid #D4C5A9',
                }}
              >
                {p === 'restituida' ? 'Restituida' : 'Eclesiástica'}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div
            onClick={handleProgressClick}
            style={{ height: '4px', backgroundColor: '#E8DFC8', borderRadius: '2px', cursor: 'pointer', position: 'relative', marginBottom: '6px' }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress * 100}%`,
                backgroundColor: '#B8924A',
                borderRadius: '2px',
                transition: 'width 0.25s linear',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progress * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#B8924A',
                boxShadow: '0 0 0 2px #FAF6EE, 0 0 0 3px #B8924A',
              }}
            />
          </div>

          {/* Times */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.70rem', color: '#8B7355' }}>{formatTime(elapsed)}</span>
            <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.70rem', color: '#8B7355' }}>{activeTrack.duration}</span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            {/* Speed */}
            <button
              onClick={cycleSpeed}
              style={{
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: '#8B7355',
                backgroundColor: 'transparent',
                border: '1px solid #D4C5A9',
                borderRadius: '3px',
                padding: '3px 7px',
                cursor: 'pointer',
                minWidth: '38px',
              }}
            >
              {speed}×
            </button>

            {/* Skip back */}
            <button
              onClick={() => skip(-15)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', padding: 0 }}
            >
              <SkipBack style={{ width: '20px', height: '20px' }} />
              <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.56rem', color: '#B8924A' }}>15s</span>
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setPlaying(p => !p)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#1C1C1E',
                border: '1.5px solid #B8924A',
                color: '#FAF6EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.1s, background-color 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2d2d30'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1C1C1E'; }}
              onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.94)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              {playing
                ? <Pause style={{ width: '20px', height: '20px' }} />
                : <Play style={{ width: '20px', height: '20px', marginLeft: '2px' }} />
              }
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(15)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', padding: 0 }}
            >
              <SkipForward style={{ width: '20px', height: '20px' }} />
              <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.56rem', color: '#B8924A' }}>15s</span>
            </button>

            {/* Spacer to balance speed button */}
            <div style={{ minWidth: '38px' }} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#EDE4D0', margin: '0 16px' }} />

        {/* Recent tracks list */}
        <div style={{ padding: '10px 0 6px' }}>
          <p style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.70rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B8924A', padding: '0 16px', margin: '0 0 6px' }}>
            Lecturas recientes
          </p>
          {recentTracks.map((track, i) => {
            const isActive = activeTrack.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => selectTrack(track)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '9px 16px',
                  backgroundColor: isActive ? 'rgba(184,146,74,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s',
                  borderLeft: isActive ? '2px solid #B8924A' : '2px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(184,146,74,0.04)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
              >
                {/* Index number */}
                <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.75rem', color: '#D4C5A9', minWidth: '16px', textAlign: 'right' }}>
                  {i + 1}
                </span>

                {/* Play indicator or number */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: `1px solid ${isActive ? '#B8924A' : '#D4C5A9'}`,
                  backgroundColor: isActive ? '#1C1C1E' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}>
                  {isActive && playing
                    ? <Pause style={{ width: '10px', height: '10px', color: '#FAF6EE' }} />
                    : <Play style={{ width: '10px', height: '10px', color: isActive ? '#FAF6EE' : '#8B7355', marginLeft: '1px' }} />
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.85rem', color: '#1C1C1E', margin: '0 0 1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {track.title}
                  </p>
                  <p style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.72rem', color: '#8B7355', margin: 0 }}>
                    {track.author}
                  </p>
                </div>

                <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.70rem', color: '#B8924A', flexShrink: 0 }}>
                  {track.duration}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar reproductor' : 'Abrir reproductor de audio'}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#1C1C1E',
          border: '1.5px solid #B8924A',
          color: '#FAF6EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(28,28,30,0.32)',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background-color 0.15s',
          transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
          position: 'relative',
          flexShrink: 0,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)'; }}
        onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      >
        {open
          ? <ChevronUp style={{ width: '22px', height: '22px' }} />
          : <Headphones style={{ width: '22px', height: '22px' }} />
        }

        {/* Playing pulse ring */}
        {playing && !open && (
          <span style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid #B8924A',
            animation: 'pulse-ring 1.8s ease-out infinite',
            opacity: 0.6,
            pointerEvents: 'none',
          }} />
        )}
      </button>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>
    </div>
  );

  return createPortal(widget, document.body);
}
