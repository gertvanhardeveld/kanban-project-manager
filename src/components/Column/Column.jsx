import { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { Card } from '../Card/Card';
import { CardForm } from '../Card/CardForm';

export const Column = ({ column }) => {
  const { cards, moveCard } = useBoard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Filter kaarten op basis van kolom status
  const columnCards = cards.filter(card => card.status === column.id);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      moveCard(cardId, column.id);
    }
  };

  const getColumnColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          indicator: 'bg-ontwerp',
          headerBg: 'bg-ontwerp-light',
          dragOverRing: 'ring-ontwerp',
          emptyIcon: 'text-ontwerp',
        };
      case 'orange':
        return {
          indicator: 'bg-uitvoering',
          headerBg: 'bg-uitvoering-light',
          dragOverRing: 'ring-uitvoering',
          emptyIcon: 'text-uitvoering',
        };
      case 'green':
        return {
          indicator: 'bg-klaar',
          headerBg: 'bg-klaar-light',
          dragOverRing: 'ring-klaar',
          emptyIcon: 'text-klaar',
        };
      default:
        return {
          indicator: 'bg-gray-500',
          headerBg: 'bg-gray-100',
          dragOverRing: 'ring-gray-500',
          emptyIcon: 'text-gray-500',
        };
    }
  };

  const colorClasses = getColumnColorClasses(column.color);

  const getEmptyStateContent = () => {
    const emptyStates = {
      ontwerp: {
        icon: (
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        title: 'Begin met plannen',
        description: 'Voeg ideeën en concepten toe die je wilt uitwerken',
      },
      uitvoering: {
        icon: (
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        title: 'Klaar om te starten',
        description: 'Sleep taken hierheen om eraan te beginnen',
      },
      klaar: {
        icon: (
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: 'Nog geen voltooide taken',
        description: 'Sleep afgeronde taken hierheen',
      },
    };

    return emptyStates[column.id] || emptyStates.ontwerp;
  };

  const emptyState = getEmptyStateContent();

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`${column.title} kolom met ${columnCards.length} ${columnCards.length === 1 ? 'kaart' : 'kaarten'}`}
      className={`
        bg-gray-50 rounded-xl p-5 flex flex-col h-full
        border-2 transition-all duration-250
        ${isDragOver
          ? `ring-4 ${colorClasses.dragOverRing} ring-opacity-50 bg-white scale-[1.02] shadow-lg border-transparent`
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      style={{ minHeight: '600px' }}
    >
      {/* Column Header */}
      <header className={`${colorClasses.headerBg} rounded-lg p-3 mb-4 transition-colors`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${colorClasses.indicator} shadow-sm`}
              aria-hidden="true"
            ></div>
            <h2 className="font-bold text-lg text-gray-900 tracking-tight">
              {column.title}
            </h2>
            <span
              className="bg-white bg-opacity-80 text-gray-700 text-sm font-semibold px-2.5 py-1 rounded-full min-w-[2rem] text-center shadow-sm"
              aria-label={`${columnCards.length} ${columnCards.length === 1 ? 'kaart' : 'kaarten'}`}
            >
              {columnCards.length}
            </span>
          </div>
        </div>
      </header>

      {/* Drag Over Indicator */}
      {isDragOver && (
        <div className="mb-4 p-4 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg animate-pulse">
          <p className="text-blue-700 text-sm font-medium text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Laat los om de kaart toe te voegen
          </p>
        </div>
      )}

      {/* Cards Container */}
      <div
        className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        role="list"
      >
        {/* Add Card Form */}
        {showAddForm && (
          <CardForm
            status={column.id}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {/* Empty State */}
        {columnCards.length === 0 && !showAddForm ? (
          <div
            className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in"
            role="status"
            aria-label="Lege kolom"
          >
            <div className={`${colorClasses.emptyIcon} mb-4 opacity-40`}>
              {emptyState.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {emptyState.title}
            </h3>
            <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
              {emptyState.description}
            </p>
          </div>
        ) : (
          columnCards.map(card => (
            <Card key={card.id} card={card} />
          ))
        )}
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setShowAddForm(true)}
        disabled={showAddForm}
        className="mt-4 w-full py-3 px-4 bg-white border-2 border-gray-300 border-dashed rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium group focus-ring"
        aria-label={`Nieuwe kaart toevoegen aan ${column.title}`}
      >
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Kaart toevoegen</span>
      </button>
    </section>
  );
};
