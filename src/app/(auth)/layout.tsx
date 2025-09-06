import type { Metadata } from "next";
import { Epilogue, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const epilogue = Epilogue({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session != null) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={`${epilogue.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
