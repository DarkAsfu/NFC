import "../globals.css";

export const metadata = {
  title: "NFC",
  description: "Digital Card",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="antialiased bg-bG min-h-screen">
      {children}
    </div>
  );
}
