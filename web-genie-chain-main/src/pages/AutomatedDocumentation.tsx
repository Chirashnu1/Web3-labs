
import React, { useState } from 'react';
import { FileText, Check, Copy, Lightbulb, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { generateDocumentation } from '../services/aiService';

const AutomatedDocumentation = () => {
  const [contractCode, setContractCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [docs, setDocs] = useState<any>(null);

  const handleGenerateDocumentation = async () => {
    if (!contractCode.trim()) {
      toast.error("Please enter contract code first");
      return;
    }
    
    setIsGenerating(true);
    try {
      const documentation = await generateDocumentation(contractCode);
      setDocs(documentation);
      toast.success("Documentation generated successfully");
    } catch (error) {
      toast.error("Failed to generate documentation");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const exampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds++;
        return newItemId;
    }
}`;

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
              Automated Documentation
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            Generate comprehensive documentation for your smart contracts with AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Smart Contract Code</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/10 text-white/80 hover:bg-white/5"
                onClick={() => setContractCode(exampleContract)}
              >
                <Lightbulb size={16} className="mr-2" />
                Load Example
              </Button>
            </div>
            
            <Textarea 
              placeholder="Paste your Solidity contract code here..."
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="min-h-[400px] bg-crypto-darker border-white/10 text-white font-mono text-sm"
            />
            
            <Button 
              className="mt-4 w-full md:w-auto bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90"
              onClick={handleGenerateDocumentation}
              disabled={isGenerating || !contractCode.trim()}
            >
              {isGenerating ? "Generating..." : "Generate Documentation"}
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-medium text-white mb-4">Documentation Output</h2>
            
            {!docs ? (
              <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center h-[400px] flex flex-col items-center justify-center">
                <FileText size={48} className="text-white/30 mb-4" />
                <p className="text-white/70">
                  Your documentation will appear here after generation
                </p>
                <div className="mt-6 space-y-2 text-left w-full max-w-md">
                  <div className="flex items-center text-white/60 text-sm">
                    <Check size={16} className="text-crypto-purple mr-2" />
                    <span>Contract overview and description</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Check size={16} className="text-crypto-purple mr-2" />
                    <span>Function documentation</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Check size={16} className="text-crypto-purple mr-2" />
                    <span>Events documentation</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Check size={16} className="text-crypto-purple mr-2" />
                    <span>State variables explanation</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-white">{docs.contractName}</h3>
                        <p className="text-white/70 mt-1">{docs.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white/60 hover:text-white hover:bg-white/5"
                        onClick={() => handleCopyToClipboard(docs.description)}
                      >
                        <Copy size={14} />
                      </Button>
                    </div>
                    <div className="mt-3 text-sm text-white/70">
                      <span className="text-white/40">Author:</span> {docs.author}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <BookOpen size={18} className="mr-2 text-crypto-purple" />
                    Functions
                  </h3>
                  
                  {docs.functions.map((func: any, index: number) => (
                    <Card key={index} className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <h4 className="font-mono text-crypto-blue">{func.name}()</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-white/60 hover:text-white hover:bg-white/5"
                            onClick={() => handleCopyToClipboard(`${func.name}(${func.parameters.join(', ')})`)}
                          >
                            <Copy size={14} />
                          </Button>
                        </div>
                        <p className="text-white/70 mt-1 text-sm">{func.description}</p>
                        
                        {func.parameters.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm text-white/40">Parameters:</div>
                            <ul className="mt-1 space-y-1">
                              {func.parameters.map((param: string, paramIndex: number) => (
                                <li key={paramIndex} className="text-sm text-white/70 flex items-center">
                                  <ChevronRight size={12} className="mr-1 text-crypto-purple" />
                                  {param}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <div className="text-sm text-white/40">Returns:</div>
                          <div className="text-sm text-white/70 mt-1">{func.returns}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {docs.events.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <Lightbulb size={18} className="mr-2 text-yellow-400" />
                      Events
                    </h3>
                    
                    {docs.events.map((event: any, index: number) => (
                      <Card key={index} className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <h4 className="font-mono text-crypto-pink">{event.name}</h4>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-white/60 hover:text-white hover:bg-white/5"
                              onClick={() => handleCopyToClipboard(event.name)}
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                          <p className="text-white/70 mt-1 text-sm">{event.description}</p>
                          
                          {event.parameters.length > 0 && (
                            <div className="mt-2">
                              <div className="text-sm text-white/40">Parameters:</div>
                              <ul className="mt-1 space-y-1">
                                {event.parameters.map((param: string, paramIndex: number) => (
                                  <li key={paramIndex} className="text-sm text-white/70 flex items-center">
                                    <ChevronRight size={12} className="mr-1 text-crypto-purple" />
                                    {param}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5 mr-2">
                    Download PDF
                  </Button>
                  <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5">
                    Export Markdown
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AutomatedDocumentation;
