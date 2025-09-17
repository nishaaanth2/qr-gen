import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import GradientWrapper from '@/components/GradientWrapper';

export default function HomePage() {
  return (
    <>
      <Hero />
      <GradientWrapper>
        <Features />
      </GradientWrapper>
      <Testimonials />
      <CTA />
    </>
  );
}
