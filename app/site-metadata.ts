import type { Metadata } from "next";
import { profile } from "./content";

export function sectionMetadata(
  section: string,
  description: string,
): Metadata {
  const title = section + " | " + profile.name;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1536,
          height: 1024,
          alt: "Durgesh — Academic website",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
