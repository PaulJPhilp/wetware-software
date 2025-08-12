---

### **Implementation Plan: Wetware & Software Blog**

**Goal:** To build and deploy the "Wetware & Software" blog as per the Architecture Document, focusing on a robust MVP first, with a clear path for future enhancements.

**Phase 0: Pre-computation (One-Time Setup)**

*   **Objective:** Prepare your local environment and external services.
*   **Tasks:**
    *   Ensure Node.js and Bun are installed.
    *   Create a Notion Database for `Wetware & Software Content` with all defined properties (Name, Slug, Published, Publish Date, Content Type, Focus Area, Tags, Description, Read Time, Featured, GitHub Link, Demo Link, Source Link, Curator's Note, Icon).
    *   Create a Notion Integration Token and connect it to your `Wetware & Software Content` database (copy API Key and Database ID).
    *   Create a Vercel account.
    *   Create an empty GitHub repository (e.g., `PaulJPhilp/wetware-software.git`).

**Phase 1: Project Initialization & Core Tooling Setup**

*   **Objective:** Get the basic Next.js project up and running with essential tools.
*   **Tasks:**
    1.  **Create Next.js Project:**
        ```bash
        bun create next-app wetware-software --ts --no-eslint --no-tailwind --app --src-dir --import-alias "@/*"
        ```
    2.  **Navigate & Initialize Git:**
        ```bash
        cd wetware-software
        git init
        git add .
        git commit -m "feat: initial Next.js project scaffold"
        ```
    3.  **Connect to GitHub:**
        ```bash
        git remote add origin https://github.com/PaulJPhilp/wetware-software.git
        git branch -M main
        git push -u origin main
        ```
    4.  **Add `.gitignore`:** Create the `.gitignore` file with standard Next.js/Bun/Biome rules and commit it.
    5.  **Configure Environment Variables:** Create `.env.local` and add `NOTION_API_KEY` and `NOTION_DATABASE_ID` (from Phase 0). Add `.env.local` to `.gitignore`.
    6.  **Install Tailwind CSS:**
        ```bash
        bun add -d tailwindcss postcss autoprefixer
        bunx tailwindcss init -p
        ```
        Configure `tailwind.config.js` to scan `src/` and update `src/app/globals.css`.
    7.  **Integrate Biome:**
        ```bash
        bun add -d @biomejs/biome
        ```
        Create `biome.json` and update `package.json` scripts (`format`, `lint:fix`, `check`).
    8.  **Verify Local Setup:**
        ```bash
        bun dev
        ```
        (Confirm default Next.js page displays correctly).
*   **Verification:** Project compiles, dev server runs, Git history is clean, basic styling works, Biome config is active.

**Phase 2: Content Integration Backbone (Notion & Data Fetching)**

*   **Objective:** Establish the core data fetching from Notion and initial content parsing.
*   **Tasks:**
    1.  **Install Notion SDK:**
        ```bash
        bun add @notionhq/client
        ```
    2.  **Create Notion Client Utility:** In `src/lib/notion.ts` (or similar), set up and export the `@notionhq/client` instance, using `process.env.NOTION_API_KEY`.
    3.  **Implement Basic Data Fetching Utility:** In `src/lib/notion-utils.ts`, write functions to:
        *   `getPublishedPosts()`: Fetch a list of published pages from your Notion database (filter by `Published` checkbox). Return only necessary properties (Name, Slug, Date, Type, Focus, Description, Tags, Read Time, Featured).
        *   `getPostContent(pageId: string)`: Fetch all blocks for a given Notion page ID.
    4.  **Initial Notion Content:** Add 1-2 dummy blog posts (one "Essay," one "Article") to your Notion database, marking them `Published` with all required properties.
*   **Verification:** Data fetching functions can successfully retrieve post metadata and content blocks from Notion.

**Phase 3: Core UI & Layout**

*   **Objective:** Implement the basic visual structure and global styles.
*   **Tasks:**
    1.  **Define Color Palette & Typography in Tailwind:** Configure `tailwind.config.js` with your specific color variables (silver, orange, charcoal) and font families (Montserrat, Merriweather, monospaced for code).
    2.  **Create Global Layout Component:** In `src/app/layout.tsx`, set up the basic HTML structure, import `globals.css`, and define your main `Header` and `Footer` components.
    3.  **Design `Header` Component:** Implement minimalist header with blog name, avatar, and main navigation links.
    4.  **Design `Footer` Component:** Implement basic footer with copyright, minimal links.
    5.  **Global Styles:** Fine-tune `src/app/globals.css` using Tailwind directives and any custom CSS needed for spacing/base styles (e.g., body background color).
*   **Verification:** All pages consistently display the defined header/footer and basic styling.

**Phase 4: Homepage Implementation**

*   **Objective:** Implement the homepage with core "Above the Fold" and "Latest Insights" sections.
*   **Tasks:**
    1.  **Fetch Latest Posts for Homepage:** In `src/app/page.tsx` (or an appropriate Server Component), use `getPublishedPosts()` to fetch a list of 3-5 latest posts, filtered by `Featured` if desired.
    2.  **Implement "Above the Fold" Section:**
        *   Prominently display blog name (`# Wetware & Software`) and your avatar.
        *   Add the tagline: "Where human systems meet AI: a front row seat to the revolution."
    3.  **Implement "Latest Insights" Section:**
        *   Loop through fetched posts, displaying each as a card/list item.
        *   For each post: render title, description, publish date, `[ESSAY]` / `[ARTICLE]` tag (conditionally rendered based on `ContentType` property from Notion).
        *   Implement **Brain icon** (for Human-Centric Focus) or **Robot icon** (for Tech-Centric Focus) next to each post entry. (Requires mapping `Focus Area` from Notion to icon component).
        *   Ensure clear links to "View All Essays" and "View All Articles" (leading to `src/app/essays/page.tsx` and `src/app/articles/page.tsx`).
    4.  **Basic Routing:** Set up `src/app/essays/page.tsx` and `src/app/articles/page.tsx` to just display "Essays List Coming Soon" for now.
*   **Verification:** Homepage loads, displays intro, tagline, latest posts with correct tags/icons, and navigation is functional.

**Phase 5: Essay/Article Content Page Implementation**

*   **Objective:** Enable display of individual essay/article content from Notion.
*   **Tasks:**
    1.  **Dynamic Routing for Posts:** Implement dynamic routes in Next.js (e.g., `src/app/essays/[slug]/page.tsx` and `src/app/articles/[slug]/page.tsx`). These pages will receive the `slug` as a parameter.
    2.  **Fetch Single Post Content:** Use `getPostContent(pageId)` (after resolving `pageId` from `slug`) to fetch content blocks for the specific essay/article.
    3.  **Notion Block Renderer:** This is key. Create a component (e.g., `src/components/NotionBlockRenderer.tsx`) that recursively processes Notion API blocks (paragraphs, headings, lists, code, images) and renders them as appropriate React/HTML elements, styled with Tailwind. This is a significant piece of work.
    4.  **Metadata Display:** Display Essay/Article title (H1), author (Paul Philp), publish date, read time, and tags/categories.
    5.  **Content Focus Icon:** Display the main Brain/Robot icon prominently at the top.
*   **Verification:** You can click on a post from the homepage and see its full content rendered correctly (text, headings, lists, basic images/code).

**Phase 6: About, Work, & Resources Page Implementation (MVP)**

*   **Objective:** Implement remaining core navigation pages with their defined content and features.
*   **Tasks:**
    1.  **About Page (`src/app/about/page.tsx`):**
        *   Add the full introductory text (Paul's bio, skills list, blog mission/topics).
        *   Add a prominent link to the "What My Marriage Falling Apart Taught Me About LLMs" essay (e.g., `/essays/my-marriage-and-ai`).
        *   Include "Paul Philp: At a Glance" summary with LinkedIn link.
    2.  **Work/Portfolio Page (`src/app/work/page.tsx`):**
        *   Implement the intro blurb: "Welcome to my workshop... collaborate with AI..."
        *   Create basic card components for projects. Display your 1-2 focus projects first manually.
        *   Add "Explore My Work" button (linking to your GitHub).
    3.  **Resources Page (`src/app/resources/page.tsx`):**
        *   Add the intro blurb for curated content.
        *   Implement a simple list or grid display for resource entries. Initially, hardcode a few key resources (e.g., Heidi Priebe's Lighthouse).
        *   Display Title, Source, **Your Unique Take**, and relevant technical tags.
        *   (Defer filter bar/search for Phase 8).
    4.  **Contact/Connect Page (`src/app/connect/page.tsx`):**
        *   Simple page with email address, X, and BlueSky links.
*   **Verification:** All main navigation links work, and pages display their intended initial content.

**Phase 7: Initial Deployment to Vercel**

*   **Objective:** Get the blog publicly accessible.
*   **Tasks:**
    1.  **Link to Vercel:** Go to Vercel dashboard, import your GitHub repo.
    2.  **Set Environment Variables:** Add `NOTION_API_KEY` and `NOTION_DATABASE_ID` as environment variables in Vercel project settings.
    3.  **Initial Deploy:** Trigger a deployment.
    4.  **Custom Domain (Optional):** If you have a custom domain (e.g., `wetware-software.com`), configure it in Vercel.
*   **Verification:** Blog is live and accessible at its Vercel URL (or custom domain).

**Phase 8: Refinement & Polish (Continuous Improvement)**

*   **Objective:** Enhance aesthetics, performance, and user experience.
*   **Tasks:**
    *   **Visual Fine-Tuning:** Implement subtle animations, hover effects, perfect spacing, and responsiveness across all devices.
    *   **SEO Optimization:** Add `next/head` components for dynamic titles, meta descriptions, Open Graph tags.
    *   **Error Pages:** Design custom 404/500 error pages.
    *   **Accessibility:** Basic accessibility (ARIA attributes, semantic HTML).
    *   **Performance:** Optimize image loading (`next/image`), code splitting.