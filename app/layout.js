import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: "carikost - Cari kost mudah, cepat, dan nyaman",
  description:
    "Temukan kost putra, putri, dan campur di berbagai kota. Ajukan survei langsung dari carikost.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={geist.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}