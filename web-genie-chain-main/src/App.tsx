
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIAssistant from "./pages/AIAssistant";
import AIAgents from "./pages/AIAgents";
import Login from "./pages/Login";
import Documentation from "./pages/Documentation";
import MarketIntelligence from "./pages/MarketIntelligence";
import AutomatedDocumentation from "./pages/AutomatedDocumentation";
import CustomAgents from "./pages/CustomAgents";
import SmartContractGenerator from "./pages/SmartContractGenerator";
import SecurityAudit from "./pages/SecurityAudit";
import GasOptimization from "./pages/GasOptimization";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/automated-documentation" element={<AutomatedDocumentation />} />
          <Route path="/custom-agents" element={<CustomAgents />} />
          <Route path="/smart-contract-generator" element={<SmartContractGenerator />} />
          <Route path="/security-audit" element={<SecurityAudit />} />
          <Route path="/gas-optimization" element={<GasOptimization />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
