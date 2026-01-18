import { Saira } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ShopHub - Your One-Stop Product Catalog",
  description: "Browse our amazing collection of quality products. Find the perfect items for your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <body
              className={`${saira.variable} font-sans antialiased min-h-screen flex flex-col bg-white text-gray-900`}
            >
              <ScrollToTop />
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster position="top-right" />
            </body>
    </html>
  );
}
