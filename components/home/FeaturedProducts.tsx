'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Product data
const products = [
  {
    id: 'pyanalytics',
    title: 'PyAnalytics',
    description: 'Advanced analytics platform with built-in ML capabilities for processing large datasets.',
    features: [
      'Real-time data processing',
      'Customizable visualization dashboards',
      'Automated ML model training',
      'API integrations'
    ],
    image: '/api/placeholder/600/400',
    ctaText: 'Explore PyAnalytics',
    link: '/products/pyanalytics',
    color: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'llmstudio',
    title: 'LLM Studio',
    description: 'Fine-tune and deploy large language models with our easy-to-use studio interface.',
    features: [
      'No-code fine-tuning',
      'Custom knowledge base integration',
      'Deployment pipeline automation',
      'Performance monitoring'
    ],
    image: '/api/placeholder/600/400',
    ctaText: 'Discover LLM Studio',
    link: '/products/llmstudio',
    color: 'from-purple-500 to-indigo-600',
    accentColor: '#8b5cf6',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'dataflow',
    title: 'DataFlow Engine',
    description: 'Distributed data processing framework built for scale and performance.',
    features: [
      'Parallel data processing',
      'Fault-tolerant architecture',
      'Visual workflow designer',
      'Kubernetes integration'
    ],
    image: '/api/placeholder/600/400',
    ctaText: 'Learn More',
    link: '/products/dataflow',
    color: 'from-teal-500 to-emerald-600',
    accentColor: '#14b8a6',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  }
];

// Pre-defined particle positions with consistent values for server and client
const preDefinedParticles = [
  { width: 3, height: 2, left: 10, top: 20, opacity: 0.3, delay: 1, duration: 15 },
  { width: 2, height: 4, left: 25, top: 50, opacity: 0.2, delay: 2, duration: 12 },
  { width: 4, height: 3, left: 40, top: 80, opacity: 0.3, delay: 3, duration: 18 },
  { width: 2, height: 2, left: 60, top: 30, opacity: 0.4, delay: 4, duration: 14 },
  { width: 3, height: 3, left: 75, top: 60, opacity: 0.25, delay: 5, duration: 16 },
  { width: 2, height: 4, left: 85, top: 40, opacity: 0.35, delay: 1, duration: 17 },
  { width: 4, height: 2, left: 30, top: 70, opacity: 0.3, delay: 2, duration: 13 },
  { width: 3, height: 3, left: 50, top: 15, opacity: 0.25, delay: 3, duration: 19 },
  { width: 2, height: 2, left: 70, top: 85, opacity: 0.2, delay: 4, duration: 14 },
  { width: 4, height: 4, left: 15, top: 45, opacity: 0.3, delay: 5, duration: 16 },
  { width: 3, height: 2, left: 90, top: 25, opacity: 0.35, delay: 2, duration: 18 },
  { width: 2, height: 3, left: 20, top: 65, opacity: 0.25, delay: 3, duration: 15 },
  { width: 4, height: 2, left: 80, top: 55, opacity: 0.3, delay: 4, duration: 17 },
  { width: 3, height: 4, left: 45, top: 90, opacity: 0.2, delay: 5, duration: 19 },
  { width: 2, height: 2, left: 35, top: 35, opacity: 0.25, delay: 1, duration: 13 }
];

export default function FeaturedProducts() {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [tabsHovered, setTabsHovered] = useState(false);
  const [hoverStates, setHoverStates] = useState<{[key: string]: boolean}>({
    performance: false,
    customization: false,
    security: false
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  // Fix: Create a mutable ref object with the correct type
  const featureRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [showParticles, setShowParticles] = useState(false);

  // Track scroll for parallax effects - client-side only
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for hover effects - client-side only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enable particles only after hydration is complete
  useEffect(() => {
    setShowParticles(true);
  }, []);

  // Intersection observer for entrance animations - client-side only
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Product tab change with animation
  const handleProductChange = (product: typeof products[0]) => {
    if (product.id === activeProduct.id) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProduct(product);
      setIsTransitioning(false);
    }, 300);
  };

  // Subtle background parallax effect
  const calculateParallax = (baseValue: number) => {
    return baseValue + scrollPosition * 0.05;
  };

  // 3D tilt effect for image
  const handleImageTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    imageRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  // Reset tilt on mouse leave
  const handleImageTiltReset = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Handle feature section hover
  const handleFeatureHover = (feature: string, isHovered: boolean) => {
    setHoverStates(prev => ({
      ...prev,
      [feature]: isHovered
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #111827, #1f2937, #0f172a)',
        backgroundColor: '#111827', // fallback background color
      }}
    >
      {/* Animated background elements */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full opacity-30 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)',
          transform: `translate3d(0, ${calculateParallax(-50)}px, 0)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full opacity-30 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
          transform: `translate3d(0, ${calculateParallax(50)}px, 0)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <span 
            className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-gray-800 text-yellow-400 mb-4"
            style={{
              boxShadow: '0 2px 6px rgba(20, 20, 30, 0.4)'
            }}
          >
            Python-Powered Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Products</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful Python-based tools to accelerate your data and ML workflows
          </p>
        </div>

        {/* Interactive product selector tabs */}
        <div 
          className="flex justify-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.2s'
          }}
          onMouseEnter={() => setTabsHovered(true)}
          onMouseLeave={() => setTabsHovered(false)}
        >
          <div className="inline-flex bg-gray-800 rounded-full shadow-lg p-2 border border-gray-700 relative overflow-hidden">
            {/* Animated background glow */}
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 70%)`,
                mixBlendMode: 'normal',
                pointerEvents: 'none',
                opacity: tabsHovered ? 0.15 : 0,
                transition: 'opacity 0.3s ease'
              }}
            ></div>
            
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductChange(product)}
                className={`relative px-6 py-4 rounded-full transition-all duration-500 ${
                  activeProduct.id === product.id
                    ? 'text-gray-900 shadow-md'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeProduct.id === product.id && (
                  <span 
                    className={`absolute inset-0 bg-gradient-to-r ${product.color} rounded-full transition-all duration-500`}
                    style={{
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
                    }}
                  ></span>
                )}
                <span className="relative z-10 flex items-center font-medium">
                  <span className="flex items-center">
                    {activeProduct.id === product.id ? (
                      <svg className="w-5 h-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span 
                        className="w-5 h-5 mr-1.5 opacity-80 flex items-center justify-center"
                        style={{ color: product.accentColor }}
                      >
                        {product.icon}
                      </span>
                    )}
                    {product.title}
                  </span>
                </span>
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
                    activeProduct.id !== product.id ? 'w-0' : 'w-full'
                  }`}
                  style={{ 
                    opacity: activeProduct.id !== product.id ? 0 : 1
                  }}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive product showcase */}
        <div 
          className="transform transition-all duration-500"
          style={{
            opacity: isTransitioning ? 0 : (isVisible ? 1 : 0),
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.3s'
          }}
        >
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product image with 3D tilt effect and interactive overlay */}
              <div 
                ref={imageRef}
                className="relative h-[350px] md:h-full overflow-hidden group cursor-default"
                onMouseMove={handleImageTilt}
                onMouseLeave={handleImageTiltReset}
                style={{ 
                  transition: 'transform 0.3s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  fill
                  className="object-cover transition-transform duration-10000 ease-out group-hover:scale-110"
                  style={{
                    transitionDelay: '0s',
                    transitionDuration: '15s'
                  }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent">
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out"
                    style={{
                      transform: 'translateY(0)'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${activeProduct.color} text-white shadow-lg`}>
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="relative">
                          Featured Product
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30"></span>
                        </span>
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeProduct.title}</h3>
                    <p className="text-gray-300 max-w-md">{activeProduct.description}</p>
                  </div>
                </div>
                
                {/* Client-side only particles */}
                {showParticles && (
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    {preDefinedParticles.map((particle, index) => (
                      <div
                        key={index}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${particle.width}px`,
                          height: `${particle.height}px`,
                          left: `${particle.left}%`,
                          top: `${particle.top}%`,
                          opacity: particle.opacity,
                          animation: `float ${particle.duration}s linear infinite`,
                          animationDelay: `-${particle.delay}s`
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Mouse position gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent)',
                    '--mouse-x': mousePosition.x + 'px',
                    '--mouse-y': mousePosition.y + 'px',
                  } as React.CSSProperties}
                ></div>
              </div>
              
              {/* Interactive product info section */}
              <div className="p-10 md:p-12 flex flex-col justify-between bg-gray-900 relative">
                {/* Subtle background pattern */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(${activeProduct.accentColor}20 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                ></div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span 
                      className="inline-block mr-2"
                      style={{ color: activeProduct.accentColor }}
                    >
                      {activeProduct.icon}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{activeProduct.title}</h3>
                  </div>
                  
                  <div 
                    className="h-1 w-16 rounded-full mb-6"
                    style={{ 
                      background: `linear-gradient(to right, ${activeProduct.accentColor}, ${activeProduct.accentColor}90)`
                    }}
                  ></div>
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">{activeProduct.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-4 text-gray-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: activeProduct.accentColor }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </h4>
                  
                  {/* Interactive feature list with staggered animation */}
                  <ul className="space-y-4 mb-10">
                    {activeProduct.features.map((feature, index) => (
                      <li 
                        key={index} 
                        ref={(el) => { featureRefs.current[index] = el; }}
                        className="flex items-start transition-all duration-300"
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                        style={{
                          transform: activeFeature === index ? 'translateX(8px)' : 'translateX(0)',
                          transition: `transform 0.3s ease, opacity 0.5s ease`,
                          transitionDelay: `${index * 0.1 + 0.3}s`,
                          opacity: isTransitioning ? 0 : 1
                        }}
                      >
                        <span 
                          className="flex-shrink-0 w-6 h-6 mr-3 rounded-full flex items-center justify-center"
                          style={{
                            background: activeFeature === index 
                              ? `${activeProduct.accentColor}30` 
                              : 'transparent',
                            transition: 'background 0.3s ease'
                          }}
                        >
                          <svg 
                            className="h-5 w-5 transition-colors duration-300" 
                            style={{
                              color: activeFeature === index 
                                ? activeProduct.accentColor 
                                : '#94a3b8'
                            }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        
                        <span 
                          className="text-gray-300 relative"
                          style={{
                            fontWeight: activeFeature === index ? '500' : '400'
                          }}
                        >
                          {feature}
                          {activeFeature === index && (
                            <span 
                              className="absolute bottom-0 left-0 h-0.5 bg-current"
                              style={{ 
                                width: '100%',
                                background: `${activeProduct.accentColor}50`,
                                animation: 'expandWidth 0.3s ease forwards'
                              }}
                            ></span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Interactive CTA button */}
                <div>
                  <Link 
                    href={activeProduct.link}
                    className="group relative inline-flex items-center font-medium py-4 px-8 rounded-lg text-white shadow-md transition-all duration-300 overflow-hidden"
                    style={{
                      background: `linear-gradient(to right, var(--gradient-from), var(--gradient-to))`,
                      '--gradient-from': activeProduct.accentColor,
                      '--gradient-to': `${activeProduct.accentColor}dd`,
                      boxShadow: buttonHovered ? 
                        `0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px ${activeProduct.accentColor}20` : 
                        `0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px ${activeProduct.accentColor}10`,
                      transform: buttonHovered ? 'translateY(-2px)' : 'translateY(0)'
                    } as React.CSSProperties}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>{activeProduct.ctaText}</span>
                      <svg 
                        className="ml-2 h-5 w-5 transition-transform duration-300" 
                        style={{
                          transform: buttonHovered ? 'translateX(4px)' : 'translateX(0)'
                        }}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    
                    {/* Button hover effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    
                    {/* Button hover spotlight effect */}
                    <span 
                      className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent)',
                        '--mouse-x': (mousePosition.x - 100) + 'px',
                        '--mouse-y': (mousePosition.y - 100) + 'px',
                      } as React.CSSProperties}
                    ></span>
                  </Link>
                  
                  <div className="mt-6 flex items-center text-sm text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Detailed documentation and support included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* View all products link with interactive effects */}
        <div 
          className="text-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.5s'
          }}
        >
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-300 hover:text-yellow-400 font-medium group transition-colors duration-300 relative px-4 py-2"
          >
            <span className="relative z-10">View all products</span>
            <svg 
              className="ml-2 h-5 w-5 text-gray-400 group-hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>
      </div>

      {/* Enhanced comparison section with interactive hover effects */}
      <div 
        className="max-w-5xl mx-auto mt-24 px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.6s'
        }}
      >
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 relative overflow-hidden">
          {/* Background grid pattern */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-center mb-2 text-white">Why Choose Our Products?</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full mx-auto mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Performance Feature */}
              <div 
                className="text-center p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  transform: hoverStates.performance ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoverStates.performance ? 
                    '0 15px 30px -5px rgba(59, 130, 246, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.3)' : 
                    '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  background: hoverStates.performance ? 'linear-gradient(to bottom right, #1f2937, #111827)' : '#1e293b',
                  borderTop: '1px solid #374151',
                  borderLeft: '1px solid #374151'
                }}
                onMouseEnter={() => handleFeatureHover('performance', true)}
                onMouseLeave={() => handleFeatureHover('performance', false)}
              >
                <div className="relative">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 bg-blue-900 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      transform: hoverStates.performance ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {hoverStates.performance && (
                      <span className="absolute inset-0 bg-blue-800 rounded-full animate-ping opacity-30"></span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ color: hoverStates.performance ? '#60a5fa' : '#e2e8f0' }}>Performance</h4>
                  <p className="text-gray-300 text-sm">Up to 10x faster than comparable solutions with optimized Python code.</p>
                  
                  {/* Reveal bar on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform transition-transform duration-300 rounded-full" 
                    style={{
                      transformOrigin: 'left',
                      transform: hoverStates.performance ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Customization Feature */}
              <div 
                className="text-center p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  transform: hoverStates.customization ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoverStates.customization ? 
                    '0 15px 30px -5px rgba(16, 185, 129, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.3)' : 
                    '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  background: hoverStates.customization ? 'linear-gradient(to bottom right, #1f2937, #111827)' : '#1e293b',
                  borderTop: '1px solid #374151',
                  borderLeft: '1px solid #374151'
                }}
                onMouseEnter={() => handleFeatureHover('customization', true)}
                onMouseLeave={() => handleFeatureHover('customization', false)}
              >
                <div className="relative">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 bg-green-900 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      transform: hoverStates.customization ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {hoverStates.customization && (
                      <span className="absolute inset-0 bg-green-800 rounded-full animate-ping opacity-30"></span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ color: hoverStates.customization ? '#4ade80' : '#e2e8f0' }}>Customization</h4>
                  <p className="text-gray-300 text-sm">Fully adaptable to your workflow with extensive configuration options.</p>
                  
                  {/* Reveal bar on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 transform transition-transform duration-300 rounded-full" 
                    style={{
                      transformOrigin: 'left',
                      transform: hoverStates.customization ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Enterprise Security Feature */}
              <div 
                className="text-center p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  transform: hoverStates.security ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoverStates.security ? 
                    '0 15px 30px -5px rgba(124, 58, 237, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.3)' : 
                    '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  background: hoverStates.security ? 'linear-gradient(to bottom right, #1f2937, #111827)' : '#1e293b',
                  borderTop: '1px solid #374151',
                  borderLeft: '1px solid #374151'
                }}
                onMouseEnter={() => handleFeatureHover('security', true)}
                onMouseLeave={() => handleFeatureHover('security', false)}
              >
                <div className="relative">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 bg-purple-900 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      transform: hoverStates.security ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {hoverStates.security && (
                      <span className="absolute inset-0 bg-purple-800 rounded-full animate-ping opacity-30"></span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ color: hoverStates.security ? '#a78bfa' : '#e2e8f0' }}>Enterprise Ready</h4>
                  <p className="text-gray-300 text-sm">Built with security and scalability in mind for mission-critical deployments.</p>
                  
                  {/* Reveal bar on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 transform transition-transform duration-300 rounded-full" 
                    style={{
                      transformOrigin: 'left',
                      transform: hoverStates.security ? 'scaleX(1)' : 'scaleX(0)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}