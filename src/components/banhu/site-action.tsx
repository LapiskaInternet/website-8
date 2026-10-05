"use client";

import type { MouseEvent, ReactNode } from "react";

import {
  goToSection,
  useSiteStore,
  type SiteView,
} from "@/lib/site-store";

type SiteActionProps = {
  kind: "view" | "packages" | "anchor";
  /** target view when kind="view" */
  view?: SiteView;
  /** target section hash when kind="anchor" */
  href?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/**
 * Client-side navigation trigger that also works inside server components.
 *
 * - kind="view"     → switches the dedicated page view (tours / travel-agency)
 * - kind="packages" → opens the Travel Agency packages pop-out modal
 * - kind="anchor"   → scrolls to a home section (switching home first if needed)
 */
export function SiteAction({
  kind,
  view,
  href = "#home",
  className,
  children,
  "aria-label": ariaLabel,
}: SiteActionProps) {
  const resolvedHref =
    kind === "anchor" ? href : kind === "view" ? `#${view ?? "home"}` : "#packages";

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (kind === "view" && view) {
      useSiteStore.getState().setView(view);
    } else if (kind === "packages") {
      useSiteStore.getState().openPackages();
    } else if (kind === "anchor") {
      goToSection(href);
    }
  };

  return (
    <a
      href={resolvedHref}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
