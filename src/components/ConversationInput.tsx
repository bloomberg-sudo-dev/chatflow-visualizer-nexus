
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface ConversationInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function ConversationInput({ onSubmit, isLoading }: ConversationInputProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ChatGPT share link.",
        variant: "destructive",
      });
      return;
    }

    // Updated validation to handle both formats
    const validLinkPatterns = [
      /chat\.openai\.com\/share\//,
      /chatgpt\.com\/share\//
    ];
    
    const isValidLink = validLinkPatterns.some(pattern => pattern.test(url));
    
    if (!isValidLink) {
      toast({
        title: "Invalid Link",
        description: "Please enter a valid ChatGPT share link (chat.openai.com/share/... or chatgpt.com/share/...).",
        variant: "destructive",
      });
      return;
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-1">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your ChatGPT share link"
          className="pr-12"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-action animate-spin"></div>
          </div>
        )}
      </div>
      <Button type="submit" className="bg-action hover:bg-action-dark" disabled={isLoading}>
        <span className="mr-2">Visualize</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
