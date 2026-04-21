import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// import { Poppins, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Gama | Freight Forwarding Software & Logistics Automation Platform",
  description:
    "Gama is a modern white-label freight forwarding software for forwarders and NVOCCs. Empower customers to search rates, get quotes, book shipments, track cargo in real time, manage documents, pay invoices, and gain actionable insights—all in one branded logistics platform.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}