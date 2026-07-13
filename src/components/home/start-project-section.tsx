"use client";

import { useMemo, useState } from "react";
import { financingOptions, projectFormFields } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

const formDefaults = {
  fullName: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  product: "",
  capacity: "",
  land: "",
  rawMaterial: "",
  budget: "",
  financing: "",
  timeline: "",
  notes: "",
  meeting: false,
};

type FormState = typeof formDefaults;

export default function StartProjectSection() {
  const [form, setForm] = useState<FormState>(formDefaults);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.company.trim()) next.company = "Required";
    if (!form.country.trim()) next.country = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.product.trim()) next.product = "Required";
    if (!form.financing.trim()) next.financing = "Required";
    if (!form.timeline.trim()) next.timeline = "Required";
    return next;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <section id="start-project" className="border-t border-white/10 bg-[#0a0e12] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Start a Project"
              title="Tell Us What You Want to Manufacture"
              description="We will structure the path from opportunity to operational production."
            />
            <div className="mt-6 rounded-[24px] border border-[#b21f24]/25 bg-[#b21f24]/8 p-5 text-sm leading-7 text-[#f2e8e8]">
              Indicative figures are generated for early project screening and do not constitute a binding technical or commercial offer.
            </div>
          </div>

          <Reveal className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            {!submitted ? (
              <form
                suppressHydrationWarning
                onSubmit={(event) => {
                  event.preventDefault();
                  setTouched(true);
                  if (canSubmit) {
                    setSubmitted(true);
                  }
                }}
                className="grid gap-5 md:grid-cols-2"
              >
                {projectFormFields.slice(0, 2).map((label, index) => {
                  const key = index === 0 ? "fullName" : "company";
                  return (
                    <label key={label} className="md:col-span-1">
                      <span className="config-label">{label}</span>
                      <input
                        suppressHydrationWarning
                        value={form[key as keyof FormState] as string}
                        onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                        className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55"
                      />
                      {touched && errors[key as keyof FormState] ? (
                        <p className="mt-2 text-xs text-[#e58a91]">{errors[key as keyof FormState]}</p>
                      ) : null}
                    </label>
                  );
                })}

                {[
                  ["country", "Country"],
                  ["email", "Email"],
                  ["phone", "Phone / WhatsApp"],
                  ["product", "Product to Be Manufactured"],
                  ["capacity", "Target Capacity"],
                  ["land", "Available Land"],
                  ["rawMaterial", "Raw Material Availability"],
                  ["budget", "Budget Range"],
                  ["financing", "Financing Status"],
                  ["timeline", "Desired Timeline"],
                ].map(([key, label]) => {
                  const fieldKey = key as keyof FormState;
                  return (
                    <label key={String(key)} className="md:col-span-1">
                      <span className="config-label">{label}</span>
                      {fieldKey === "financing" ? (
                        <select
                          suppressHydrationWarning
                          value={form.financing}
                          onChange={(event) => setForm((current) => ({ ...current, financing: event.target.value }))}
                          className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55"
                        >
                          <option value="" className="bg-[#0a0e12]">Select</option>
                          {financingOptions.map((option) => (
                            <option key={option} value={option} className="bg-[#0a0e12]">
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          suppressHydrationWarning
                          value={form[fieldKey] as string}
                          onChange={(event) => setForm((current) => ({ ...current, [fieldKey]: event.target.value }))}
                          className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55"
                        />
                      )}
                      {touched && errors[fieldKey] ? <p className="mt-2 text-xs text-[#e58a91]">{errors[fieldKey]}</p> : null}
                    </label>
                  );
                })}

                <label className="md:col-span-2">
                  <span className="config-label">Additional Notes</span>
                  <textarea
                    suppressHydrationWarning
                    value={form.notes}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    className="mt-3 min-h-32 w-full rounded-[22px] border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-[#b21f24]/55"
                  />
                </label>

                <div className="md:col-span-2 rounded-[22px] border border-dashed border-white/12 bg-black/20 px-4 py-4 text-sm text-[#cad0ca]">
                  File Upload placeholder
                </div>

                <label className="md:col-span-2 flex items-start gap-3 rounded-[22px] border border-white/10 bg-black/25 px-4 py-4 text-sm text-[#dde2dc]">
                  <input
                    type="checkbox"
                    suppressHydrationWarning
                    checked={form.meeting}
                    onChange={(event) => setForm((current) => ({ ...current, meeting: event.target.checked }))}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                  />
                  Request a Meeting checkbox
                </label>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#b21f24] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c2252a]"
                  >
                    Submit inquiry
                  </button>
                  <div className="rounded-2xl border border-white/10 px-5 py-3 text-sm leading-6 text-[#d5d9d4]">
                    Online submission will be enabled when the secure project backend is connected.
                  </div>
                </div>
              </form>
            ) : (
              <div className="min-h-[360px] content-center">
                <div className="text-xs uppercase tracking-[0.28em] text-[#bdb7ae]">Local validation complete</div>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">Your project information has been validated locally.</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#98a59b]">
                  Online submission will be enabled when the secure project backend is connected. No external submission has been sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(formDefaults);
                    setSubmitted(false);
                    setTouched(false);
                  }}
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                >
                  Reset form
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
