# 🎮 Kids AI Learning Game

> **A personal project built with love** — I created this game for my 3-year-old child to make learning fun and interactive. As a software developer, I wanted to combine my passion for technology with real-life parenting, using AI to generate fresh educational content that keeps my child engaged and curious every day. The entire game interface is in **Arabic** with full **RTL** support and **Arabic text-to-speech**, making it one of the few AI-powered educational games designed specifically for Arabic-speaking children.

**🌐 [Play it live!](https://kids-ai-learning-game.vercel.app)**

---

## 🎯 Why This Project?

Most educational apps for kids are in English. I couldn't find a good Arabic AI-powered learning game for my child, so I built one myself. This project demonstrates:

- **Solving a real problem** — not just a tutorial, but a tool my family uses daily
- **AI in everyday life** — using OpenAI to generate unlimited educational content in Arabic
- **Modern development stack** — MCP Server, Agentic AI patterns, and full-stack TypeScript
- **Thinking like a product owner** — parent dashboard, adaptive difficulty, progress tracking

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Four Game Modes** | Colors, Shapes, Animals, and AI Smart Mode |
| 🤖 **AI-Generated Questions** | Unlimited fresh content via OpenAI — never the same game twice |
| 🔊 **Arabic Text-to-Speech** | Questions read aloud — designed for children who can't read yet |
| 📈 **Adaptive Difficulty** | Automatically adjusts based on the child's performance |
| 📊 **Parent Dashboard** | Track progress, accuracy, streaks, and learning patterns |
| 💾 **Progress Persistence** | Stats saved across sessions |
| 🎉 **Celebration Animations** | Positive reinforcement to keep kids motivated |
| 🛡️ **Error Boundaries** | Graceful error handling throughout the app |
| 🌍 **Full RTL & Arabic** | Built from the ground up for Arabic-speaking children |

---

## 🤖 AI & Agentic Architecture

This project showcases modern AI integration patterns:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Game UI        │────▶│  API Routes   │────▶│  OpenAI API     │
│   (React/Next)   │◀────│  /api/*       │◀────│  (gpt-4o-mini)  │
└─────────────────┘     └──────────────┘     └─────────────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  MCP Server       │
                     │  - get_challenge  │
                     │  - list_challenges│
                     │  - daily_content  │
                     └──────────────────┘
```

**Key patterns:**
- **Lazy AI client** — OpenAI loads only when an API key is available; the app works fully without it
- **Fallback system** — Built-in question bank ensures the game always works, with or without AI
- **Adaptive agent** — Difficulty auto-adjusts: 3 correct → harder, wrong answer → easier
- **MCP integration** — Custom server with tools and resources for AI agent communication

---

## 🏗️ Project Structure

```
kids-ai-game/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/
│   │   │   ├── challenge/    # Static challenge API
│   │   │   └── ai-challenge/ # AI-powered challenge generation
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # React components
│   │   ├── GameMenu.tsx
│   │   ├── ColorGame.tsx
│   │   ├── ShapeGame.tsx
│   │   ├── AnimalGame.tsx
│   │   ├── AiGame.tsx
│   │   ├── ParentDashboard.tsx
│   │   ├── Celebration.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useSound.ts      # Web Audio API sound effects
│   │   └── useSpeech.ts     # Speech Synthesis (TTS)
│   ├── services/             # Business logic layer
│   │   ├── challengeService.ts
│   │   └── statsService.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   └── __tests__/            # Unit & integration tests
│       ├── statsService.test.ts
│       └── challengeApi.test.ts
├── mcp-server/               # Custom MCP Server
│   └── src/
│       ├── index.ts          # MCP Tools & Resources
│       └── content.ts        # Educational content database
├── Dockerfile                # Multi-stage Docker build
├── jest.config.js
└── .cursor/mcp.json          # MCP Server configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/FoxFreih/kids-ai-learning-game.git
cd kids-ai-learning-game
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

### Docker

```bash
docker build -t kids-ai-game .
docker run -p 3000:3000 kids-ai-game
```

---

## 🤖 AI Integration (Optional)

To enable AI-generated questions:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create `.env.local`:

```env
OPENAI_API_KEY=your-key-here
```

The game works fully without an API key using the built-in question bank.

---

## 🔧 MCP Server

The project includes a custom MCP Server that provides:

| Tool | Description |
|------|-------------|
| `get_challenge` | Get a random educational challenge by category and difficulty |
| `list_challenges` | List all challenges for a category |
| `daily_content` | Get age-appropriate daily learning suggestions |

### Connect to Cursor

```json
{
  "mcpServers": {
    "kids-game": {
      "command": "npx",
      "args": ["ts-node", "./mcp-server/src/index.ts"]
    }
  }
}
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | Full-stack React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Web Audio API** | Sound effects (no audio files needed) |
| **Web Speech API** | Arabic text-to-speech |
| **OpenAI API** | AI content generation |
| **MCP SDK** | Model Context Protocol server |
| **Jest + ts-jest** | Testing framework |
| **Docker** | Containerization |
| **Vercel** | Production deployment |

---

## 📚 Key Concepts Demonstrated

| Concept | How it's used |
|---------|---------------|
| **MCP Server** | Custom tools and resources for AI agent communication |
| **Agentic AI** | AI-generated educational content with fallback system |
| **Adaptive Learning** | Dynamic difficulty that responds to child's performance |
| **Service Architecture** | Clean separation: types, services, hooks, components |
| **Error Boundaries** | Graceful React error handling with child-friendly messages |
| **Web APIs** | Audio synthesis (no files) and speech synthesis (Arabic TTS) |
| **RTL Support** | Full Arabic right-to-left layout and localization |
| **CI/CD** | Auto-deploy to Vercel on every push |

---

## 📄 License

MIT
