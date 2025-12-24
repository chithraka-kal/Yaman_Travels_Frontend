import "./globals.css";

// Note: If 'components' is at the root, '../components' is correct.
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Yaman Travels",
  description: "Explore the beauty of Sri Lanka",
};

export default function RootLayout({children,}: {children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}