
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="py-4 border-b border-white/5 backdrop-blur-md bg-crypto-darker/70 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-crypto-blue to-crypto-purple"></div>
              <div className="absolute inset-0.5 rounded-full bg-crypto-darker flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-crypto-blue via-crypto-purple to-crypto-pink">
              Web3 Labs
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'} transition-colors`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                <span>AI Tools</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-crypto-dark border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-md py-1">
                  <Link to="/ai-assistant" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    AI Assistant
                  </Link>
                  <Link to="/smart-contract-generator" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Smart Contract Generator
                  </Link>
                  <Link to="/security-audit" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Security Vulnerability Detection
                  </Link>
                  <Link to="/gas-optimization" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Gas Optimization
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                <span>Agents</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-crypto-dark border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-md py-1">
                  <Link to="/ai-agents" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    AI Agents
                  </Link>
                  <Link to="/custom-agents" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Custom AI Agents
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                <span>Resources</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-crypto-dark border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-md py-1">
                  <Link to="/documentation" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Documentation
                  </Link>
                  <Link to="/market-intelligence" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Market Intelligence
                  </Link>
                  <Link to="/automated-documentation" className="block px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                    Automated Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 p-4 bg-crypto-dark/90 backdrop-blur-md rounded-lg border border-white/5">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={closeMenu}
                className={`text-sm font-medium px-2 py-1 rounded ${isActive('/') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
              >
                Home
              </Link>
              
              <div className="border-t border-white/10 pt-2">
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider px-2 mb-1">AI Tools</h3>
                <Link 
                  to="/ai-assistant" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/ai-assistant') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  AI Assistant
                </Link>
                <Link 
                  to="/smart-contract-generator" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/smart-contract-generator') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Smart Contract Generator
                </Link>
                <Link 
                  to="/security-audit" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/security-audit') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Security Audit
                </Link>
                <Link 
                  to="/gas-optimization" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/gas-optimization') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Gas Optimization
                </Link>
              </div>
              
              <div className="border-t border-white/10 pt-2">
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider px-2 mb-1">Agents</h3>
                <Link 
                  to="/ai-agents" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/ai-agents') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  AI Agents
                </Link>
                <Link 
                  to="/custom-agents" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/custom-agents') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Custom AI Agents
                </Link>
              </div>
              
              <div className="border-t border-white/10 pt-2">
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider px-2 mb-1">Resources</h3>
                <Link 
                  to="/documentation" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/documentation') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Documentation
                </Link>
                <Link 
                  to="/market-intelligence" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/market-intelligence') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Market Intelligence
                </Link>
                <Link 
                  to="/automated-documentation" 
                  onClick={closeMenu}
                  className={`text-sm font-medium px-2 py-1 rounded ${isActive('/automated-documentation') ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                >
                  Automated Documentation
                </Link>
              </div>
              
              <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="justify-center w-full text-white/80 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login" onClick={closeMenu}>
                  <Button className="justify-center w-full bg-gradient-to-r from-crypto-blue to-crypto-purple text-white hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
