
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ConversationVisualizer } from "@/components/ConversationVisualizer";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-action-light to-action flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" x2="22" y1="12" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold">ChatFlow Visualizer</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Visualize ChatGPT Conversations</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your ChatGPT conversations into interactive node graphs. Simply paste a share link and explore!
              </p>
              
              <ConversationVisualizer />
            </section>
          </div>
        </main>
        
        <footer className="border-t border-border mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-muted-foreground text-sm">
            <p>ChatFlow Visualizer | Created for visualizing ChatGPT conversations</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
