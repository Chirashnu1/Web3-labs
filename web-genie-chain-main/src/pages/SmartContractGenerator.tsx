
import React, { useState } from 'react';
import { FileCode, Sparkles, Copy, Download, CheckCircle, TerminalSquare, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { generateSmartContract } from '../services/aiService';

const SmartContractGenerator = () => {
  const [requirements, setRequirements] = useState('');
  const [contractType, setContractType] = useState('erc20');
  const [contractCode, setContractCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateContract = async () => {
    if (!requirements.trim()) {
      toast.error("Please provide contract requirements");
      return;
    }
    
    setIsGenerating(true);
    try {
      // Include contract type in the requirements
      const enhancedRequirements = `Generate a ${contractType} contract with these requirements: ${requirements}`;
      const result = await generateSmartContract(enhancedRequirements);
      setContractCode(result.code);
      toast.success(`${result.type} contract generated successfully`);
    } catch (error) {
      toast.error("Failed to generate contract");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(contractCode);
    toast.success("Contract code copied to clipboard");
  };

  const handleDownloadContract = () => {
    const blob = new Blob([contractCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedContract.sol';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Contract downloaded as .sol file");
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue to-crypto-purple">
              AI Smart Contract Generator
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            Generate secure, production-ready smart contracts with AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Contract Requirements</CardTitle>
                  <Settings size={18} className="text-white/60" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm mb-1 block">Contract Type</label>
                    <Select
                      value={contractType}
                      onValueChange={setContractType}
                    >
                      <SelectTrigger className="bg-crypto-darker border-white/10">
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent className="bg-crypto-dark border-white/10">
                        <SelectItem value="erc20">ERC-20 Token</SelectItem>
                        <SelectItem value="erc721">ERC-721 NFT</SelectItem>
                        <SelectItem value="erc1155">ERC-1155 Multi-Token</SelectItem>
                        <SelectItem value="marketplace">NFT Marketplace</SelectItem>
                        <SelectItem value="defi">DeFi Protocol</SelectItem>
                        <SelectItem value="dao">DAO Governance</SelectItem>
                        <SelectItem value="custom">Custom Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm mb-1 block">
                      Describe your contract requirements
                    </label>
                    <Textarea 
                      placeholder="e.g., Create an ERC-20 token with a fixed supply of 1 million tokens, named 'MyToken' with symbol 'MTK'..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="min-h-[200px] bg-crypto-darker border-white/10 text-white"
                    />
                  </div>
                  
                  <Tabs defaultValue="standard" className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white text-sm">Security Level</label>
                      <TabsList className="bg-crypto-darker">
                        <TabsTrigger value="standard" className="text-xs data-[state=active]:bg-white/10">
                          Standard
                        </TabsTrigger>
                        <TabsTrigger value="enhanced" className="text-xs data-[state=active]:bg-white/10">
                          Enhanced
                        </TabsTrigger>
                        <TabsTrigger value="maximum" className="text-xs data-[state=active]:bg-white/10">
                          Maximum
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </Tabs>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90 mt-2"
                    onClick={handleGenerateContract}
                    disabled={isGenerating || !requirements.trim()}
                  >
                    <Sparkles size={16} className="mr-2" />
                    {isGenerating ? "Generating..." : "Generate Smart Contract"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Contract Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md bg-blue-500/20 flex items-center justify-center">
                        <FileCode size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">ERC-20 Token</h4>
                        <p className="text-white/60 text-xs">Standard fungible token</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md bg-purple-500/20 flex items-center justify-center">
                        <FileCode size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">ERC-721 NFT</h4>
                        <p className="text-white/60 text-xs">Non-fungible token</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md bg-green-500/20 flex items-center justify-center">
                        <FileCode size={20} className="text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Staking Contract</h4>
                        <p className="text-white/60 text-xs">Token staking rewards</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-md bg-yellow-500/20 flex items-center justify-center">
                        <FileCode size={20} className="text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Marketplace</h4>
                        <p className="text-white/60 text-xs">NFT marketplace</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Generated Contract</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/5"
                      onClick={handleCopyToClipboard}
                      disabled={!contractCode}
                    >
                      <Copy size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/5"
                      onClick={handleDownloadContract}
                      disabled={!contractCode}
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!contractCode ? (
                  <div className="h-[500px] flex flex-col items-center justify-center">
                    <FileCode size={48} className="text-white/30 mb-4" />
                    <p className="text-white/70 text-center">
                      Your generated smart contract will appear here
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <div className="bg-green-500/20 text-green-500 text-xs py-1 px-2 rounded-full flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Audited
                      </div>
                      <div className="bg-blue-500/20 text-blue-500 text-xs py-1 px-2 rounded-full flex items-center">
                        <TerminalSquare size={12} className="mr-1" />
                        Optimized
                      </div>
                    </div>
                    <pre className="bg-crypto-darker border border-white/10 rounded-lg p-4 text-white/90 font-mono text-sm overflow-auto max-h-[500px]">
                      <code>{contractCode}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartContractGenerator;
