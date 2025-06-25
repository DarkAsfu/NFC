import { Poppins } from "next/font/google";
import "../globals.css";
import { Navbar } from "../modules/store/NavBar";
import { Footer } from "../modules/store/Footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "NFC",
  description: "Digital Card",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased `}
        suppressHydrationWarning
      >
        <ScrollProgress className="top-[65px]"  />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
