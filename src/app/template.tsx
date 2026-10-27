import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";

// Templates remount on every navigation, so each page gets its own enter/exit transition.
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
