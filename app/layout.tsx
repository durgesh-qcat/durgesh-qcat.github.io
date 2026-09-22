import type { Metadata } from "next";
import { profile } from "./content";
import { TopNavigation } from "./components/top-navigation";
import "@fontsource/libre-baskerville/latin-400.css";
import "@fontsource/libre-baskerville/latin-700.css";
import "@fontsource/libre-baskerville/latin-400-italic.css";
import "./globals.css";

const title = "Durgesh Kumar — Category theory & quantum foundations";
const description =
  "Durgesh Kumar studies category theory and quantum foundations and is thinking about AI safety and the implications of rapid AI progress.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <TopNavigation />
        <main id="main" className="site-content">
          {children}
        </main>
        <footer className="site-footer">
          <p>
            {profile.name} · <a href={profile.github}>GitHub</a>
          </p>
          <p><a href={profile.cvUrl}>Curriculum vitae</a> · <a href={"mailto:" + profile.email}>Email</a></p>
        </footer>
      </body>
    </html>
  );
}
