"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { label: "Home", href: "/home" },
  { label: "Our Retreats", href: "/retreats" },
  { label: "Therapies & Amenities", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faq" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--goearc-border)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link
          href="/home"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="GOEARC home"
        >
          <Image
            src="/images/logo/goearc-logo.png"
            alt="Garden of Eden Autism Retreat Center"
            width={210}
            height={96}
            priority
            className="h-auto w-[145px] sm:w-[175px] lg:w-[195px]"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 xl:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--goearc-text)] transition-colors hover:text-[var(--goearc-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/support"
            className="rounded-full border border-[var(--goearc-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--goearc-primary)] transition hover:bg-[var(--goearc-sky)]"
          >
            Donate
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[var(--goearc-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--goearc-primary-dark)]"
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--goearc-border)] text-[var(--goearc-navy)] transition hover:bg-[var(--goearc-sky)] xl:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={22} />
          ) : (
            <Menu aria-hidden="true" size={22} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--goearc-border)] bg-white px-5 py-5 xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-medium text-[var(--goearc-text)] transition hover:bg-[var(--goearc-sky)] hover:text-[var(--goearc-primary)]"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--goearc-border)] pt-5">
              <Link
                href="/support"
                onClick={closeMenu}
                className="rounded-full border border-[var(--goearc-primary)] px-4 py-3 text-center text-sm font-semibold text-[var(--goearc-primary)]"
              >
                Donate
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="rounded-full bg-[var(--goearc-primary)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}