import { Node, Connection } from "@/generated/prisma/client";
import toposort from "toposort";
import { inngest } from "./client";
import { INNGEST_EVENTS } from "@/lib/constants";

export const topologicalSort = ({
  nodes,
  connections,
}: {
  nodes: Node[];
  connections: Connection[];
}) => {
  if (connections.length === 0) {
    return nodes;
  }

  const edges: Array<[string, string]> = connections.map(
    ({ fromNodeId, toNodeId }) => [fromNodeId, toNodeId]
  );

  const connectedNodeIds = new Set<string>();
  edges.forEach(([fromNodeId, toNodeId]) => {
    connectedNodeIds.add(fromNodeId);
    connectedNodeIds.add(toNodeId);
  });

  nodes.forEach((n) => {
    if (connectedNodeIds.has(n.id)) {
      return;
    }
    edges.push([n.id, n.id]);
  });

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (err) {
    if (err instanceof Error && err.message.toLowerCase().includes("cyclic")) {
      throw new Error("Workflow contains a cycle");
    }
    throw err;
  }

  const nodeMap = new Map<string, Node>(nodes.map((n) => [n.id, n]));
  return sortedNodeIds.map((nodeId) => nodeMap.get(nodeId)!).filter(Boolean);
};

export const sendWorkflowExecutionEvent = async (data: {
  workflowId: string;
  [key: string]: unknown;
}) => {
  return inngest.send({
    name: INNGEST_EVENTS.EXECUTE_WORKFLOW.NAME,
    data,
  });
};
