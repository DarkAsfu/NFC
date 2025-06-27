import { Navbar } from "../modules/store/NavBar";
import { Footer } from "../modules/store/Footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export const metadata = {
  title: "NFC Store",
  description: "Digital Card Store",
};

export default function StoreLayout({ children }) {
  return (
    <>
      <ScrollProgress className="top-[65px]" />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}