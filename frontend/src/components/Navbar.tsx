import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/store/cart";
import { categories } from "@/data/products";

const LOGO_URL = "/amity-university-logo.png";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const loc = useLocation();
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setSearchOpen(false);
    setQuery("");
  }

  function toggleSearch() {
    setSearchOpen(v => {
      const next = !v;
      if (next) setTimeout(() => searchRef.current?.focus(), 0);
      return next;
    });
  }

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

          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={LOGO_URL}
              alt="Amity University — Campus Merch"
              className="h-10 lg:h-11 w-auto object-contain object-left drop-shadow-sm transition-transform group-hover:scale-[1.02]"
              width={44}
              height={52}
            />
            <span className="hidden sm:inline font-display font-bold text-lg lg:text-xl text-navy leading-tight">
              Campus Merch
            </span>
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
            <form onSubmit={submitSearch} className="flex items-center">
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search products…"
                aria-label="Search products"
                className={`rounded-full bg-muted/70 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
                  searchOpen ? "w-36 sm:w-52 px-4 py-2 mr-1 opacity-100" : "w-0 px-0 py-2 opacity-0 pointer-events-none"
                }`}
              />
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => !searchOpen && toggleSearch()}
                className="p-2 hover:text-secondary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
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
