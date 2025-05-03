
import { useState } from "react";
import { ConversationInput } from "./ConversationInput";
import { ConversationFlow } from "./flow/ConversationFlow";
import { MessageNodeData } from "./flow/CustomNodes";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ReactFlowProvider } from "@xyflow/react";

// Mock function to parse conversation data
// In a real app, this would call an API to fetch the conversation
const parseConversation = (url: string): Promise<MessageNodeData[]> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      // For demo, we'll generate a mock conversation based on the URL hash
      const hash = url.split("/").pop() || "";
      const messageCount = (hash.length % 5) + 5; // 5-9 messages
      
      const messages: MessageNodeData[] = [];
      for (let i = 0; i < messageCount; i++) {
        const role = i % 2 === 0 ? "user" : "assistant";
        const messageLength = role === "user" ? 
          (hash.charCodeAt(i % hash.length) % 100) + 50 : 
          (hash.charCodeAt(i % hash.length) % 200) + 100;
          
        messages.push({
          id: `message-${i}`,
          role,
          content: `${role === "user" ? "User question" : "Assistant response"} ${i+1}: ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(messageLength / 50)}`,
          timestamp: new Date().toISOString()
        });
      }
      
      resolve(messages);
    }, 1500);
  });
};

export function ConversationVisualizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageNodeData[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      const data = await parseConversation(url);
      setMessages(data);
      setHasSubmitted(true);
      
      toast({
        title: "Success!",
        description: `Loaded conversation with ${data.length} messages.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load conversation data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <ConversationInput onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
      
      {hasSubmitted && (
        <div className="w-full h-[600px] mt-6">
          <ReactFlowProvider>
            <ConversationFlow messages={messages} />
          </ReactFlowProvider>
        </div>
      )}
      
      {!hasSubmitted && !isLoading && (
        <div className="flex justify-center items-center mt-12">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-bold mb-2">Paste a ChatGPT share link to begin</h3>
            <p className="text-muted-foreground">
              Enter a link to a shared conversation from chat.openai.com to visualize it as an interactive node graph.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
