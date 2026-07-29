import { ArrowRight, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GOButtonLink } from "@/components/shared/GOButton";
import GOContainer from "@/components/shared/GOContainer";
import GOHeading from "@/components/shared/GOHeading";
import GOSection from "@/components/shared/GOSection";

import TestimonialCard from "@/components/shared/TestimonialCard";
import { testimonials } from "@/content/testimonials";



const features = [
  {
    icon: Leaf,
    title: "Nature-Based Support",
    description:
      "Calming outdoor experiences designed to encourage connection, confidence, and sensory comfort.",
  },
  {
    icon: HeartHandshake,
    title: "Whole-Family Healing",
    description:
      "Support for neurodivergent children, parents, caregivers, and siblings together.",
  },
  {
    icon: ShieldCheck,
    title: "Safety and Trust",
    description:
      "Clear guidance, compassionate care, and thoughtful preparation for every family visit.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[var(--goearc-text)]">
      <Header />

      <main>
        <GOSection tone="sky" className="relative overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--goearc-primary)]/10 blur-3xl" />

          <GOContainer className="relative grid min-h-[70vh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <GOHeading
                level="h1"
                eyebrow="Welcome to GOEARC"
                title={
                  <>
                    A sanctuary of healing for{" "}
                    <span className="text-[var(--goearc-primary)]">
                      the whole family.
                    </span>
                  </>
                }
                description="Where nature nurtures, families reconnect, and neurodivergent children are supported through compassionate, sensory-aware experiences."
              />

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <GOButtonLink href="/retreats" size="lg">
                  Explore Retreats
                  <ArrowRight size={18} aria-hidden="true" />
                </GOButtonLink>

                <GOButtonLink
                  href="/register"
                  variant="outline"
                  size="lg"
                >
                  Register Your Family
                </GOButtonLink>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-[var(--goearc-primary)] to-[var(--goearc-navy)] shadow-2xl" />

              <div className="absolute -bottom-6 -left-6 max-w-xs rounded-3xl bg-white p-6 shadow-xl">
                <p className="text-sm font-semibold text-[var(--goearc-primary)]">
                  A place to breathe
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--goearc-muted)]">
                  Thoughtful family experiences inspired by nature, connection,
                  safety, and belonging.
                </p>
              </div>
            </div>
          </GOContainer>
        </GOSection>

        <GOSection>
          <GOContainer>
            <GOHeading
              align="center"
              eyebrow="Why families choose GOEARC"
              title="Support designed around the needs of the whole family"
              description="GOEARC combines nature, compassionate support, and clear family guidance to create an experience that feels welcoming from the very first interaction."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-3xl border border-[var(--goearc-border)] bg-white p-7 shadow-[0_12px_35px_rgb(23_77_120_/_0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgb(23_77_120_/_0.12)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--goearc-sky)] text-[var(--goearc-primary)]">
                      <Icon size={24} aria-hidden="true" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold">
                      {feature.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[var(--goearc-muted)]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </GOContainer>
        </GOSection>
        <GOSection tone="sky">
  <GOContainer>
    <GOHeading
      align="center"
      eyebrow="Stories of Hope"
      title="Real experiences from families who found support, clarity, and renewed confidence"
      description="Every family’s journey is different. These reflections show how compassionate guidance, practical strategies, and a supportive retreat environment can create meaningful change."
    />

    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {testimonials.slice(0, 3).map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          quote={testimonial.shortQuote}
          name={testimonial.name}
          location={testimonial.location}
          image={testimonial.image}
          imageAlt={testimonial.imageAlt}
          featured={testimonial.featured}
        />
      ))}
    </div>

    <div className="mt-10 flex justify-center">
      <GOButtonLink href="/register" size="lg">
        Begin Your Family&apos;s Journey
        <ArrowRight size={18} aria-hidden="true" />
      </GOButtonLink>
    </div>
  </GOContainer>
</GOSection>
      </main>
      

      <Footer />
    </div>
  );
}