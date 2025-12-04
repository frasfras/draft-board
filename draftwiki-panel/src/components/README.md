# Draftboard Components

This folder contains reusable panel components for the Draftboard application.

## Structure

Each component is organized in its own subfolder with the following structure:

```
ComponentName/
├── ComponentName.jsx    # Main component file
└── index.js            # Export file for clean imports
```

## Available Components

### ImageUploadPanel
**Location:** `src/components/ImageUploadPanel/`

A panel for uploading images with optional numeric values (bib numbers).

**Props:**
- `onClose` - Function called when the panel is closed
- `onImageAdd(imageUrl, numberValue)` - Function called when an image is added to canvas

**Features:**
- File upload with preview
- Optional number/bib value input
- Drag and drop support
- Image preview before adding to canvas

---

### VariablePanel
**Location:** `src/components/VariablePanel/`

A panel for managing variables and formatting formulas.

**Props:**
- `variables` - Array of variable objects `{id, name, value}`
- `onUpdate(id, field, value)` - Function to update a variable
- `onDelete(id)` - Function to delete a variable
- `onAdd()` - Function to add a new variable
- `onClose` - Function called when the panel is closed

**Features:**
- Variable CRUD operations
- Formula formatter with symbol conversion
- Copy formatted formulas to clipboard
- Variable interpolation in text elements using `{VariableName}` syntax

---

### WikipediaPanel
**Location:** `src/components/WikipediaPanel/`

A panel for searching Wikipedia and adding articles to the canvas.

**Props:**
- `onClose` - Function called when the panel is closed
- `onAddToCanvas(title, url, snippet)` - Function called when an article is added

**Features:**
- Real-time Wikipedia search
- Article preview with snippets
- External links to Wikipedia
- Add articles as text elements to canvas
- Loading states and error handling

---

## Usage Example

```javascript
import ImageUploadPanel from './components/ImageUploadPanel';
import VariablePanel from './components/VariablePanel';
import WikipediaPanel from './components/WikipediaPanel';

function App() {
  return (
    <>
      <ImageUploadPanel 
        onClose={() => setShowPanel(false)}
        onImageAdd={(url, num) => addImage(url, num)}
      />
      
      <VariablePanel
        variables={variables}
        onUpdate={updateVariable}
        onDelete={deleteVariable}
        onAdd={addVariable}
        onClose={() => setShowPanel(false)}
      />
      
      <WikipediaPanel
        onClose={() => setShowPanel(false)}
        onAddToCanvas={(title, url, snippet) => addArticle(title, url, snippet)}
      />
    </>
  );
}
```

## Styling

All components use Tailwind CSS utility classes for styling, maintaining consistency with the main application design.

## Dependencies

- React (hooks: useState, useRef)
- Lucide React (icons)
- Tailwind CSS (styling)
