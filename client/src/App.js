import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductionsSection from './components/ProductionsSection';
import AwardsSection from './components/AwardsSection';
import StorySection from './components/StorySection';
import SocialSection from './components/SocialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <ProductionsSection/>
      <AwardsSection/>
      <StorySection/>
      <SocialSection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}

export default App;
