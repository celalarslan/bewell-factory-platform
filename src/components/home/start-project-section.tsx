"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import type { PublicContent } from "@/i18n/public-content";

const formDefaults = {
  fullName: "", company: "", country: "", email: "", phone: "", product: "",
  capacity: "", land: "", rawMaterial: "", budget: "", financing: "", timeline: "",
  notes: "", meeting: false,
};

type FormState = typeof formDefaults;
type TextField = Exclude<keyof FormState, "meeting">;

const fields: TextField[] = [
  "fullName", "company", "country", "email", "phone", "product", "capacity",
  "land", "rawMaterial", "budget", "financing", "timeline",
];

export default function StartProjectSection({ content }: { content: PublicContent["contact"] }) {
  const [form, setForm] = useState<FormState>(formDefaults);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<TextField, string>> = {};
    for (const key of ["fullName", "company", "country", "product", "financing", "timeline"] as TextField[]) {
      if (!form[key].trim()) next[key] = content.required;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = content.emailError;
    }
    return next;
  }, [content.emailError, content.required, form]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <section id="start-project" className="border-t border-white/10 bg-[#0a0e12] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
            <div className="mt-6 rounded-[24px] border border-[#b21f24]/25 bg-[#b21f24]/8 p-5 text-sm leading-7 text-[#f2e8e8]">
              {content.notice}
            </div>
          </div>

          <Reveal className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            {!submitted ? (
              <form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  setTouched(true);
                  if (canSubmit) setSubmitted(true);
                }}
                className="grid gap-5 md:grid-cols-2"
              >
                {fields.map((fieldKey) => (
                  <label key={fieldKey} className="md:col-span-1">
                    <span className="config-label">{content.labels[fieldKey]}</span>
                    {fieldKey === "financing" ? (
                      <select
                        required
                        value={form.financing}
                        onChange={(event) => setForm((current) => ({ ...current, financing: event.target.value }))}
                        aria-invalid={Boolean(touched && errors.financing)}
                        className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55 focus:ring-2 focus:ring-[#b21f24]/20"
                      >
                        <option value="" className="bg-[#0a0e12]">{content.select}</option>
                        {content.financingOptions.map((option) => <option key={option} value={option} className="bg-[#0a0e12]">{option}</option>)}
                      </select>
                    ) : (
                      <input
                        required={["fullName", "company", "country", "email", "product", "timeline"].includes(fieldKey)}
                        type={fieldKey === "email" ? "email" : "text"}
                        autoComplete={fieldKey === "fullName" ? "name" : fieldKey === "email" ? "email" : fieldKey === "phone" ? "tel" : "off"}
                        value={form[fieldKey]}
                        onChange={(event) => setForm((current) => ({ ...current, [fieldKey]: event.target.value }))}
                        aria-invalid={Boolean(touched && errors[fieldKey])}
                        className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55 focus:ring-2 focus:ring-[#b21f24]/20"
                      />
                    )}
                    {touched && errors[fieldKey] ? <p role="alert" className="mt-2 text-xs text-[#e58a91]">{errors[fieldKey]}</p> : null}
                  </label>
                ))}

                <label className="md:col-span-2">
                  <span className="config-label">{content.labels.notes}</span>
                  <textarea
                    value={form.notes}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    className="mt-3 min-h-32 w-full rounded-[22px] border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-[#b21f24]/55 focus:ring-2 focus:ring-[#b21f24]/20"
                  />
                </label>

                <div className="md:col-span-2 rounded-[22px] border border-dashed border-white/12 bg-black/20 px-4 py-4 text-sm text-[#cad0ca]">{content.file}</div>

                <label className="md:col-span-2 flex min-h-12 items-start gap-3 rounded-[22px] border border-white/10 bg-black/25 px-4 py-4 text-sm text-[#dde2dc]">
                  <input type="checkbox" checked={form.meeting} onChange={(event) => setForm((current) => ({ ...current, meeting: event.target.checked }))} className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent" />
                  {content.meeting}
                </label>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#b21f24] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c2252a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    {content.submit}
                  </button>
                  <div className="rounded-2xl border border-white/10 px-5 py-3 text-sm leading-6 text-[#d5d9d4]">{content.backendNotice}</div>
                </div>
              </form>
            ) : (
              <div className="min-h-[360px] content-center" role="status">
                <div className="text-xs uppercase tracking-[0.22em] text-[#bdb7ae]">{content.successEyebrow}</div>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">{content.successTitle}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#98a59b]">{content.successDescription}</p>
                <button type="button" onClick={() => { setForm(formDefaults); setSubmitted(false); setTouched(false); }} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]">
                  {content.reset}
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
