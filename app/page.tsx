import { site, cloud, heroImages, sections, travel } from '../lib/data';
import LightboxProvider from '../components/Lightbox';
import Effects from '../components/Effects';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Showcase from '../components/Showcase';
import Travel from '../components/Travel';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <LightboxProvider>
      <Effects />
      <Nav brand={site.brand} name={site.name} links={site.nav} />
      <Hero name={site.name} tagline={site.tagline} cloud={cloud} pics={heroImages} />
      <Marquee words={site.marquee} />
      {sections.map((s) => <Showcase key={s.id} {...s} />)}
      <Travel {...travel} />
      <About about={site.about} socials={site.socials} />
      <Footer name={site.name} email={site.email} contact={site.contact} />
    </LightboxProvider>
  );
}
