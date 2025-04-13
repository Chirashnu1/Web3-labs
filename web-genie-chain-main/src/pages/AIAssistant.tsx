
import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Settings2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { useChatStore } from '../store/chatStore';
import { sendMessage } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
  const { messages, isLoading, selectedModel, setSelectedModel } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize with welcome message if empty
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = {
        blockchain: "Hello! I'm Web3 AI Assistant. I can help with blockchain development, smart contracts, and more. What can I help you with today?",
        security: "Hello! I'm the Security AI Assistant. I can help identify vulnerabilities in your smart contracts and provide security recommendations. How can I assist you?",
        contracts: "Hello! I'm the Smart Contract AI Assistant. I can help generate, modify, and explain smart contract code. What kind of contract are you working on?"
      };
      
      useChatStore.getState().addMessage(welcomeMessages[selectedModel], 'assistant');
    }
  }, [messages.length, selectedModel]);
  
  const handleModelChange = (value: string) => {
    // Cast to the correct type
    const modelValue = value as 'blockchain' | 'security' | 'contracts';
    setSelectedModel(modelValue);
    
    // Clear messages when changing models
    useChatStore.getState().clearMessages();
  };
  
  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-purple flex items-center justify-center mr-3">
                <Bot size={20} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
                  Web3 AI Assistant
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Tabs defaultValue={selectedModel} onValueChange={handleModelChange} className="w-full">
                <TabsList className="bg-crypto-dark/40 border border-white/10">
                  <TabsTrigger value="blockchain" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                    <MessageCircle size={16} className="mr-2" /> Blockchain 
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                    <Settings2 size={16} className="mr-2" /> Security
                  </TabsTrigger>
                  <TabsTrigger value="contracts" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                    <Bot size={16} className="mr-2" /> Contracts
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between bg-crypto-indigo/30 px-4 py-2">
              <div className="flex items-center">
                <Bot size={18} className="text-crypto-purple mr-2" />
                <span className="text-white font-medium">
                  {selectedModel === 'blockchain' && 'Web3 AI Assistant'}
                  {selectedModel === 'security' && 'Security AI Assistant'}
                  {selectedModel === 'contracts' && 'Smart Contract AI Assistant'}
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/ai-agents')}
              className="py-6 bg-crypto-dark/40 border border-white/10 text-white hover:bg-white/10 flex flex-col items-center"
            >
              <Bot size={24} className="mb-2 text-crypto-purple" />
              <span>Try AI Agents</span>
            </Button>
            
            <Button
              className="py-6 bg-crypto-dark/40 border border-white/10 text-white hover:bg-white/10 flex flex-col items-center"
              onClick={() => {
                setSelectedModel('security');
                useChatStore.getState().clearMessages();
              }}
            >
              <Settings2 size={24} className="mb-2 text-crypto-blue" />
              <span>Security Scanner</span>
            </Button>
            
            <Button
              className="py-6 bg-crypto-dark/40 border border-white/10 text-white hover:bg-white/10 flex flex-col items-center"
              onClick={() => {
                setSelectedModel('contracts');
                useChatStore.getState().clearMessages();
              }}
            >
              <MessageCircle size={24} className="mb-2 text-crypto-pink" />
              <span>Smart Contract Generator</span>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
