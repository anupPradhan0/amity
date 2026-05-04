import { Link } from "react-router-dom";
import logo from "@/assets/cm-logo.png";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Campus Merch" className="h-14 w-auto bg-background rounded-lg p-1" loading="lazy" width={56} height={56} />
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
            <li><a href="#" className="hover:text-secondary">Track Order</a></li>
            <li><a href="#" className="hover:text-secondary">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-secondary">Size Guide</a></li>
            <li><a href="#" className="hover:text-secondary">FAQs</a></li>
            <li><a href="#" className="hover:text-secondary">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-secondary mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-3">Get drops, learner stories & exclusive offers in your inbox.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@amity.edu" className="flex-1 bg-background/10 border border-secondary/30 rounded-md px-3 py-2 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary" />
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-secondary/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Campus Merch — Amity Online. All rights reserved.</p>
          <p>Made with care in Noida, India.</p>
        </div>
      </div>
    </footer>
  );
}
