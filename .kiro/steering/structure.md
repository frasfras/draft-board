---
inclusion: always
---

# Project Structure

## Directory Organization

```
draftboard/
├── public/              # Static assets
│   ├── index.html      # HTML template
│   ├── favicon.ico     # Site icon
│   └── manifest.json   # PWA manifest
├── src/                # Source code
│   ├── App.js          # Main application component
│   ├── App.css         # App-specific styles
│   ├── index.js        # React entry point
│   ├── index.css       # Global styles
│   └── *.test.js       # Test files
└── package.json        # Dependencies and scripts
```

## Component Architecture

All components are defined in `src/App.js` using a single-file approach:

- **CanvaStarter** (default export): Main application container
- **ImageUploadPanel**: Handles image uploads with numeric values
- **VariablePanel**: Manages variable definitions and CRUD operations
- **PropertiesPanel**: Displays and edits selected element properties

## State Management

Uses React hooks for local state:
- `useState` for component state (elements, variables, UI toggles)
- `useRef` for DOM references (canvas, file input)
- No external state management library

## Code Conventions

- Functional components with hooks (no class components)
- Component-level state management
- Inline event handlers
- Tailwind utility classes for styling
- Element data structure includes: id, type, position (x, y), dimensions (width, height), rotation, color, and type-specific properties
- Variable interpolation pattern: `{VariableName}` in text elements

## Key Patterns

- Elements stored as array of objects with unique IDs
- Drag-and-drop via mouse event handlers and offset tracking
- Canvas export using HTML5 Canvas API with Promise-based image loading
- Panel visibility toggled via boolean state flags
