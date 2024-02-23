import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import StepByStepGuide from "@/components/StepBySteGuide";
import FeaturesSection from "@/components/FeaturesSection";
import FeedbackSlider from "@/components/FeedbackSlider";
import { FaWhatsapp } from 'react-icons/fa';

export default function Home() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/5v1b2v', '_blank');
  };
  return (
    <>
      <Hero />
      <StepByStepGuide />
      <ProductShowcase />
      <FeaturesSection />
      <FeedbackSlider />
      <div className="fixed bottom-3 lg:bottom-4 right-4">
        <button onClick={handleWhatsAppClick} className=" bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
          <FaWhatsapp size={24} />
        </button>
      </div>
    </>
  );
}
