import { useState } from 'react';
import { Mail, User, Lock } from 'lucide-react';

interface SubscriptionFormProps {
  onNext: () => void;
}

export function SubscriptionForm({ onNext }: SubscriptionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative" style={{ backgroundColor: 'var(--parchment)' }}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--gold-accent)', opacity: 0.3 }}></div>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="mb-3" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '2rem',
            fontWeight: '400',
            letterSpacing: '0.02em'
          }}>
            Únete a la Biblioteca
          </h2>
          <p className="leading-relaxed" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            opacity: 0.7,
            fontSize: '0.95rem'
          }}>
            Comienza tu viaje a través de las épocas de la literatura clásica
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-10 opacity-20">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <label 
              htmlFor="name" 
              className="block mb-2.5"
              style={{
                fontFamily: 'Georgia, Garamond, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '0.9rem',
                letterSpacing: '0.03em'
              }}
            >
              Tu Nombre
            </label>
            <div className="relative">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" 
                style={{ color: 'var(--ink-charcoal)' }}
              />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: 'var(--cream)',
                  color: 'var(--ink-charcoal)',
                  border: '1px solid rgba(43, 37, 32, 0.15)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '1rem'
                }}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <label 
              htmlFor="email" 
              className="block mb-2.5"
              style={{
                fontFamily: 'Georgia, Garamond, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '0.9rem',
                letterSpacing: '0.03em'
              }}
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" 
                style={{ color: 'var(--ink-charcoal)' }}
              />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: 'var(--cream)',
                  color: 'var(--ink-charcoal)',
                  border: '1px solid rgba(43, 37, 32, 0.15)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '1rem'
                }}
                placeholder="tu.correo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label 
              htmlFor="password" 
              className="block mb-2.5"
              style={{
                fontFamily: 'Georgia, Garamond, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '0.9rem',
                letterSpacing: '0.03em'
              }}
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" 
                style={{ color: 'var(--ink-charcoal)' }}
              />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: 'var(--cream)',
                  color: 'var(--ink-charcoal)',
                  border: '1px solid rgba(43, 37, 32, 0.15)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '1rem'
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-sm transition-all duration-300 hover:shadow-lg mt-8 relative group"
            style={{
              backgroundColor: 'var(--ink-charcoal)',
              color: 'var(--cream)',
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              border: '1px solid var(--gold-accent)'
            }}
          >
            <span className="relative z-10">Continuar</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: 'var(--gold-accent)' }}
            ></div>
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center mt-8 italic opacity-50" style={{
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '0.85rem'
        }}>
          Tu información se mantiene privada y segura
        </p>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--gold-accent)', opacity: 0.3 }}></div>
    </div>
  );
}