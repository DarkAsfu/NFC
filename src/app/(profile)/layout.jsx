import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "NFC",
  description: "Digital Card",
};

export default function ProfileLayout({ children }) {
  return (
    <div className={`${poppins.className} antialiased bg-bG min-h-screen`}>
      {children}
    </div>
  );
}
