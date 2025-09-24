# Notion Integration for Featured Series

This document explains how to integrate the Featured Series components with your Notion database to automatically display blog series on your homepage.

## Overview

The integration consists of three main parts:
1. **Data Fetching**: `getFeaturedSeries()` function in `notion-utils.ts`
2. **Server Component**: `NotionFeaturedSeries` component for automatic data loading
3. **Page Integration**: Example components showing how to use in your pages

## Notion Database Requirements

### Series Database Properties

Your Notion Series database should have these properties:

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| `Name` | Title | ✅ | Series title |
| `Slug` | Rich Text | ✅ | URL slug for series page |
| `Description` | Rich Text | ✅ | Brief description |
| `Series Goal` | Rich Text | ✅ | Detailed goal/purpose |
| `Status` | Status/Select | ✅ | Active, Completed, or Draft |
| `Cover Image` | Files | ❌ | Series cover image |
| `CoverImage-LightMode` | Rich Text | ❌ | Light mode cover filename |
| `CoverImage-DarkMode` | Rich Text | ❌ | Dark mode cover filename |
| `Focus Area` | Select | ❌ | Content focus area |
| `Tags` | Multi-select | ❌ | Series tags |
| `Posts in Series` | Rollup | ❌ | Count of related posts |

### Blog Posts Database Properties

Your Blog Posts database should have these properties:

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| `Title` | Title | ✅ | Post title |
| `Slug` | Rich Text | ✅ | URL slug for post page |
| `Published` | Checkbox | ✅ | Whether post is published |
| `Published Date` | Date | ✅ | Publication date |
| `Content Type` | Select | ✅ | Essay, Article, etc. |
| `Description` | Rich Text | ✅ | Post description |
| `Blog Series` | Relation | ❌ | Link to series database |
| `Part Number` | Number | ❌ | Article number in series |
| `Tags` | Multi-select | ✅ | Post tags |
| `Read Time` | Number | ✅ | Reading time in minutes |
| `Featured` | Checkbox | ✅ | Whether post is featured |

## Data Flow

```mermaid
graph TD
    A[Notion Series DB] --> B[getFeaturedSeries()]
    C[Notion Posts DB] --> B
    B --> D[transformToFeaturedSeries()]
    D --> E[FeaturedSeries[]]
    E --> F[NotionFeaturedSeries Component]
    F --> G[SeriesSection Component]
    G --> H[Rendered UI]
```

## API Functions

### `getFeaturedSeries(limit?: number)`

Fetches featured series with their articles from Notion.

**Parameters:**
- `limit` (optional): Maximum number of series to fetch (default: 3)

**Returns:** `Promise<FeaturedSeries[]>`

**Filters:**
- Only series with Status = "Active" or "Completed"
- Only published posts within each series
- Excludes series with no published articles

**Sorting:**
- Series: Active first, then Completed, then by Name
- Posts: By Part Number ascending

### `transformToFeaturedSeries(series, posts)`

Transforms Notion data into the format expected by the UI components.

**Image Handling:**
1. Uses `series.coverLight` if available
2. Falls back to `series.coverDark`
3. Falls back to placeholder: `https://picsum.photos/seed/${series.slug}/300/150`

## Components

### `NotionFeaturedSeries` (Server Component)

Automatically fetches and renders featured series from Notion.

```tsx
import { NotionFeaturedSeries } from './components/NotionFeaturedSeries';

// In your page component
export default async function HomePage() {
  return (
    <div className="flex flex-col md:flex-row">
      <NotionFeaturedSeries limit={3} />
      <main className="flex-1 md:ml-64">
        {/* Your main content */}
      </main>
    </div>
  );
}
```

**Props:**
- `limit?: number` - Maximum number of series to display

**Error Handling:**
- Shows fallback UI if no series found
- Shows error message if fetch fails
- Logs errors to console for debugging

### `SeriesSection` (Client Component)

The original client component that renders the UI with provided data.

```tsx
import { SeriesSection } from './components/FeaturedSeries';

// If you want to handle data fetching yourself
export default async function CustomPage() {
  const seriesData = await getFeaturedSeries(3);
  
  return <SeriesSection seriesData={seriesData} />;
}
```

## Integration Examples

### 1. Simple Homepage Integration

```tsx
// app/page.tsx
import { NotionFeaturedSeries } from '../components/NotionFeaturedSeries';

export default async function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <NotionFeaturedSeries />
      <main className="flex-1 md:ml-64 p-6">
        <h1>Welcome to My Blog</h1>
        {/* Your content */}
      </main>
    </div>
  );
}
```

### 2. With Existing Layout

```tsx
// app/layout.tsx or page component
import { NotionFeaturedSeries } from '../components/NotionFeaturedSeries';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default async function BlogLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
        <NotionFeaturedSeries />
        <main className="flex-1 md:ml-64">
          {children}
        </main>
      </div>
      <Footer className="md:ml-64" />
    </div>
  );
}
```

### 3. Conditional Display

```tsx
// Only show series sidebar on certain pages
import { NotionFeaturedSeries } from '../components/NotionFeaturedSeries';

export default async function ConditionalPage({ 
  showSeries = true 
}: { 
  showSeries?: boolean 
}) {
  return (
    <div className="flex flex-col md:flex-row">
      {showSeries && <NotionFeaturedSeries />}
      <main className={showSeries ? "flex-1 md:ml-64" : "flex-1"}>
        {/* Your content */}
      </main>
    </div>
  );
}
```

## Caching

The `getFeaturedSeries` function uses Next.js `unstable_cache` with:
- **Cache Key**: `["featured-series"]`
- **Revalidation**: 600 seconds (10 minutes)
- **Behavior**: Data is cached for 10 minutes, then revalidated on next request

To manually revalidate the cache:

```tsx
import { revalidateTag } from 'next/cache';

// In a server action or API route
revalidateTag('featured-series');
```

## Error Handling

### Common Issues

1. **Missing Required Properties**
   - Check that your Notion database has all required properties
   - Verify property names match exactly (case-sensitive)

2. **No Series Displayed**
   - Ensure series Status is "Active" or "Completed" (not "Draft")
   - Verify series have published posts with `Published = true`
   - Check that posts are properly linked via `Blog Series` relation

3. **Images Not Loading**
   - Verify cover image properties are set correctly
   - Check that image files are accessible
   - Fallback placeholder images will be used if covers fail

### Debugging

Enable detailed logging by checking the browser console and server logs:

```tsx
// Add to your page for debugging
console.log('Featured series data:', await getFeaturedSeries());
```

## Performance Considerations

1. **Server-Side Rendering**: `NotionFeaturedSeries` is a server component that fetches data at build/request time
2. **Caching**: Data is cached for 10 minutes to reduce Notion API calls
3. **Parallel Fetching**: Series and their posts are fetched in parallel for better performance
4. **Filtering**: Only published content is fetched to minimize data transfer

## Customization

### Styling

Modify the Tailwind classes in the components:

```tsx
// Custom sidebar width
<div className="w-full md:w-96 md:fixed..."> {/* Changed from md:w-80 */}

// Custom spacing
<div className="space-y-8"> {/* Changed from space-y-6 */}
```

### Data Transformation

Customize the `transformToFeaturedSeries` function to modify how Notion data is processed:

```tsx
// In notion-utils.ts
function transformToFeaturedSeries(series: Series, posts: Post[]): FeaturedSeries {
  // Custom image logic
  const imageUrl = series.coverLight || 
    `https://your-custom-placeholder.com/${series.slug}.jpg`;
  
  // Custom article transformation
  const articles = posts
    .filter(post => post.featured) // Only featured articles
    .map(post => ({
      id: post.id,
      slug: post.slug,
      title: `${post.partNumber}. ${post.name}`, // Add numbering
      description: post.description,
      part: post.partNumber || 1,
    }));

  return { id: series.id, slug: series.slug, title: series.name, imageUrl, articles };
}
```

## TypeScript Support

All components and functions are fully typed:

```tsx
import type { FeaturedSeries, FeaturedArticle } from '../lib/notion-utils';

// Your custom components can use these types
interface CustomSeriesProps {
  series: FeaturedSeries;
  onSeriesClick?: (series: FeaturedSeries) => void;
}
```
