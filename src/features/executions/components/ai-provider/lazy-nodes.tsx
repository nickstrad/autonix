"use client";

import { getAIProviderNode } from "./node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeProps } from "@xyflow/react";
import type { AIProviderNodeData } from "./node";

const GeminiNodeComponent = getAIProviderNode(NodeType.GEMINI);
const AnthropicNodeComponent = getAIProviderNode(NodeType.ANTHROPIC);
const OpenAINodeComponent = getAIProviderNode(NodeType.OPENAI);

export const GeminiNode = (props: NodeProps<AIProviderNodeData>) => <GeminiNodeComponent {...props} />;
GeminiNode.displayName = "GeminiNode";

export const AnthropicNode = (props: NodeProps<AIProviderNodeData>) => <AnthropicNodeComponent {...props} />;
AnthropicNode.displayName = "AnthropicNode";

export const OpenAINode = (props: NodeProps<AIProviderNodeData>) => <OpenAINodeComponent {...props} />;
OpenAINode.displayName = "OpenAINode";
