# 📄 Invoice Management Application

A fully responsive, full-stack Invoice Management Application built with **React**, **TypeScript**, and **Vite**. Supports creating, viewing, editing, and deleting invoices with persistent dark/light mode theming.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/mbursa-goje/invoice-management-app.git

# 2. Navigate into the project directory
cd invoice-management-app

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## 🏗️ Architecture

### Technology Stack
| Technology | Purpose |
|---|---|
| React 19 | UI component library |
| TypeScript | Static type safety |
| Vite | Build tool and dev server |
| React Router DOM | Client-side routing |
| Lucide React | Icon library |
| Tailwind CSS v4 | Utility-first styling framework |
| CSS Variables | Design tokens & theming system |

### Project Structure
```text
src/
├── context/
│   ├── ThemeContext.tsx     # Light/Dark mode global state
│   └── InvoiceContext.tsx   # Invoice CRUD global state
├── component/
│   ├── Sidebar.tsx          # Fixed navigation sidebar
├── ui/                      # Reusable UI components (Phase 4)
│   ├── Button.tsx           # Reusable Button
│   └── StatusBadge.tsx      # Invoice status badge indicator
├── pages/
│   ├── InvoiceList.tsx      # Home page — lists all invoices
│   └── InvoiceDetail.tsx    # Detail page — single invoice view
├── types/
│   └── invoice.ts           # TypeScript type definitions
├── App.tsx                  # Root component & routing
├── main.tsx                 # React entry point
└── index.css                # Global styles & CSS design tokens
```

### State Management
The app uses **React Context API** for global state, avoiding third-party state managers like Redux for simplicity.

- **`ThemeContext`**: Manages `light | dark` theme preference. Persisted to `localStorage` and applied by toggling `data-theme` attribute on the HTML body, which activates CSS variable overrides.
- **`InvoiceContext`**: Manages the complete list of invoices and exposes CRUD functions. Persisted to `localStorage` via `JSON.stringify/parse`.

### Routing
| Path | Component | Description |
|---|---|---|
| `/` | `InvoiceList` | Displays all invoices with filter controls |
| `/invoice/:id` | `InvoiceDetail` | Displays a single invoice's full details |

---

## ⚖️ Architectural Trade-offs

### CSS Variables + Tailwind CSS v4 vs. CSS-in-JS
**Chosen:** Tailwind CSS v4 utility classes alongside CSS Custom Properties  
**Alternative:** Styled Components, Emotion, plain vanilla CSS  
**Reason:** Tailwind v4 ships as a Vite plugin (`@tailwindcss/vite`) requiring zero config files. It provides a utility-first workflow that dramatically speeds up UI development. CSS Custom Properties are retained as the theming backbone — the `data-theme="dark"` toggle system overrides CSS variables, which Tailwind classes reference. This gives us the best of both worlds: fast utility-class development and powerful theme switching.

### React Context vs. Redux / Zustand
**Chosen:** React Context API  
**Alternative:** Redux Toolkit, Zustand  
**Reason:** The app's state requirements are straightforward — a list of invoices and a theme flag. The additional boilerplate, middleware, and devtools of Redux are overkill here. Context is sufficient and keeps the project dependency-light.

### localStorage vs. Backend Database
**Chosen:** `localStorage` for persistence  
**Alternative:** REST API with a real database  
**Reason:** This is a front-end focused project. `localStorage` provides zero-config persistence that survives page reloads. The trade-off is that data is device-specific and not shareable across browsers.

---

## ♿ Accessibility Notes

- Semantic HTML elements used throughout (`<aside>`, `<main>`, `<header>`, `<button>`).
- Theme toggle button uses icon-only design — an `aria-label` is provided for screen readers.
- Focus rings preserved for keyboard navigation.
- Colour contrast ratios maintained across both light and dark themes.
- *(More accessibility improvements tracked below)*

---

## ✨ Improvements Beyond Requirements

- **Persistent Dark/Light Mode**: Theme preference saved to `localStorage` and restored on every visit.
- **TypeScript Strict Mode**: Full type safety enforced across all components, contexts, and interfaces using TypeScript, preventing runtime type errors.
- **Conventional Commits**: All version control follows the Conventional Commits specification (`feat`, `fix`, `docs`, `style`, `chore`) for a clean, readable Git history.
- **Lazy Initialization**: `localStorage` reads are wrapped in lazy `useState` initializers to avoid redundant reads on every re-render.

---

## 📋 Requirements Checklist

- [ ] View all invoices
- [ ] Filter invoices by status (Draft, Pending, Paid)
- [ ] View a single invoice's details
- [ ] Create a new invoice
- [ ] Edit an existing invoice
- [ ] Delete an invoice
- [ ] Mark an invoice as paid
- [ ] Responsive design (Mobile, Tablet, Desktop)
- [x] Persistent Light/Dark mode toggle

---

*Built with ❤️ by Godwin Goje*
