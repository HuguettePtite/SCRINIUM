import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SubscriptionForm } from './components/SubscriptionForm';
import { HomeScreen } from './components/HomeScreen';
import { BookOpen, Sparkles } from 'lucide-react';

type Screen = 'welcome' | 'subscription' | 'complete' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('subscription')} />;
      case 'subscription':
        return <SubscriptionForm onNext={() => setCurrentScreen('complete')} />;
      case 'complete':
        return <CompletionScreen onEnter={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen />;
      default:
        return <WelcomeScreen onNext={() => setCurrentScreen('subscription')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}

function CompletionScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--parchment)' }}
    >
      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 animate-pulse">
          <BookOpen className="w-full h-full" style={{ color: 'var(--ink-charcoal)' }} />
        </div>
        <div className="absolute bottom-20 right-16 w-16 h-16 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-full h-full" style={{ color: 'var(--ink-charcoal)' }} />
        </div>
      </div>

      <div className="max-w-md w-full flex flex-col items-center text-center z-10">
        {/* Success Icon */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{ backgroundColor: 'var(--cream)', border: '2px solid var(--gold-accent)' }}
          >
            <BookOpen className="w-12 h-12" style={{ color: 'var(--ink-charcoal)' }} />
            <div 
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--ink-charcoal)' }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--gold-accent)' }} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4" style={{ 
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '2.25rem',
          fontWeight: '400',
          letterSpacing: '0.02em'
        }}>
          Bienvenido a Scrinium
        </h1>

        {/* Message */}
        <p className="mb-8 max-w-sm leading-relaxed" style={{
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          opacity: 0.75,
          fontSize: '1.05rem'
        }}>
          Tu santuario literario te espera. Explora obras atemporales, descubre obras maestras olvidadas y viaja a través de los mejores escritos de la civilización humana.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-2 mb-8 opacity-30">
          <div className="h-px w-8" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="h-px w-8" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
        </div>

        {/* Quote */}
        <blockquote className="italic mb-2" style={{
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '1rem',
          opacity: 0.7
        }}>
          "Las melodías escuchadas son dulces, pero las no escuchadas son más dulces"
        </blockquote>
        <p className="opacity-50" style={{
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '0.85rem'
        }}>
          — John Keats, Oda a una urna griega
        </p>

        {/* CTA Button */}
        <button
          className="mt-12 px-12 py-4 rounded-sm transition-all duration-300 hover:shadow-lg relative group"
          style={{
            backgroundColor: 'var(--ink-charcoal)',
            color: 'var(--cream)',
            fontFamily: 'Georgia, Garamond, serif',
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            border: '1px solid var(--gold-accent)'
          }}
          onClick={onEnter}
        >
          <span className="relative z-10">Entrar a la Biblioteca</span>
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{ backgroundColor: 'var(--gold-accent)' }}
          ></div>
        </button>
      </div>
    </div>
  );
}