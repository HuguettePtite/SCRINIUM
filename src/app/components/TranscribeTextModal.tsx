import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Feather } from 'lucide-react';

interface TranscribeTextModalProps {
  onClose: () => void;
  onSave: (data: { title: string; author: string; language: string; text: string }) => void;
}

const languages = [
  { id: 'latin', label: 'Latín' },
  { id: 'greek', label: 'Griego Antiguo' },
  { id: 'italian', label: 'Italiano' },
];

export function TranscribeTextModal({ onClose, onSave }: TranscribeTextModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedLang, setSelectedLang] = useState('latin');
  const [text, setText] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSave = () => {
    if (!title.trim() && !text.trim()) return;
    onSave({ title, author, language: selectedLang, text });
    onClose();
  };

  const modal = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backgroundColor: 'rgba(28, 28, 30, 0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAF6EE',
          border: '1px solid #D4C5A9',
          borderRadius: '6px',
          boxShadow: '0 24px 64px rgba(28,28,30,0.30)',
          overflow: 'hidden',
        }}
      >
        {/* Header — fijo, no hace scroll */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '22px 28px 18px',
            borderBottom: '1px solid #D4C5A9',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Feather style={{ width: '15px', height: '15px', color: '#B8924A', flexShrink: 0 }} />
              <h2
                style={{
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '1.12rem',
                  fontWeight: 400,
                  color: '#1C1C1E',
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                Transcribir o Pegar Pasaje
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.80rem',
                color: '#8B7355',
                lineHeight: 1.5,
                paddingLeft: '23px',
                margin: 0,
              }}
            >
              Escribe a mano o pega el fragmento que deseas conservar en tu estuche.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              flexShrink: 0,
              marginLeft: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid #D4C5A9',
              backgroundColor: 'transparent',
              color: '#8B7355',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4C5A9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
          >
            <X style={{ width: '13px', height: '13px' }} />
          </button>
        </div>

        {/* Body — con scroll vertical */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '24px 28px',
          }}
        >
          {/* Título */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355' }}>
              Título de la obra
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ej. Las Metamorfosis"
              style={{
                width: '100%',
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.94rem',
                color: '#1C1C1E',
                backgroundColor: '#F5EDD6',
                border: '1px solid #D4C5A9',
                borderRadius: '3px',
                padding: '9px 12px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#B8924A'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#D4C5A9'; }}
            />
          </div>

          {/* Autor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355' }}>
              Autor
            </label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="ej. Ovidio"
              style={{
                width: '100%',
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.94rem',
                color: '#1C1C1E',
                backgroundColor: '#F5EDD6',
                border: '1px solid #D4C5A9',
                borderRadius: '3px',
                padding: '9px 12px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#B8924A'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#D4C5A9'; }}
            />
          </div>

          {/* Chips de idioma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355' }}>
              Idioma del pasaje
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {languages.map(lang => {
                const active = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      fontSize: '0.81rem',
                      letterSpacing: '0.02em',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      backgroundColor: active ? '#1C1C1E' : 'transparent',
                      color: active ? '#FAF6EE' : '#8B7355',
                      border: active ? '1px solid #1C1C1E' : '1px solid #D4C5A9',
                    }}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textarea */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355' }}>
              Texto del pasaje
            </label>
            <div
              style={{
                position: 'relative',
                border: '1px solid #D4C5A9',
                borderRadius: '3px',
                backgroundColor: '#F5EDD6',
                transition: 'border-color 0.15s',
              }}
            >
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Pega o escribe aquí los versos que deseas transcribir…"
                rows={7}
                style={{
                  width: '100%',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '0.93rem',
                  lineHeight: '1.75',
                  color: '#1C1C1E',
                  backgroundColor: 'transparent',
                  padding: '12px 12px 36px',
                  borderRadius: '3px',
                  outline: 'none',
                  resize: 'none',
                  display: 'block',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  const wrapper = e.currentTarget.parentElement as HTMLDivElement;
                  wrapper.style.borderColor = '#B8924A';
                }}
                onBlur={e => {
                  const wrapper = e.currentTarget.parentElement as HTMLDivElement;
                  wrapper.style.borderColor = '#D4C5A9';
                }}
              />
              {/* Contador inferior */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 12px',
                  borderTop: '1px solid #D4C5A9',
                  backgroundColor: 'rgba(245, 237, 214, 0.7)',
                  borderRadius: '0 0 3px 3px',
                }}
              >
                <span style={{ fontFamily: 'Georgia, Garamond, serif', fontSize: '0.72rem', color: '#8B7355', letterSpacing: '0.02em' }}>
                  {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'} · Detección métrica activa
                </span>
                <span style={{ fontSize: '0.75rem', color: '#B8924A' }}>∿</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer — fijo, no hace scroll */}
        <div
          style={{
            flexShrink: 0,
            padding: '0 28px 24px',
            borderTop: '1px solid #D4C5A9',
            paddingTop: '16px',
          }}
        >
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '0.96rem',
              letterSpacing: '0.04em',
              backgroundColor: '#1C1C1E',
              color: '#FAF6EE',
              border: '1px solid #B8924A',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2d2d30'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1C1C1E'; }}
          >
            Guardar en el Estuche
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
