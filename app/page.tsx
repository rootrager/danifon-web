import MobileHome from "./components/MobileHome";
import Calculators from "./components/Calculators";

export default function Home() {
  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      <MobileHome />
      <section id="calculators" className="max-w-md mx-auto px-4 pb-32">
        <Calculators />
      </section>
    </div>
  );
}
