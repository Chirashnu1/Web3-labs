
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, ChevronRight, TerminalSquare, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-crypto-purple/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-crypto-blue/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Highlighted Tag */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-crypto-purple mb-4 backdrop-blur-sm">
              <Sparkles size={16} className="mr-2 text-crypto-purple" />
              <span>Welcome to the Future of Blockchain AI</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue via-crypto-purple to-crypto-pink">Web3 AI Labs</span>
              <br />
              <span className="text-white">Blockchain Intelligence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0">
              Revolutionize your blockchain experience with cutting-edge AI tools, smart contract generation, and decentralized intelligence platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90 text-white btn-glow px-6 py-6">
                <span>Get Started</span>
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-white px-6 py-6">
                <span>View Documentation</span>
                <ChevronRight size={18} className="ml-2" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">1M+</p>
                <p className="text-white/60 text-sm">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple to-crypto-pink">500K+</p>
                <p className="text-white/60 text-sm">Smart Contracts</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-pink to-crypto-blue">50+</p>
                <p className="text-white/60 text-sm">Blockchain Networks</p>
              </div>
            </div>
          </div>
          
          {/* Hero image/visual */}
          <div className="flex-1 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-blue/20 to-crypto-purple/20 rounded-lg blur-xl -z-10"></div>
              <div className="relative z-10 glow-border bg-crypto-darker/60 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TerminalSquare size={20} className="text-crypto-purple mr-2" />
                    <span className="text-white font-medium">AI Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="font-mono text-sm text-white/80 space-y-2">
                  <p className="flex items-center">
                    <span className="text-crypto-blue mr-2">&gt;</span> Analyzing smart contract vulnerabilities...
                  </p>
                  <p className="flex items-center">
                    <span className="text-crypto-purple mr-2">&gt;</span> <span className="text-white">Found 2 potential security issues.</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-crypto-pink mr-2">&gt;</span> Recommending fixes for reentrancy attack vector...
                  </p>
                  <p className="flex items-center">
                    <span className="text-crypto-blue mr-2">&gt;</span> <span className="text-white">Optimizing gas usage...</span>
                  </p>
                  <div className="flex items-center">
                    <span className="text-crypto-purple mr-2">&gt;</span> 
                    <span className="text-white flex items-center">
                      Ready for deployment 
                      <span className="ml-1 h-3 w-3 bg-crypto-purple rounded-full inline-block animate-pulse"></span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-20 w-20 bg-gradient-to-r from-crypto-blue to-crypto-purple rounded-lg blur-xl opacity-50 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-gradient-to-r from-crypto-purple to-crypto-pink rounded-full blur-xl opacity-40 animate-pulse-slow"></div>
            </div>
            
            {/* Floating design elements */}
            <div className="absolute top-1/4 -right-12 h-16 w-16 bg-crypto-dark rounded-lg border border-white/10 flex items-center justify-center animate-float shadow-lg">
              <Code size={32} className="text-crypto-purple" />
            </div>
            <div className="absolute bottom-1/4 -left-12 h-16 w-16 bg-crypto-dark rounded-lg border border-white/10 flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: "2s" }}>
              <Zap size={32} className="text-crypto-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
