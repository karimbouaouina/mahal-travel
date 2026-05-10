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
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1.5 hover:border-white/16"
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
            <div className="pointer-events-none absolute -right-16 top-2 h-28 w-28 rounded-full bg-white/8 blur-3xl transition duration-500 group-hover:bg-white/12" />

            <div className="relative flex min-h-[168px] items-center justify-center rounded-[1.5rem] border border-white/8 bg-black/20 px-8 py-8">
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
