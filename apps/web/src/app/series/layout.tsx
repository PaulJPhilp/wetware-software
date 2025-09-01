import type { ReactNode } from "react";

export default function SeriesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children as ReactNode;
}
