'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

// Service card data
const services = [
  {
    id: 'ml-solutions',
    icon: '🧠',
    title: 'Machine Learning Solutions',
    description: 'Custom ML models and pipelines that solve real business problems. From model training to deployment and monitoring.',
    features: ['Model Development', 'Pipeline Engineering', 'AutoML Solutions', 'Model Monitoring'],
    link: '/services/ml-solutions'
  },
  {
    id: 'data-engineering',
    icon: '📊',
    title: 'Data Engineering',
    description: 'Scalable data processing solutions using Python, PySpark, and Dask for handling big data efficiently.',
    features: ['ETL Pipelines', 'Data Warehousing', 'Stream Processing', 'Data Lake Architecture'],
    link: '/services/data-engineering'
  },
  {
    id: 'api-development',
    icon: '🔌',
    title: 'API Development',
    description: 'High-performance APIs built with FastAPI, Flask, or Django that connect your systems and services.',
    features: ['RESTful APIs', 'GraphQL', 'API Gateway Integration', 'Microservice Architecture'],
    link: '/services/api-development'
  },
  {
    id: 'cloud-deployment',
    icon: '☁️',
    title: 'Cloud Deployment',
    description: 'Seamless deployment of Python applications to AWS, GCP, or Azure with containerization and orchestration.',
    features: ['Docker & Kubernetes', 'Serverless Deployment', 'CI/CD Integration', 'Infrastructure as Code'],
    link: '/services/cloud-deployment'
  },
  {
    id: 'llm-fine-tuning',
    icon: '🤖',
    title: 'LLM Fine-Tuning',
    description: 'Customize large language models for your specific business needs and domain knowledge.',
    features: ['Model Customization', 'Prompt Engineering', 'Knowledge Base Integration', 'Retrieval Augmentation'],
    link: '/services/llm-fine-tuning'
  },
  {
    id: 'consulting',
    icon: '💼',
    title: 'Technical Consulting',
    description: 'Expert guidance on Python technology stack, architecture design, and solution implementation.',
    features: ['Architecture Design', 'Code Review', 'Performance Optimization', 'Technology Selection'],
    link: '/services/consulting'
  }
];

// Service card component with enhanced animations
const ServiceCard = ({ service, isVisible, delay }: { 
  service: typeof services[0]; 
  isVisible: boolean; 
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFeatureAnimated, setIsFeatureAnimated] = useState<number | null>(null);
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden slide-up ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFeatureAnimated(null);
      }}
    >
      <div className="p-8">
        <div 
          className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6 text-3xl"
          style={{
            transition: 'transform 0.3s ease-out',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li 
              key={index} 
              style={{
                transition: 'transform 0.2s ease-out',
                transform: isFeatureAnimated === index ? 'translateX(8px)' : 'translateX(0)'
              }}
              onMouseEnter={() => setIsFeatureAnimated(index)}
              onMouseLeave={() => setIsFeatureAnimated(null)}
            >
              <div className="flex items-start">
                <svg 
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                  style={{
                    transition: 'transform 0.2s ease-out',
                    transform: isFeatureAnimated === index ? 'scale(1.25)' : 'scale(1)'
                  }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-200">{feature}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div 
        style={{
          transition: 'height 0.3s ease-out',
          height: isHovered ? '80px' : '64px',
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)'
        }}
        className="p-4"
      >
        <Link 
          href={service.link}
          className="font-medium flex items-center justify-between"
          style={{ color: 'inherit' }}
        >
          <span 
            style={{
              transition: 'transform 0.3s ease-out',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
            }}
          >
            Learn More
          </span>
          <svg 
            className="h-5 w-5" 
            style={{
              transition: 'transform 0.3s ease-out',
              transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
            }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isTabChanging, setIsTabChanging] = useState(false);

  // Handle section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Short delay before starting animations
          setTimeout(() => {
            setIsHeaderVisible(true);
          }, 100);
          
          setTimeout(() => {
            setIsVisible(true);
          }, 600);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle tab changes with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTabChanging(false);
    }, 300);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 slide-down ${isHeaderVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We leverage Python's powerful ecosystem to deliver scalable, efficient solutions for your business
          </p>
        </div>

        {/* Service category tabs with animations */}
        <div 
          className={`flex flex-wrap justify-center mb-12 gap-2 fade-in ${isHeaderVisible ? 'active' : ''}`}
          style={{ transitionDelay: '300ms' }}
        >
          <button
            onClick={() => handleTabChange('all')}
            style={{
              transition: 'all 0.3s ease-out',
              transform: activeTab === 'all' ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: activeTab === 'all' 
                ? 'var(--foreground)' 
                : 'rgba(200, 200, 200, 0.2)'
            }}
            className="px-5 py-2 rounded-full"
          >
            <span style={{ 
              color: activeTab === 'all' 
                ? 'var(--background)' 
                : 'var(--foreground)' 
            }}>
              All Services
            </span>
          </button>
          <button
            onClick={() => handleTabChange('ml')}
            style={{
              transition: 'all 0.3s ease-out',
              transform: activeTab === 'ml' ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: activeTab === 'ml' 
                ? 'var(--foreground)' 
                : 'rgba(200, 200, 200, 0.2)'
            }}
            className="px-5 py-2 rounded-full"
          >
            <span style={{ 
              color: activeTab === 'ml' 
                ? 'var(--background)' 
                : 'var(--foreground)' 
            }}>
              Machine Learning
            </span>
          </button>
          <button
            onClick={() => handleTabChange('data')}
            style={{
              transition: 'all 0.3s ease-out',
              transform: activeTab === 'data' ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: activeTab === 'data' 
                ? 'var(--foreground)' 
                : 'rgba(200, 200, 200, 0.2)'
            }}
            className="px-5 py-2 rounded-full"
          >
            <span style={{ 
              color: activeTab === 'data' 
                ? 'var(--background)' 
                : 'var(--foreground)' 
            }}>
              Data Engineering
            </span>
          </button>
          <button
            onClick={() => handleTabChange('development')}
            style={{
              transition: 'all 0.3s ease-out',
              transform: activeTab === 'development' ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: activeTab === 'development' 
                ? 'var(--foreground)' 
                : 'rgba(200, 200, 200, 0.2)'
            }}
            className="px-5 py-2 rounded-full"
          >
            <span style={{ 
              color: activeTab === 'development' 
                ? 'var(--background)' 
                : 'var(--foreground)' 
            }}>
              Development
            </span>
          </button>
        </div>

        {/* Services grid with filtering and animations */}
        <div 
          style={{
            transition: 'opacity 0.3s ease-out',
            opacity: isTabChanging ? 0 : 1
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services
            .filter(service => {
              if (activeTab === 'all') return true;
              if (activeTab === 'ml' && ['ml-solutions', 'llm-fine-tuning'].includes(service.id)) return true;
              if (activeTab === 'data' && ['data-engineering'].includes(service.id)) return true;
              if (activeTab === 'development' && ['api-development', 'cloud-deployment'].includes(service.id)) return true;
              return false;
            })
            .map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                isVisible={isVisible}
                delay={index * 100 + 300}
              />
            ))}
        </div>

        <div className={`text-center mt-16 scale-in ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '800ms' }}>
          <Link 
            href="/services" 
            style={{
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              transition: 'all 0.3s ease-out',
            }}
            className="inline-block font-medium py-3 px-8 rounded-full shadow-md"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;