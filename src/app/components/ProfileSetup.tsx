import { useState } from 'react';
import { Check, Feather } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: () => void;
}

const classicalAuthors = [
  'William Shakespeare',
  'Jane Austen',
  'Charles Dickens',
  'Leo Tolstoy',
  'Fyodor Dostoevsky',
  'Victor Hugo',
  'Emily Brontë',
  'Charlotte Brontë',
  'Mary Shelley',
  'Edgar Allan Poe',
  'Mark Twain',
  'Oscar Wilde',
  'Homer',
  'Virgil',
  'Dante Alighieri',
  'Miguel de Cervantes',
  'John Milton',
  'Geoffrey Chaucer',
  'Alexandre Dumas',
  'Gustave Flaubert',
  'Honoré de Balzac',
  'George Eliot',
  'Thomas Hardy',
  'Herman Melville',
  'Nathaniel Hawthorne'
];

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 relative overflow-y-auto" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Header - Fixed at top */}
      <div className="max-w-md w-full mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--parchment)', border: '1px solid var(--gold-accent)' }}>
            <Feather className="w-8 h-8" style={{ color: 'var(--ink-charcoal)' }} />
          </div>
          <h2 className="mb-3" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '2rem',
            fontWeight: '400',
            letterSpacing: '0.02em'
          }}>
            Your Literary Tastes
          </h2>
          <p className="leading-relaxed mb-2" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            opacity: 0.7,
            fontSize: '0.95rem'
          }}>
            Select your favorite classical authors
          </p>
          <p className="leading-relaxed" style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            opacity: 0.5,
            fontSize: '0.85rem',
            fontStyle: 'italic'
          }}>
            {selectedAuthors.length} selected
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-8 opacity-20">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--ink-charcoal)' }}></div>
        </div>
      </div>

      {/* Author Selection Grid */}
      <div className="max-w-md w-full mx-auto flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {classicalAuthors.map((author) => (
              <button
                key={author}
                type="button"
                onClick={() => toggleAuthor(author)}
                className="flex items-center justify-between px-5 py-4 rounded-sm transition-all duration-200 hover:shadow-md group"
                style={{
                  backgroundColor: selectedAuthors.includes(author) ? 'var(--parchment)' : 'var(--cream)',
                  border: selectedAuthors.includes(author) 
                    ? '1.5px solid var(--gold-accent)' 
                    : '1px solid rgba(43, 37, 32, 0.12)',
                }}
              >
                <span 
                  className="transition-all duration-200"
                  style={{
                    fontFamily: 'Georgia, Garamond, serif',
                    color: 'var(--ink-charcoal)',
                    fontSize: '1rem',
                    opacity: selectedAuthors.includes(author) ? 1 : 0.75
                  }}
                >
                  {author}
                </span>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: selectedAuthors.includes(author) ? 'var(--ink-charcoal)' : 'transparent',
                    border: selectedAuthors.includes(author) ? 'none' : '1.5px solid rgba(43, 37, 32, 0.25)'
                  }}
                >
                  {selectedAuthors.includes(author) && (
                    <Check className="w-4 h-4" style={{ color: 'var(--cream)' }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button - Fixed at bottom */}
          <div className="sticky bottom-0 pt-6 pb-2" style={{ backgroundColor: 'var(--cream)' }}>
            <button
              type="submit"
              disabled={selectedAuthors.length === 0}
              className="w-full py-4 rounded-sm transition-all duration-300 hover:shadow-lg relative group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--ink-charcoal)',
                color: 'var(--cream)',
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                border: '1px solid var(--gold-accent)'
              }}
            >
              <span className="relative z-10">
                {selectedAuthors.length === 0 ? 'Select at least one author' : 'Complete Setup'}
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: 'var(--gold-accent)' }}
              ></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
