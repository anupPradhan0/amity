import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import logo from "@/assets/cm-logo.png";
import { categories } from "@/data/products";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [loc.pathname]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm py-2 overflow-hidden">
        <div className="marquee-track whitespace-nowrap font-medium">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-16 px-8">
              <span>🚚 FREE SHIPPING ON ORDERS ABOVE ₹999</span>
              <span>🎓 EXCLUSIVE FOR AMITY LEARNERS</span>
              <span>⚡ FLAT 25% OFF ON BESTSELLERS</span>
              <span>🆕 NEW DROP — DIGITAL REVOLUTION COLLECTION</span>
              <span>🎁 FREE GIFT WRAP ABOVE ₹1499</span>
            </span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-xl shadow-card-soft" : "bg-background/40 backdrop-blur-md"}`}>
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Campus Merch" className="h-10 lg:h-12 w-auto" width={48} height={48} />
            <span className="hidden sm:inline font-display font-bold text-lg lg:text-xl text-navy">Campus Merch</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="cm-link">Home</Link>
            {categories.map(c => (
              <Link key={c.slug} to={`/category/${c.slug}`} className="cm-link">{c.name}</Link>
            ))}
            <Link to="/lookbook" className="cm-link">Lookbook</Link>
            <Link to="/store" className="cm-link text-secondary-foreground bg-secondary px-3 py-1 rounded-full">Visit Store</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/sign-in" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-primary px-2 py-1.5 rounded-md transition-colors">
              Sign in
            </Link>
            <button className="p-2 hover:text-secondary transition-colors" aria-label="Search"><Search className="h-5 w-5" /></button>
            <Link to="/wishlist" className="p-2 hover:text-secondary transition-colors hidden sm:block" aria-label="Wishlist"><Heart className="h-5 w-5" /></Link>
            <button onClick={() => setOpen(true)} className="relative p-2 hover:text-secondary transition-colors" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">{count}</span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="container py-4 flex flex-col gap-4 text-sm font-medium">
              <Link to="/">Home</Link>
              {categories.map(c => <Link key={c.slug} to={`/category/${c.slug}`}>{c.name}</Link>)}
              <Link to="/lookbook">Lookbook</Link>
              <Link to="/store" className="text-secondary-foreground bg-secondary px-3 py-2 rounded-md w-fit">Visit Virtual Store</Link>
              <Link to="/sign-in">Sign in</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
