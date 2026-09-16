import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App Development | Opusgeeks',
  description: 'Native & cross-platform mobile engineering with React Native, iOS, and Android.',
};

export default function AppDevelopmentPage() {
  return (
    <ServicePageTemplate
      badge="Mobile Engineering"
      title1="Next-Gen"
      title2="App Development"
      description="We engineer high-performance mobile applications with raw native execution, bulletproof offline-first state architecture, and sub-second render pipelines tailored to scale across millions of devices."
      capabilities={[
        {
          title: 'Cross-Platform React Native',
          desc: 'Unified codebases with 60fps native thread performance, customized JSI modules, and shared business logic between iOS and Android.',
        },
        {
          title: 'Native Swift & Kotlin Engines',
          desc: 'Deep hardware integrations, background task handling, custom metal shaders, and platform-specific audio/sensor pipelines.',
        },
        {
          title: 'Sub-Second State & Sync',
          desc: 'Resilient offline-first persistence, real-time WebSocket syncing, and end-to-end encrypted telemetry built for high-concurrency apps.',
        },
      ]}
      stack={['React Native', 'Swift', 'Kotlin', 'TypeScript', 'Expo', 'Redux / Zustand', 'WebSockets', 'CoreAnimation']}
    />
  );
}
