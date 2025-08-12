
### **Product Requirements Document (PRD): Wetware & Software Blog**

**1. Introduction & Vision**

*   **Product Name:** Wetware & Software
*   **Tagline:** **Wetware & Software: Engineering Human-AI Collaboration.**
*   **Overview:** Wetware & Software is a personal blog and living portfolio authored by Paul Philp, a software/AI engineer, founder, and executive. It serves as a platform to share insights and foster dialogue at the profound intersection of human systems (wetware) and advanced Artificial Intelligence (software). The blog aims to explore how current technological revolutions are not just transforming industries, but fundamentally redefining human existence (\(Dasein\)) through a new era of *collaboration* between people and technology.
*   **Brand Identity:** Seriously whimsical (combining deep insight with a unique, accessible, and engaging tone, epitomized by the avatar).

**2. Goals & Success Metrics**

*   **Establish Thought Leadership:** Be recognized as a leading voice in human-AI collaboration and complex systems thinking in software, with particular emphasis on deep, structured explorations through series content.
*   **Professional Resume:** Serve as a dynamic, living showcase of Paul Philp's current capabilities, experience, and unique perspective for potential employers and clients.
*   **Living Portfolio:** Directly display Paul Philp's work, including open-source projects and interactive demonstrations.
*   **Community Engagement:** Foster curious dialogue around complex topics (deferred to Phase 2).
*   **Content Pipeline:** Establish a sustainable process for consistent publication of high-quality content, prioritizing structured series.

**3. Target Audience**

*   Software/AI Engineers & Executives
*   Startup Founders
*   Individuals interested in the practical and philosophical implications of human-AI collaboration and complex systems.

**4. User Stories / Core Features (MVP)**

As a **reader**, I want to:
*   **Discover:** Easily find and engage with Paul Philp's latest and most impactful insights, with clear pathways to explore content series.
*   **Understand:** Grasp complex concepts (like LLM architectures, Effect-TS patterns) through precise explanations, relatable metaphors, and the structured progression of a series.
*   **Be Inspired:** Feel empowered by insights derived from profound personal and professional learning journeys.
*   **Explore:** Navigate through different types of content (essays, articles, and organized series) and related resources.
*   **Learn:** Access curated external content that deepens my understanding of specific topics.

As a **potential collaborator/employer**, I want to:
*   **Assess Capability:** Quickly understand Paul Philp's technical skills and project experience, especially through the depth demonstrated in content series.
*   **Connect:** Easily find ways to reach out for opportunities.

**5. Information Architecture & Navigation**

*   **Main Navigation:**
    *   Homepage (`/`)
    *   About (`/about`)
    *   **Projects (`/projects`)**
    *   **Series (`/series`)** - *New primary navigation item to highlight series content.*
    *   Essays (`/essays`)
    *   Articles (`/articles`)
    *   Resources (`/resources`)
    *   Contact / Connect (`/connect`)
*   **Series Structure:**
    *   **Series Landing Pages:** Dedicated pages for each series, providing an overview, its overall goal, and a list of all component articles/essays in sequential order.
    *   **In-Post Navigation:** Articles/essays within a series will include clear navigation (e.g., "Part X of Y," "Previous in Series," "Next in Series," link to Series Landing Page).

**6. Visual Design Principles**

*   **Color Palette:** Silver/light gray (#F8F8F8) as primary background, deep charcoal/near-black (#212121) for text, vibrant orange (#FF7A00) as accent color for CTAs and highlights.
*   **Typography:** Montserrat (headings) for modern professionalism, Merriweather (body text) for long-form readability, Monospaced font (e.g., Fira Code) for code.
*   **Imagery & Graphics:** Paul's avatar prominent. Lucide icons for general UI. **Brain icon** for human-focused content, **Robot icon** for technology-focused content (simple, minimalist line-art with subtle hover animations). Unique "Lighthouse icon" for NotebookLM-generated resources. Crisp and clean aesthetic.  All icons must come from Lucide icons.
*   **Layout & Tone:** Spacious whitespace, minimalist interface, subtle interactivity. Overall tone: serious exploration with whimsical flourishes.

**7. Technical Architecture**

*   **Platform/Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **Hosting:** Vercel
*   **Content Management System (CMS):** Notion (utilizing Notion API)
    *   **Series Management in Notion:** Implemented with two distinct Notion databases: a `Series` table (defining each series with its name, overall goal, description) and a `Blog Posts` table (containing individual articles/essays, each with a "Relation" property linking to its parent `Series` and a `Part Number` property indicating its sequence within that series).
*   **Package Manager/Runtime:** Bun
*   **Linter/Formatter:** Biome
*   **Database (Future):** Neon/PostgreSQL (for future dynamic features like comments, if implemented).

**8. Content Strategy (Initial Pipeline)**

*   **Core Content Types:**
    *   **Articles:** Shorter, precise, punchy, focused on a single technical topic with pragmatic goals. They include a clear "Job to be Done" statement, briefly acknowledge key influences, can use light humor, and **do not** use Paul's specific coined jargon (e.g., CAPs, core dump, Growth Anxiety, Lighthouse Keeper as labels for people/systems) or directly reference Paul's specific recent personal history (failed business, bankruptcy, failed marriage, detailed personal growth/differentiation journey).
    *   **Essays:** Longer, multi-topic (but single-themed), reflective, and appeal to "ideas people." They can extensively use Paul's specific coined jargon and integrate detailed aspects of Paul's personal history and transformative journey as core narrative elements.
*   **Main Essay:** "What My Marriage Falling Apart Taught Me About LLMs" (to be linked from /about and featured).
*   **Skills Showcase (on /about):** Detailed list of technologies (TypeScript, React/Next.js, Tailwind CSS, Effect-TS, AI agents/frameworks like LangChain and LangGraph, Vercel AI SDK).
*   **Blog Topics (on /about):**
    *   Building robust AI agents and conversational UIs
    *   Architecting large language model (LLM) applications for scale
    *   New paradigms in human-AI collaboration and interface design
    *   Deep dives into functional programming with Effect for AI
    *   Understanding and navigating complex adaptive systems in software architecture
    *   The transformation of software engineering in the AI era
    *   And Paul's giant marlin - The Personal LLM
*   **Featured Series:**
    *   **Series: A Coder's Guide to Understanding AI (5 Parts):**
        1.  The AI Transistor: How a Neural Network Computes
        2.  The LLM Operating System: A New Paradigm for AI Interaction
        3.  Building Bridges: Your Code and the LLM's API
        4.  Orchestrating the Swarm: Architecting Agentic AI Workflows
        5.  The Human Element: When Wetware Meets Software
    *   **Series: Mastering Effect - Systemically Sound Programming (4 Parts):**
        1.  The TypeScript Gap: Why Our Systems Are Still Fragile
        2.  The Effect Blueprint: Engineering Predictable Behavior
        3.  Architecting Soundness: Concurrency, Error Management, and Dependencies
        4.  The Future of Soundness: Effect in AI and Beyond
*   **Standalone Articles (Examples):**
    *   "LLMs are grown, not built." - How to train your AI.
    *   No Moore's Law: The limitations of LLMs.
    *   How to measure an LLM.
    *   LLM Basics.

**9. Future Considerations / Roadmap (Phase 2 & Beyond)**

*   **Broader UX Features:** Implement search functionality, newsletter/subscription (email list), comment system.
*   **Interactive Demos:** Integrate live, interactive demos of `Buddy` frameworks directly within articles/work pages.
*   **Automated Lighthouse Generation:** Productize the NotebookLM => Website process for generating interactive study guides.
*   **Guest Contributions:** Potentially enable other authors to contribute content.