'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [exploreHovered, setExploreHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track scroll position for parallax effect
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      inputRef.current?.focus();
      return;
    }
    
    // Simulate form submission
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1500);
  };

  const features = [
    {
      title: "Lightning Fast",
      icon: (
        <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Our solutions are optimized for maximum performance and efficiency.",
      color: "yellow"
    },
    {
      title: "Enterprise Security",
      icon: (
        <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Your data and systems are protected with industry-leading security practices.",
      color: "blue"
    },
    {
      title: "Scalable Solutions",
      icon: (
        <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: "Built to grow with your business from startup to enterprise scale.",
      color: "green"
    }
  ];

  // Generate floating particles effect
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y - particle.speed > 0 ? particle.y - particle.speed : 100,
          x: particle.x + Math.sin(particle.y / 10) * 0.2,
          opacity: (Math.sin(Date.now() / 1000 + particle.id) + 1) / 2 * 0.2 + 0.05
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
      }}
    >
      {/* Animated background particles with pulse effect */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transition: 'top 0.5s linear, left 0.5s ease-in-out, opacity 1s ease-in-out',
            transform: `translateY(${scrollPosition * 0.1}px)`,
          }}
        />
      ))}
      
      {/* Background decorative elements with parallax effect */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full opacity-60 blur-3xl"
        style={{ transform: `translate3d(${-scrollPosition * 0.05}px, ${-scrollPosition * 0.05}px, 0)` }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full opacity-60 blur-3xl"
        style={{ transform: `translate3d(${scrollPosition * 0.05}px, ${scrollPosition * 0.05}px, 0)` }}
      ></div>
      <div 
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-full opacity-30 blur-3xl"
        style={{ transform: `translate3d(${scrollPosition * 0.03}px, ${-scrollPosition * 0.02}px, 0)` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: '0.2s'
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Ready to Transform Your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Python Development?</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400/20 -skew-x-6 transform -rotate-1"></span>
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get started with Pycoder Tech today and leverage our expertise for your next project.
            </p>
          </div>
          
          <div 
            className="flex flex-col md:flex-row gap-4 justify-center mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: '0.4s'
            }}
          >
            <Link 
              href="/contact" 
              className="group relative overflow-hidden py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              style={{
                transform: contactHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: contactHovered 
                  ? '0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 10px 15px -5px rgba(0, 0, 0, 0.2)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                background: contactHovered 
                  ? 'linear-gradient(90deg, #eab308 0%, #f59e0b 100%)' 
                  : 'linear-gradient(90deg, #facc15 0%, #eab308 100%)'
              }}
            >
              <span className="relative z-10 flex items-center font-bold text-gray-900">
                <span>Contact Our Team</span>
                <svg 
                  className="ml-2 h-5 w-5 transition-transform duration-300" 
                  style={{
                    transform: contactHovered ? 'translateX(4px)' : 'translateX(0)'
                  }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></span>
            </Link>
            <Link 
              href="/services" 
              className="group relative overflow-hidden py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
              onMouseEnter={() => setExploreHovered(true)}
              onMouseLeave={() => setExploreHovered(false)}
              style={{
                transform: exploreHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: exploreHovered 
                  ? '0 15px 30px -5px rgba(0, 0, 0, 0.3), 0 10px 15px -5px rgba(0, 0, 0, 0.2)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="relative z-10 flex items-center font-bold text-white">
                <span>Explore Services</span>
                <svg 
                  className="ml-2 h-5 w-5 transition-transform duration-300" 
                  style={{
                    transform: exploreHovered ? 'translateX(4px)' : 'translateX(0)'
                  }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></span>
            </Link>
          </div>
          
          {/* Newsletter signup with enhanced design */}
          <div 
            className="relative bg-white/10 rounded-xl p-10 max-w-3xl mx-auto shadow-xl overflow-hidden backdrop-blur-sm"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: '0.6s',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Decorative elements */}
            <div 
              className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-full blur-xl"
              style={{ 
                transform: `translate3d(${scrollPosition * 0.02}px, ${-scrollPosition * 0.02}px, 0)` 
              }}
            ></div>
            <div 
              className="absolute -bottom-16 -left-12 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/10 rounded-full blur-xl"
              style={{ 
                transform: `translate3d(${-scrollPosition * 0.02}px, ${scrollPosition * 0.02}px, 0)` 
              }}
            ></div>
            
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Stay Updated</h3>
            <p className="text-slate-300 mb-8">
              Subscribe to our newsletter for the latest Python development insights and updates.
            </p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto relative z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <div 
                      className="relative overflow-hidden rounded-lg transition-all duration-300"
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring focus:ring-yellow-500/40 transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div 
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500"
                        style={{ 
                          width: email.length ? `${Math.min(100, email.length * 5)}%` : '0%',
                          transition: 'width 0.3s ease-out'
                        }}
                      ></div>
                    </div>
                    {error && (
                      <p className="text-yellow-300 text-sm mt-1 text-left flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`group relative overflow-hidden py-3 px-6 rounded-lg shadow-md flex items-center justify-center min-w-[140px] ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                    onMouseEnter={() => setSubmitHovered(true)}
                    onMouseLeave={() => setSubmitHovered(false)}
                    style={{
                      background: submitHovered 
                        ? 'linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)' 
                        : 'linear-gradient(90deg, #4338ca 0%, #4f46e5 100%)',
                      transform: submitHovered && !loading ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: submitHovered && !loading
                        ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="relative z-10 flex items-center font-bold text-white">
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <svg 
                            className="ml-2 h-5 w-5 transition-transform duration-300" 
                            style={{
                              transform: submitHovered ? 'translateX(4px)' : 'translateX(0)'
                            }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-lg"></span>
                  </button>
                </div>
              </form>
            ) : (
              <div 
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 py-6 px-8 rounded-lg"
                style={{
                  animation: 'fadeIn 0.5s ease-out, scaleIn 0.5s ease-out',
                  boxShadow: '0 4px 20px -5px rgba(0, 255, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-center text-green-300 mb-2">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-2">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-20"></span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-green-300 mb-1">Thank you for subscribing!</h4>
                <p className="text-green-200/80 text-sm">
                  We&apos;ll send you our best content directly to your inbox. No spam, just valuable Python insights.
                </p>
              </div>
            )}
            
            <p className="text-sm text-slate-400 mt-4 flex items-center justify-center">
              <svg className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>We respect your privacy. Unsubscribe at any time.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced benefit section with interactive features */}
      <div 
        className="max-w-5xl mx-auto mt-24 px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          transitionDelay: '0.8s'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative overflow-hidden p-8 rounded-xl backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                transform: activeFeature === index ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeFeature === index 
                  ? '0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div 
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative`}
                style={{
                  background: `rgba(var(--${feature.color}-glow), 0.1)`,
                  transition: 'all 0.3s ease',
                  transform: activeFeature === index ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {feature.icon}
                <span className={`absolute inset-0 rounded-full ${activeFeature === index ? 'animate-ping' : ''}`} style={{ 
                  background: `rgba(var(--${feature.color}-glow), 0.3)`,
                  opacity: 0.3
                }}></span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-300 text-sm">
                {feature.description}
              </p>
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 origin-left transition-transform duration-300"
                style={{
                  background: `linear-gradient(to right, rgba(var(--${feature.color}-glow), 0.7), rgba(var(--${feature.color}-glow), 0.3))`,
                  transform: activeFeature === index ? 'scaleX(1)' : 'scaleX(0)'
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed CSS Variables for colors */}
      <style jsx>{`
        :root {
          --yellow-glow: 234, 179, 8;
          --blue-glow: 59, 130, 246;
          --green-glow: 34, 197, 94;
          --indigo-glow: 79, 70, 229;
        }

        @keyframes scaleIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;