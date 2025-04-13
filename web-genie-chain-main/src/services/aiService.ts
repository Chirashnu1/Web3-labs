
import { useChatStore } from '../store/chatStore';
import { toast } from 'sonner';

// Function to generate AI responses based on user input
export const generateAIResponse = async (userMessage: string, model: 'blockchain' | 'security' | 'contracts' = 'blockchain'): Promise<string> => {
  try {
    // In a real implementation, this would connect to OpenAI API
    // For now, we'll simulate different responses based on the selected model
    const systemMessages = {
      blockchain: "You are an expert blockchain AI assistant helping with Web3 development questions.",
      security: "You are a security specialist AI assistant focused on smart contract auditing and blockchain security.",
      contracts: "You are a smart contract developer AI assistant specializing in Solidity and contract implementation."
    };

    // Craft the prompt with context
    const keywords = ['contract', 'token', 'nft', 'defi', 'dao', 'gas', 'solidity', 'security', 'eth'];
    const context = keywords.some(keyword => userMessage.toLowerCase().includes(keyword)) 
      ? "blockchain context detected" 
      : "general query";

    // Send to API (simulated response for now)
    const response = await simulateAIResponse(userMessage, model, context);
    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm currently experiencing technical difficulties. Please try again in a moment.";
  }
};

// Simulated API response function
const simulateAIResponse = async (message: string, model: string, context: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
  
  // Convert the message to lowercase for easier matching
  const messageLower = message.toLowerCase();
  
  // Different response patterns based on the model
  if (model === 'security') {
    if (messageLower.includes('vulnerabilit') || messageLower.includes('hack') || messageLower.includes('exploit')) {
      return "I've analyzed your smart contract for vulnerabilities. The most common security issues in smart contracts include reentrancy attacks, integer overflow/underflow, and front-running. To protect against these, I recommend:\n\n1. Following the checks-effects-interactions pattern\n2. Using SafeMath for arithmetic operations\n3. Implementing access controls with modifiers\n4. Getting your contract professionally audited before deployment";
    }
    
    if (messageLower.includes('audit') || messageLower.includes('review')) {
      return "A comprehensive security audit examines your code for vulnerabilities and best practices. I'd need to see your contract to provide specific feedback, but here are common areas I check:\n\n- Access control mechanisms\n- Input validation\n- Gas optimization\n- Business logic flaws\n- External contract dependencies\n- Event emissions\n- Upgradeability patterns";
    }
  } 
  else if (model === 'contracts') {
    if (messageLower.includes('nft') || messageLower.includes('token')) {
      return "For implementing tokens and NFTs, I recommend using the OpenZeppelin library as a foundation. For ERC-721 NFTs, your implementation might look like:\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\nimport \"@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol\";\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\n\ncontract MyNFT is ERC721URIStorage, Ownable {\n    uint256 private _tokenIds;\n    \n    constructor() ERC721(\"MyNFT\", \"MNFT\") {}\n    \n    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {\n        uint256 newItemId = _tokenIds;\n        _mint(recipient, newItemId);\n        _setTokenURI(newItemId, tokenURI);\n        _tokenIds++;\n        return newItemId;\n    }\n}\n```";
    }
    
    if (messageLower.includes('deploy') || messageLower.includes('gas')) {
      return "When deploying smart contracts, consider these optimization techniques to reduce gas costs:\n\n1. Use calldata instead of memory for function parameters\n2. Pack variables to use fewer storage slots\n3. Use libraries for common functions\n4. Cache storage variables in memory during complex operations\n5. Batch operations where possible\n6. Consider using the 'unchecked' block for math when overflow is impossible\n\nFor deployment, I recommend using Hardhat or Foundry with proper testing on testnets before mainnet.";
    }
  }

  // Default blockchain response
  if (messageLower.includes('smart contract')) {
    return "Smart contracts are self-executing contracts with the terms directly written into code. They run on blockchain networks like Ethereum and automatically execute when predetermined conditions are met. For development, I recommend using Solidity with frameworks like Hardhat or Foundry for testing and deployment. Would you like to know more about a specific aspect of smart contract development?";
  }
  
  if (messageLower.includes('token') || messageLower.includes('erc20')) {
    return "To create a token, you can implement the ERC-20 standard for fungible tokens or ERC-721/ERC-1155 for NFTs. OpenZeppelin provides secure implementations you can extend. For tokens with vesting schedules, you'll need to implement time-based token release mechanisms. Would you like me to explain how to implement a specific token feature like vesting, staking, or governance?";
  }
  
  if (messageLower.includes('defi')) {
    return "DeFi (Decentralized Finance) applications typically include lending protocols, DEXs (decentralized exchanges), yield farming, and stablecoins. Building a DeFi application requires strong security considerations and usually involves complex contract interactions. The main components often include liquidity pools, oracles for price feeds, and governance mechanisms. What specific DeFi functionality are you looking to build?";
  }

  return "I'm your Web3 AI assistant with expertise in blockchain technology, smart contracts, and decentralized applications. Could you provide more details about your project or specific blockchain questions? I can help with contract development, security auditing, or architectural guidance for your Web3 application.";
};

// Send a message and get AI response
export const sendMessage = async (message: string) => {
  const { addMessage, setLoading, selectedModel } = useChatStore.getState();
  
  // Add user message
  addMessage(message, 'user');
  
  // Set loading state
  setLoading(true);
  
  try {
    // Generate AI response
    const response = await generateAIResponse(message, selectedModel);
    
    // Add AI response
    addMessage(response, 'assistant');
  } catch (error) {
    console.error('Error generating AI response:', error);
    addMessage("I'm sorry, I encountered an error processing your request. Please try again.", 'assistant');
    toast.error("Connection error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

// For Agent-based services
export const deployAgent = async (agentType: 'trading' | 'monitoring' | 'custom', configuration: any) => {
  // Simulate deployment process
  await new Promise(resolve => setTimeout(resolve, 1500));
  toast.success(`${agentType.charAt(0).toUpperCase() + agentType.slice(1)} agent deployed successfully!`);
  return {
    id: crypto.randomUUID(),
    type: agentType,
    status: 'active',
    configuration,
    createdAt: new Date()
  };
};

// For smart contract generation
export const generateSmartContract = async (requirements: string) => {
  // Simulate contract generation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simple logic to determine contract type based on requirements
  let contractType = "Generic";
  let template = "";
  
  if (requirements.toLowerCase().includes("nft")) {
    contractType = "NFT";
    template = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneratedNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    
    constructor() ERC721("GeneratedNFT", "GNFT") {}
    
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds++;
        return newItemId;
    }
}`;
  } else if (requirements.toLowerCase().includes("token") || requirements.toLowerCase().includes("erc20")) {
    contractType = "Token";
    template = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneratedToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GeneratedToken", "GTKN") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`;
  } else if (requirements.toLowerCase().includes("marketplace")) {
    contractType = "Marketplace";
    template = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneratedMarketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }
    
    uint256 private _listingId = 0;
    mapping(uint256 => Listing) public listings;
    uint256 public feePercent = 250; // 2.5%
    
    event ItemListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event ItemSold(uint256 listingId, address buyer, uint256 price);
    event ListingCancelled(uint256 listingId);
    
    function listItem(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than zero");
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        listings[_listingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true
        });
        
        emit ItemListed(_listingId, msg.sender, nftContract, tokenId, price);
        _listingId++;
    }
    
    function buyItem(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");
        
        listing.isActive = false;
        
        uint256 fee = (listing.price * feePercent) / 10000;
        uint256 sellerAmount = listing.price - fee;
        
        payable(listing.seller).transfer(sellerAmount);
        
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        
        emit ItemSold(listingId, msg.sender, listing.price);
    }
    
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender || owner() == msg.sender, "Not authorized");
        require(listing.isActive, "Listing is not active");
        
        listing.isActive = false;
        
        IERC721(listing.nftContract).transferFrom(address(this), listing.seller, listing.tokenId);
        
        emit ListingCancelled(listingId);
    }
    
    function updateFeePercent(uint256 newFeePercent) external onlyOwner {
        require(newFeePercent <= 1000, "Fee cannot exceed 10%");
        feePercent = newFeePercent;
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;
  } else {
    template = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneratedContract is Ownable {
    // Contract variables
    string public name;
    
    // Events
    event ActionPerformed(address indexed performer, string action);
    
    constructor(string memory _name) {
        name = _name;
    }
    
    function performAction(string memory action) external {
        emit ActionPerformed(msg.sender, action);
    }
    
    function updateName(string memory _name) external onlyOwner {
        name = _name;
    }
}`;
  }
  
  toast.success(`${contractType} smart contract generated successfully!`);
  return {
    type: contractType,
    code: template
  };
};

// For security audit scanning
export const scanContract = async (contractCode: string) => {
  // Simulate contract scanning
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Simple logic to identify potential issues
  const issues = [];
  
  if (contractCode.includes("this.balance")) {
    issues.push({
      severity: "critical",
      type: "Reentrancy",
      description: "Potential reentrancy vulnerability detected. Consider using the checks-effects-interactions pattern."
    });
  }
  
  if (contractCode.includes("block.timestamp")) {
    issues.push({
      severity: "warning",
      type: "Time Manipulation",
      description: "Usage of block.timestamp detected. Miners can manipulate this value slightly."
    });
  }
  
  if (!contractCode.includes("require") && contractCode.length > 100) {
    issues.push({
      severity: "warning",
      type: "Input Validation",
      description: "No input validation detected. Consider adding require statements to validate inputs."
    });
  }
  
  // Always add some recommendations
  issues.push({
    severity: "info",
    type: "Gas Optimization",
    description: "Consider using calldata instead of memory for read-only function parameters to save gas."
  });
  
  toast.success(`Security scan completed with ${issues.length} findings`);
  return {
    issueCount: issues.length,
    issues: issues,
    overallRisk: issues.some(i => i.severity === "critical") ? "high" : issues.some(i => i.severity === "warning") ? "medium" : "low"
  };
};

// For documentation generation
export const generateDocumentation = async (contractCode: string) => {
  // Simulate documentation generation
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Extract function names and events (very simplified)
  const functionMatches = contractCode.match(/function\s+(\w+)/g) || [];
  const eventMatches = contractCode.match(/event\s+(\w+)/g) || [];
  
  const functions = functionMatches.map(f => {
    const name = f.replace("function ", "");
    return {
      name,
      description: `The ${name} function allows interaction with the contract.`,
      parameters: ["param1", "param2"],
      returns: "Description of return value"
    };
  });
  
  const events = eventMatches.map(e => {
    const name = e.replace("event ", "");
    return {
      name,
      description: `The ${name} event is emitted when certain actions occur.`,
      parameters: ["param1", "param2"]
    };
  });
  
  toast.success("Documentation generated successfully!");
  return {
    contractName: "Generated Contract",
    description: "This contract provides functionality for blockchain interactions.",
    author: "Web3 AI Assistant",
    functions,
    events,
    variables: ["name", "symbol", "owner"]
  };
};
