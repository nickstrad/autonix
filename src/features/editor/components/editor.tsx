"use client";
import { useState, useCallback } from "react";
import {
  useSuspenseWorkflow,
  useUpdateWorkflow,
} from "@/features/workflows/hooks/use-workflows";
import { ErrorView } from "@/components/app/error-view";
import { LoadingView } from "@/components/app/loading-view";
import { ENTITIES, NODE_COMPONENTS } from "@/lib/constants";
import {
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import { AddNodeButton } from "@/components/app/add-node-button";
import { useAtomValue, useSetAtom } from "jotai";
import "@xyflow/react/dist/style.css";
import { editorAtom } from "../store/atoms";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow({ id: workflowId });
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const setEditor = useSetAtom(editorAtom);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges]
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NODE_COMPONENTS}
        onInit={setEditor}
        fitView
        proOptions={{ hideAttribution: true }}
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left" className="p-2">
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export const EditorError = ({ workflowId }: { workflowId?: string }) => {
  return (
    <ErrorView
      message={`Error loading editor for ${ENTITIES.WORKFLOW} ${workflowId}...`}
    />
  );
};

export const EditorLoading = ({ workflowId }: { workflowId?: string }) => {
  return (
    <LoadingView
      message={`Loading editor for ${ENTITIES.WORKFLOW} ${workflowId}...`}
    />
  );
};

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflow();

  const handleSave = () => {
    if (!editor) {
      return;
    }
    const nodes = editor.getNodes();
    const edges = editor.getEdges();

    saveWorkflow.mutate({
      id: workflowId,
      nodes,
      edges,
    });
  };

  return (
    <Button
      size="sm"
      type="button"
      onClick={handleSave}
      disabled={saveWorkflow.isPending}
    >
      <SaveIcon className="size-4" /> Save
    </Button>
  );
};
