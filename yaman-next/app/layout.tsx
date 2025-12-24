import "./globals.css";

// Note: If 'components' is at the root, '../components' is correct.
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

export const metadata = {
  title: "Yaman Travels",
  description: "Explore the beauty of Sri Lanka",
};

export default function RootLayout({children,}: {children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}