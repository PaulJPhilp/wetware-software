# Featured Series Components

This document describes the React/Next.js components for displaying blog series in a responsive sidebar layout.

## Overview

The Featured Series components provide a complete system for displaying blog series with:
- **Responsive design**: Fixed sidebar on desktop, stacked layout on mobile
- **Series cards**: Image with title overlay and hover effects
- **Article lists**: Ordered lists of articles within each series
- **TypeScript support**: Fully typed interfaces for all data structures

## Components

### `SeriesSection` (Main Wrapper)

The top-level component that renders the entire "Featured Series" section.

**Props:**
- `seriesData: Series[]` - Array of series data to display

**Features:**
- Responsive layout (sidebar on `md+`, stacked on mobile)
- Fixed positioning with scroll on desktop
- Section header with title and description

**Usage:**
```tsx
import { SeriesSection } from './FeaturedSeries';

<SeriesSection seriesData={mySeriesData} />
```

### `SeriesContainer` (Individual Series Wrapper)

Wraps a single series card and its article list.

**Props:**
- `series: Series` - Single series object

**Features:**
- Card styling with shadow and border
- Consistent spacing between series

### `SeriesCard` (Image and Title Display)

Displays the series image with title overlay.

**Props:**
- `series: Series` - Series object containing image and title

**Features:**
- Image with gradient overlay
- Hover effects (border color, shadow, text color)
- Links to series page (`/series/${series.slug}`)

### `SeriesArticleList` (Ordered Article List)

Renders an ordered list of articles in a series.

**Props:**
- `articles: ArticleInSeries[]` - Array of articles

**Features:**
- Numbered list format
- "Part X:" prefix for each article
- Links to individual posts (`/posts/${article.slug}`)
- Hover effects

## Data Structures

### `Series` Interface

```typescript
interface Series {
  id: string;
  slug: string;        // Used for linking to /series/[slug]
  title: string;
  imageUrl: string;    // URL to the series cover image
  articles: ArticleInSeries[];
}
```

### `ArticleInSeries` Interface

```typescript
interface ArticleInSeries {
  id: string;
  slug: string;        // Used for linking to /posts/[slug]
  title: string;
  description: string; // Brief description (not displayed in sidebar)
  part: number;        // Article number in series (1, 2, 3, etc.)
}
```

## Responsive Behavior

### Desktop (md breakpoint and up)
- **Layout**: Fixed sidebar, `w-80` width
- **Position**: `fixed top-0 h-screen`
- **Scrolling**: `overflow-y-auto` for internal scrolling
- **Borders**: Right border (`border-r`), no bottom border

### Mobile (below md breakpoint)
- **Layout**: Full width (`w-full`), stacked vertically
- **Position**: Static positioning
- **Borders**: Bottom border (`border-b`) to separate from content

## Styling

The components use Tailwind CSS with the following design tokens:
- `bg-card`, `text-card-foreground` - Card backgrounds and text
- `text-foreground`, `text-muted-foreground` - Primary and secondary text
- `hover:text-orange` - Orange accent color for hover states
- `hover:border-orange` - Orange border on hover

## Integration Examples

### Basic Usage

```tsx
import { SeriesSection, type Series } from './FeaturedSeries';

const MyBlogPage = () => {
  const seriesData: Series[] = [
    // Your series data from Notion
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <SeriesSection seriesData={seriesData} />
      <main className="flex-1 md:ml-64">
        {/* Your main content */}
      </main>
    </div>
  );
};
```

### With Existing Layout

```tsx
// In your main layout component
<div className="min-h-screen">
  <SeriesSection seriesData={seriesData} />
  <main className="md:ml-64">
    <YourExistingContent />
  </main>
  <footer className="md:ml-64">
    <YourFooter />
  </footer>
</div>
```

## Notion Integration

To integrate with Notion, create a data transformation function:

```typescript
import { Series, ArticleInSeries } from './FeaturedSeries';

function transformNotionSeries(notionData: any[]): Series[] {
  return notionData.map(series => ({
    id: series.id,
    slug: series.properties.Slug.rich_text[0]?.plain_text || '',
    title: series.properties.Name.title[0]?.plain_text || '',
    imageUrl: series.properties.Cover?.files[0]?.file?.url || '',
    articles: transformNotionArticles(series.articles),
  }));
}

function transformNotionArticles(notionArticles: any[]): ArticleInSeries[] {
  return notionArticles
    .sort((a, b) => a.properties.Part.number - b.properties.Part.number)
    .map(article => ({
      id: article.id,
      slug: article.properties.Slug.rich_text[0]?.plain_text || '',
      title: article.properties.Name.title[0]?.plain_text || '',
      description: article.properties.Description.rich_text[0]?.plain_text || '',
      part: article.properties.Part.number,
    }));
}
```

## Accessibility

The components include proper accessibility features:
- Semantic HTML structure (`<ol>`, `<li>`, `<h2>`, `<h3>`)
- Proper alt text for images
- Focus states for interactive elements
- ARIA attributes where appropriate

## Performance Considerations

- Images use standard `<img>` tags (can be upgraded to Next.js `Image` component)
- Components are client-side rendered (`"use client"`)
- Minimal re-renders due to stable component structure
- CSS classes are optimized for Tailwind's purging

## Customization

### Colors
Modify the hover colors by changing:
- `hover:text-orange` → `hover:text-your-color`
- `hover:border-orange` → `hover:border-your-color`

### Sizing
Adjust the sidebar width by changing:
- `md:w-80` → `md:w-your-width`
- `md:ml-64` → `md:ml-your-width` (on main content)

### Spacing
Modify spacing with:
- `space-y-6` → `space-y-your-spacing` (between series)
- `p-4` → `p-your-padding` (card padding)
