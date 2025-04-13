
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Code, TerminalSquare, Shield, Bot, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ToolsShowcase = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-crypto-dark/20 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple to-crypto-pink">
              Explore Our Tools
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover how our AI-powered tools can transform your blockchain development workflow and user experience.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="assistant" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-crypto-dark/30 border border-white/10 p-1 rounded-lg">
              <TabsTrigger value="assistant" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <Bot size={16} className="mr-2" /> Assistant
              </TabsTrigger>
              <TabsTrigger value="contracts" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <Code size={16} className="mr-2" /> Smart Contracts
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <Shield size={16} className="mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <Terminal size={16} className="mr-2" /> Custom Agents
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                <BookOpen size={16} className="mr-2" /> Documentation
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-blue/20 via-crypto-purple/20 to-crypto-pink/20 blur-xl -z-10 rounded-xl"></div>
              
              <TabsContent value="assistant" className="mt-0">
                <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between bg-crypto-indigo/30 px-4 py-2">
                    <div className="flex items-center">
                      <Bot size={18} className="text-crypto-purple mr-2" />
                      <span className="text-white font-medium">Web3 AI Assistant</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-crypto-purple/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-crypto-purple">You</span>
                        </div>
                        <div className="bg-white/5 rounded-lg rounded-tl-none p-3 text-white/90">
                          I need to understand how to create a token with a vesting schedule for investors.
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-purple flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-white/5 rounded-lg rounded-tl-none p-3 text-white/90">
                          <p className="mb-2">
                            To create a token with a vesting schedule for investors, you'll need to implement a time-based mechanism that gradually releases tokens to beneficiaries. Here's how you can approach it:
                          </p>
                          <ol className="list-decimal pl-5 space-y-2 text-white/80">
                            <li>Create an ERC20 token contract for your base token</li>
                            <li>Implement a separate VestingWallet contract that holds and distributes tokens</li>
                            <li>Define vesting parameters (cliff period, vesting duration, release frequency)</li>
                            <li>Set up access controls and withdrawal functions</li>
                          </ol>
                          <div className="mt-3 p-3 bg-crypto-indigo/30 rounded-md font-mono text-sm text-white/80">
                            <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenVesting is Ownable {
    // Vesting parameters
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 startTime;
        uint256 cliffDuration;
        uint256 vestingDuration;
        uint256 releasedAmount;
    }
    
    // ...`}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 items-center border-t border-white/10 pt-4">
                      <input 
                        type="text" 
                        placeholder="Ask a blockchain question..." 
                        className="flex-1 bg-white/5 text-white placeholder:text-white/40 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-crypto-purple/50 focus:ring-1 focus:ring-crypto-purple/50"
                      />
                      <Button 
                        onClick={() => navigate('/ai-assistant')}
                        className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate('/ai-assistant')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                  >
                    Try AI Assistant Now
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="contracts" className="mt-0">
                <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between bg-crypto-indigo/30 px-4 py-2">
                    <div className="flex items-center">
                      <Code size={18} className="text-crypto-blue mr-2" />
                      <span className="text-white font-medium">Smart Contract Generator</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Your Requirements</h3>
                        <div className="bg-white/5 rounded-lg p-4 font-mono text-sm text-white/80 h-64 overflow-y-auto">
                          <p>Create an NFT marketplace contract with the following features:</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Standard ERC-721 NFT support</li>
                            <li>Fixed price and auction listings</li>
                            <li>2.5% marketplace fee</li>
                            <li>Creator royalties of 5%</li>
                            <li>Admin role for marketplace management</li>
                          </ul>
                        </div>
                        <Button 
                          onClick={() => navigate('/ai-assistant')}
                          className="w-full mt-4 bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                        >
                          Generate Contract
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Generated Contract</h3>
                        <div className="bg-crypto-indigo/30 rounded-lg p-4 font-mono text-sm text-white/80 h-64 overflow-y-auto">
                          <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    // Marketplace fee percentage (2.5%)
    uint256 public constant MARKETPLACE_FEE = 250;
    // Creator royalty percentage (5%)
    uint256 public constant CREATOR_ROYALTY = 500;
    // Denominator for fee calculations (10000 = 100%)
    uint256 private constant FEE_DENOMINATOR = 10000;
    
    // Listing types
    enum ListingType { FixedPrice, Auction }
    
    // Listing structure
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        ListingType listingType;
        uint256 endTime; // For auctions
        address highestBidder; // For auctions
        uint256 highestBid; // For auctions
        bool isActive;
    }
    
    // Counter for listing IDs
    Counters.Counter private _listingIdCounter;
    
    // Mapping from listing ID to Listing
    mapping(uint256 => Listing) public listings;
    
    // ...`}</pre>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            onClick={() => navigate('/ai-assistant')}
                            className="flex-1 bg-crypto-purple/20 text-crypto-purple hover:bg-crypto-purple/30 border border-crypto-purple/30"
                          >
                            Edit Contract
                          </Button>
                          <Button
                            onClick={() => navigate('/ai-assistant')}
                            className="flex-1 bg-crypto-blue/20 text-crypto-blue hover:bg-crypto-blue/30 border border-crypto-blue/30"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate('/ai-assistant')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                  >
                    Start Generating Smart Contracts
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between bg-crypto-indigo/30 px-4 py-2">
                    <div className="flex items-center">
                      <Shield size={18} className="text-crypto-pink mr-2" />
                      <span className="text-white font-medium">Security Scanner</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-medium text-white mb-3">Contract Analysis</h3>
                        <div className="bg-crypto-indigo/30 rounded-lg p-4 font-mono text-sm text-white/80 h-64 overflow-y-auto">
                          <pre>{`function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // Potential reentrancy vulnerability
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    balances[msg.sender] -= amount;
}`}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Vulnerability Report</h3>
                        <div className="space-y-4">
                          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
                            <div className="flex items-center text-red-500 font-medium mb-2">
                              <Shield size={16} className="mr-2" />
                              Critical: Reentrancy Vulnerability
                            </div>
                            <p className="text-white/80 text-sm">
                              External call is made before state changes, allowing potential reentrant attacks.
                            </p>
                          </div>
                          
                          <div className="bg-yellow-950/30 border border-yellow-800/30 rounded-lg p-4">
                            <div className="flex items-center text-yellow-500 font-medium mb-2">
                              <Shield size={16} className="mr-2" />
                              Warning: Gas Optimization
                            </div>
                            <p className="text-white/80 text-sm">
                              Consider using unchecked block for subtraction operation after validation.
                            </p>
                          </div>
                          
                          <div className="bg-green-950/20 border border-green-800/20 rounded-lg p-4">
                            <div className="flex items-center text-green-500 font-medium mb-2">
                              <Shield size={16} className="mr-2" />
                              Recommendation
                            </div>
                            <p className="text-white/80 text-sm">
                              Follow checks-effects-interactions pattern to prevent reentrancy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate('/ai-assistant')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                  >
                    Scan Your Smart Contract
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="mt-0">
                <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 p-6">
                  <h3 className="text-xl font-medium text-white mb-4">Custom AI Agents</h3>
                  <p className="text-white/70 mb-6">
                    Build and deploy AI agents that can operate autonomously on blockchain networks.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-crypto-purple/30 transition-all">
                      <div className="h-12 w-12 bg-crypto-purple/20 rounded-lg flex items-center justify-center mb-4">
                        <Bot size={24} className="text-crypto-purple" />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">Trading Agent</h4>
                      <p className="text-white/60 text-sm mb-4">
                        Automated trading strategies powered by AI with customizable parameters and risk profiles.
                      </p>
                      <Button 
                        onClick={() => navigate('/ai-agents')}
                        variant="outline" 
                        className="w-full border-white/10 hover:bg-white/10 text-white"
                      >
                        Configure
                      </Button>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-crypto-blue/30 transition-all">
                      <div className="h-12 w-12 bg-crypto-blue/20 rounded-lg flex items-center justify-center mb-4">
                        <Terminal size={24} className="text-crypto-blue" />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">Monitoring Agent</h4>
                      <p className="text-white/60 text-sm mb-4">
                        Real-time monitoring of blockchain activities with customized alerts and reporting.
                      </p>
                      <Button 
                        onClick={() => navigate('/ai-agents')}
                        variant="outline" 
                        className="w-full border-white/10 hover:bg-white/10 text-white"
                      >
                        Configure
                      </Button>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-crypto-pink/30 transition-all">
                      <div className="h-12 w-12 bg-crypto-pink/20 rounded-lg flex items-center justify-center mb-4">
                        <TerminalSquare size={24} className="text-crypto-pink" />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">Custom Logic Agent</h4>
                      <p className="text-white/60 text-sm mb-4">
                        Create agents with custom logic for specific blockchain use cases and requirements.
                      </p>
                      <Button 
                        onClick={() => navigate('/ai-agents')}
                        variant="outline" 
                        className="w-full border-white/10 hover:bg-white/10 text-white"
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate('/ai-agents')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                  >
                    Start Building Custom Agents
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="docs" className="mt-0">
                <div className="bg-crypto-dark/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 p-6">
                  <h3 className="text-xl font-medium text-white mb-4">Auto-Generated Documentation</h3>
                  <p className="text-white/70 mb-6">
                    Automatically generate comprehensive documentation for your smart contracts and blockchain applications.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-5">
                      <h4 className="text-lg font-medium text-white mb-3">Smart Contract</h4>
                      <div className="bg-crypto-indigo/30 rounded-lg p-4 font-mono text-sm text-white/80 h-48 overflow-y-auto">
                        <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title Basic ERC20 Token
/// @author Web3 Labs
/// @notice A simple ERC20 implementation
contract SimpleToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * (10 ** uint256(_decimals));
        _balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
}`}</pre>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-5">
                      <h4 className="text-lg font-medium text-white mb-3">Generated Documentation</h4>
                      <div className="bg-white/5 rounded-lg p-4 text-sm text-white/80 h-48 overflow-y-auto">
                        <h5 className="text-white font-medium mb-2">SimpleToken</h5>
                        <p className="mb-2">A simple ERC20 implementation</p>
                        
                        <div className="mb-3">
                          <h6 className="text-white/90 font-medium">Constructor</h6>
                          <p className="text-white/70 text-xs mb-1">Creates a new SimpleToken instance</p>
                          <ul className="list-disc pl-5 text-xs text-white/60">
                            <li><span className="text-crypto-blue">_name</span>: Name of the token</li>
                            <li><span className="text-crypto-blue">_symbol</span>: Symbol of the token</li>
                            <li><span className="text-crypto-blue">_decimals</span>: Number of decimal places</li>
                            <li><span className="text-crypto-blue">_initialSupply</span>: Initial token supply</li>
                          </ul>
                        </div>
                        
                        <div className="mb-3">
                          <h6 className="text-white/90 font-medium">Public Variables</h6>
                          <ul className="list-disc pl-5 text-xs text-white/60">
                            <li><span className="text-crypto-purple">name</span>: Name of the token</li>
                            <li><span className="text-crypto-purple">symbol</span>: Symbol of the token</li>
                            <li><span className="text-crypto-purple">decimals</span>: Number of decimal places</li>
                            <li><span className="text-crypto-purple">totalSupply</span>: Total token supply</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-white/90 font-medium">Events</h6>
                          <ul className="list-disc pl-5 text-xs text-white/60">
                            <li><span className="text-crypto-pink">Transfer</span>: Emitted when tokens are transferred</li>
                            <li><span className="text-crypto-pink">Approval</span>: Emitted when approval is granted</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => navigate('/ai-assistant')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90"
                  >
                    Generate Documentation
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
