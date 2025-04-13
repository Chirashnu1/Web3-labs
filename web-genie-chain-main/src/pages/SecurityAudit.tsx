
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Upload, Sparkles, FileWarning, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { scanContract } from '../services/aiService';

const SecurityAudit = () => {
  const [contractCode, setContractCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  
  const handleScanContract = async () => {
    if (!contractCode.trim()) {
      toast.error("Please provide contract code to scan");
      return;
    }
    
    setIsScanning(true);
    try {
      const results = await scanContract(contractCode);
      setScanResults(results);
      toast.success("Security scan completed");
    } catch (error) {
      toast.error("Failed to scan contract");
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'text-red-500 bg-red-500/10';
      case 'high':
        return 'text-orange-500 bg-orange-500/10';
      case 'warning':
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'info':
      case 'low':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'from-red-500 to-red-500';
      case 'medium':
        return 'from-yellow-500 to-yellow-500';
      case 'low':
        return 'from-green-500 to-green-500';
      default:
        return 'from-blue-500 to-blue-500';
    }
  };

  const exampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UnsafeContract {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Unsafe: sends ETH before updating balance
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
    
    // Unsafe use of block.timestamp
    function isReady() public view returns (bool) {
        return block.timestamp >= 1672531200;
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
              Security Vulnerability Detection
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            AI-powered smart contract security scanner to identify vulnerabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white flex items-center">
                  <Shield className="mr-2 text-crypto-purple" size={20} />
                  Contract Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-white text-sm">Paste your smart contract code</label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/10 text-white/80 hover:bg-white/5"
                      onClick={() => setContractCode(exampleContract)}
                    >
                      <FileWarning size={14} className="mr-1" />
                      Load Vulnerable Example
                    </Button>
                  </div>
                  
                  <Textarea 
                    placeholder="// Paste your Solidity contract code here..."
                    value={contractCode}
                    onChange={(e) => setContractCode(e.target.value)}
                    className="min-h-[300px] bg-crypto-darker border-white/10 text-white font-mono text-sm"
                  />
                  
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-white/10 text-white/80 hover:bg-white/5 w-full sm:w-auto"
                    >
                      <Upload size={16} className="mr-1" />
                      Upload Contract
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-white/10 text-white/80 hover:bg-white/5 w-full sm:w-auto"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Scan From Address
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90 w-full sm:flex-1"
                      onClick={handleScanContract}
                      disabled={isScanning || !contractCode.trim()}
                    >
                      <Search size={16} className="mr-2" />
                      {isScanning ? "Scanning..." : "Scan for Vulnerabilities"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                      <AlertTriangle size={24} className="text-red-500" />
                    </div>
                    <h3 className="text-white font-medium">Reentrancy</h3>
                    <p className="text-white/60 text-xs mt-1">
                      Detects reentrancy vulnerabilities in contract functions
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2">
                      <AlertTriangle size={24} className="text-yellow-500" />
                    </div>
                    <h3 className="text-white font-medium">Integer Overflow</h3>
                    <p className="text-white/60 text-xs mt-1">
                      Identifies arithmetic operations vulnerable to overflow
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                      <AlertTriangle size={24} className="text-blue-500" />
                    </div>
                    <h3 className="text-white font-medium">Access Control</h3>
                    <p className="text-white/60 text-xs mt-1">
                      Checks for proper access control implementations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            {!scanResults ? (
              <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10 h-full">
                <CardContent className="p-8 h-full flex flex-col items-center justify-center">
                  <Shield size={64} className="text-white/20 mb-6" />
                  <h3 className="text-xl font-medium text-white mb-2">Scan Results</h3>
                  <p className="text-white/70 text-center mb-6">
                    Security scan results will appear here after analysis
                  </p>
                  <div className="text-white/60 text-sm max-w-md text-center">
                    Our AI scanner detects common vulnerabilities including reentrancy, 
                    integer overflow/underflow, access control issues, and more.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Scan Results Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full mr-2 ${
                            scanResults.overallRisk === 'high' ? 'bg-red-500' : 
                            scanResults.overallRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-white font-medium">Overall Risk: {scanResults.overallRisk.charAt(0).toUpperCase() + scanResults.overallRisk.slice(1)}</span>
                        </div>
                        <span className="text-white/60 text-sm">{scanResults.issueCount} issues found</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/70">
                          <span>Risk Level</span>
                          <span>0%</span>
                        </div>
                        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${getRiskColor(scanResults.overallRisk)}`}
                            style={{ width: scanResults.overallRisk === 'high' ? '80%' : scanResults.overallRisk === 'medium' ? '50%' : '20%' }}
                          ></div>
                        </div>
                        <div className="flex justify-end text-xs text-white/70">
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        <div className="bg-crypto-darker rounded-lg p-3 text-center">
                          <div className="text-red-500 font-medium">{scanResults.issues.filter((i: any) => i.severity === 'critical').length}</div>
                          <div className="text-white/60 text-xs">Critical</div>
                        </div>
                        <div className="bg-crypto-darker rounded-lg p-3 text-center">
                          <div className="text-orange-500 font-medium">{scanResults.issues.filter((i: any) => i.severity === 'high').length}</div>
                          <div className="text-white/60 text-xs">High</div>
                        </div>
                        <div className="bg-crypto-darker rounded-lg p-3 text-center">
                          <div className="text-yellow-500 font-medium">{scanResults.issues.filter((i: any) => i.severity === 'warning').length}</div>
                          <div className="text-white/60 text-xs">Medium</div>
                        </div>
                        <div className="bg-crypto-darker rounded-lg p-3 text-center">
                          <div className="text-blue-500 font-medium">{scanResults.issues.filter((i: any) => i.severity === 'info').length}</div>
                          <div className="text-white/60 text-xs">Low</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-dark/40 backdrop-blur-md border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">Detected Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scanResults.issues.map((issue: any, index: number) => (
                        <div key={index} className="bg-crypto-darker rounded-lg border border-white/5 overflow-hidden">
                          <div className="flex items-center p-3 border-b border-white/5">
                            <div className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(issue.severity)}`}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </div>
                            <div className="ml-3 font-medium text-white">{issue.type}</div>
                          </div>
                          <div className="p-3">
                            <p className="text-white/80 text-sm">{issue.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Button className="w-full bg-gradient-to-r from-crypto-blue to-crypto-purple hover:opacity-90">
                  <Sparkles size={16} className="mr-2" />
                  Generate Security Recommendations
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityAudit;
