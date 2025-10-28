import { HardHat } from "lucide-react";

export default function ResourcesPage() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center space-y-12 px-4 py-12 text-center">
      <div className="space-y-4">
        <HardHat className="mx-auto h-16 w-16 text-orange" />
        <h1 className="font-bold font-sans text-3xl text-charcoal leading-tight dark:text-white">
          Under Construction
        </h1>
        <p className="text-charcoal/80 dark:text-gray-300">
          I'm currently curating a collection of valuable resources. Please check back soon!
        </p>
      </div>
    </main>
  );
}
