# Component Guidelines

This document provides comprehensive guidelines for using components consistently across the Wetware & Software web application.

## 📋 Table of Contents

1. [Component Selection Guide](#component-selection-guide)
2. [Card Components](#card-components)
3. [Layout Components](#layout-components)
4. [Content Display Components](#content-display-components)
5. [Navigation Components](#navigation-components)
6. [UI Components](#ui-components)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)

---

## 🎯 Component Selection Guide

### When to Use Which Component

| Use Case | Component | Variant | Why |
|----------|-----------|---------|-----|
| **Blog post in grid** | `PostCard` | default | Optimized for post metadata display |
| **Blog post in list** | `PostListItem` | - | Compact tabular format |
| **Project showcase** | `ProjectCard` | default | Status indicators and tech stack |
| **Series in sidebar** | `UnifiedSeriesCard` | compact | Space-efficient horizontal layout |
| **Series on dedicated page** | `UnifiedSeriesCard` | grid | Full-featured display |
| **Series in featured section** | `UnifiedSeriesCard` | featured | Enhanced with description |
| **Main content + sidebar** | `SeriesContentLayout` | default | 3/4 + 1/4 responsive layout |
| **Multiple posts** | `LatestPosts` | default | Built-in view switching |

---

## 🃏 Card Components

### PostCard

**Purpose**: Display blog posts with rich metadata and visual appeal.

#### When to Use
- ✅ Blog post grids on home page
- ✅ Related posts sections
- ✅ Search results
- ✅ Category/tag pages

#### Props Configuration

```typescript
// Standard blog post display
<PostCard 
  post={post}
  hoverable={true}        // Enable hover effects
  showDescription={true}  // Show post description
  showTags={true}        // Show tag badges
/>

// Minimal variant (e.g., in tight spaces)
<PostCard 
  post={post}
  hoverable={false}
  showDescription={false}
  showTags={false}
/>
```

#### Visual Examples
- **Standard**: Full metadata, hover effects, tags
- **Minimal**: Title and image only, no hover

---

### ProjectCard

**Purpose**: Showcase projects with status indicators and technology stack.

#### When to Use
- ✅ Project portfolio pages
- ✅ Featured project sections
- ✅ Project listings

#### Props Configuration

```typescript
// Full project display
<ProjectCard 
  project={project}
  showDescription={true}    // Show project description
  showTechnologies={true}   // Show tech stack badges
  hoverable={true}         // Enable hover effects
/>

// Compact variant (e.g., in sidebars)
<ProjectCard 
  project={project}
  showDescription={false}
  showTechnologies={false}
  hoverable={false}
/>
```

#### Status Indicators
- **Active**: Green badge - actively maintained
- **Archived**: Gray badge - no longer maintained
- **Maintenance**: Yellow badge - minimal updates only

---

### UnifiedSeriesCard

**Purpose**: Flexible series display with multiple layout variants.

#### Variants & Use Cases

| Variant | Use Case | Layout | Features |
|---------|----------|--------|----------|
| `compact` | Sidebars, tight spaces | Horizontal | Image + title, minimal |
| `card` | Content sections | Horizontal | Image + title + metadata |
| `list` | Simple lists | Minimal | Small image + title |
| `featured` | Hero sections | Vertical | Full image + description |
| `grid` | Series pages | Vertical | Optimized for grids |

#### Configuration Examples

```typescript
// Sidebar usage
<UnifiedSeriesCard 
  series={series}
  variant="compact"
  showArticleCount={true}
  showDescription={false}
/>

// Featured section
<UnifiedSeriesCard 
  series={series}
  variant="featured"
  showDescription={true}
  showArticleCount={true}
  showArticleList={true}
  imageAspectRatio="16/9"
/>

// Grid layout
<UnifiedSeriesCard 
  series={series}
  variant="grid"
  showDescription={true}
  showArticleCount={true}
  imageAspectRatio="4/3"
/>
```

---

## 📐 Layout Components

### SeriesContentLayout

**Purpose**: Create consistent layouts with series sidebar and main content.

#### When to Use
- ✅ Home page layout
- ✅ Category pages with series context
- ✅ Any page needing series + content layout

#### Configuration Options

```typescript
// Standard layout (series left, content right)
<SeriesContentLayout 
  series={series}
  maxWidth="7xl"           // Container max width
  gap="lg"                 // Space between sections
  showArticleLists={true}  // Show articles in series
>
  <MainContent />
</SeriesContentLayout>

// Compact layout
<SeriesContentLayout 
  series={series}
  maxWidth="5xl"
  gap="md"
  showArticleLists={false}
>
  <MainContent />
</SeriesContentLayout>

// Right-aligned series
<SeriesContentLayoutRight 
  series={series}
  maxWidth="6xl"
  gap="xl"
>
  <MainContent />
</SeriesContentLayoutRight>
```

#### Layout Breakpoints
- **Mobile**: Stacked (series top, content bottom)
- **Desktop**: Side-by-side (series 25%, content 75%)

---

## 📄 Content Display Components

### LatestPosts

**Purpose**: Display recent posts with view switching capabilities.

#### When to Use
- ✅ Home page recent posts
- ✅ Category landing pages
- ✅ Author pages

#### Configuration Examples

```typescript
// Full-featured (default)
<LatestPosts 
  posts={posts}
  maxPosts={10}
  defaultView="card"
  showViewToggle={true}
/>

// Simple list (no view switching)
<LatestPosts 
  posts={posts}
  maxPosts={5}
  defaultView="list"
  showViewToggle={false}
/>
```

#### View Modes
- **Card**: Grid layout with full post cards
- **List**: Table layout with compact information

---

### SeriesSection

**Purpose**: Display series in sidebar or dedicated sections.

#### When to Use
- ✅ Within `SeriesContentLayout`
- ✅ Standalone series sections
- ✅ Series overview pages

#### Configuration Examples

```typescript
// Full series display
<SeriesSection 
  series={series}
  showArticleLists={true}
  maxSeries={undefined}  // Show all
/>

// Compact display (e.g., in tight spaces)
<SeriesSection 
  series={series}
  showArticleLists={false}
  maxSeries={3}  // Limit to 3 series
/>
```

---

## 🧭 Navigation Components

### Header

**Purpose**: Fixed navigation with responsive menu and theme switching.

#### Features
- Fixed positioning with dynamic height tracking
- Responsive dropdown menu
- Theme toggle integration
- Brand identity display

#### Usage
```typescript
// Automatically included in root layout
// No configuration needed - handles responsive behavior
```

### Footer

**Purpose**: Site footer with social links and copyright.

#### Features
- Social media icon links
- Configurable link list
- Responsive layout
- External link handling

#### Customization
```typescript
// Custom social links
const customLinks = [
  { href: "https://github.com/user", label: "GitHub", Icon: GithubIcon },
  { href: "mailto:user@example.com", label: "Email", Icon: MailIcon }
];

<Footer links={customLinks} />
```

---

## 🎨 UI Components

### Card System

**Purpose**: Consistent container styling across the application.

#### When to Use Base Card
```typescript
// Simple content containers
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

#### Data Slots
The card system uses `data-slot` attributes for advanced styling:
- `data-slot="card"` - Main card container
- `data-slot="card-header"` - Header section
- `data-slot="card-content"` - Main content area
- `data-slot="card-footer"` - Footer section

---

## ✅ Best Practices

### 1. Component Selection

**Do:**
- ✅ Use specialized components for their intended purpose
- ✅ Configure props to match your use case
- ✅ Leverage built-in responsive behavior
- ✅ Include `testId` for components that need testing

**Don't:**
- ❌ Force components into inappropriate use cases
- ❌ Override core styling with excessive custom CSS
- ❌ Ignore responsive breakpoints
- ❌ Skip accessibility props

### 2. Props Configuration

**Do:**
- ✅ Use default values when they match your needs
- ✅ Be explicit about important configuration
- ✅ Pass through standard props (className, testId)
- ✅ Document custom configurations

**Don't:**
- ❌ Over-configure when defaults work
- ❌ Pass undefined for boolean props
- ❌ Ignore TypeScript prop warnings
- ❌ Use magic values without constants

### 3. Layout Patterns

**Do:**
- ✅ Use layout components for consistent spacing
- ✅ Respect mobile-first responsive design
- ✅ Consider content hierarchy
- ✅ Plan for different screen sizes

**Don't:**
- ❌ Fight against established grid systems
- ❌ Create overly complex nested layouts
- ❌ Ignore mobile experience
- ❌ Use fixed dimensions without responsive alternatives

---

## 🔄 Common Patterns

### 1. Card Grid Pattern

```typescript
// Responsive grid of cards
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Link key={item.id} href={`/items/${item.slug}`}>
      <ItemCard item={item} />
    </Link>
  ))}
</div>
```

### 2. Content + Sidebar Pattern

```typescript
// Main content with contextual sidebar
<SeriesContentLayout series={series}>
  <div className="space-y-8">
    <MainContent />
    <RelatedContent />
  </div>
</SeriesContentLayout>
```

### 3. List with View Toggle Pattern

```typescript
// Switchable view modes
<LatestPosts 
  posts={posts}
  defaultView="card"
  showViewToggle={true}
  maxPosts={12}
/>
```

### 4. Progressive Enhancement Pattern

```typescript
// Start simple, add features as needed
<PostCard 
  post={post}
  // Basic display
  hoverable={true}
  
  // Enhanced features for larger screens
  showDescription={!isMobile}
  showTags={!isMobile}
/>
```

---

## 🚀 Migration Guide

### Updating Existing Components

1. **Identify Current Usage**
   ```bash
   # Find component usage
   grep -r "PostCard\|ProjectCard\|SeriesCard" src/
   ```

2. **Update Props**
   ```typescript
   // Before
   <PostCard post={post} />
   
   // After (with explicit configuration)
   <PostCard 
     post={post}
     hoverable={true}
     showDescription={true}
     showTags={true}
   />
   ```

3. **Test Responsive Behavior**
   - Verify mobile layouts
   - Check hover states
   - Test with different content lengths

### Adding New Components

1. **Choose Base Interface**
   ```typescript
   import type { BaseComponentProps, CardComponentProps } from "@/lib/component-types";
   ```

2. **Extend Appropriately**
   ```typescript
   interface NewComponentProps extends CardComponentProps {
     specificProp: string;
   }
   ```

3. **Follow Established Patterns**
   - Include JSDoc comments
   - Support className and testId
   - Provide sensible defaults
   - Handle responsive behavior

---

## 📊 Quick Reference

### Component Matrix

| Component | Primary Use | Responsive | Variants | Configurable |
|-----------|-------------|------------|----------|--------------|
| PostCard | Blog posts | ✅ | 1 | High |
| ProjectCard | Projects | ✅ | 1 | High |
| UnifiedSeriesCard | Series | ✅ | 5 | Very High |
| LatestPosts | Post lists | ✅ | 2 views | Medium |
| SeriesSection | Series sidebar | ✅ | 1 | Medium |
| SeriesContentLayout | Page layout | ✅ | 2 | High |

### Prop Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| `show*` | Toggle features | `showDescription={true}` |
| `max*` | Limit content | `maxPosts={10}` |
| `default*` | Set defaults | `defaultView="card"` |
| `*able` | Enable behavior | `hoverable={true}` |

This guide ensures consistent, maintainable, and user-friendly component usage across the entire application.
