import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/home" },
  { label: "Retreats", href: "/retreats" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const actionLinks = [
  { label: "Register Your Family", href: "/register" },
  { label: "Support Our Mission", href: "/support" },
  { label: "Become a Volunteer", href: "/volunteer" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#102b20] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/home" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e9cc] text-sm font-bold text-[#173b2c]">
              GO
            </div>

            <div>
              <p className="text-lg font-semibold leading-tight">
                Garden of Eden
              </p>
              <p className="text-sm text-white/65">
                Autism Retreat Center
              </p>
            </div>
          </Link>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
            A nature-inspired sanctuary supporting neurodivergent children,
            caregivers, and families through connection, respite, therapeutic
            experiences, and compassionate community care.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c9dfad]">
            Explore
          </h2>

          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c9dfad]">
            Get Involved
          </h2>

          <ul className="mt-5 space-y-3">
            {actionLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Garden of Eden Autism Retreat Center. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link href="/accessibility" className="transition hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}