// app/page.tsx
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Services />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
    </main>
  );
}