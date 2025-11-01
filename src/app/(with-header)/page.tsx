import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { HeroSection } from "@/components/HeroSection";
import { PackagesSection } from "@/components/PackagesSection";
import { CampaignsSection } from "@/components/CampaignsSection";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  // Filter out deleted slices (hero, product_grid, text_and_image, team_grid)
  const filteredSlices = page.data.slices.filter(
    (slice) =>
      slice.slice_type !== "hero" &&
      slice.slice_type !== "product_grid" &&
      slice.slice_type !== "text_and_image" &&
      slice.slice_type !== "team_grid"
  );

  return (
    <>
      <HeroSection />
      <PackagesSection />
      <CampaignsSection />
      <SliceZone slices={filteredSlices} components={components} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
