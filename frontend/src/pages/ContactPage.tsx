import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Mail, MapPin, Phone } from "lucide-react";
import { sendContactMessage } from "@/lib/feedbackApi.ts";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("order");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    setSubmitting(true);
    try {
      const detail = await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
      });
      toast.success("Message sent", { description: detail });
      setName("");
      setEmail("");
      setTopic("order");
      setMessage("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow="SUPPORT"
      title="Contact us"
      intro="Questions about an order, sizing, or a campus collab — the Campus Merch team reads every note."
      crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      wide
    >
      <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-soft space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
                placeholder="you@amity.edu"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-topic" className="text-sm font-medium">
              Topic
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
            >
              <option value="order">Order / delivery</option>
              <option value="return">Return / exchange</option>
              <option value="product">Product question</option>
              <option value="collab">Campus collab</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60 resize-y min-h-[120px]"
              placeholder="Order ID (if any), details…"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold hover:scale-[1.02] transition-transform shadow-glow disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Send message
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-foreground">Campus Merch desk</h2>
            <div className="flex gap-3 text-sm">
              <Mail className="h-5 w-5 text-secondary shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="font-medium text-foreground">Email</div>
                <a href="mailto:support@amitycampusmerch.com" className="text-primary hover:underline break-all">
                  support@amitycampusmerch.com
                </a>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="font-medium text-foreground">Phone</div>
                <span className="text-muted-foreground">Mon–Sat · 10:00–18:00 IST</span>
                <br />
                <a href="tel:+911204000000" className="text-primary font-medium">
                  +91 120 400 0000
                </a>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="font-medium text-foreground">Campus</div>
                <p className="text-muted-foreground leading-relaxed">
                  Amity University
                  <br />
                  Noida, Uttar Pradesh — learner fulfilment desk
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
