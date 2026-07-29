import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Fence,
  HeartHandshake,
  Leaf,
  LockKeyhole,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
} from "lucide-react";
import Link from "next/link";

import { GOButtonLink } from "@/components/shared/GOButton";
import GOContainer from "@/components/shared/GOContainer";
import GOHeading from "@/components/shared/GOHeading";
import GOSection from "@/components/shared/GOSection";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { testimonials } from "@/content/testimonials";

const experiences = [
  {
    icon: Sun,
    title: "Immersive Day Retreats",
    description:
      "A low-demand day designed around nature, sensory-aware activities, rest, and meaningful family connection.",
    note: "Program details and availability will be confirmed.",
  },
  {
    icon: MoonStar,
    title: "Overnight Sanctuary Stays",
    description:
      "A future multi-day experience designed to help families decompress away from everyday pressures.",
    note: "Accommodation details will be added after operational confirmation.",
  },
];

const pillars = [
  {
    icon: HeartHandshake,
    title: "Equine Connection",
    description:
      "Gentle, structured interaction with horses designed to encourage trust, confidence, connection, and emotional regulation.",
  },
  {
    icon: Trees,
    title: "Nature and Forest Bathing",
    description:
      "Calming, low-demand outdoor experiences that help families slow down and reconnect with the natural environment.",
  },
  {
    icon: Leaf,
    title: "Sensory-Aware Mindfulness",
    description:
      "Quiet spaces and calming practices adapted to different sensory preferences and individual comfort levels.",
  },
  {
    icon: Sparkles,
    title: "Whole-Family Wellness",
    description:
      "Optional restorative and holistic experiences designed to support caregivers and strengthen family connection.",
  },
];

const safetyItems = [
  {
    icon: Fence,
    title: "Secure outdoor spaces",
    description:
      "Reserved for confirmed information about fencing, gates, and physical boundaries.",
  },
  {
    icon: LockKeyhole,
    title: "Thoughtful accommodation safety",
    description:
      "Reserved for confirmed information about cabin locks, windows, and overnight safeguards.",
  },
  {
    icon: ShieldCheck,
    title: "Low-stimulus regulation areas",
    description:
      "Quiet spaces and predictable environments help visitors pause and regulate when needed.",
  },
  {
    icon: Check,
    title: "Clear visual boundaries",
    description:
      "Structured signs and visual cues help make unfamiliar environments easier to understand.",
  },
];

const faqPreview = [
  {
    question: "Is GOEARC suitable for different ages?",
    answer:
      "GOEARC intends to support individuals and families across different ages and developmental stages. Final program eligibility will be confirmed for each retreat.",
  },
  {
    question: "How do you support sensory needs?",
    answer:
      "Experiences are designed around lower-demand pacing, preparation, quiet spaces, predictable routines, and individualized communication.",
  },
  {
    question: "What happens before our first visit?",
    answer:
      "Families receive clear preparation information and can discuss individual needs with the GOEARC team before attending.",
  },
];

export default function LandingSections() {
  const featuredTestimonial =
    testimonials.find((testimonial) => testimonial.featured) ??
    testimonials[0];

  return (
    <>
      <GOSection>
        <GOContainer>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <GOHeading
                eyebrow="We Understand"
                title="Travel can be hard. We designed something different."
                description="Crowds, unfamiliar environments, rigid schedules, and sensory overload can make traditional family trips feel exhausting. GOEARC is being designed to reduce those barriers through predictable pacing, quiet spaces, nature, and compassionate support."
              />

              <div className="mt-8">
                <GOButtonLink href="/home" variant="outline">
                  Discover GOEARC
                  <ArrowRight size={18} aria-hidden="true" />
                </GOButtonLink>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[var(--goearc-mist)] p-8 shadow-[0_18px_50px_rgb(32_88_61_/_0.10)] sm:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--goearc-sage)]/30 blur-3xl" />

              <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-[var(--goearc-primary)]">
                A place without judgment
              </p>

              <blockquote className="relative mt-5 text-3xl font-semibold leading-tight text-[var(--goearc-forest)]">
                “Your family does not need to mask, change, or apologize here.”
              </blockquote>

              <p className="relative mt-6 leading-8 text-[var(--goearc-muted)]">
                The retreat experience is intended to meet families with
                compassion, flexibility, dignity, and a genuine understanding
                of different sensory and emotional needs.
              </p>
            </div>
          </div>
        </GOContainer>
      </GOSection>

      <GOSection tone="sky">
        <GOContainer>
          <GOHeading
            align="center"
            eyebrow="Choose Your Experience"
            title="Flexible options designed around your family’s rhythm"
            description="The interface is ready for both day and overnight retreat options. Final schedules, availability, and operational details can be added as soon as they are approved."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {experiences.map((experience) => {
              const Icon = experience.icon;

              return (
                <article
                  key={experience.title}
                  className="rounded-[2rem] border border-[var(--goearc-border)] bg-white p-8 shadow-[0_14px_40px_rgb(32_88_61_/_0.07)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--goearc-mist)] text-[var(--goearc-primary)]">
                    <Icon size={27} aria-hidden="true" />
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold text-[var(--goearc-forest)]">
                    {experience.title}
                  </h2>

                  <p className="mt-4 leading-7 text-[var(--goearc-muted)]">
                    {experience.description}
                  </p>

                  <p className="mt-6 rounded-2xl bg-[var(--goearc-cream)] px-4 py-3 text-sm text-[var(--goearc-muted)]">
                    {experience.note}
                  </p>
                </article>
              );
            })}
          </div>
        </GOContainer>
      </GOSection>

      <GOSection>
        <GOContainer>
          <GOHeading
            align="center"
            eyebrow="Therapeutic Experiences"
            title="Connection, calm, and support through nature"
            description="Each experience will be presented clearly so families can understand what it offers, who it supports, and what to expect before registering."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className="rounded-[2rem] border border-[var(--goearc-border)] bg-white p-7 shadow-[0_12px_35px_rgb(32_88_61_/_0.06)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--goearc-mist)] text-[var(--goearc-primary)]">
                    <Icon size={24} aria-hidden="true" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-[var(--goearc-forest)]">
                    {pillar.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[var(--goearc-muted)]">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </GOContainer>
      </GOSection>

      <GOSection tone="sky">
        <GOContainer>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <GOHeading
              eyebrow="Safety and Peace of Mind"
              title="Freedom to explore, with thoughtful support around you"
              description="This section is ready to display confirmed safety features. Until operational details are verified, it communicates the intended safety philosophy without making unsupported claims."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {safetyItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-[var(--goearc-border)] bg-white p-6"
                  >
                    <Icon
                      className="text-[var(--goearc-primary)]"
                      size={25}
                      aria-hidden="true"
                    />

                    <h2 className="mt-4 font-semibold text-[var(--goearc-forest)]">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[var(--goearc-muted)]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </GOContainer>
      </GOSection>

      {featuredTestimonial && (
        <GOSection>
          <GOContainer>
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <GOHeading
                  eyebrow="A Story of Hope"
                  title="Real change begins when families feel understood"
                  description="Family experiences help visitors see the impact of compassion, preparation, practical guidance, and a supportive environment."
                />

                <div className="mt-8">
                  <GOButtonLink href="/register">
                    Begin Your Family&apos;s Journey
                    <ArrowRight size={18} aria-hidden="true" />
                  </GOButtonLink>
                </div>
              </div>

              <TestimonialCard
                quote={featuredTestimonial.shortQuote}
                name={featuredTestimonial.name}
                location={featuredTestimonial.location}
                image={featuredTestimonial.image}
                imageAlt={featuredTestimonial.imageAlt}
                featured
              />
            </div>
          </GOContainer>
        </GOSection>
      )}

      <GOSection tone="sky">
        <GOContainer>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--goearc-sage)] to-[var(--goearc-forest)] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    Founder photograph reserved
                  </p>

                  <p className="mt-4 text-xl font-semibold">
                    Add an approved professional image of Dr. Amy Rodrigo here.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <GOHeading
                eyebrow="Meet the Heart Behind the Garden"
                title="Built from lived experience, compassion, and a vision for whole-family support"
                description="This section introduces GOEARC’s founder and the personal motivation behind the organization. Professional credentials, experience, and external collaborations can be added after final verification."
              />

              <blockquote className="mt-8 border-l-4 border-[var(--goearc-primary)] pl-6 text-xl font-medium leading-8 text-[var(--goearc-forest)]">
                “I created this space because when one family member carries
                stress, the entire family feels it. Support must include the
                people who care for them, too.”
              </blockquote>

              <div className="mt-8">
                <GOButtonLink href="/about" variant="outline">
                  Read Our Story
                  <ArrowRight size={18} aria-hidden="true" />
                </GOButtonLink>
              </div>
            </div>
          </div>
        </GOContainer>
      </GOSection>

      <GOSection>
        <GOContainer>
          <GOHeading
            align="center"
            eyebrow="Peace-of-Mind Questions"
            title="Helpful answers before you take the next step"
            description="The landing page shows only a concise preview. The complete FAQ will live on a separate, easy-to-scan page."
          />

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {faqPreview.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-[var(--goearc-border)] bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-[var(--goearc-forest)]">
                  {item.question}
                </h2>

                <p className="mt-3 leading-7 text-[var(--goearc-muted)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <GOButtonLink href="/faq" variant="outline">
              View All Frequently Asked Questions
              <ArrowRight size={18} aria-hidden="true" />
            </GOButtonLink>
          </div>
        </GOContainer>
      </GOSection>

      <GOSection tone="sky">
        <GOContainer>
          <div className="rounded-[2.5rem] border border-[var(--goearc-border)] bg-white p-8 text-center shadow-[0_18px_50px_rgb(32_88_61_/_0.08)] sm:p-12">
            <CalendarDays
              className="mx-auto text-[var(--goearc-primary)]"
              size={38}
              aria-hidden="true"
            />

            <h2 className="mt-6 text-3xl font-semibold text-[var(--goearc-forest)] sm:text-4xl">
              Virtual sanctuary tour coming soon
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[var(--goearc-muted)]">
              This reserved section will later include photographs, video, or
              an interactive tour of the retreat environment, sensory spaces,
              trails, animal areas, and accommodations.
            </p>

            <button
              type="button"
              disabled
              className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[var(--goearc-mist)] px-6 py-3 font-semibold text-[var(--goearc-muted)]"
            >
              Launch Virtual Tour
              <span className="text-xs uppercase tracking-wider">
                Coming Soon
              </span>
            </button>
          </div>
        </GOContainer>
      </GOSection>

      <GOSection
        tone="navy"
        className="relative overflow-hidden text-center"
      >
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--goearc-sage)]/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[var(--goearc-blue)]/10 blur-3xl" />

        <GOContainer className="relative">
          <GOHeading
            align="center"
            eyebrow="Give Your Family Space to Breathe"
            title="Your GOEARC journey can begin today"
            description={
              <span className="text-white/70">
                Explore upcoming opportunities, ask questions, and register
                your interest in a calm, supportive family experience.
              </span>
            }
            className="text-white"
          />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GOButtonLink href="/retreats" variant="light" size="lg">
              Explore Retreats
              <ArrowRight size={18} aria-hidden="true" />
            </GOButtonLink>

            <GOButtonLink
              href="/register"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-[var(--goearc-forest)]"
            >
              Register Your Interest
            </GOButtonLink>
          </div>
        </GOContainer>
      </GOSection>
    </>
  );
}