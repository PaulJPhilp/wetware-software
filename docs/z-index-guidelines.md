# Z-Index Guidelines

This document provides guidelines for managing z-index values across the application to ensure proper layering and prevent conflicts.

## Z-Index Scale

We use a systematic z-index scale defined in both `tailwind.config.js` and `globals.css`:

| Layer | Value | Tailwind Class | CSS Variable | Usage |
|-------|-------|----------------|--------------|-------|
| Dropdown | 1000 | `z-dropdown` | `var(--z-dropdown)` | Select menus, autocomplete |
| Sticky | 1020 | `z-sticky` | `var(--z-sticky)` | Sticky navigation, table headers |
| Footer | 1020 | `z-footer` | `var(--z-footer)` | Fixed footer at bottom of viewport |
| Fixed | 1030 | `z-fixed` | `var(--z-fixed)` | Fixed sidebars, floating elements |
| Modal Backdrop | 1040 | `z-modal-backdrop` | `var(--z-modal-backdrop)` | Modal overlay backgrounds |
| Modal | 1050 | `z-modal` | `var(--z-modal)` | Modal dialog content |
| Popover | 1060 | `z-popover` | `var(--z-popover)` | Tooltips, context menus |
| Tooltip | 1070 | `z-tooltip` | `var(--z-tooltip)` | Hover tooltips |
| Header | 99999 | `z-header` | `var(--z-header)` | Main site header (inline style) |

## Header & Footer Protection

### Header
The Header component is protected with:
- **Very high z-index**: Inline style `zIndex: 99999`
- **Isolation**: Inline `isolation: 'isolate'` creates new stacking context  
- **Dropdown protection**: Header dropdown uses inline `zIndex: 100000`

### Footer
The Footer component is pinned to viewport bottom with:
- **Fixed positioning**: `position: 'fixed', bottom: 0`
- **Reliable z-index**: Inline style `zIndex: 1020` 
- **Full width**: `left: 0, right: 0` spans viewport
- **Always visible**: Stays fixed during scrolling

## Guidelines for Modal/Overlay Components

### 1. Use React Portals
```tsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="z-modal-backdrop fixed inset-0 bg-black/50">
      <div className="z-modal fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### 2. Layer Structure
- **Backdrop**: Use `z-modal-backdrop` (1040)
- **Content**: Use `z-modal` (1050)
- **Internal elements**: Use relative positioning or lower z-index values

### 3. Toast/Notification Components
```tsx
function Toast() {
  return createPortal(
    <div className="z-tooltip fixed top-4 right-4">
      {/* Toast content */}
    </div>,
    document.body
  );
}
```

### 4. Popover/Dropdown Components
```tsx
function Popover({ trigger, children }) {
  return (
    <div className="relative">
      {trigger}
      <div className="absolute z-popover top-full left-0 mt-1">
        {children}
      </div>
    </div>
  );
}
```

## Best Practices

### ✅ Do
- Use the predefined z-index scale
- Render modals/overlays using React Portals
- Use `z-dropdown` for standard dropdowns
- Use `z-modal` for modal dialogs
- Document any custom z-index values

### ❌ Don't
- Use arbitrary z-index values like `z-[9998]`
- Create components that compete with the Header (z-9999+)
- Stack multiple high z-index elements unnecessarily
- Forget to consider mobile viewport constraints

## Stacking Context Considerations

Elements that create new stacking contexts:
- `position: fixed/absolute/relative` with z-index
- `opacity < 1`
- `transform` properties
- `filter` properties
- `isolation: isolate`

The Header uses `isolation: isolate` to create its own stacking context for additional protection.

## Debugging Z-Index Issues

1. **Use browser dev tools**: Inspect the computed z-index values
2. **Check stacking contexts**: Look for elements creating new contexts
3. **Verify portal rendering**: Ensure modals render at document body level
4. **Test across viewports**: Mobile Safari can behave differently

## Migration Notes

When updating existing components:
- Replace hardcoded z-index values with scale classes
- Move modal components to use React Portals
- Add proper backdrop layers for overlays
- Test thoroughly across different screen sizes