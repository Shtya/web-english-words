import Navbar from "@/components/Navbar";
import "./globals.css";
import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar />
        {children}
        </body>
    </html>
  );
}
