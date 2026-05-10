"use client";

import * as React from "react";

export type StepItem = {
  title: string;
  description: string;
};

export function Steps({ steps, className }: { steps: StepItem[]; className?: string }) {
  const [current, setCurrent] = React.useState(0);
  const total = steps.length;
  const step = steps[current];

  return (
    <div className={className}>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {steps.map((s, idx) => {
            const isActive = idx === current;
            const isDone = idx < current;

            const statusLabel = isDone ? "Termine" : isActive ? "En cours" : "A venir";

            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`step-chip group inline-flex min-h-12 items-center gap-3 rounded-full border px-4 py-3 text-left transition ${
                  isDone
                    ? "border-white/14 bg-white/90 text-black"
                    : isActive
                      ? "border-white/18 bg-white/[0.12] text-white shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                      : "border-white/10 bg-black/20 text-white/72 hover:-translate-y-0.5 hover:border-white/16 hover:bg-black/30"
                }`}
              >
                <span
                  className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold ${
                    isDone ? "bg-black/10" : isActive ? "bg-white/12" : "bg-white/5"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="whitespace-nowrap text-sm font-semibold">{s.title}</span>
                <span
                  className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDone ? "text-emerald-300" : isActive ? "text-amber-300" : "text-white/45"
                  }`}
                >
                  {statusLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div key={current} className="step-panel mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] md:p-8">
          <div className="pointer-events-none absolute" />
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/52">
              <span className="inline-flex h-2 w-2 rounded-full bg-white/75" />
              Etape {current + 1}
            </div>
            <div className="mt-5 text-2xl font-semibold tracking-tight text-white md:text-3xl">{step.title}</div>
            <div className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/68">{step.description}</div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrent((x) => Math.max(0, x - 1))}
              disabled={current === 0}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-black/30 px-5 text-sm font-semibold text-white/90 transition enabled:hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Precedent
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {steps.map((_, idx) => (
                <button
                  key={`step-dot-${idx}`}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  aria-label={`Aller a l'etape ${idx + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    idx === current ? "w-10 bg-white" : "w-2.5 bg-white/25 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrent((x) => Math.min(total - 1, x + 1))}
              disabled={current === total - 1}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-black/30 px-5 text-sm font-semibold text-white/90 transition enabled:hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
