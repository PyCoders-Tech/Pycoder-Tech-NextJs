'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  
  // Navigation items with dropdowns
  const navItems = [
    { name: 'About', path: '/about', dropdown: null },
    { 
      name: 'Services', 
      path: '/services', 
      dropdown: [
        { name: 'ML Development', path: '/services/ml-development' },
        { name: 'Data Engineering', path: '/services/data-engineering' },
        { name: 'API Development', path: '/services/api-development' },
        { name: 'LLM Fine-tuning', path: '/services/llm-fine-tuning' }
      ] 
    },
    { 
      name: 'Products', 
      path: '/products', 
      dropdown: [
        { name: 'PyAnalytics', path: '/products/pyanalytics' },
        { name: 'LLM Studio', path: '/products/llm-studio' },
        { name: 'DataFlow Engine', path: '/products/dataflow' }
      ] 
    },
    { name: 'Blog', path: '/blog', dropdown: null },
    { name: 'Careers', path: '/careers', dropdown: null },
  ];

  // Handle scroll effect for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Determine if scrolled for styling only
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Handle mobile menu body lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Add animation after initial load
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
      style={{ 
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4" ref={navbarRef}>
        <nav className="flex justify-between items-center">
          {/* Logo with animation */}
          <div 
            className="flex items-center"
            style={{
              transform: pageLoaded ? 'translateY(0)' : 'translateY(-20px)',
              opacity: pageLoaded ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <Link href="/" className="flex items-center group">
              <div className="mr-2 text-3xl relative">
                <span className="group-hover:animate-bounce inline-block transition-transform duration-300">🐍</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>
              <span className={`font-bold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              } group-hover:text-yellow-400`}>
                Pycoder Tech
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center space-x-6"
            style={{
              transform: pageLoaded ? 'translateY(0)' : 'translateY(-20px)',
              opacity: pageLoaded ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
              transitionDelay: '0.1s'
            }}
          >
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center font-medium transition-colors duration-300 px-2 py-1 rounded hover:bg-gray-800 ${
                        pathname.startsWith(item.path) ? 'text-yellow-400' : isScrolled ? 'text-white' : 'text-white'
                      } ${hoveredLink === item.name ? 'text-yellow-400' : ''}`}
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => setHoveredLink(item.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      style={{
                        transitionDelay: `${0.1 + index * 0.05}s`
                      }}
                    >
                      {item.name}
                      <svg 
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                        fill="none"
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div 
                      className={`absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left ${
                        activeDropdown === item.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="py-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className={`block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-150 ${
                              pathname === dropdownItem.path ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.path}
                    className={`relative font-medium transition-colors duration-300 px-2 py-1 rounded hover:bg-gray-800 ${
                      pathname === item.path ? 'text-yellow-400' : isScrolled ? 'text-white' : 'text-white'
                    } ${hoveredLink === item.name ? 'text-yellow-400' : ''}`}
                    onMouseEnter={() => setHoveredLink(item.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      transitionDelay: `${0.1 + index * 0.05}s`
                    }}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></span>
                    )}
                    {hoveredLink === item.name && pathname !== item.path && (
                      <span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400/50"
                        style={{
                          transform: 'scaleX(1)',
                          transformOrigin: 'left',
                          transition: 'transform 0.3s ease'
                        }}
                      ></span>
                    )}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Contact Us button with animation */}
            <Link 
              href="/contact" 
              className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-yellow-500/20 group"
              style={{
                transform: `${pageLoaded ? 'translateY(0)' : 'translateY(-20px)'}`,
                opacity: pageLoaded ? 1 : 0,
                transition: 'transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease',
                transitionDelay: '0.3s'
              }}
            >
              <span className="relative z-10">Contact Us</span>
              {/* Spotlight effect on hover */}
              <span 
                className="absolute inset-0 w-full h-full bg-white/20 group-hover:bg-transparent transition-colors duration-300"
                style={{
                  clipPath: 'circle(0% at 50% 50%)',
                  transition: 'clip-path 0.6s ease'
                }}
              ></span>
              <span className="absolute w-0 h-0 transition-all duration-300 bg-white/10 group-hover:w-full group-hover:h-full" 
                    style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%', borderRadius: '50%' }}></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
                style={{ top: '0' }}
              ></span>
              <span 
                className={`absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                }`}
                style={{ top: '50%', marginTop: '-1px' }}
              ></span>
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
                style={{ bottom: '0' }}
              ></span>
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 transform transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          style={{ top: '0', height: '100vh' }}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="py-1">
                  {item.dropdown ? (
                    <div>
                      <button
                        className={`flex items-center justify-between w-full text-left font-medium py-3 border-b border-gray-700 ${
                          pathname.startsWith(item.path) ? 'text-yellow-400' : 'text-white'
                        }`}
                        onClick={() => toggleDropdown(item.name)}
                      >
                        {item.name}
                        <svg 
                          className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                          fill="none"
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mobile dropdown */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 py-2 space-y-1 border-l border-gray-700 ml-3 mt-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              className={`block py-2 text-sm ${
                                pathname === dropdownItem.path ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                              }`}
                              onClick={closeMobileMenu}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.path}
                      className={`block py-3 font-medium border-b border-gray-700 ${
                        pathname === item.path ? 'text-yellow-400' : 'text-white hover:text-yellow-300'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Call to action button */}
            <div className="mt-auto pt-8">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 w-full flex items-center justify-center px-4 py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
                onClick={closeMobileMenu}
              >
                Contact Us
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              {/* Social media links */}
              <div className="flex justify-center space-x-6 mt-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;