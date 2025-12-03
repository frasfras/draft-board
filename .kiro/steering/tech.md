---
inclusion: always
---

# Technology Stack

## Framework & Libraries

- **React 19.2.0**: Core UI framework using functional components and hooks
- **React DOM 19.2.0**: DOM rendering
- **Create React App 5.0.1**: Build tooling and development environment
- **Lucide React**: Icon library for UI elements

## Styling

- **Tailwind-style classes**: Code uses Tailwind utility classes but Tailwind is NOT properly configured
  - No tailwind.config.js file
  - Not in package.json dependencies (only available via react-scripts)
  - Classes may not be rendering correctly
- Inline styles for dynamic element positioning and transformations
- System fonts: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto

**Note**: To properly use Tailwind, you need to install it and configure it with Create React App.

## Testing

- **@testing-library/react 16.3.0**: Component testing
- **@testing-library/jest-dom 6.9.1**: DOM matchers
- **@testing-library/user-event 13.5.0**: User interaction simulation

## Common Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Build production bundle
npm build

# Eject from Create React App (irreversible)
npm eject
```

## Browser Support

- Production: >0.2% market share, not dead browsers, excludes Opera Mini
- Development: Latest Chrome, Firefox, and Safari versions
