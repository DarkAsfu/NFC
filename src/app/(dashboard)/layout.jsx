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

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <h1>Sidebar</h1>
        {children}
        {/* <h1>Footer</h1> */}
      </body>
    </html>
  );
}
