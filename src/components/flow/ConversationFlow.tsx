
import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  useReactFlow,
} from "@xyflow/react";
import { MessageNode, MessageNodeData } from "./CustomNodes";
import { NodeTooltip } from "./NodeTooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "@xyflow/react/dist/style.css";

interface ConversationFlowProps {
  messages: MessageNodeData[];
}

export function ConversationFlow({ messages }: ConversationFlowProps) {
  const [hoveredNode, setHoveredNode] = useState<MessageNodeData | null>(null);
  const { fitView } = useReactFlow();
  
  // Define the node types
  const nodeTypes = useMemo<NodeTypes>(() => ({
    message: MessageNode,
  }), []);
  
  // Create nodes from messages
  const nodes: Node[] = useMemo(() => {
    return messages.map((message, index) => ({
      id: message.id,
      type: "message",
      data: message,
      position: { x: 0, y: index * 150 },
    }));
  }, [messages]);
  
  // Create edges between nodes
  const edges: Edge[] = useMemo(() => {
    return messages.slice(0, -1).map((_, index) => ({
      id: `edge-${index}`,
      source: messages[index].id,
      target: messages[index + 1].id,
      animated: true,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));
  }, [messages]);
  
  // Handle node hover
  const onNodeMouseEnter = useCallback((_, node) => {
    setHoveredNode(node.data);
  }, []);
  
  const onNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);
  
  // Fit view on initial render
  const onInit = useCallback(() => {
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 50);
  }, [fitView]);
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#94a3b8" gap={16} />
        <Controls className="m-2" />
        <MiniMap
          nodeColor={(node) => {
            return node.data.role === "user" ? "#8B5CF6" : "#3B82F6";
          }}
        />
        
        {hoveredNode && (
          <div
            className="absolute p-4 z-50 tooltip-content animate-fade-in"
            style={{ 
              top: "20px", 
              right: "20px", 
              maxWidth: "calc(100% - 40px)",
              maxHeight: "calc(100% - 40px)",
              overflow: "auto"
            }}
          >
            <NodeTooltip node={hoveredNode} />
          </div>
        )}
      </ReactFlow>
    </div>
  );
}
