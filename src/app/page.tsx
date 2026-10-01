import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Metodo } from '@/components/sections/Metodo';
import { Plans } from '@/components/sections/Plans';
import { Faq } from '@/components/sections/Faq';
import { Cta } from '@/components/sections/Cta';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Metodo />
      <Plans />
      <About />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
