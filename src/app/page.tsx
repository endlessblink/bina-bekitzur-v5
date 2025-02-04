import { Hero } from './components/home/Hero';
import FeaturedModels from './components/home/FeaturedModels';
import { LatestContent } from './components/home/LatestContent';
import { FeaturedVideos } from './components/home/FeaturedVideos';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedModels />
      <LatestContent />
      <FeaturedVideos />
    </main>
  );
}
