import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/lib/feedbackApi.ts";

const LOGO_URL = "/amity-university-logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const msg = await subscribeNewsletter(value);
      toast.success("Subscribed", { description: msg });
      setEmail("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={LOGO_URL}
              alt="Amity University — Campus Merch"
              className="h-16 w-auto object-contain object-left drop-shadow-md"
              loading="lazy"
              width={56}
              height={64}
            />
            <div>
              <div className="font-display text-xl font-bold text-secondary">Campus Merch</div>
              <div className="text-xs opacity-80">Powered by Amity Online</div>
            </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">Official merchandise for the Amity learner community. Designed in India, worn on every campus.</p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-secondary mb-4">Shop</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/category/apparels" className="hover:text-secondary">Apparels</Link></li>
            <li><Link to="/category/accessories" className="hover:text-secondary">Accessories</Link></li>
            <li><Link to="/category/drinkware" className="hover:text-secondary">Drinkware</Link></li>
            <li><Link to="/lookbook" className="hover:text-secondary">Lookbook</Link></li>
            <li><Link to="/store" className="hover:text-secondary">Virtual Store Tour</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-secondary mb-4">Help</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/track-order" className="hover:text-secondary">Track order</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-secondary">Shipping &amp; returns</Link></li>
            <li><Link to="/size-guide" className="hover:text-secondary">Size guide</Link></li>
            <li><Link to="/faq" className="hover:text-secondary">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact us</Link></li>
            <li><Link to="/sign-in" className="hover:text-secondary">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-secondary mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-3">Get drops, learner stories & exclusive offers in your inbox.</p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@amity.edu"
              className="flex-1 min-w-0 bg-background/10 border border-secondary/30 rounded-full px-4 py-2.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/40 transition-shadow"
            />
            <button
              disabled={submitting}
              className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-transform shadow-glow shrink-0 disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-secondary/10">
        <div className="container py-5 flex flex-col gap-3 text-xs opacity-70">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-secondary transition-colors">
              Privacy
            </Link>
            <span className="opacity-40" aria-hidden>
              ·
            </span>
            <Link to="/terms" className="hover:text-secondary transition-colors">
              Terms
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Campus Merch — Amity Online. All rights reserved.</p>
            <p>Made with care in Noida, India.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
