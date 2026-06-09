# 🎮 Kids AI Learning Game

An AI-powered educational game for children aged 2-6, built with **Next.js**, **MCP**, and **Agentic AI** patterns.

The game teaches colors, shapes, and animals through interactive challenges with Arabic text-to-speech support, adaptive difficulty, and AI-generated content.

## ✨ Features

- **🎨 Four Game Modes** — Colors, Shapes, Animals, and AI Smart Mode
- **🤖 AI-Generated Questions** — Dynamic content via OpenAI integration
- **🔊 Arabic Text-to-Speech** — Questions read aloud for pre-reading children
- **📈 Adaptive Difficulty** — Auto-adjusts based on child's performance
- **📊 Parent Dashboard** — Track progress, accuracy, and learning patterns
- **💾 Progress Persistence** — Stats saved locally across sessions
- **🎉 Celebration Animations** — Positive reinforcement with Framer Motion
- **🛡️ Error Boundaries** — Graceful error handling throughout

## 🏗️ Architecture

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/kids-ai-learning-game.git
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

## 🤖 AI Integration (Optional)

To enable AI-generated questions:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create `.env.local`:

```env
OPENAI_API_KEY=your-key-here
```

The game works fully without an API key using the built-in question bank.

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

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | Full-stack React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Web Audio API** | Sound effects (no audio files) |
| **Web Speech API** | Arabic text-to-speech |
| **OpenAI API** | AI content generation |
| **MCP SDK** | Model Context Protocol server |
| **Jest + ts-jest** | Testing framework |
| **Docker** | Containerization |

## 📚 Key Concepts Demonstrated

- **MCP Server Development** — Custom tools and resources
- **Agentic AI Patterns** — AI-generated educational content
- **Adaptive Learning** — Dynamic difficulty adjustment
- **Service Layer Architecture** — Clean separation of concerns
- **Error Boundaries** — Graceful React error handling
- **Web APIs** — Audio synthesis and speech synthesis
- **RTL Support** — Full Arabic right-to-left layout

## 📄 License

MIT
