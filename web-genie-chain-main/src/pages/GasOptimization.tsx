
import React, { useState } from 'react';
import { Zap, BarChart3, ArrowDownUp, Code, Plus, FileCode, FileText, Check, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const GasOptimization = () => {
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [gasBeforeAfter, setGasBeforeAfter] = useState<{before: number, after: number} | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimizeCode = async () => {
    if (!originalCode.trim()) {
      toast.error("Please provide code to optimize");
      return;
    }
    
    setIsOptimizing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock optimized code - in a real app, this would come from the backend
      const optimized = originalCode
        .replace(/uint256/g, 'uint128') // Mock optimization 1
        .replace(/memory/g, 'calldata') // Mock optimization 2
        .replace(/for \(/g, 'unchecked { for (') // Mock optimization 3
        .replace(/\)[\s\n]*{/g, ') {') // Mock proper formatting
        .replace(/for \(.*\) {/g, (match) => `${match} // Gas optimization`) // Mock comments
        + '\n}'; // Close the unchecked block
      
      setOptimizedCode(optimized);
      
      // Mock gas savings
      const mockBeforeGas = Math.floor(Math.random() * 50000) + 80000;
      const mockAfterGas = mockBeforeGas - Math.floor(mockBeforeGas * (Math.random() * 0.3 + 0.2)); // 20-50% reduction
      
      setGasBeforeAfter({
        before: mockBeforeGas,
        after: mockAfterGas
      });
      
      toast.success("Gas optimization complete!");
    } catch (error) {
      toast.error("Failed to optimize contract");
      console.error(error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const exampleCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract GasHeavy {
    uint256[] public values;
    
    function inefficientLoop(uint256 iterations) public {
        for (uint256 i = 0; i < iterations; i++) {
            values.push(i);
        }
    }
    
    function inefficientStorage(address[] memory addresses, uint256[] memory amounts) public {
        require(addresses.length == amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < addresses.length; i++) {
            // Inefficient: Reading from storage in each iteration
            uint256 currentLength = values.length;
            values.push(amounts[i]);
        }
    }
    
    function multipleStorageReads(uint256 index) public view returns (uint256) {
        // Inefficient: Multiple storage reads
        uint256 value = values[index];
        uint256 length = values.length;
        
        if (value < length) {
            return value;
        }
        
        return length;
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
              Gas Optimization
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            AI-powered tools to analyze and optimize smart contracts for lower gas costs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-white flex items-center">
                    <FileCode size={20} className="mr-2 text-crypto-purple" />
                    Original Contract
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 text-white/80 hover:bg-white/5"
                    onClick={() => setOriginalCode(exampleCode)}
                  >
                    <Plus size={14} className="mr-1" />
                    Load Example
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Paste your Solidity contract code here..."
                  value={originalCode}
                  onChange={(e) => setOriginalCode(e.target.value)}
                  className="min-h-[400px] bg-crypto-darker border-white/10 text-white font-mono text-sm"
                />
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90"
                  onClick={handleOptimizeCode}
                  disabled={isOptimizing || !originalCode.trim()}
                >
                  <Zap size={16} className="mr-2" />
                  {isOptimizing ? "Optimizing..." : "Optimize for Gas Efficiency"}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white flex items-center">
                  <FileText size={20} className="mr-2 text-green-400" />
                  Optimized Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!optimizedCode ? (
                  <div className="h-[400px] flex flex-col items-center justify-center">
                    <Zap size={48} className="text-white/20 mb-4" />
                    <p className="text-white/70 text-center">
                      Your gas-optimized contract will appear here
                    </p>
                  </div>
                ) : (
                  <Textarea 
                    value={optimizedCode}
                    readOnly
                    className="min-h-[400px] bg-crypto-darker border-white/10 text-white font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
            
            {gasBeforeAfter && (
              <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white flex items-center">
                    <BarChart3 size={20} className="mr-2 text-yellow-400" />
                    Gas Savings Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-white/80">
                        Original Gas Cost:
                        <span className="ml-2 text-white font-medium">{gasBeforeAfter.before.toLocaleString()} gas</span>
                      </div>
                      <div className="text-white/80">
                        Optimized Gas Cost:
                        <span className="ml-2 text-green-400 font-medium">{gasBeforeAfter.after.toLocaleString()} gas</span>
                      </div>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-medium text-white/60">Savings:</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-white inline-block px-2 py-1 bg-green-500/20 rounded-full text-green-400">
                            {Math.round(((gasBeforeAfter.before - gasBeforeAfter.after) / gasBeforeAfter.before) * 100)}% reduction
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-4 mb-4 flex rounded-full bg-crypto-darker">
                        <div 
                          style={{ width: `${Math.round(100 - ((gasBeforeAfter.after / gasBeforeAfter.before) * 100))}%` }}
                          className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-white">Optimizations Applied</h3>
                      
                      <div className="bg-crypto-darker rounded-lg p-3">
                        <div className="flex items-center">
                          <Check size={16} className="text-green-400 mr-2" />
                          <div>
                            <h4 className="text-white font-medium">Variable Sizing</h4>
                            <p className="text-white/60 text-sm mt-1">Changed uint256 to uint128 where appropriate to reduce storage costs</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-crypto-darker rounded-lg p-3">
                        <div className="flex items-center">
                          <Check size={16} className="text-green-400 mr-2" />
                          <div>
                            <h4 className="text-white font-medium">Memory to Calldata</h4>
                            <p className="text-white/60 text-sm mt-1">Changed function parameters from memory to calldata for read-only arrays</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-crypto-darker rounded-lg p-3">
                        <div className="flex items-center">
                          <Check size={16} className="text-green-400 mr-2" />
                          <div>
                            <h4 className="text-white font-medium">Unchecked Math</h4>
                            <p className="text-white/60 text-sm mt-1">Used unchecked blocks for arithmetic operations where overflow is impossible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-crypto-dark/40 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-6">
            <Sparkles size={24} className="text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Gas Optimization Tips</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Code size={18} className="mr-2 text-crypto-purple" />
                Storage Optimization
              </h3>
              <ul className="space-y-1">
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-crypto-purple mr-2">•</span>
                  Pack variables to use fewer storage slots
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-crypto-purple mr-2">•</span>
                  Use mappings instead of arrays where possible
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-crypto-purple mr-2">•</span>
                  Cache storage variables in memory during complex operations
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center">
                <ArrowDownUp size={18} className="mr-2 text-blue-400" />
                Function Optimization
              </h3>
              <ul className="space-y-1">
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Use calldata instead of memory for read-only function parameters
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Mark functions as view or pure when possible
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Use short-circuiting to your advantage in logical operations
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white flex items-center">
                <BarChart3 size={18} className="mr-2 text-green-400" />
                Loop Optimization
              </h3>
              <ul className="space-y-1">
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Cache array length outside of loops
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Use unchecked math for loop counters when safe
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Consider batching operations instead of processing one at a time
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GasOptimization;
