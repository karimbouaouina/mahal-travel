"use client";

import Image from "next/image";
import * as React from "react";

export type TestimonialItem = {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
};

function Stars({ value }: { value: number }) {
  const full = Math.round(value);

  return (
    <div className="flex items-center gap-1" aria-label={`${full} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          style={{ color: i < full ? 'var(--gold)' : 'oklch(0.72 0.11 75 / 0.15)' }}
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
  label,
}: {
  dir: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border text-white transition hover:-translate-y-0.5 hover:text-gold-bright"
      style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)', background: 'oklch(0.11 0.015 260 / 0.8)' }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        {dir === "left" ? (
          <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function TestimonialsCarousel({
  testimonials,
  className,
}: {
  testimonials: TestimonialItem[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const total = testimonials.length;
  const active = testimonials[index];

  const goTo = React.useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + total) % total);
    },
    [total]
  );

  const go = React.useCallback(
    (dir: -1 | 1) => {
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  React.useEffect(() => {
    if (total <= 1) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5600);

    return () => window.clearInterval(id);
  }, [total]);

  if (total === 0) return null;

  return (
    <div className={className}>
      <div className="mx-auto max-w-5xl">
        <div
          key={index}
          className="testimonial-stage relative overflow-hidden rounded-[2.4rem] border p-6 shadow-[0_26px_100px_rgba(0,0,0,0.45)] md:p-8"
          style={{ borderColor: 'oklch(0.72 0.11 75 / 0.18)', background: 'linear-gradient(180deg, oklch(0.14 0.012 260 / 0.8), oklch(0.11 0.015 260 / 0.5))' }}
        >
          <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="pointer-events-none absolute -right-24 top-8 h-56 w-56 rounded-full blur-3xl opacity-10" style={{ backgroundColor: 'var(--gold)' }} />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full blur-3xl opacity-5" style={{ backgroundColor: 'var(--gold)' }} />

          <div className="relative">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em]" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)', backgroundColor: 'oklch(0.72 0.11 75 / 0.05)', color: 'var(--gold-bright)' }}>
                  <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
                  Avis recent
                </div>

                <blockquote className="gold-quote font-serif relative mt-8 text-2xl font-bold leading-[1.35] tracking-tight text-white md:text-4xl pl-6">
                  &quot;{active.content}&quot;
                </blockquote>
              </div>

              <div className="rounded-[1.7rem] border bg-black/35 p-5 md:min-w-[230px]" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.15)' }}>
                <div className="text-xs uppercase tracking-[0.22em] text-white/38">Note</div>
                <div className="mt-3 text-5xl font-bold text-gold-bright">{active.rating.toFixed(1)}</div>
                <div className="mt-2 text-xs text-white/40">Retour client confirme</div>
                <div className="mt-5">
                  <Stars value={active.rating} />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.18)' }}>
              <div className="flex items-center gap-4">
                <Image
                  src={active.avatar}
                  alt={active.name}
                  className="h-14 w-14 rounded-2xl border bg-white/5 object-contain p-1"
                  style={{ borderColor: 'oklch(0.72 0.11 75 / 0.15)' }}
                  width={56}
                  height={56}
                  loading="lazy"
                />
                <div>
                  <div className="text-base font-semibold text-white">{active.name}</div>
                  <div className="mt-1 text-sm text-white/50">{active.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ArrowButton dir="left" onClick={() => go(-1)} label="Afficher l'avis precedent" />
                <ArrowButton dir="right" onClick={() => go(1)} label="Afficher l'avis suivant" />
                <div className="ml-2 text-sm text-white/45">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonials.map((testimonial, i) => {
                const isActive = i === index;

                return (
                  <button
                    key={`${testimonial.name}-dot-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Afficher l'avis de ${testimonial.name}`}
                    className={`h-2.5 rounded-full transition ${isActive ? "w-10" : "w-2.5 hover:bg-white/45"
                      }`}
                    style={{ backgroundColor: isActive ? 'var(--gold)' : 'oklch(0.72 0.11 75 / 0.25)' }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
