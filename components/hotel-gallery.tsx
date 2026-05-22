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
  collectionLabel,
}: {
  items: GalleryItem[];
  className?: string;
  trailingLabel?: string;
  collectionLabel?: string;
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
            <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-8">
              <div
                className="relative flex flex-col h-[90vh] md:h-full max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-[2rem] border shadow-[0_32px_120px_rgba(0,0,0,0.55)] 2xl:grid 2xl:grid-cols-[minmax(0,1fr)_380px] 2xl:overflow-hidden"
                style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)', background: 'oklch(0.11 0.015 260 / 0.95)' }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="relative h-[35vh] sm:h-[45vh] min-h-[220px] 2xl:h-full 2xl:min-h-0 shrink-0 overflow-hidden bg-black">
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

                <div className="flex flex-col border-t bg-[linear-gradient(180deg,oklch(0.14 0.012 260/0.98),oklch(0.11 0.015 260/0.94))] 2xl:border-l 2xl:border-t-0 2xl:min-h-0 2xl:flex-1" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)' }}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-5 pb-5 pt-5">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">
                        Selection {collectionLabel ?? open.location}
                      </div>
                      <h3 className="mt-3 truncate text-2xl font-semibold leading-tight tracking-tight text-white">
                        {open.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/60">{open.location}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(null)}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white/[0.04] text-lg text-white/85 transition hover:bg-white/[0.08]"
                      style={{ borderColor: 'oklch(0.72 0.11 75 / 0.3)' }}
                    >
                      x
                    </button>
                  </div>

                  <div className="px-5">
                    <div className="rounded-[1.4rem] border bg-white/[0.03] p-4 text-sm leading-6 text-white/70" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.15)' }}>
                      Galerie photo avec navigation clavier et vue detaillee de chaque hotel.
                    </div>
                  </div>

                  <div className="mt-5 min-h-0 px-5 pb-5 2xl:flex-1 2xl:overflow-y-auto">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none 2xl:grid 2xl:grid-cols-1 2xl:gap-3 2xl:overflow-x-visible 2xl:pb-0">
                      {items.map((item, idx) => {
                        const isActive = idx === openIndex;

                        return (
                          <button
                            key={`${item.title}-${idx}-thumb`}
                            type="button"
                            onClick={() => setOpenIndex(idx)}
                            className={`flex w-[240px] 2xl:w-full shrink-0 min-w-0 items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition ${
                              isActive
                                ? "bg-white/[0.08]"
                                : "bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]"
                            }`}
                            style={{ borderColor: isActive ? 'oklch(0.72 0.11 75 / 0.6)' : 'oklch(0.72 0.11 75 / 0.15)' }}
                          >
                            <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl border bg-black/30" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.2)' }}>
                              <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1 overflow-hidden">
                              <div className="truncate text-sm font-semibold text-white/92">{item.title}</div>
                              <div className="mt-1 truncate text-xs text-white/55">{item.location}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t px-5 py-5" style={{ borderColor: 'oklch(0.72 0.11 75 / 0.2)' }}>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="inline-flex h-11 items-center justify-center rounded-full border bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.08]"
                      style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)' }}
                    >
                      Precedent
                    </button>
                    <div className="text-sm text-white/45">
                      {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </div>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="inline-flex h-11 items-center justify-center rounded-full border bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.08]"
                      style={{ borderColor: 'oklch(0.72 0.11 75 / 0.25)' }}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <button
              key={it.title + idx}
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 text-left"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{it.title}</div>
                  <div className="mt-1 truncate text-xs text-white/70">{it.location}</div>
                </div>
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
