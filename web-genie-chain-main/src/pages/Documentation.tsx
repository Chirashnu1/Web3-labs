
import React from 'react';
import { BookOpen, FileCode, BookText, BookCheck, Code, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Documentation = () => {
  const docsCategories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="text-crypto-blue" size={20} />,
      items: [
        "Platform Overview",
        "Quick Start Guide",
        "Account Setup",
        "API Keys Management"
      ]
    },
    {
      title: "AI Assistant",
      icon: <BookText className="text-crypto-purple" size={20} />,
      items: [
        "Voice Commands",
        "Prompt Engineering",
        "Model Selection",
        "Response Customization"
      ]
    },
    {
      title: "Smart Contract Development",
      icon: <FileCode className="text-crypto-pink" size={20} />,
      items: [
        "Contract Templates",
        "ERC Token Standards",
        "NFT Implementation",
        "DeFi Protocol Integration"
      ]
    },
    {
      title: "Security & Auditing",
      icon: <Shield className="text-green-400" size={20} />,
      items: [
        "Vulnerability Scanning",
        "Audit Reports",
        "Security Best Practices",
        "Common Attack Vectors"
      ]
    },
    {
      title: "AI Agents",
      icon: <Code className="text-yellow-400" size={20} />,
      items: [
        "Agent Configuration",
        "Custom Logic Implementation",
        "Monitoring Setup",
        "Trading Strategy Development"
      ]
    },
    {
      title: "API Reference",
      icon: <BookCheck className="text-blue-400" size={20} />,
      items: [
        "Authentication",
        "Endpoints Overview",
        "Rate Limits",
        "Response Format"
      ]
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
              Documentation
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Comprehensive guides and references to help you make the most of Web3 Labs platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {docsCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="ml-2 text-xl font-medium text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                        <span className="h-1 w-1 bg-crypto-purple rounded-full mr-2"></span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-12">
          <div className="flex items-center mb-4">
            <Zap className="text-yellow-400" size={24} />
            <h2 className="ml-2 text-2xl font-medium text-white">Quick Reference</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-crypto-darker rounded-lg border border-white/5">
              <h3 className="text-lg font-medium text-white mb-2">Authentication</h3>
              <div className="bg-black/50 p-3 rounded-md">
                <pre className="text-sm text-white/80 overflow-x-auto">
                  <code>{`const response = await fetch('https://api.web3labs.ai/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: 'blockchain-expert',
    prompt: 'Generate a smart contract for...'
  })
});`}</code>
                </pre>
              </div>
            </div>
            
            <div className="p-4 bg-crypto-darker rounded-lg border border-white/5">
              <h3 className="text-lg font-medium text-white mb-2">Model Selection</h3>
              <div className="bg-black/50 p-3 rounded-md">
                <pre className="text-sm text-white/80 overflow-x-auto">
                  <code>{`// Available models:
'blockchain-expert'       // General blockchain knowledge
'security-auditor'        // Security analysis and auditing
'smart-contract-generator' // Smart contract creation
'agent-logic'             // For creating custom AI agents`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
