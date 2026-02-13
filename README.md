# 📋 Kanban Project Manager

Een moderne, toegankelijke en responsive Kanban board applicatie gebouwd met React, Vite en Tailwind CSS. Perfect voor het beheren van projecten en taken met een intuïtieve drag & drop interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/vite-7.3.1-646cff.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.4.19-38bdf8.svg)

## ✨ Features

### 🎯 Core Functionaliteit
- **Drag & Drop**: Intuïtieve kaarten beheer met drag and drop tussen kolommen
- **Drie Kolommen**: Ontwerp, Uitvoering, en Klaar voor gestructureerd workflow management
- **Card Management**: Volledige CRUD operaties voor taken
- **Priority Levels**: Visuele prioriteits-indicatoren (Hoog, Gemiddeld, Laag)
- **Tags Support**: Categoriseer taken met custom tags
- **LocalStorage Persistence**: Automatische data opslag in browser
- **Real-time Updates**: Instant visuele feedback bij alle acties

### 🎨 Design & UX
- **Modern Design System**: CSS Custom Properties met semantische design tokens
- **Responsive Layout**: Mobile-first design voor alle schermformaten
- **Smooth Animations**: Professionele fade-in, slide-up en scale animaties
- **Empty States**: Contextuele lege state messaging per kolom
- **Loading States**: Visuele feedback tijdens acties
- **Error Handling**: Duidelijke foutmeldingen en validatie

### ♿ Toegankelijkheid (A11y)
- **WCAG 2.1 AA Compliant**: Voldoet aan toegankelijkheidsstandaarden
- **Keyboard Navigation**: Volledige toetsenbord support (Tab, Enter, Space, Escape)
- **Screen Reader Friendly**: ARIA labels en semantic HTML
- **Focus Management**: Duidelijke focus indicators
- **Color Contrast**: Minimaal 4.5:1 contrast ratio
- **Reduced Motion Support**: Respecteert prefers-reduced-motion

## 🚀 Getting Started

### Vereisten

- Node.js (versie 18 of hoger)
- npm of yarn

### Installatie

1. Clone de repository:
```bash
git clone https://github.com/gertvanhardeveld/kanban-project-manager.git
cd kanban-project-manager
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. Open je browser en navigeer naar `http://localhost:5173`

### Beschikbare Scripts

```bash
npm run dev      # Start development server met HMR
npm run build    # Bouw productie versie
npm run preview  # Preview productie build
npm run lint     # Run ESLint
```

## 🏗️ Tech Stack

### Core
- **[React 19](https://react.dev/)** - UI library met latest features
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management
- **React Context API** - Centralized state management
- **React Hooks** - useState, useEffect, useReducer, useContext
- **Custom Hooks** - useLocalStorage voor data persistence

### Development Tools
- **ESLint** - Code linting en quality checks
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatische vendor prefixes

## 📁 Project Structuur

```
kanban-project-manager/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   └── Board.jsx          # Main board component
│   │   ├── Card/
│   │   │   ├── Card.jsx           # Individual card component
│   │   │   └── CardForm.jsx       # Card create/edit form
│   │   ├── Column/
│   │   │   └── Column.jsx         # Column component met drag & drop
│   │   └── Header/
│   │       └── Header.jsx         # App header
│   ├── context/
│   │   └── BoardContext.jsx       # Global state management
│   ├── hooks/
│   │   └── useLocalStorage.js     # LocalStorage persistence hook
│   ├── utils/
│   │   └── constants.js           # App constants
│   ├── App.jsx                    # Root component
│   ├── App.css                    # Custom app styles
│   ├── index.css                  # Global styles & design system
│   └── main.jsx                   # Entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Design System

### Kleuren

| Kolom | Kleur | Hex | Gebruik |
|-------|-------|-----|---------|
| Ontwerp | Blauw | `#3b82f6` | Design fase taken |
| Uitvoering | Oranje | `#f59e0b` | In progress taken |
| Klaar | Groen | `#10b981` | Afgeronde taken |

### Spacing
8-point grid systeem:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Typography
- **Font Family**: System font stack voor optimale leesbaarheid
- **Font Sizes**: xs (12px) tot 3xl (30px)
- **Line Heights**: 1.25 (tight) tot 1.625 (relaxed)

## 🔧 Configuratie

### Tailwind CSS

De app gebruikt een custom Tailwind configuratie met extended colors, spacing, animations en meer. Zie [tailwind.config.js](tailwind.config.js) voor details.

### CSS Custom Properties

Alle design tokens zijn gedefinieerd als CSS custom properties in [src/index.css](src/index.css) voor consistente styling en eenvoudig thema-aanpassingen.

## 📝 Features in Detail

### Kaarten Maken
1. Klik op "Kaart toevoegen" in een kolom
2. Vul titel in (verplicht, max 100 karakters)
3. Voeg optioneel een beschrijving toe (max 500 karakters)
4. Selecteer prioriteit (Laag, Gemiddeld, Hoog)
5. Voeg tags toe (komma gescheiden)
6. Klik op "Toevoegen"

### Kaarten Verplaatsen
- **Drag & Drop**: Sleep een kaart naar een andere kolom
- **Visuele Feedback**: Kaart wordt transparant tijdens slepen
- **Drop Zone Indicator**: Kolom highlight bij hover

### Kaarten Bewerken
1. Hover over een kaart
2. Klik op het edit icoon (blauw potlood)
3. Pas velden aan
4. Klik op "Bijwerken"

### Kaarten Verwijderen
1. Hover over een kaart
2. Klik op het delete icoon (rode prullenbak)
3. Bevestig in de dialog

## ♿ Accessibility Features

- **Semantic HTML**: `<main>`, `<header>`, `<article>`, `<section>`, etc.
- **ARIA Attributes**: Labels, roles, descriptions voor screen readers
- **Keyboard Support**:
  - `Tab` - Navigeer door elementen
  - `Enter`/`Space` - Activeer buttons en kaarten
  - `Escape` - Sluit formulieren
- **Focus Management**: Duidelijke focus rings (geen outline: none!)
- **Color Contrast**: Minimaal 4.5:1 ratio (WCAG AA)
- **Reduced Motion**: Respecteert prefers-reduced-motion media query

## 🌐 Browser Support

- Chrome/Edge (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

Contributions zijn welkom! Als je wilt bijdragen:

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

### Development Guidelines

- Volg de bestaande code style
- Schrijf duidelijke commit messages
- Test je changes in verschillende browsers
- Zorg voor toegankelijkheid (a11y)
- Update documentatie indien nodig

## 📄 License

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 👤 Auteur

**Gert van Hardeveld**

- GitHub: [@gertvanhardeveld](https://github.com/gertvanhardeveld)
- Repository: [kanban-project-manager](https://github.com/gertvanhardeveld/kanban-project-manager)

## 🙏 Acknowledgments

- Design principes geïnspireerd door moderne UI/UX best practices
- Toegankelijkheid volgens WCAG 2.1 richtlijnen
- Icons van Heroicons
- Gebouwd met ❤️ en Claude Sonnet 4.5

## 📚 Toekomstige Features

- [ ] Dark mode support
- [ ] Export/Import functionaliteit
- [ ] Meerdere boards
- [ ] Collaboratie features
- [ ] Due dates op kaarten
- [ ] Zoek functionaliteit
- [ ] Filter op tags/prioriteit
- [ ] Keyboard shortcuts overzicht
- [ ] Undo/Redo functionaliteit
- [ ] Backend integratie opties

---

**Built with modern web technologies and accessibility in mind** 🚀
