
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl rounded-2xl p-0.5">
          <div className="absolute inset-0 bg-gradient-to-r from-crypto-blue via-crypto-purple to-crypto-pink rounded-2xl blur-md opacity-80"></div>
          
          <div className="relative bg-crypto-darker backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crypto-blue via-crypto-purple to-crypto-pink"></div>
            
            <div className="px-6 py-12 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Start Building the Future of Web3 Today
              </h2>
              <p className="text-white/70 text-lg mx-auto max-w-2xl mb-8">
                Join thousands of developers leveraging AI to create smarter, more secure, and more efficient blockchain applications.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Button 
                  onClick={() => navigate('/ai-assistant')}
                  className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white text-lg py-6 px-8 hover:opacity-90"
                >
                  Try AI Assistant <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  onClick={() => navigate('/ai-agents')}
                  variant="outline" 
                  className="border-white/20 text-white text-lg py-6 px-8 hover:bg-white/10"
                >
                  Explore AI Agents
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
