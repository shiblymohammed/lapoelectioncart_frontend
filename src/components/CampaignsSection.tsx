"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";
import { CampaignParallaxImage } from "@/components/CampaignParallaxImage";
import productService from "@/services/productService";
import { Campaign } from "@/types/product";

// Theme colors for campaigns
const CAMPAIGN_THEMES = ["Blue", "Orange", "Navy", "Lime"] as const;

// Campaign image mapping
const getCampaignImage = (campaignName: string): string | undefined => {
  const nameLower = campaignName.toLowerCase();
  if (nameLower.includes("helicopter")) {
    return "/helicopter.webp";
  }
  if (nameLower.includes("wellness") || nameLower.includes("health")) {
    return "/healthatm.webp";
  }
  if (nameLower.includes("vr") || nameLower.includes("virtual reality")) {
    return "/vr.webp";
  }
  // Add more campaign image mappings here
  return undefined;
};

interface CampaignWithTheme extends Campaign {
  theme: (typeof CAMPAIGN_THEMES)[number];
  imagePosition: "left" | "right";
  foregroundImage?: string;
}

interface CampaignCardProps {
  campaign: CampaignWithTheme;
  index: number;
  isIntro?: boolean;
}

function CampaignCard({ campaign, index, isIntro = false }: CampaignCardProps) {
  const { theme, name, description, imagePosition } = campaign;

  // First slide with title (Blue)
  if (isIntro) {
    return (
      <Bounded
        className={clsx(
          "sticky top-[calc(var(--index)*2rem)]",
          theme === "Blue" && "bg-texture bg-brand-blue text-white"
        )}
        style={{ "--index": index } as React.CSSProperties}
      >
        <div className="text-center">
          <SlideIn>
            <Heading className="~mb-4/6" as="h2">
              POPULAR CAMPAIGNS
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="~mb-6/10">
              <p className="text-lg">
                Amplify your message with our proven campaign strategies
              </p>
            </div>
          </SlideIn>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white",
        theme === "Lime" && "bg-texture bg-brand-lime"
      )}
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            imagePosition === "left" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size="lg" as="h2">
              {name}
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className="max-w-md text-lg leading-relaxed">
              <p>{description}</p>
            </div>
          </SlideIn>
          <SlideIn>
            <ButtonLink
              href={`/campaign/${campaign.id}`}
              color={theme === "Lime" ? "orange" : "lime"}
            >
              Learn More
            </ButtonLink>
          </SlideIn>
        </div>

        <CampaignParallaxImage
          foregroundImage={campaign.foregroundImage}
          campaignName={name}
        />
      </div>
    </Bounded>
  );
}

export function CampaignsSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching campaigns from API...");
        const data = await productService.getCampaigns();
        console.log("✅ Campaigns received:", data);
        setCampaigns(data);
      } catch (error) {
        console.error("❌ Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  // Add theme and imagePosition to campaigns
  const campaignsWithTheme: CampaignWithTheme[] = campaigns
    .filter((c) => c.is_active)
    .slice(0, 3)
    .map((campaign, index) => ({
      ...campaign,
      theme: CAMPAIGN_THEMES[(index + 1) % CAMPAIGN_THEMES.length],
      imagePosition: index % 2 === 0 ? "left" : "right",
      foregroundImage: getCampaignImage(campaign.name),
    }));

  // Create intro slide
  const introSlide: CampaignWithTheme = {
    id: 0,
    name: "POPULAR CAMPAIGNS",
    description: "Amplify your message with our proven campaign strategies",
    price: 0,
    unit: "",
    is_active: true,
    created_at: "",
    theme: "Blue",
    imagePosition: "right",
  };

  return (
    <div>
      {/* Intro slide */}
      <CampaignCard campaign={introSlide} index={0} isIntro={true} />

      {/* Campaign Cards from API */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-brand-gray">
          <p className="text-lg">Loading campaigns...</p>
        </div>
      ) : campaignsWithTheme.length > 0 ? (
        campaignsWithTheme.map((campaign, index) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            index={index + 1}
          />
        ))
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-brand-gray">
          <p className="text-lg">No campaigns available at the moment.</p>
        </div>
      )}
    </div>
  );
}
