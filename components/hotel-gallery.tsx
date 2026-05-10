"use client";

import Image from "next/image";
import * as React from "react";
import { createPortal } from "react-dom";

export type GalleryItem = {
  src: string;
  title: string;
  location: string;
};

export function HotelGallery({
  items,
  className,
  trailingLabel,
}: {
  items: GalleryItem[];
  className?: string;
  trailingLabel?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const open = openIndex !== null ? items[openIndex] : null;

  const go = React.useCallback(
    (dir: -1 | 1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + dir + items.length) % items.length;
      });
    },
    [items.length]
  );

  React.useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [go, openIndex]);

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Apercu de ${open.title}`}
            onMouseDown={() => setOpenIndex(null)}
          >
            <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
              <div
                className="relative grid h-full max-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_32px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[minmax(0,1fr)_340px]"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="relative min-h-[340px] overflow-hidden bg-black">
                  <Image
                    src={open.src}
                    alt={open.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 68vw"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                </div>

                <div className="flex flex-col border-t border-white/10 bg-[linear-gradient(180deg,rgba(11,11,14,0.96),rgba(11,11,14,0.88))] lg:border-l lg:border-t-0">
                  <div className="flex items-start justify-between gap-4 px-5 pb-5 pt-5">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">Selection Sousse</div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{open.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">{open.location}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(null)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-lg text-white/85 transition hover:bg-white/[0.08]"
                    >
                      x
                    </button>
                  </div>

                  <div className="px-5">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/70">
                      Galerie photo plein ecran avec navigation clavier et vue detaillee de chaque hotel.
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 px-5">
                    {items.map((item, idx) => {
                      const isActive = idx === openIndex;

                      return (
                        <button
                          key={`${item.title}-${idx}-thumb`}
                          type="button"
                          onClick={() => setOpenIndex(idx)}
                          className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                            isActive
                              ? "border-white/18 bg-white/[0.08]"
                              : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-white">{item.title}</div>
                            <div className="mt-1 truncate text-xs text-white/50">{item.location}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 px-5 py-5">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.08]"
                    >
                      Precedent
                    </button>
                    <div className="text-sm text-white/45">
                      {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </div>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.08]"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className={className}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it, idx) => (
            <button
              key={it.title + idx}
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/25 text-left shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1.5 hover:border-white/18"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={it.src}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/75">
                  {it.location}
                </span>
                <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] text-white/75 transition group-hover:bg-white/10">
                  Ouvrir
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-base font-semibold text-white md:text-lg">{it.title}</div>
              </div>
            </button>
          ))}

          {trailingLabel ? (
            <div className="group relative flex aspect-[16/9] items-end overflow-hidden rounded-[1.9rem] border border-dashed border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 text-left shadow-[0_18px_55px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-white/18">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_55%)]" />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/38">Et plus encore</div>
                <div className="mt-3 max-w-[16rem] text-2xl font-semibold leading-[1.1] tracking-tight text-white">
                  {trailingLabel}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {modal}
    </>
  );
}
