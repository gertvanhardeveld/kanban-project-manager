import { useState, useEffect, useRef } from 'react';
import { useBoard } from '../../context/BoardContext';
import { PRIORITY_LEVELS } from '../../utils/constants';

export const CardForm = ({ card = null, status, onClose }) => {
  const { addCard, updateCard } = useBoard();
  const titleInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: card?.title || '',
    description: card?.description || '',
    priority: card?.priority || 'medium',
    tags: card?.tags?.join(', ') || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-focus op de titel input bij mount
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Titel is verplicht';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Titel mag maximaal 100 karakters bevatten';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Beschrijving mag maximaal 500 karakters bevatten';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      if (card) {
        updateCard(card.id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          priority: formData.priority,
          tags: tagsArray,
        });
      } else {
        addCard({
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: status,
          priority: formData.priority,
          tags: tagsArray,
        });
      }

      onClose();
    } catch (error) {
      setErrors({ submit: 'Er is een fout opgetreden. Probeer het opnieuw.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error voor dit veld als er een was
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleKeyDown = (e) => {
    // Sluit formulier bij Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const getPriorityLabel = (level) => {
    const labels = {
      low: 'Laag',
      medium: 'Gemiddeld',
      high: 'Hoog',
    };
    return labels[level] || level;
  };

  const getPriorityIcon = (level) => {
    switch (level) {
      case 'high':
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'low':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-300 p-5 mb-3 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {card ? 'Kaart bewerken' : 'Nieuwe kaart'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded focus-ring"
          aria-label="Sluiten"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titel <span className="text-red-500">*</span>
          </label>
          <input
            ref={titleInputRef}
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Bijv. Nieuwe feature implementeren"
            maxLength={100}
            aria-invalid={errors.title ? 'true' : 'false'}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          <div className="mt-1 flex justify-between items-start">
            {errors.title && (
              <p id="title-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title}
              </p>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.title.length}/100
            </span>
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Beschrijving
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 resize-none ${
              errors.description
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Geef een gedetailleerde beschrijving van de taak..."
            rows={4}
            maxLength={500}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          <div className="mt-1 flex justify-between items-start">
            {errors.description && (
              <p id="description-error" className="text-red-600 text-sm" role="alert">
                {errors.description}
              </p>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.description.length}/500
            </span>
          </div>
        </div>

        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Prioriteit
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
          >
            {PRIORITY_LEVELS.map(level => (
              <option key={level} value={level}>
                {getPriorityLabel(level)}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
            {getPriorityIcon(formData.priority)}
            Geselecteerd: {getPriorityLabel(formData.priority)}
          </p>
        </div>

        {/* Tags Field */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
            placeholder="frontend, bug, urgent (gescheiden door komma)"
          />
          <p className="mt-1 text-xs text-gray-500">
            Gebruik komma's om meerdere tags te scheiden
          </p>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
            <p className="text-red-800 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.submit}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium focus-ring flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Bezig...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {card ? 'Bijwerken' : 'Toevoegen'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium focus-ring"
          >
            Annuleren
          </button>
        </div>

        {/* Keyboard Hint */}
        <p className="text-xs text-gray-500 text-center pt-2">
          Druk op <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Esc</kbd> om te sluiten
        </p>
      </form>
    </div>
  );
};
