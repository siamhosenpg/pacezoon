"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/layouts/navigation/Nav";
import Mobilenav from "@/components/layouts/navigation/Mobilenav";

export default function ShowNavigation() {
  const pathname = usePathname();

  // যেসব রুটে navbar দেখাবেন না:
  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null; // কিছুই দেখাবে না
  }

  return (
    <>
      <Nav />
      <Mobilenav />
      <div className="h-18 bg-background-secondary"></div>
    </>
  );
}
