# Wetware & Software

Welcome to the open-source repository for the "Wetware & Software" blog!

This space is dedicated to exploring the fascinating and often chaotic intersection of human systems and advanced AI. Here, we delve into new paradigms of collaboration between people and technology, offering a front-row seat to a revolution that transforms us from the inside out.

Authored by Paul Philp, a software/AI engineer, founder, and executive who'd be the haggard, grey-haired veteran of technology revolutions—if he wasn't bald.

## 🚀 Get Started

This is a monorepo containing both the web application and CLI tool.

### **Prerequisites**
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- Node.js 18+ (for compatibility)

### **Quick Start**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-github-username>/wetware-software.git
    cd wetware-software
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    ```bash
    cp .env.local.example .env.local
    # Edit .env.local with your Notion API credentials
    ```

### **Development**

**Web Application:**
```bash
bun run dev:web
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**CLI Tool:**
```bash
bun run dev:cli
```

**Build Everything:**
```bash
bun run build:all
```

**Code Quality:**
```bash
bun run format     # Format all code
bun run check      # Lint all code
bun run lint:fix   # Auto-fix linting issues
```

## 📁 Project Structure

```
wetware-software/
├── apps/
│   └── web/                 # Next.js web application
│       ├── src/            # Web app source code
│       ├── public/         # Static assets
│       └── [configs]       # Next.js, Tailwind, TypeScript configs
├── packages/
│   ├── cli/                # CLI tool for content management
│   │   ├── src/           # CLI source code
│   │   └── prompts/       # AI prompt templates
│   └── shared/            # Shared utilities and types
│       └── src/           # Common Notion utilities, types
├── docs/                  # Project documentation
└── [workspace configs]    # Root-level configuration files
```

## ✨ Technologies

**Web Application:**
*   [Next.js](https://nextjs.org/) (App Router) - The React framework for production
*   [React](https://react.dev/) - A JavaScript library for building user interfaces
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

**CLI Tool:**
*   [Effect-TS](https://effect.website/) - Functional programming framework
*   [Zod](https://zod.dev/) - TypeScript-first schema validation
*   [Vitest](https://vitest.dev/) - Fast unit testing framework

**Shared:**
*   [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime and package manager
*   [Biome](https://biomejs.dev/) - Fast linter and formatter
*   [Notion API](https://developers.notion.com/) - Content management backend

## 🔗 Live Site

Visit the blog live at [https://www.wetware-software.com](https://www.wetware-software.com) (Once deployed).

## 💡 Contribute

While this is primarily a personal blog, thoughts and feedback are always welcome. Feel free to open an issue if you spot a bug or have a suggestion!

---

**[Your Name/Logo/Avatar]**
*A place to put a small avatar image, or a simple text signature.*