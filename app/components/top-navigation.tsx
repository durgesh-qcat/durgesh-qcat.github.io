"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "../content";

const navigation = [
  { href: "/", label: "About" },
  { href: "/publications/", label: "Publications" },
  { href: "/talks/", label: "Talks" },
  { href: "/outreach-teaching/", label: "Outreach & teaching" },
  { href: "/math-ai/", label: "Math–AI" },
];

export function TopNavigation() {
  const pathname = usePathname();
  const current = pathname === "/" ? "/" : pathname.replace(/\/$/, "") + "/";
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link
          className={current === "/" ? "site-name site-name-home" : "site-name"}
          href="/"
          aria-label={profile.name + " — About"}
        >
          {profile.firstName}
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={current === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
