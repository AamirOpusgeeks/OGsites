import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development | Opusgeeks',
  description: 'Scalable cloud systems, responsive web applications, and micro-frontend architectures.',
};

export default function WebDevelopmentPage() {
  return (
    <ServicePageTemplate
      badge="Full-Stack Web"
      title1="Scalable"
      title2="Web Development"
      description="We architect modern, resilient web platforms and cloud applications leveraging Next.js, micro-frontend hierarchies, and edge compute for enterprise throughput and fluid interactive user journeys."
      capabilities={[
        {
          title: 'Modern Next.js & Server Components',
          desc: 'High-speed streaming SSR, optimized Core Web Vitals, dynamic routing architectures, and fine-grained server-side caching.',
        },
        {
          title: 'Micro-Frontend Architectures',
          desc: 'Independently deployable module federations that empower multi-team engineering velocities without sacrificing global coherence.',
        },
        {
          title: 'High-Throughput Cloud APIs',
          desc: 'Scalable GraphQL & REST microservices, zero-downtime edge pipelines, and global multi-region CDN caching for sub-20ms latency.',
        },
      ]}
      stack={['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS']}
    />
  );
}
