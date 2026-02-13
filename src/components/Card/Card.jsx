import { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { CardForm } from './CardForm';

export const Card = ({ card }) => {
  const { deleteCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (isEditing) {
    return (
      <CardForm
        card={card}
        status={card.status}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCard(card.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', card.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          label: 'Hoog',
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Gemiddeld',
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'low':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Laag',
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: priority,
          icon: null,
        };
    }
  };

  const priorityConfig = getPriorityConfig(card.priority);

  return (
    <article
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Kaart: ${card.title}. Druk op Enter om te bewerken`}
      className={`
        bg-white rounded-lg shadow-card border border-gray-200
        p-4 group cursor-move select-none
        hover:shadow-card-hover hover:border-blue-300
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        transition-all duration-250 animate-fade-in
        ${isDragging ? 'opacity-40 scale-95 shadow-card-drag rotate-2' : 'opacity-100 scale-100'}
      `}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-semibold text-gray-900 flex-1 leading-tight text-base">
          {card.title}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" role="group" aria-label="Kaart acties">
          <button
            onClick={handleEdit}
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors focus-ring"
            aria-label="Kaart bewerken"
            title="Bewerken"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors focus-ring"
            aria-label="Kaart verwijderen"
            title="Verwijderen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Description */}
      {card.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
          {card.description}
        </p>
      )}

      {/* Card Footer - Priority & Tags */}
      <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
        {/* Priority Badge */}
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}
          aria-label={`Prioriteit: ${priorityConfig.label}`}
        >
          {priorityConfig.icon}
          <span>{priorityConfig.label}</span>
        </span>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          card.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
            >
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {tag}
            </span>
          ))
        )}
      </div>

      {/* Metadata - Subtle timestamp */}
      {card.updatedAt && (
        <div className="mt-3 pt-2 border-t border-gray-50">
          <time
            className="text-xs text-gray-400"
            dateTime={card.updatedAt}
          >
            Laatst bijgewerkt: {new Date(card.updatedAt).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
        </div>
      )}
    </article>
  );
};
