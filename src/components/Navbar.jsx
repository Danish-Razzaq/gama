import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 backdrop-blur-md bg-white/70 dark:bg-[#060B19]/80 shadow-lg dark:shadow-cyan-900/20 border-b border-gray-200/50 dark:border-cyan-900/30' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-orange-400 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0A192F] dark:text-white">
            Gama<span className="text-[#FF6B00]">Suite</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {['Platform', 'Integrations', 'About Us', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} className="animate-bounce-slight" />}
          </button>
          <button className="text-sm font-semibold text-[#0A192F] dark:text-white hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors">
            Sign In
          </button>
          <button className="btn-liquid px-6 py-2.5 rounded-full text-white font-semibold shadow-[0_0_15px_rgba(255,107,0,0.4)] dark:shadow-[0_0_20px_rgba(255,107,0,0.6)]">
            Schedule a Demo
          </button>
        </div>

        <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#060B19] border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col space-y-4 shadow-xl">
          {['Platform', 'Integrations', 'About Us', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium text-gray-800 dark:text-gray-200">{item}</a>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-liquid px-6 py-2 rounded-full text-white font-semibold">Demo</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
