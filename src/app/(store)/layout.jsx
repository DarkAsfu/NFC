import { Poppins } from "next/font/google";
import "../globals.css";
import { Navbar } from "../modules/NavBar";
import { Footer } from "../modules/Footer";

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
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
