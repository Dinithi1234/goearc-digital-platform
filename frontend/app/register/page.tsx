import { HeartHandshake, Leaf, ShieldCheck } from "lucide-react";

import Footer from "@/components/Footer";
import RegistrationForm from "@/components/forms/RegistrationForm";
import Header from "@/components/Header";
import GOContainer from "@/components/shared/GOContainer";
import GOHeading from "@/components/shared/GOHeading";
import GOSection from "@/components/shared/GOSection";

const reassuranceItems = [
  {
    icon: Leaf,
    title: "Start with a simple interest form",
    description:
      "This first step collects only general contact and retreat-preference information.",
  },
  {
    icon: HeartHandshake,
    title: "Receive personal follow-up",
    description:
      "A GOEARC team member can discuss your family’s interests and answer questions.",
  },
  {
    icon: ShieldCheck,
    title: "Sensitive details come later",
    description:
      "Medical records and detailed clinical information are not collected through this beta form.",
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--goearc-cream)] text-[var(--goearc-text)]">
      <Header />

      <main>
        <GOSection tone="sky">
          <GOContainer>
            <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="lg:sticky lg:top-32">
                <GOHeading
                  eyebrow="Registration of Interest"
                  title="Take the first step toward your family’s GOEARC experience"
                  description="Tell us how to contact you and what type of retreat experience interests your family. This beta form does not request medical or clinical records."
                />

                <div className="mt-9 space-y-5">
                  {reassuranceItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="flex items-start gap-4 rounded-3xl border border-[var(--goearc-border)] bg-white p-5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--goearc-mist)] text-[var(--goearc-primary)]">
                          <Icon size={21} aria-hidden="true" />
                        </div>

                        <div>
                          <h2 className="font-semibold text-[var(--goearc-forest)]">
                            {item.title}
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-[var(--goearc-muted)]">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl bg-[var(--goearc-forest)] p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                    Beta notice
                  </p>

                  <p className="mt-3 leading-7 text-white/80">
                    This registration workflow is currently available for
                    stakeholder testing. Retreat dates, availability, pricing,
                    and acceptance remain subject to confirmation by GOEARC.
                  </p>
                </div>
              </div>

              <RegistrationForm />
            </div>
          </GOContainer>
        </GOSection>
      </main>

      <Footer />
    </div>
  );
}