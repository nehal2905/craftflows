import ScrollProgress from './components/ScrollProgress.jsx';
import TopBar from './components/TopBar.jsx';
import Hero from './components/Hero.jsx';
import Trust from './components/Trust.jsx';
import Problem from './components/Problem.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import RoiCalculator from './components/RoiCalculator.jsx';
import Testimonials from './components/Testimonials.jsx';
import Offer from './components/Offer.jsx';
import Faq from './components/Faq.jsx';
import LeadMagnet from './components/LeadMagnet.jsx';
import Book from './components/Book.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <ScrollProgress />
      <TopBar />

      <main id="top">
        <Hero />
        <Trust />
        <Problem />
        <HowItWorks />
        <RoiCalculator />
        <Testimonials />
        <Offer />
        <Faq />
        <LeadMagnet />
        <Book />
      </main>

      <Footer />
    </>
  );
}
