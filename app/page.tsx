import Image from "next/image";
import HeroSection from "./components/HeroSection";
import SupplyChain from "./components/SupplyChain";
import PizzaLootByNo from "./components/PizzaLootByNo";
// import PizzalootStory from "./components/Story";

export default function Home() {
  return (
      <div>
          <HeroSection />
          <PizzaLootByNo/>
          <SupplyChain/>
    </div>
  );
}
