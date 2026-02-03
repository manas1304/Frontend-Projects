import {Inter} from 'next/font/google'
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";


const montserrat = Montserrat({ subsets: ["latin"] });

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'] 
});

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });



export const metadata = {
  title: "CRM Pro | Support Management",
  description: "Advanced Ticketing and User Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
