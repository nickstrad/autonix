"use client";

import { getAIProviderNode } from "./node";
import { NodeType } from "@/generated/prisma";

export const GeminiNode = getAIProviderNode(NodeType.GEMINI);
export const AnthropicNode = getAIProviderNode(NodeType.ANTHROPIC);
export const OpenAINode = getAIProviderNode(NodeType.OPENAI);
