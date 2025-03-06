'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [codeStep, setCodeStep] = useState(0);
  const [servicesHovered, setServicesHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Use useMemo to prevent the array from being recreated on each render
  const textOptions = useMemo(() => [
    "ML pipelines",
    "data processing at scale",
    "AI-driven solutions",
    "LLM fine-tuning",
    "Python excellence"
  ], []);

  const codeLines = useMemo(() => [
    `import pycoder`,
    `\n\nsolution = pycoder.solve(`,
    `\n    your_complex_problem,`,
    `\n    scale=True,`,
    `\n    optimize_performance=True`,
    `\n)`,
    `\n\n# Deployment ready in 3.2s`
  ], []);

  // Entry animation - Client-side only
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing animation - Client-side only
  useEffect(() => {
    const currentText = textOptions[currentTextIndex];
    
    if (isTyping) {
      if (typedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentText.substring(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(typedText.substring(0, typedText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % textOptions.length);
      }
    }
  }, [typedText, isTyping, currentTextIndex, textOptions]);

  // Code animation - Client-side only
  useEffect(() => {
    if (codeStep < codeLines.length) {
      const timeout = setTimeout(() => {
        setCodeStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [codeStep, codeLines.length]);
  
  const displayCode = codeLines.slice(0, codeStep).join('');

  return (
    <section 
      ref={heroRef} 
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-24 md:py-32 overflow-hidden"
    >
      <div 
        className="container mx-auto px-4 flex flex-col lg:flex-row items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        {/* Text content */}
        <div 
          className="lg:w-1/2 text-white space-y-8 mb-16 lg:mb-0 relative z-10"
          style={{
            transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
            transitionDelay: '0.2s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative">
            Powering Innovation with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
              Python
            </span>{' '}
            Excellence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-lg h-10">
            We build scalable solutions for{' '}
            <span className="text-yellow-300 font-medium inline-block min-w-[200px]">
              {typedText}<span className="animate-pulse">|</span>
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href="/services" 
              className="group relative overflow-hidden bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-center inline-flex items-center justify-center"
              onMouseEnter={() => setServicesHovered(true)}
              onMouseLeave={() => setServicesHovered(false)}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: servicesHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: servicesHovered ? 
                  '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' : 
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <span className="relative z-10">Our Services</span>
              <span 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <svg 
                className="w-5 h-5 ml-2 transition-transform duration-300" 
                style={{ transform: servicesHovered ? 'translateX(3px)' : 'translateX(0)' }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="group relative overflow-hidden bg-transparent border border-white/30 hover:border-white/70 text-white font-bold py-4 px-8 rounded-full text-center inline-flex items-center justify-center backdrop-blur-sm"
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                transform: contactHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: contactHovered ? 
                  '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' : 
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <span 
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              <svg 
                className="w-5 h-5 ml-2 transition-transform duration-300" 
                style={{ transform: contactHovered ? 'translateX(3px)' : 'translateX(0)' }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 pt-6 opacity-80">
            <p className="text-gray-400 font-medium">Trusted by:</p>
            <div className="flex space-x-4">
              <div className="text-white/80 font-bold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                TechCorp
              </div>
              <div className="text-white/80 font-bold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                DataFlow
              </div>
              <div className="text-white/80 font-bold flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AIVentures
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive terminal display */}
        <div 
          className="lg:w-1/2 relative z-10"
          style={{
            transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
            transitionDelay: '0.4s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)'
          }}
        >
          <div className="relative h-[480px] w-full">
            {/* Terminal window */}
            <div className="absolute inset-0 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 h-10 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm mx-auto font-mono">pycoder-terminal</div>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono">
                <div className="flex items-center text-gray-400 mb-4">
                  <span className="text-green-400">➜</span>
                  <span className="ml-2 text-blue-400">~/pycoder-tech</span>
                  <span className="ml-2 text-white">python solve_complex_problem.py</span>
                </div>
                
                <div className="text-green-400 text-sm mb-4">
                  Initializing Pycoder environment...
                </div>
                
                <div className="text-white text-sm mb-4">
                  Welcome to <span className="text-yellow-400 font-bold">Pycoder Tech</span> advanced problem solver
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg text-sm font-mono">
                  <pre className="text-green-400">
                    <code>
                      {displayCode}
                    </code>
                  </pre>
                </div>
                
                {codeStep >= codeLines.length && (
                  <div className="mt-4">
                    <div className="text-white text-sm mb-2">Processing solution...</div>
                    <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-75" style={{ animation: 'pulse 2s infinite' }}></div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-gray-300 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Solution optimized</span>
                      </div>
                      <div className="text-gray-300 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Memory utilization: 64.2% reduced</span>
                      </div>
                      <div className="text-gray-300 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Performance: 3.8x faster than baseline</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-10 right-10">
              <svg className="w-10 h-10 text-yellow-500/20" style={{ animation: 'pulse 3s infinite' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS keyframes for animations that were using animate-pulse-slow */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}