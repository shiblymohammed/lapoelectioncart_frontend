import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";

export default function PackageDetailPage() {
  return (
    <Bounded className="bg-texture bg-brand-gray min-h-screen">
      <div className="flex flex-col items-center justify-center py-20">
        <Heading className="text-center mb-6" as="h1">
          Package Details
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re working on bringing you detailed package information.
            Stay tuned!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/" color="purple" size="lg">
              Back to Home
            </ButtonLink>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
