"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getLocationBySlug } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { loadSelection, selectionChangeEvent, dispatchSelectionChange } from "@/utils/userPreferences";

interface BrandBadgeProps {
  className?: string;
  hideOnSmallScreens?: boolean;
}

interface BannerState {
  site?: string;
  siteSlug?: string;
  logoUrl?: string | null;
  logoAlt?: string;
}

export function BrandBadge({ className, hideOnSmallScreens = false }: BrandBadgeProps) {
  const pathname = usePathname();
  const [banner, setBanner] = useState<BannerState>({});

  // Hide on Studio routes
  if (pathname?.startsWith('/studio')) return null;

  const readSelection = useCallback(() => {
    const selection = loadSelection();
    const storedSite = typeof window !== "undefined" ? sessionStorage.getItem("ggo-site") : "";
    const storedSlug = typeof window !== "undefined" ? sessionStorage.getItem("ggo-site-slug") : "";

    return {
      site: storedSite || selection.site || undefined,
      siteSlug: storedSlug || selection.siteSlug || undefined,
    };
  }, []);

  useEffect(() => {
    const updateSelection = () => {
      const next = readSelection();
      setBanner((prev) => ({
        ...prev,
        ...next,
        logoUrl: next.siteSlug === prev.siteSlug ? prev.logoUrl : undefined,
        logoAlt: next.siteSlug === prev.siteSlug ? prev.logoAlt : undefined,
      }));
    };

    updateSelection();

    window.addEventListener(selectionChangeEvent, updateSelection);
    window.addEventListener("storage", updateSelection);

    return () => {
      window.removeEventListener(selectionChangeEvent, updateSelection);
      window.removeEventListener("storage", updateSelection);
    };
  }, [readSelection]);

  useEffect(() => {
    if (!banner.siteSlug) {
      return;
    }

    let isMounted = true;
    getLocationBySlug(banner.siteSlug)
      .then((loc) => {
        if (!loc || !isMounted) return;
        if (loc.logo) {
          const url = urlForImage(loc.logo).width(96).height(96).fit("max").url();
          setBanner((prev) => ({
            ...prev,
            site: loc.name,
            logoUrl: url,
            logoAlt: loc.logo?.alt || `${loc.name} logo`,
          }));
        } else {
          setBanner((prev) => ({
            ...prev,
            site: loc.name,
            logoUrl: null,
            logoAlt: undefined,
          }));
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setBanner((prev) => ({ ...prev, logoUrl: null }));
      });

    return () => {
      isMounted = false;
    };
  }, [banner.siteSlug]);

  const hasLogoBlock = Boolean(banner.site);

  return (
    <div
      className={cn(
        "w-fit",
        className
      )}
      aria-label="GGOMED brand badge"
    >
      <Link
        href="/"
        className="inline-flex flex-col gap-2 rounded-3xl border border-ggo-soft-blue bg-white/95 px-4 py-3 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/compass-logo.png"
            alt="GGOMED"
            width={56}
            height={56}
            priority
            className="rounded select-none"
          />
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-ggo-black">
              GGOMED
            </span>
            <span className="text-[11px] text-ggo-text-muted">
              Compass
            </span>
          </div>
        </div>

        <AnimatePresence>
          {hasLogoBlock && (
            <motion.div
              className="flex items-center justify-center border-t border-ggo-soft-blue pt-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ggo-soft-blue flex-shrink-0">
                {banner.logoUrl ? (
                  <Image
                    src={banner.logoUrl}
                    alt={banner.logoAlt || banner.site || "Hospital logo"}
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                  />
                ) : banner.site ? (
                  <span className="text-[11px] font-semibold text-ggo-charcoal text-center px-2">
                    {banner.site}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-ggo-charcoal">
                    --
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}
