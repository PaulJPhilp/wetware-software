# Component Quick Reference Card

A concise cheat sheet for component usage in the Wetware & Software web app.

## 🚀 Quick Component Picker

| I need to display... | Use this component | With these props |
|---------------------|-------------------|------------------|
| **Blog post in grid** | `PostCard` | `hoverable={true}` |
| **Blog post in table** | `PostListItem` | minimal config |
| **Multiple blog posts** | `LatestPosts` | `showViewToggle={true}` |
| **Project showcase** | `ProjectCard` | `showTechnologies={true}` |
| **Series in sidebar** | `UnifiedSeriesCard` | `variant="compact"` |
| **Series on main page** | `UnifiedSeriesCard` | `variant="grid"` |
| **Featured series** | `UnifiedSeriesCard` | `variant="featured"` |
| **Page with sidebar** | `SeriesContentLayout` | standard config |

## 📱 Responsive Configurations

```typescript
// Mobile-friendly
<PostCard 
  post={post}
  showDescription={false}
  showTags={false}
  hoverable={false}
/>

// Desktop-optimized
<PostCard 
  post={post}
  showDescription={true}
  showTags={true}
  hoverable={true}
/>

// Adaptive
const isMobile = useMediaQuery('(max-width: 768px)');
<PostCard 
  post={post}
  showDescription={!isMobile}
  showTags={!isMobile}
  hoverable={!isMobile}
/>
```

## 🎯 UnifiedSeriesCard Variants

| Variant | Use Case | Features |
|---------|----------|----------|
| `"compact"` | Sidebars | Horizontal, minimal |
| `"card"` | Content sections | Horizontal, metadata |
| `"list"` | Simple lists | Tiny, title only |
| `"featured"` | Hero areas | Large, full description |
| `"grid"` | Series pages | Vertical, optimized |

## 🔧 Common Prop Patterns

### Standard Props (all components)
```typescript
className?: string    // Additional CSS classes
testId?: string      // For testing
```

### Card Components
```typescript
hoverable?: boolean  // Enable hover effects
```

### Content Display
```typescript
showDescription?: boolean  // Show/hide descriptions
showTags?: boolean        // Show/hide tag badges
showTechnologies?: boolean // Show/hide tech stack
maxPosts?: number         // Limit number of items
```

### Layout Components
```typescript
maxWidth?: "4xl" | "5xl" | "6xl" | "7xl" | "full"
gap?: "sm" | "md" | "lg" | "xl"
showArticleLists?: boolean
```

## 📐 Layout Patterns

### Grid Layout
```typescript
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <ItemCard key={item.id} item={item} />)}
</div>
```

### Content + Sidebar
```typescript
<SeriesContentLayout series={series}>
  <YourMainContent />
</SeriesContentLayout>
```

### Responsive List
```typescript
<LatestPosts 
  posts={posts}
  defaultView="card"
  showViewToggle={true}
/>
```

## 🎨 Styling Quick Tips

### Colors
- Primary: `text-orange`, `border-orange`, `bg-orange`
- Neutral: `text-charcoal`, `bg-silver`
- Semantic: `text-muted-foreground`, `bg-muted`

### Hover Effects
```typescript
// Built-in hover (recommended)
hoverable={true}

// Custom hover
className="hover:border-orange hover:shadow-lg"
```

### Responsive Sizing
```typescript
className="w-full max-w-64 md:max-w-80 lg:max-w-96"
```

## ⚡ Performance Tips

- Use `PostListItem` for long lists
- Set `priority={false}` for below-fold images
- Use `maxPosts` to limit initial render
- Lazy load with dynamic imports for conditional components

## 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Card not hovering | Add `hoverable={true}` |
| Images not loading | Check `next.config.ts` domains |
| Layout breaking | Use appropriate variant |
| Too much content | Use `maxPosts` or `showDescription={false}` |
| Mobile issues | Test responsive props |

## 📋 Component Checklist

Before using any component:
- [ ] Correct component for content type?
- [ ] Appropriate variant selected?
- [ ] Responsive behavior considered?
- [ ] Required props provided?
- [ ] Optional props configured?
- [ ] testId added if needed for testing?

## 🔗 Import Statements

```typescript
// Card components
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { UnifiedSeriesCard } from "@/components/UnifiedSeriesCard";

// Layout components
import { SeriesContentLayout } from "@/components/SeriesContentLayout";
import { SeriesSection } from "@/components/Series";
import { LatestPosts } from "@/components/LatestPosts";

// List components
import { PostListItem } from "@/components/PostListItem";

// Base UI
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Types
import type { BaseComponentProps, CardComponentProps } from "@/lib/component-types";
```

---

**💡 Pro Tip**: When in doubt, start with default configurations and customize only what you need. The components are designed to work well out of the box!
