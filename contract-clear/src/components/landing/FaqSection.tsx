"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Common questions</h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className="rounded-2xl border border-pinnacle-elevated bg-pinnacle-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium hover:bg-pinnacle-elevated/30 transition-colors"
                aria-expanded={isOpen}
              >
                {item.question}
                <span className="text-pinnacle-blue-bright shrink-0 text-lg leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-pinnacle-muted leading-relaxed border-t border-pinnacle-elevated/60 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
