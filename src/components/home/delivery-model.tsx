import { deliveryModel } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function DeliveryModelSection() {
  return (
    <section id="delivery-model" className="bg-[#080b0f] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Project Delivery Model"
          title="From Opportunity to Operation"
          description="The flow is deliberately linear so the project can move from discovery to commissioning without losing accountability."
        />

        <div className="mt-14 grid gap-3 lg:grid-cols-7">
          {deliveryModel.map((item, index) => (
            <Reveal key={item.step} delay={index * 50} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-[#c1c8c2]">{item.step}</div>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#96a39b]">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
