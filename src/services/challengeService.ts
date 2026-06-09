import { Challenge } from "@/types";

export async function fetchChallenge(category: string, difficulty: string): Promise<Challenge> {
  const response = await fetch(
    `/api/challenge?category=${category}&difficulty=${difficulty}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch challenge: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchAiChallenge(category: string, difficulty: string): Promise<Challenge> {
  const response = await fetch(
    `/api/ai-challenge?category=${category}&difficulty=${difficulty}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch AI challenge: ${response.statusText}`);
  }
  return response.json();
}
