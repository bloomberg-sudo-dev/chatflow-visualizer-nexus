
import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

// This interface represents just the data portion of a node
export interface MessageNodeData {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export const MessageNode = memo(({ data }: NodeProps<MessageNodeData>) => {
  const isUser = data.role === "user";
  const nodeClass = isUser ? "user-node" : "assistant-node";
  
  // Truncate content if it's too long
  const truncatedContent = data.content.length > 90 
    ? data.content.substring(0, 90) + "..." 
    : data.content;
  
  const roleLabel = isUser ? "User" : "Assistant";
  
  return (
    <>
      <div className={`p-3 min-w-[200px] max-w-[280px] ${nodeClass}`}>
        <div className="font-semibold text-sm mb-2">{roleLabel}</div>
        <div className="text-xs overflow-hidden">{truncatedContent}</div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0 !w-16 !h-3"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0 !w-16 !h-3"
      />
    </>
  );
});

MessageNode.displayName = "MessageNode";
