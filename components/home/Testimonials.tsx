'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

// Testimonial data
const testimonials = [
  {
    id: 1,
    content: "Pycoder Tech transformed our data processing pipeline. Their Python expertise helped us reduce processing time by a substantial 70% while improving accuracy.",
    author: "Sarah Johnson",
    position: "CTO, DataFlow Inc.",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40",
    category: "Data Processing"
  },
  {
    id: 2,
    content: "The machine learning solution built by Pycoder Tech allowed us to predict customer behavior with remarkable accuracy, driving a 35% increase in conversion rates.",
    author: "Michael Chen",
    position: "Head of Analytics, RetailGenius",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40",
    category: "Machine Learning"
  },
  {
    id: 3,
    content: "Working with Pycoder Tech on our LLM fine-tuning project was a game-changer. They understood our domain and delivered a model that truly reflects our expertise.",
    author: "Emma Rodriguez",
    position: "AI Director, TechSolutions Global",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40",
    category: "LLM Fine-tuning"
  },
  {
    id: 4,
    content: "Their API development expertise helped us connect previously siloed systems. The performance and documentation were exceptional.",
    author: "David Kim",
    position: "VP of Engineering, ConnectSphere",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40",
    category: "API Development"
  },
  {
    id: 5,
    content: "Pycoder Tech's consulting services gave us the roadmap we needed to modernize our Python-based architecture. Their insights saved us months of trial and error.",
    author: "Lisa Thompson",
    position: "Enterprise Architect, FinServ Co.",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40",
    category: "Architecture"
  }
];

const TestimonialsCarousel = () => {
  // Client-side states with safe initial values
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [buttonHover, setButtonHover] = useState({ prev: false, next: false });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize visibility after hydration
  useEffect(() => {
    setIsVisible(true);
    setIsAutoPlaying(true);
    
    // Setup IntersectionObserver for entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Auto-advance the carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const startAutoPlay = () => {
      autoPlayTimerRef.current = setTimeout(() => {
        goToSlide((activeIndex + 1) % testimonials.length);
      }, 6000);
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, activeIndex]);
  
  // Navigate to a specific slide
  const goToSlide = useCallback((index: number) => {
    if (index === activeIndex) return;
    
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsFading(false);
    }, 500);
  }, [activeIndex]);
  
  // Navigate to the next slide
  const nextSlide = useCallback(() => {
    goToSlide((activeIndex + 1) % testimonials.length);
    // Pause auto-play temporarily when manually navigating
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [activeIndex, goToSlide]);
  
  // Navigate to the previous slide
  const prevSlide = useCallback(() => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
    // Pause auto-play temporarily when manually navigating
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [activeIndex, goToSlide]);

  // Pause autoplay when mouse enters the carousel
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Resume autoplay when mouse leaves the carousel
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);
  
  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #111827, #1f2937, #0f172a)',
        backgroundColor: '#111827', // fallback background color
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div 
          className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full" 
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)', 
            opacity: 0.4,
            animation: 'float 15s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full" 
          style={{ 
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)', 
            opacity: 0.3,
            animation: 'float 18s ease-in-out infinite reverse'
          }}
        ></div>
        <div 
          className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full" 
          style={{ 
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0) 70%)', 
            opacity: 0.25,
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Client Success Stories</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how our Python expertise has transformed businesses across industries
          </p>
        </div>
        
        {/* Single Testimonial Carousel */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.2s'
          }}
        >
          {/* Progress bar for auto-playing */}
          <div className="absolute top-0 left-0 right-0 h-1 z-10 overflow-hidden rounded-t-xl">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300"
              style={{
                width: isAutoPlaying ? '100%' : '0%',
                transitionProperty: 'width',
                transitionDuration: isAutoPlaying ? '6000ms' : '0ms',
                transitionTimingFunction: 'linear'
              }}
            ></div>
          </div>
          
          {/* Main testimonial card */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 relative">
            {/* Card content with fade effect */}
            <div 
              className="relative transition-all duration-500"
              style={{
                opacity: isFading ? 0 : 1,
                transform: isFading ? 'translateY(10px)' : 'translateY(0)'
              }}
            >
              <div className="md:flex">
                {/* Left side - Company and quote */}
                <div className="p-8 md:w-2/3">
                  {/* Category badge */}
                  <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium mb-6">
                    {testimonials[activeIndex].category}
                  </div>
                  
                  {/* Quote content */}
                  <div className="relative">
                    {/* Quote mark */}
                    <div className="absolute -top-2 -left-3 text-5xl font-serif text-gray-700 opacity-60 select-none">"</div>
                    <div className="absolute -bottom-16 -right-3 text-5xl font-serif text-gray-700 opacity-60 select-none transform rotate-180">"</div>
                    
                    <p className="text-xl md:text-2xl text-gray-300 relative z-10 pl-5 leading-relaxed mb-8">
                      {testimonials[activeIndex].content}
                    </p>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex space-x-1 mb-6 pl-5">
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>
                </div>
                
                {/* Right side - Author info */}
                <div className="bg-gray-900 p-8 md:w-1/3 flex flex-col justify-between">
                  {/* Company logo */}
                  <div className="h-10 mb-6">
                    <Image 
                      src={testimonials[activeIndex].companyLogo}
                      alt={`${testimonials[activeIndex].author}'s company`}
                      width={120}
                      height={40}
                      className="object-contain h-full"
                    />
                  </div>
                  
                  {/* Author details */}
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <div className="rounded-full overflow-hidden mr-4 border-2 border-yellow-500">
                        <Image 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].author}
                          width={64}
                          height={64}
                          className="object-cover w-16 h-16"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonials[activeIndex].author}</h4>
                        <p className="text-gray-400">{testimonials[activeIndex].position}</p>
                      </div>
                    </div>
                    
                    {/* Verified badge */}
                    <div className="rounded-full bg-green-900 text-green-300 text-sm px-3 py-1 inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Verified Client</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevSlide}
              onMouseEnter={() => setButtonHover(prev => ({ ...prev, prev: true }))}
              onMouseLeave={() => setButtonHover(prev => ({ ...prev, prev: false }))}
              className="relative bg-gray-800 hover:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all focus:outline-none overflow-hidden border border-gray-700"
              aria-label="Previous testimonial"
              style={{
                transform: buttonHover.prev ? 'translateX(-5px)' : 'translateX(0)',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
            >
              <svg 
                className="w-6 h-6 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full overflow-hidden relative ${
                    index === activeIndex ? 'w-8 h-3' : 'w-3 h-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span 
                    className={`absolute inset-0 ${
                      index === activeIndex ? 'bg-gradient-to-r from-yellow-500 to-yellow-300' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  ></span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              onMouseEnter={() => setButtonHover(prev => ({ ...prev, next: true }))}
              onMouseLeave={() => setButtonHover(prev => ({ ...prev, next: false }))}
              className="relative bg-gray-800 hover:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all focus:outline-none overflow-hidden border border-gray-700"
              aria-label="Next testimonial"
              style={{
                transform: buttonHover.next ? 'translateX(5px)' : 'translateX(0)',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
            >
              <svg 
                className="w-6 h-6 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Stats section with updated design */}
        <div 
          className="max-w-5xl mx-auto mt-24 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.4s'
          }}
        >
          <h3 className="text-xl font-bold text-center mb-8 text-white">Our Impact By The Numbers</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "98%",
                label: "Client Satisfaction",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                color: "blue"
              },
              {
                value: "145+",
                label: "Projects Completed",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                color: "indigo"
              },
              {
                value: "62%",
                label: "Performance Gain",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ),
                color: "green"
              },
              {
                value: "24/7",
                label: "Support Availability",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                ),
                color: "yellow"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="p-4 relative overflow-hidden group"
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease forwards ${0.6 + index * 0.1}s` : 'none',
                  opacity: 0
                }}
              >
                <div 
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-900/30 text-${stat.color}-300 mb-4 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  {stat.value}
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;