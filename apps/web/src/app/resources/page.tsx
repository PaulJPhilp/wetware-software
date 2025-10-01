import { HardHat } from "lucide-react";

export default function ResourcesPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-12 flex flex-col items-center justify-center text-center min-h-[50vh]">
      <div className="space-y-4">
        <HardHat className="w-16 h-16 text-orange mx-auto" />
        <h1 className="text-3xl font-sans font-bold text-charcoal dark:text-white leading-tight">
          Under Construction
        </h1>
        <p className="text-charcoal/80 dark:text-gray-300">
          I'm currently curating a collection of valuable resources. Please check back soon!
        </p>
      </div>
    </main>
  );
}
