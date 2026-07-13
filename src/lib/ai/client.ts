import "server-only";

import OpenAI from "openai";

import { ProjectOfficeError } from "./types";

let openAIClient: OpenAI | null = null;

export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim();

  if (!apiKey || !model) {
    throw new ProjectOfficeError(
      "SERVER_CONFIGURATION_ERROR",
      "The Project Office AI service is not configured.",
      500,
    );
  }

  return { apiKey, model };
}

export function getOpenAIClient() {
  if (!openAIClient) {
    const { apiKey } = getOpenAIConfig();
    openAIClient = new OpenAI({ apiKey });
  }

  return openAIClient;
}
