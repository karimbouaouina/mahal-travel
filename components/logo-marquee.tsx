import Image from "next/image";

export type PartnerLogo = {
  src: string;
  alt: string;
  href: string;
};

export function LogoMarquee({
  items,
  className,
}: {
  items: PartnerLogo[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {items.map((logo) => (
          <a
            key={logo.alt}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ouvrir le site de ${logo.alt}`}
            className="group relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1.5 hover:border-gold/35"
            style={{ borderColor: 'oklch(0.72 0.11 75 / 0.15)', background: 'linear-gradient(180deg, oklch(0.14 0.012 260 / 0.8), oklch(0.11 0.015 260 / 0.5))' }}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="pointer-events-none absolute -right-16 top-2 h-28 w-28 rounded-full bg-white/5 blur-3xl transition duration-500 group-hover:bg-white/8" />

            <div className="relative flex min-h-[168px] items-center justify-center rounded-[1.5rem] border bg-black/35 px-8 py-8" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.1)' }}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={260}
                height={120}
                className="h-auto max-h-16 w-auto object-contain opacity-92 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 md:max-h-20"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
