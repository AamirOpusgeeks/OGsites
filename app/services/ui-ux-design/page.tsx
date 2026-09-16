import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI/UX Design | Opusgeeks',
  description: 'Design systems, interactive prototypes, and high-conversion enterprise interfaces.',
};

export default function UIUXDesignPage() {
  return (
    <ServicePageTemplate
      badge="Design & 3D Interactive"
      title1="Human-Centered"
      title2="UI/UX Design"
      description="We craft intuitive digital interfaces, unified multi-platform design systems, and immersive WebGL storytelling that transform complex technical architectures into compelling brand narratives."
      capabilities={[
        {
          title: 'Design Systems & Component Kits',
          desc: 'Comprehensive Figma token libraries, accessible cross-platform patterns, and pixel-precise design-to-code design sync.',
        },
        {
          title: 'Interactive 3D & WebGL Experiences',
          desc: 'Three.js and WebGL motion choreography, tactile physics, real-time shaders, and cinematic micro-animations for high-conversion landing pages.',
        },
        {
          title: 'Rapid Prototyping & Usability Testing',
          desc: 'Interactive high-fidelity prototypes, user research telemetry, and iterative validation loops designed to de-risk feature roadmaps.',
        },
      ]}
      stack={['Figma', 'Three.js / WebGL', 'GSAP', 'Lenis', 'Tailwind CSS', 'Framer Motion', 'Spline', 'Storybook']}
    />
  );
}
