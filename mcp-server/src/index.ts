import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getRandomChallenge, getChallengesByCategory, getDailyContent } from "./content";

const server = new McpServer({
  name: "kids-game-server",
  version: "1.0.0",
});

// Tool: Get a random educational challenge
server.tool(
  "get_challenge",
  "Get a random educational challenge for the kids game",
  {
    category: z.enum(["colors", "shapes", "animals", "numbers"]).describe("The category of challenge"),
    difficulty: z.enum(["easy", "medium", "hard"]).describe("Difficulty level"),
  },
  async ({ category, difficulty }) => {
    const challenge = getRandomChallenge(category, difficulty);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(challenge, null, 2),
        },
      ],
    };
  }
);

// Tool: Get all challenges for a category
server.tool(
  "list_challenges",
  "List all available challenges for a specific category",
  {
    category: z.enum(["colors", "shapes", "animals", "numbers"]).describe("The category to list"),
  },
  async ({ category }) => {
    const challenges = getChallengesByCategory(category);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(challenges, null, 2),
        },
      ],
    };
  }
);

// Tool: Generate daily content suggestion
server.tool(
  "daily_content",
  "Get a daily learning suggestion for the child",
  {
    childAge: z.number().min(2).max(6).describe("Age of the child in years"),
  },
  async ({ childAge }) => {
    const content = getDailyContent(childAge);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(content, null, 2),
        },
      ],
    };
  }
);

// Resource: Game statistics and progress
server.resource(
  "game-stats",
  "game://stats",
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            totalGames: 0,
            correctAnswers: 0,
            favoriteCategory: "colors",
            streak: 0,
            lastPlayed: new Date().toISOString(),
          }),
        },
      ],
    };
  }
);

// Resource: Available content catalog
server.resource(
  "content-catalog",
  "game://catalog",
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            categories: ["colors", "shapes", "animals", "numbers"],
            totalChallenges: 24,
            languages: ["ar", "en"],
            ageRange: "2-6",
          }),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Kids Game MCP Server running on stdio");
}

main().catch(console.error);
