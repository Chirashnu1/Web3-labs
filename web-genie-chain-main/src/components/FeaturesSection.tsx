
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Shield, Zap, MessageSquare, BarChart, PencilRuler, Bot } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-8 w-8 text-crypto-purple" />,
    title: "AI Smart Contract Generation",
    description: "Generate optimized smart contracts using natural language. Specify your requirements, and our AI creates secure, efficient code."
  },
  {
    icon: <Code className="h-8 w-8 text-crypto-blue" />,
    title: "Code Analysis & Auditing",
    description: "Automatically scan your blockchain code for vulnerabilities, gas optimization opportunities, and security best practices."
  },
  {
    icon: <Shield className="h-8 w-8 text-crypto-pink" />,
    title: "Security Vulnerability Detection",
    description: "Identify potential security issues in your smart contracts before deployment with our advanced AI security analysis."
  },
  {
    icon: <Zap className="h-8 w-8 text-crypto-purple" />,
    title: "Gas Optimization",
    description: "Analyze and optimize your smart contracts for lower gas fees while maintaining functionality and security."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-crypto-blue" />,
    title: "AI Blockchain Assistant",
    description: "Chat with our AI assistant to learn about blockchain concepts, debug issues, and get recommendations for your projects."
  },
  {
    icon: <BarChart className="h-8 w-8 text-crypto-pink" />,
    title: "Market Intelligence",
    description: "Access AI-powered market analysis, trend predictions, and investment insights based on on-chain and market data."
  },
  {
    icon: <PencilRuler className="h-8 w-8 text-crypto-purple" />,
    title: "Automated Documentation",
    description: "Generate comprehensive documentation for your smart contracts and blockchain applications automatically."
  },
  {
    icon: <Bot className="h-8 w-8 text-crypto-blue" />,
    title: "Custom AI Agents",
    description: "Build and deploy customized AI agents that operate on blockchain networks for automated trading, monitoring, and more."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-crypto-purple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-crypto-blue/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
              Powerful AI Tools for Web3
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our suite of blockchain AI tools empower developers, businesses, and users to build, secure, and optimize their blockchain applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden bg-crypto-dark/30 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all group hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-crypto-dark/80 group-hover:to-crypto-dark/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
