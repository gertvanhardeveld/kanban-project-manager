import { COLUMNS } from '../../utils/constants';
import { Column } from '../Column/Column';

export const Board = () => {
  return (
    <main
      className="flex-1 overflow-x-auto overflow-y-hidden"
      role="main"
      aria-label="Kanban bord"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
        {/* Board Header - Optional descriptive text */}
        <div className="mb-6 animate-fade-in">
          <p className="text-sm text-gray-600 max-w-2xl">
            Sleep kaarten tussen kolommen om de status bij te werken. Gebruik drag & drop voor eenvoudig projectbeheer.
          </p>
        </div>

        {/* Board Grid */}
        <div
          className="grid gap-4 sm:gap-5 lg:gap-6 h-[calc(100vh-12rem)] pb-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          }}
        >
          {COLUMNS.map((column, index) => (
            <div
              key={column.id}
              className="animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              <Column column={column} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-75 text-white text-xs px-3 py-2 rounded-full flex items-center gap-2 animate-fade-in pointer-events-none">
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Swipe om te scrollen</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </main>
  );
};
