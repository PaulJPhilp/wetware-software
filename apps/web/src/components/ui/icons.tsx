import dynamic from "next/dynamic";

// Create dynamic icon components to avoid HMR issues
export const PanelLeftIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.PanelLeft })),
  {
    ssr: false,
    loading: () => <div className="h-4 w-4" />,
  },
);

export const XIcon = dynamic(() => import("lucide-react").then((mod) => ({ default: mod.X })), {
  ssr: false,
  loading: () => <div className="h-4 w-4" />,
});

export const ChevronsLeftIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.ChevronsLeft })),
  {
    ssr: false,
    loading: () => <div className="h-4 w-4" />,
  },
);

export const ChevronsRightIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.ChevronsRight })),
  {
    ssr: false,
    loading: () => <div className="h-4 w-4" />,
  },
);
