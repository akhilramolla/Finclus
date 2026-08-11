import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"Finclus — Intelligence Fabric", description:"Presenter-driven synthetic banking intelligence demo" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
