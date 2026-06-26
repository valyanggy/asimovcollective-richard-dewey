import type { Metadata } from "next";

import { HomePage } from "@/components/sections/home-page";
import { generatePageMetadata } from "@/lib/metadata";

export const generateMetadata = (): Metadata => generatePageMetadata();

export default function Page() {
  return <HomePage />;
}
