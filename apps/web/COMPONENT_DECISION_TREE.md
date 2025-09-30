# Component Decision Tree

A visual guide to help you quickly choose the right component for your use case.

## 🌳 Component Selection Flowchart

```
What are you displaying?
│
├── 📝 Blog Posts/Articles
│   │
│   ├── In a grid layout?
│   │   └── ✅ PostCard (default)
│   │
│   ├── In a compact list?
│   │   └── ✅ PostListItem
│   │
│   └── Multiple posts with view switching?
│       └── ✅ LatestPosts
│
├── 🚀 Projects
│   │
│   └── Any project display
│       └── ✅ ProjectCard
│
├── 📚 Series
│   │
│   ├── In a sidebar?
│   │   └── ✅ UnifiedSeriesCard (variant: "compact")
│   │
│   ├── In a grid on series page?
│   │   └── ✅ UnifiedSeriesCard (variant: "grid")
│   │
│   ├── As featured content?
│   │   └── ✅ UnifiedSeriesCard (variant: "featured")
│   │
│   ├── In a simple list?
│   │   └── ✅ UnifiedSeriesCard (variant: "list")
│   │
│   └── In a content section?
│       └── ✅ UnifiedSeriesCard (variant: "card")
│
└── 📐 Page Layout
    │
    ├── Need content + series sidebar?
    │   └── ✅ SeriesContentLayout
    │
    ├── Need just series section?
    │   └── ✅ SeriesSection
    │
    └── Need basic container?
        └── ✅ Card (from ui/card)
```

## 🎯 Quick Decision Matrix

### By Content Type

| Content Type | Component | Configuration |
|--------------|-----------|---------------|
| **Single Blog Post** | `PostCard` | `hoverable={true}` |
| **Blog Post in List** | `PostListItem` | Minimal config |
| **Multiple Blog Posts** | `LatestPosts` | `showViewToggle={true}` |
| **Single Project** | `ProjectCard` | `showTechnologies={true}` |
| **Single Series (Sidebar)** | `UnifiedSeriesCard` | `variant="compact"` |
| **Single Series (Page)** | `UnifiedSeriesCard` | `variant="grid"` |
| **Multiple Series** | `SeriesSection` | `showArticleLists={true}` |

### By Layout Context

| Layout Context | Component | Reason |
|----------------|-----------|--------|
| **Home Page** | `SeriesContentLayout` + `LatestPosts` | Full-featured layout |
| **Blog Category** | `LatestPosts` | Focused post display |
| **Project Portfolio** | Grid of `ProjectCard` | Project showcase |
| **Series Landing** | Grid of `UnifiedSeriesCard` | Series overview |
| **Sidebar Context** | `SeriesSection` | Compact series display |

### By Screen Size Priority

| Priority | Component Choice | Configuration |
|----------|------------------|---------------|
| **Mobile First** | `PostListItem` | Compact, scannable |
| **Desktop Focused** | `PostCard` | Rich visual display |
| **Universal** | `LatestPosts` | Built-in responsive switching |

## 🔧 Configuration Decision Tree

### PostCard Configuration

```
PostCard needs:
│
├── Rich visual display?
│   ├── Yes → showDescription={true}, showTags={true}
│   └── No → showDescription={false}, showTags={false}
│
├── Interactive behavior?
│   ├── Yes → hoverable={true}
│   └── No → hoverable={false}
│
└── Custom styling?
    ├── Yes → className="custom-classes"
    └── No → Use defaults
```

### UnifiedSeriesCard Variant Selection

```
UnifiedSeriesCard variant:
│
├── Available space?
│   │
│   ├── Very Limited (sidebar)
│   │   └── variant="compact"
│   │
│   ├── Moderate (content section)
│   │   └── variant="card"
│   │
│   └── Generous (featured area)
│       └── variant="featured"
│
├── Layout type?
│   │
│   ├── Horizontal layout needed?
│   │   └── variant="compact" or "card"
│   │
│   └── Vertical layout needed?
│       └── variant="grid" or "featured"
│
└── Content richness?
    │
    ├── Minimal (just title/image)
    │   └── variant="list"
    │
    └── Rich (description, metadata)
        └── variant="featured"
```

### LatestPosts Configuration

```
LatestPosts setup:
│
├── User control needed?
│   ├── Yes → showViewToggle={true}
│   └── No → showViewToggle={false}, set defaultView
│
├── Content amount?
│   ├── Many posts → maxPosts={10-12}
│   └── Few posts → maxPosts={3-6}
│
└── Default presentation?
    ├── Visual focus → defaultView="card"
    └── Information density → defaultView="list"
```

## 🎨 Styling Decision Guide

### When to Use Custom Styling

| Scenario | Approach | Example |
|----------|----------|---------|
| **Brand colors** | Use CSS custom properties | `--color-orange`, `--color-charcoal` |
| **Layout adjustments** | Use Tailwind utilities | `className="max-w-sm"` |
| **Component variants** | Use built-in props | `variant="featured"` |
| **Hover effects** | Use hoverable prop | `hoverable={true}` |

### Responsive Considerations

```
Screen size impact:
│
├── Mobile (< 768px)
│   ├── Prefer: PostListItem, compact variants
│   └── Configure: showDescription={false}
│
├── Tablet (768px - 1024px)
│   ├── Prefer: PostCard, standard variants
│   └── Configure: Moderate feature sets
│
└── Desktop (> 1024px)
    ├── Prefer: Full-featured components
    └── Configure: showDescription={true}, rich variants
```

## 🚀 Performance Considerations

### Component Loading Strategy

| Component | Loading Strategy | Reason |
|-----------|------------------|--------|
| **PostCard** | Immediate | Core content display |
| **PostListItem** | Lazy (dynamic import) | Used conditionally |
| **UnifiedSeriesCard** | Immediate | Frequently used |
| **LatestPosts** | Immediate | Main content component |

### Image Optimization

```
Image handling:
│
├── PostCard
│   ├── Uses Next.js Image component
│   ├── Responsive sizes
│   └── Priority loading for above-fold
│
├── ProjectCard
│   ├── Optimized for portfolio images
│   └── Lazy loading by default
│
└── UnifiedSeriesCard
    ├── Theme-aware image selection
    ├── Fallback handling
    └── Responsive sizing
```

## 📋 Common Mistake Prevention

### ❌ What NOT to Do

| Mistake | Why It's Wrong | Better Approach |
|---------|----------------|-----------------|
| Using PostCard for projects | Wrong content type | Use ProjectCard |
| UnifiedSeriesCard variant="grid" in sidebar | Wrong variant for space | Use variant="compact" |
| PostListItem without parent LatestPosts | Missing list context | Use LatestPosts wrapper |
| Overriding core card styles | Breaks consistency | Use configuration props |
| Fixed component configurations | Not responsive | Use conditional props |

### ✅ Best Practices Checklist

- [ ] **Content Type Match**: Component matches content type
- [ ] **Variant Selection**: Appropriate variant for layout
- [ ] **Responsive Config**: Different configs for different screens
- [ ] **Performance**: Lazy loading where appropriate
- [ ] **Accessibility**: testId provided for interactive elements
- [ ] **Consistency**: Following established patterns
- [ ] **Documentation**: Props are clearly configured

## 🔍 Debugging Guide

### Component Not Displaying Correctly?

1. **Check Props**
   ```typescript
   // Add debugging
   console.log('Component props:', { post, hoverable, showDescription });
   ```

2. **Verify Data Structure**
   ```typescript
   // Ensure data matches expected interface
   if (!post.title) console.warn('Missing required post title');
   ```

3. **Test Responsive Behavior**
   ```typescript
   // Check responsive props
   const isMobile = useMediaQuery('(max-width: 768px)');
   showDescription={!isMobile}
   ```

### Performance Issues?

1. **Check Image Loading**
   - Verify Next.js Image configuration
   - Check image sizes and formats
   - Monitor Core Web Vitals

2. **Review Component Mounting**
   - Use React DevTools Profiler
   - Check for unnecessary re-renders
   - Verify lazy loading implementation

This decision tree should make it quick and easy to choose the right component with the right configuration for any use case!
