"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Leaf, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const trustPoints = [
  {
    icon: Leaf,
    label: "Nature-inspired experiences",
  },
  {
    icon: ShieldCheck,
    label: "Sensory-aware environment",
  },
  {
    icon: Users,
    label: "Support for the whole family",
  },
];

export default function LandingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--goearc-forest)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(140,175,145,0.38),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(11,141,196,0.14),transparent_42%)]" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[var(--goearc-sage)]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[var(--goearc-blue)]/10 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-7 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="GOEARC landing page"
            className="rounded-2xl bg-white p-3 shadow-xl"
          >
            <Image
              src="/images/logo/goearc-logo.png"
              alt="Garden of Eden Autism Retreat Center"
              width={220}
              height={100}
              priority
              className="h-auto w-[145px] sm:w-[180px]"
            />
          </Link>

          <Link
            href="/register"
            className="hidden rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[var(--goearc-forest)] sm:inline-flex"
          >
            Register Your Interest
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.26em] text-[#cce6d2]">
              Welcome to GOEARC
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
              A sanctuary where your
              <span className="block text-[#cce6d2]">
                whole family can breathe.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
              Step into a calm, judgment-free retreat experience created for
              neurodivergent individuals and the people who care for them.
              Discover nature, equine connection, sensory-aware activities,
              and restorative support designed around your family&apos;s pace.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/retreats"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[var(--goearc-forest)] shadow-xl transition hover:-translate-y-0.5 hover:bg-[var(--goearc-mist)]"
              >
                Explore Upcoming Retreats
                <ArrowRight size={19} aria-hidden="true" />
              </Link>

              <Link
                href="/prepare"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[var(--goearc-forest)]"
              >
                Prepare for Your Visit
                <Download size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Icon size={17} aria-hidden="true" />
                    </span>

                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.95,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.18),transparent_50%)]" />

              <div className="absolute inset-x-8 top-9 rounded-[2rem] bg-white/10 p-7 backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#cce6d2]">
                  Hero photograph reserved
                </p>

                <p className="mt-4 text-2xl font-medium leading-9">
                  This space will feature an approved image of a family
                  connecting with nature or a therapy horse.
                </p>
              </div>

              <div className="absolute bottom-8 left-8 right-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 text-[var(--goearc-text)] shadow-lg">
                  <p className="text-sm font-semibold text-[var(--goearc-primary)]">
                    For individuals
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[var(--goearc-muted)]">
                    Sensory-aware, low-demand and nature-inspired experiences.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 text-[var(--goearc-text)] shadow-lg">
                  <p className="text-sm font-semibold text-[var(--goearc-primary)]">
                    For caregivers
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[var(--goearc-muted)]">
                    Space to rest, reconnect and feel supported without judgment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="pb-3 text-center text-xs uppercase tracking-[0.25em] text-white/45">
          Scroll to discover the GOEARC experience
        </p>
      </div>
    </section>
  );
}