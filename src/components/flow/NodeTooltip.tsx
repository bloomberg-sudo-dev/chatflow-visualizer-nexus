
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageNodeData } from "./CustomNodes";

interface NodeTooltipProps {
  node: MessageNodeData;
}

export function NodeTooltip({ node }: NodeTooltipProps) {
  const roleLabel = node.role === "user" ? "User" : "Assistant";
  const headerClass = node.role === "user" ? "bg-user text-white" : "bg-assistant text-white";
  
  return (
    <Card className="w-full max-w-md shadow-lg border-2 border-border">
      <CardHeader className={`px-4 py-2 ${headerClass} rounded-t-lg`}>
        <div className="font-bold">{roleLabel}</div>
        {node.timestamp && <div className="text-xs opacity-80">{node.timestamp}</div>}
      </CardHeader>
      <CardContent className="p-4 text-sm whitespace-pre-wrap">
        {node.content}
      </CardContent>
    </Card>
  );
}
