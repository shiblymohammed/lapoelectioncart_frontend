import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";

export default function PackagesPage() {
  return (
    <Bounded className="bg-texture bg-brand-gray min-h-screen">
      <div className="flex flex-col items-center justify-center py-20">
        <Heading className="text-center mb-6" as="h1">
          All Packages
        </Heading>
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-6">
              <svg
                className="w-24 h-24 text-brand-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re working hard to bring you an amazing packages experience.
            Stay tuned!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/" color="purple" size="lg">
              Back to Home
            </ButtonLink>
            <a
              href="mailto:contact@example.com"
              className="inline-block px-6 py-3 bg-white text-brand-purple border-2 border-brand-purple rounded-md hover:bg-brand-purple hover:text-white transition-all font-medium"
            >
              Get Notified
            </a>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
