
### Architecture Document: Wetware & Software Blog

1. Introduction

This document outlines the technical architecture for the "Wetware & Software" blog, defining its structure, major components, and how they interact to deliver content and achieve the product goals. The blog aims to be a thought leadership platform and living portfolio for Paul Philp, exploring the intersection of human systems (wetware) and AI (software) with a focus on engineering human-AI collaboration through a "seriously whimsical" lens.

2. Overall System Architecture (High-Level)

The blog employs a modern, server-rendered React framework, leveraging headless CMS for content. This provides a performant, scalable, and developer-centric environment.

+----------------+       +-------------------+       +-----------------+
|   Content      |       |   Application     |       |    Deployment   |
|   Management   |       |   Frontend        |       |    & Hosting    |
+----------------+       +-------------------+       +-----------------+
|                |       | Next.js (App Router)  |       |                 |
| Notion DBs     +------>| + React Components  +------>|     Vercel      |
| (Blog Posts    | API   | + Tailwind CSS      | Build |  (CDN, Edge)    |
| & Series)      |       | + Data Fetching     |       |                 |
|                |       |   (from Notion)   |       |                 |
+----------------+       +-------------------+       +-----------------+
                                    ^
                                    |
+-------------------+               |  Version Control
|   Developer      |----------------+
|   Environment    |
+-------------------+
|  Bun (Runtime)   |
|  Biome (Tools)   |
|  Git (VCS)       |
+-------------------+

3. Key Architectural Decisions & Rationale

*   Next.js (App Router):
    *   Rationale: Chosen for its robust capabilities in building modern web applications. The App Router facilitates strong architectural patterns (layouts, server components, nested routing) for maintainable code, essential for organizing content types and series. It supports various rendering strategies (SSR, SSG, ISR) crucial for blog content (e.g., static generation for essays for performance, server-side for potential dynamic features). Provides excellent SEO features and a strong developer experience. Crucial for showcasing Paul's React/Next.js expertise as a living portfolio.
*   Tailwind CSS:
    *   Rationale: A utility-first CSS framework that enables rapid, custom, and highly performant UI development. Its class-based approach aligns with a "crisp and clean" design aesthetic and minimizes custom CSS, leading to smaller bundle sizes.
*   Notion as Headless CMS:
    *   Rationale: Leverages Paul's existing familiarity with Notion for content authoring, significantly reducing the initial friction and learning curve for content creation. Its API provides programmatic access to structured content across multiple databases, allowing Next.js to fetch and render blog posts and series. This separates content from code, enabling flexible content updates.
*   Vercel:
    *   Rationale: The ideal hosting platform for Next.js applications, offering seamless Git integration, automatic deployments (CI/CD), global CDN for high performance, and serverless functions for future dynamic capabilities. Aligns with a modern, high-performance web presence.
*   Bun:
    *   Rationale: Chosen for its speed as a JavaScript runtime and package manager. It significantly enhances the development experience (install, dev server, build times) and efficiency.
*   Biome:
    *   Rationale: Selected as the linter, formatter, and organizer to enforce consistent code style, improve code quality, and maintain a high standard of maintainability from the outset. Contributes to a streamlined developer workflow.
*   Absence of Dedicated Backend/Database (Initial MVP):
    *   Rationale: To accelerate initial development and deployment, dynamic features (e.g., comments, user accounts) are deferred. Content is primarily static (fetched from Notion at build time or with minimal server-side rendering). This simplifies the architecture and leverages Vercel's strengths for static sites. Neon/PostgreSQL is reserved for future dynamic functionality.

4. Component Breakdown (Conceptual Modules)

The application will be organized into logical components and modules:

*   src/app: Contains page-level components and routing for the App Router, including dedicated routes for /essays, /articles, and /series/[series-slug].
*   src/components: Reusable UI components (e.g., Header, Footer, Card, Button, Series Navigation).
*   src/lib: Utility functions, Notion API client (for data fetching and parsing for both blog posts and series data).
*   src/styles: Global CSS (Tailwind directives) and any custom CSS.
*   src/content (Conceptual): While content is in Notion, this might include markdown parsing utilities if mdx is used locally, or content schema definitions for mapping Notion properties.

5. Content Model: Notion Database Structure

All blog content and its organization will be managed across two interconnected Notion databases, serving as the primary source of truth.

1.  `Series` Database:
    *   Purpose: Defines and manages each distinct blog series.
    *   Key Properties (Columns):
        *   Name (Title): (Required) The title of the series (e.g., "A Coder's Guide to AI").
        *   Slug (Text): (Required) URL-friendly identifier for the series (e.g., ai-coder-guide). Must be unique.
        *   Description (Text): Overall summary/introduction to the series.
        *   Series Goal (Text): The overarching objective or learning outcome for the entire series.
        *   Status (Select): Current development status (e.g., Active, Completed, Draft).
        *   Cover Image (Files & Media): Optional image for the series landing page.
        *   Posts in Series (Rollup): (Auto-populated from `Blog Posts` relation) Displays linked posts, used for navigation and completeness checks.

2.  `Blog Posts` Database:
    *   Purpose: Stores all individual articles, essays, and resources.
    *   Key Properties (Columns):
        *   Name (Title): (Required) The primary title of the content piece.
        *   Slug (Text): (Required) URL-friendly identifier. Must be unique across all content.
        *   Published (Checkbox): (Required) TRUE if content is public.
        *   Publish Date (Date): (Required for published) Date content was (or will be) published.
        *   Content Type (Select): (Required) Primary format: Essay, Article, Resource. Used for routing and display.
        *   Focus Area (Select) (Required) Determines the icon display: Human-Centric (Brain icon), Tech-Centric (Robot icon), Human-AI Collaboration (Lucide  ampersand icon), Coding (Lucide code icon), or Business of AI (Lucide briefcase-business icon).
        *   Tags (Multi-select): Relevant technical/conceptual tags for categorization (e.g., LLMs, EffectTS, AttachmentTheory). Series names are NOT used here.
        *   Description (Text): Concise summary/excerpt. Used for card displays, SEO meta-descriptions.
        *   Read Time (min) (Number): Estimated reading time.
        *   Featured (Checkbox): TRUE if prominently displayed on Homepage/Featured.
        *   Blog Series (Relation): (Optional) Links to an entry in the `Series` database, indicating this post is part of a series.
        *   Part Number (Number): (Required if `Blog Series` is set) Sequential order within the linked series (e.g., 1, 2).
        *   GitHub Link (URL): (Optional) Link to relevant GitHub repo.
        *   Demo Link (URL): (Optional) Link to live demo for projects.
        *   Source Link (URL): (Required for Resources) External link to original resource.
        *   Curator's Note (Text): (Required for Resources) Paul's unique take/explanation.
        *   Icon (Files & Media): (Optional for Resources, overrides default) Custom icon (e.g., Lighthouse icon).
        *   Notion Page ID (ID - auto-generated): (Read-only) Auto-generated by Notion, used internally by the application for fetching.

*   Content Storage: The main body of the content for each article/essay/resource will be stored directly within its respective Notion page, utilizing Notion's rich block editor. Next.js will fetch and parse these blocks for rendering.

6. Data Flow (Content Lifecycle)

1.  Content Authoring: Paul creates and updates blog posts (Essays, Articles, Resources) as pages/items within the `Blog Posts` Notion database. Metadata is managed via Notion properties. Series are defined in the separate `Series` database and linked via relations.
2.  Data Fetching:
    *   At build time (for static pages, e.g., essay/article detail pages, and series landing pages), Next.js pages/API routes will fetch content from the Notion API (querying both `Blog Posts` and `Series` databases as needed).
    *   For dynamic content (e.g., "Latest Insights" on homepage, filtered lists), fetches might occur at request time using Server Components or `getServerSideProps` where appropriate.
3.  Data Transformation: Raw data from Notion API (JSON format) is transformed into a clean, consistent format suitable for rendering in React components. This involves parsing Notion blocks into HTML/React elements and structuring series data.
4.  Frontend Rendering: React components receive the processed content data and render the UI using Tailwind CSS, adhering to the defined visual design principles, including series navigation within posts.
5.  User Interaction: Users interact with the rendered blog, navigating pages, exploring series, filtering content, and consuming information.

7. Deployment Strategy

*   Git-based Deployment: The project repository will be linked to Vercel.
*   Continuous Integration/Continuous Deployment (CI/CD): Vercel automatically deploys new changes on every push to the `main` branch.
*   Environment Variables: Sensitive API keys (`NOTION_API_KEY`, `NOTION_DATABASE_ID_BLOG_POSTS`, `NOTION_DATABASE_ID_SERIES`) will be stored securely as environment variables on Vercel, not in the Git repository.

8. Scalability & Future Considerations

The architecture is designed with future growth in mind:

*   Content Volume: Notion can scale to accommodate a large number of articles and series. Performance can be managed via incremental static regeneration (ISR) if pure static builds become too slow, particularly for series pages with many parts.
*   Interactive Features: The Next.js/Vercel/Neon stack provides a clear path for adding dynamic features like comments, subscriptions, or user accounts.
*   `Buddy` Framework Integration: The `Buddy` frameworks (`BuddyTalk`/`BuddyAgents`) will be integrated as interactive demos or features, potentially within dedicated portfolio sections or even embedded within relevant articles, showcasing their "Man and Technology" principles directly.
*   Automated Lighthouse Generation: The existing architecture can be extended to integrate automated content processing (e.g., fetching video transcripts, processing with an LLM, storing results in Notion, and then rendering these as interactive "Lighthouse" resources).