
import { Link } from 'react-router-dom';
import { MessageCircle, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-crypto-darker py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
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
            <p className="text-white/60 text-sm">
              Revolutionizing blockchain development and Web3 experiences with AI-powered solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/ai-assistant" className="text-white/60 hover:text-white text-sm transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/ai-agents" className="text-white/60 hover:text-white text-sm transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/smart-contract-generator" className="text-white/60 hover:text-white text-sm transition-colors">
                  Smart Contract Generator
                </Link>
              </li>
              <li>
                <Link to="/security-audit" className="text-white/60 hover:text-white text-sm transition-colors">
                  Security Scanner
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="text-white/60 hover:text-white text-sm transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/market-intelligence" className="text-white/60 hover:text-white text-sm transition-colors">
                  Market Intelligence
                </Link>
              </li>
              <li>
                <Link to="/automated-documentation" className="text-white/60 hover:text-white text-sm transition-colors">
                  Auto Documentation
                </Link>
              </li>
              <li>
                <Link to="/gas-optimization" className="text-white/60 hover:text-white text-sm transition-colors">
                  Gas Optimization
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link to="/login" className="text-white/60 hover:text-white text-sm transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Web3 Labs. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
