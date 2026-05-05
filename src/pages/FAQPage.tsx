import PageShell from "@/components/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Campus Merch official Amity merchandise?",
    a: "Yes — Campus Merch is the official channel for Amity learner merchandise, designed for campus life and alumni pride.",
  },
  {
    q: "How long does delivery take?",
    a: "We usually dispatch within 1–2 business days. Metro deliveries often arrive in 3–5 days after dispatch; other regions may take up to a week.",
  },
  {
    q: "What is your return policy?",
    a: "Unworn items with tags may be returned within 7 days of delivery. See Shipping & returns for steps and exceptions on limited drops.",
  },
  {
    q: "Do you ship outside India?",
    a: "Right now we ship across India. International shipping may open for select drops — follow our announcements.",
  },
  {
    q: "How do I track my order?",
    a: "Use the Track order page with your order ID and email from your confirmation message. You’ll also get courier links by SMS/email.",
  },
  {
    q: "Can I change or cancel an order?",
    a: "Contact us quickly after placing the order. Once dispatched, we can’t cancel but can help with a return per policy.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, cards, net banking, and popular wallets through our secure checkout partner.",
  },
];

export default function FAQPage() {
  return (
    <PageShell
      eyebrow="HELP"
      title="Frequently asked questions"
      intro="Quick answers about orders, delivery, and merch. Still stuck? Reach out via Contact."
      crumbs={[{ label: "Home", to: "/" }, { label: "FAQs" }]}
    >
      <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card px-2 sm:px-4 shadow-card-soft">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/80 px-2">
            <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-5">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pt-0">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageShell>
  );
}
