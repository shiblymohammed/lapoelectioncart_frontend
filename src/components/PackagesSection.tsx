"use client";

import { useEffect, useState } from "react";

import { Heading } from "@/components/Heading";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { SlideIn } from "@/components/SlideIn";
import clsx from "clsx";
import { Scribble } from "@/components/Scribble";
import productService from "@/services/productService";
import { Package } from "@/types/product";
import Link from "next/link";
import ReactCurvedText from "react-curved-text";

const PACKAGE_COLORS = ["#46ACFA", "#FF7A51", "#B8FC39"];

// Each package gets its own unique pair of colors for words
const PACKAGE_WORD_COLORS = [
  ["#46ACFA", "#FF7A51"], // Package 1: Blue & Orange
  ["#B8FC39", "#FF7A51"], // Package 2: Green & Orange
  ["#46ACFA", "#B8FC39"], // Package 3: Blue & Green
];

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

function PackageCard({
  pkg,
  color,
  wordColors,
}: {
  pkg: Package;
  color: string;
  wordColors: string[];
}) {
  const words = pkg.name.toUpperCase().split(" ");

  return (
    <Link href={`/package/${pkg.id}`}>
      <div className="group relative mx-auto w-full max-w-[900px] px-6 md:px-12 pt-8 cursor-pointer">
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
        <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

        <div className="-mb-1 relative overflow-hidden py-40 min-h-[550px]">
          <Scribble className="absolute inset-0 h-full w-full" color={color} />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            {/* Spacer to maintain layout */}
            <div className="mb-2 h-16"></div>

            {/* Package Name with Curved Effect and Thick Shadow */}
            <div className="relative w-full flex flex-col items-center justify-center overflow-visible">
              {/* First Word - Curved Downward (Top) */}
              {words[0] && (
                <div
                  className="relative overflow-visible flex justify-center"
                  style={{
                    filter: `
                      drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.8))
                      drop-shadow(8px 8px 0px rgba(0, 0, 0, 0.6))
                      drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.4))
                    `,
                    marginBottom: "-40px",
                  }}
                >
                  <ReactCurvedText
                    width={600}
                    height={100}
                    cx={300}
                    cy={20}
                    rx={200}
                    ry={200}
                    startOffset={180}
                    reversed={true}
                    text={words[0]}
                    textProps={{
                      style: {
                        fontSize: 72,
                        fontFamily: "var(--font-laughter)",
                        fill: wordColors[0],
                      },
                    }}
                  />
                </div>
              )}

              {/* Second Word - Also Curved Downward (Bottom) */}
              {words[1] && (
                <div
                  className="relative overflow-visible flex justify-center"
                  style={{
                    filter: `
                      drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.8))
                      drop-shadow(8px 8px 0px rgba(0, 0, 0, 0.6))
                      drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.4))
                    `,
                  }}
                >
                  <ReactCurvedText
                    width={600}
                    height={100}
                    cx={300}
                    cy={20}
                    rx={200}
                    ry={200}
                    startOffset={180}
                    reversed={true}
                    text={words[1]}
                    textProps={{
                      style: {
                        fontSize: 72,
                        fontFamily: "var(--font-laughter)",
                        fill: wordColors[1],
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

        <div className="my-6 h-16"></div>
      </div>
    </Link>
  );
}

export function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchPackages = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching packages from API...");
        const data = await productService.getPackages();
        console.log("✅ Packages received:", data);
        setPackages(data.slice(0, 3));
      } catch (error) {
        console.error("❌ Error fetching packages:", error);
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="bg-texture bg-brand-gray min-h-[70vh] px-4 ~py-10/16">
        <div className="mx-auto w-full max-w-[1400px]">
          <SlideIn>
            <Heading className="text-center ~mb-4/6" as="h2">
              POPULAR PACKAGES
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="text-center ~mb-6/10">
              <p>Turn Every Click, Call, and Print Into a Winning Smile</p>
            </div>
          </SlideIn>
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Loading packages...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-texture bg-brand-gray min-h-[70vh] px-4 ~py-10/16">
      <div className="mx-auto w-full max-w-[1400px]">
        <SlideIn>
          <Heading className="text-center ~mb-4/6" as="h2">
            POPULAR PACKAGES
          </Heading>
        </SlideIn>
        <SlideIn>
          <div className="text-center ~mb-6/10">
            <p>Turn Every Click, Call, and Print Into a Winning Smile</p>
          </div>
        </SlideIn>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-600">Loading packages...</div>
          </div>
        ) : (
          <>
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3 pt-8">
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  color={PACKAGE_COLORS[index % PACKAGE_COLORS.length]}
                  wordColors={
                    PACKAGE_WORD_COLORS[index % PACKAGE_WORD_COLORS.length]
                  }
                />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link
                href="/packages"
                className="button-cutout group inline-flex items-center bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black hover:text-black gap-3 px-8 py-3 text-lg"
              >
                View All Packages
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
