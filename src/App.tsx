import { useEffect, useRef, useState } from "react";

// ============= WHATSAPP UTILITY =============
const WHATSAPP_NUMBER = "918350850150";

function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

function generateWhatsAppURL(customMessage?: string): string {
  const baseURL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;
  const message =
    customMessage ??
    `Hello Namaste Biryani,\n\nI would like to place an order. Please show me the menu options and pricing.\n\nPlease confirm availability.`;
  return `${baseURL}${encodeWhatsAppMessage(message)}`;
}

function buildOrderMessage(productName: string, orderLines: Array<{ qty: string; price: number; count: number }>) {
  const total = orderLines.reduce((sum, line) => sum + line.price * line.count, 0);
  const lines = [
    "Hello Namaste Biryani,",
    "",
    "I would like to order:",
    "",
    productName,
    "",
    ...orderLines.map((line) => `${line.qty} × ${line.count} = ₹${line.price * line.count}`),
    "",
    `Total = ₹${total}`,
    "",
    "Please confirm my order.",
  ];
  return encodeWhatsAppMessage(lines.join("\n"));
}

function createWhatsAppOrderURL(productName: string, orderLines: Array<{ qty: string; price: number; count: number }>) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${buildOrderMessage(productName, orderLines)}`;
}

// ============= ICONS =============
const Icon = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
    </svg>
  ),
  Star: ({ filled = true }: { filled?: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Leaf: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Fire: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Spice: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3c2 2 2 6 0 9s-2 7 0 9M3 12c2-2 6-2 9 0s7 2 9 0M21 12c-2-2-6-2-9 0s-7 2-9 0" />
    </svg>
  ),
  Clock: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  ),
  Hand: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <path d="M7 11.5V5.5a1.5 1.5 0 013 0v2.5a1.5 1.5 0 013 0v2a1.5 1.5 0 013 0v1.5a1.5 1.5 0 013 0v4c0 3.866-3.582 7-8 7s-8-3.134-8-7c0-1.746.5-3 1.5-4.25A1.5 1.5 0 019 11z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6 0-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 3 1.2 3.2c.1.2 2.1 3.3 5.2 4.6 3 1.2 3 .8 3.6.8.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.8 12.8 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.8 12.8 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  Crown: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <path d="M2 20h20M3 7l4 4 5-6 5 6 4-4-2 13H5L3 7z" strokeLinejoin="round" />
    </svg>
  ),
  Award: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2">
      <circle cx="12" cy="8" r="6" />
      <path d="M9 14l-2 8 5-3 5 3-2-8" strokeLinejoin="round" />
    </svg>
  ),
};

// ============= REVEAL ON SCROLL =============
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ============= NAVIGATION =============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Story", href: "#story" },
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
              <img src="/images/logo.png" alt="Namaste Biryani logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-logo text-[#f0c75e] text-lg tracking-wider">Namaste</div>
              <div className="font-logo text-[10px] text-[#d4af37]/70 tracking-[0.3em] -mt-0.5">BIRYANI</div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-logo text-[13px] text-[#e8dfc6]/80 hover:text-[#f0c75e] transition-colors tracking-[0.18em]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={generateWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-2.5 rounded-sm text-xs"
            >
              Order Now
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#f0c75e] p-2"
            aria-label="Menu"
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l) => (
                <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-logo text-3xl text-[#f0c75e] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={generateWhatsAppURL()}
            onClick={() => setOpen(false)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-3 rounded-sm text-sm mt-4"
          >
            Order Now
          </a>
        </div>
      </div>
    </>
  );
}

// ============= HERO =============
function Hero() {
  const smokeParticles = Array.from({ length: 14 });
  const spiceParticles = Array.from({ length: 24 });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden royal-pattern">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-biryani.jpg"
          alt="Cinematic biryani"
          className="w-full h-full object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/60"></div>
      </div>

      {/* Ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#e8772e]/15 blur-3xl flicker pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none"></div>

      {/* Social buttons */}
      <a
        href="https://www.instagram.com/namaste.biryani?igsh=MTZqaTh2ZDNuN3p3YQ=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="absolute left-4 sm:left-6 top-[42%] z-20 -translate-y-1/2 w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/60 transition-all"
      >
        <Icon.Instagram />
      </a>
      <a
        href="https://www.facebook.com/61587717032804/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="absolute right-4 sm:right-6 top-[42%] z-20 -translate-y-1/2 w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/60 transition-all"
      >
        <Icon.Facebook />
      </a>

      {/* Smoke overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {smokeParticles.map((_, i) => (
          <div
            key={i}
            className="smoke-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: `-10%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${30 + Math.random() * 60}px`,
              height: `${30 + Math.random() * 60}px`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          ></div>
        ))}
      </div>

      {/* Floating spice particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {spiceParticles.map((_, i) => (
          <div
            key={i}
            className={`spice-particle spice-dot ${i % 3 === 0 ? "w-1.5 h-1.5" : i % 3 === 1 ? "w-1 h-1" : "w-0.5 h-0.5"}`}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${8 + Math.random() * 10}s`,
              "--tx": `${(Math.random() - 0.5) * 120}px`,
            } as React.CSSProperties}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em]">SINCE 2026 · AUTHENTIC DUM</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] font-black text-white mb-6">
            EK BIRYANI,
            <br />
            <span className="title-shine">HAZAR YAADEIN!</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="font-serif-lux italic text-xl sm:text-2xl md:text-3xl text-[#f0e6d0]/90 max-w-2xl mx-auto mb-10 leading-snug">
            Authentic Dum Biryani Crafted with Love & Tradition
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={generateWhatsAppURL()} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 rounded-sm text-sm sm:text-base w-full sm:w-auto">
              Order Now
            </a>
            <a href="#menu" className="btn-ghost-gold px-10 py-4 rounded-sm text-sm sm:text-base w-full sm:w-auto">
              Explore Menu
            </a>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
            {[
              { n: "100%", l: "Fresh Ingredients" },
              { n: "4+", l: "Signature Varieties" },
              { n: "FRESH", l: "Daily Made" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl sm:text-4xl text-gold-gradient">{s.n}</div>
                <div className="font-logo text-[10px] text-[#d4af37]/70 tracking-[0.25em] mt-1">{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-logo text-[9px] text-[#d4af37]/60 tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
      </div>
    </section>
  );
}

// ============= BRAND STORY =============
function Story() {
  const features = [
    { icon: <Icon.Leaf />, title: "Fresh Ingredients", desc: "Hand-picked basmati, farm-fresh produce & pure ghee" },
    { icon: <Icon.Clock />, title: "Slow Cooked", desc: "Sealed in dough & cooked on dum for 2+ hours" },
    { icon: <Icon.Spice />, title: "Authentic Taste", desc: "Generations-old Hyderabadi & Muradabadi recipes" },
    { icon: <Icon.Hand />, title: "Handcrafted Spices", desc: "Roasted & ground in-house, every single day" },
  ];

  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden royal-pattern">
      {/* Decorative corner pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e8772e]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em]">OUR HERITAGE</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient mt-4 mb-4">
              A Legacy in Every Grain
            </h2>
            <div className="gold-divider max-w-xs mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative rounded-sm overflow-hidden aspect-[4/5]">
                <img
                  src="/images/dum-pot.jpg"
                  alt="Dum cooking"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                {/* Decorative gold frame */}
                <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-gradient-to-br from-[#1a1208] to-[#0a0a0a] border border-[#d4af37]/40 p-4 sm:p-6 rounded-sm shadow-2xl">
                <div className="font-display text-3xl sm:text-4xl text-gold-gradient">15+</div>
                <div className="font-logo text-[9px] text-[#d4af37]/80 tracking-[0.3em] mt-1">YEARS OF<br/>MASTERY</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="mb-6">
                <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.4em]">THE DUM ART</span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 leading-tight">
                  Where Patience<br />
                  Meets <span className="text-gold-gradient">Perfection</span>
                </h3>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="font-serif-lux text-lg sm:text-xl text-[#e8dfc6]/80 leading-relaxed mb-8">
                Every pot of Namaste Biryani begins with a whisper of tradition. We layer fragrant saffron-soaked rice over
                marinated meats and fresh vegetables, seal the handi with dough, and let the magic of <em className="text-[#f0c75e]">dum</em> do the rest.
                This is not food. This is a ceremony.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={200 + i * 100}>
                  <div className="flex items-start gap-4 group">
                    <div className="feature-icon flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-cinzel text-[#f0c75e] text-sm tracking-wider mb-1">{f.title}</div>
                      <div className="font-serif-lux text-sm text-[#e8dfc6]/60 leading-snug">{f.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= SIGNATURE MENU =============
const MENU_ITEMS = [
  {
    id: "hv",
    tag: "100% VEG",
    title: "Hyderabadi",
    sub: "Dum Biryani Veg",
    image: "/images/hyderabadi-veg.jpg",
    accent: "from-amber-500/30",
  },
  {
    id: "hn",
    tag: "100% NON-VEG",
    title: "Hyderabadi",
    sub: "Dum Biryani Non-Veg",
    image: "/images/hyderabadi-nonveg.jpg",
    accent: "from-orange-500/30",
  },
  {
    id: "mv",
    tag: "100% VEG",
    title: "Muradabadi",
    sub: "Dum Biryani Veg",
    image: "/images/muradabadi-veg.jpg",
    accent: "from-yellow-500/30",
  },
  {
    id: "mn",
    tag: "100% NON-VEG",
    title: "Muradabadi",
    sub: "Dum Biryani Non-Veg",
    image: "/images/muradabadi-nonveg.jpg",
    accent: "from-red-500/30",
  },
];

const PRICES = [
  { qty: "250g", label: "Quarter", price: 100 },
  { qty: "500g", label: "Half", price: 200 },
  { qty: "1Kg", label: "Full", price: 400 },
];

function SignatureMenu() {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, Record<string, number>>>({});

  const updateQuantity = (itemId: string, qty: string, delta: number) => {
    setSelectedQuantities((prev) => {
      const currentItem = prev[itemId] ?? {};
      const currentCount = currentItem[qty] ?? 0;
      const nextCount = Math.max(0, currentCount + delta);

      return {
        ...prev,
        [itemId]: {
          ...currentItem,
          [qty]: nextCount,
        },
      };
    });
  };

  return (
    <section id="menu" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 royal-pattern"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0604] to-black"></div>
      {/* Warm accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#e8772e]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em]">SIGNATURE COLLECTION</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient mt-4 mb-4">
              Choose Your Perfect Biryani
            </h2>
            <p className="font-serif-lux italic text-lg text-[#e8dfc6]/70 max-w-2xl mx-auto">
              Four royal variations. One unforgettable experience.
            </p>
            <div className="gold-divider max-w-xs mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {MENU_ITEMS.map((item, i) => {
            const quantities = selectedQuantities[item.id] ?? {};
            const orderLines = PRICES.filter((tier) => (quantities[tier.qty] ?? 0) > 0).map((tier) => ({
              qty: tier.qty,
              price: tier.price,
              count: quantities[tier.qty] ?? 0,
            }));
            const totalAmount = orderLines.reduce((sum, line) => sum + line.price * line.count, 0);

            return (
              <Reveal key={item.id} delay={i * 100}>
                <div className="biryani-card rounded-lg h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                    <img src={item.image} alt={item.sub} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} to-transparent opacity-60`}></div>

                    {/* Tag */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-[#d4af37]/40 rounded-full px-3 py-1">
                      <span className="font-logo text-[9px] text-[#f0c75e] tracking-[0.2em]">{item.tag}</span>
                    </div>

                    {/* Steam overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, si) => (
                        <div
                          key={si}
                          className="steam"
                          style={{
                            left: `${20 + si * 15}%`,
                            bottom: "10%",
                            animationDelay: `${si * 0.8}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="font-logo text-[10px] text-[#d4af37]/80 tracking-[0.35em] mb-1">SIGNATURE</div>
                      <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">{item.title}</h3>
                      <p className="font-serif-lux italic text-base text-[#f0c75e]/90 mt-1">{item.sub}</p>

                      {/* Quantity controls */}
                      <div className="mt-5 space-y-3">
                        {PRICES.map((tier) => {
                          const count = quantities[tier.qty] ?? 0;
                          return (
                            <div
                              key={tier.qty}
                              className="flex items-center justify-between rounded-xl border border-[#ffffff]/10 bg-[#ffffff]/5 px-3 py-3 transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5"
                            >
                              <div>
                                <div className="font-cinzel text-[#f0c75e] text-sm font-semibold">{tier.qty}</div>
                                <div className="font-logo text-[9px] text-[#e8dfc6]/50 tracking-[0.2em]">{tier.label.toUpperCase()}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, tier.qty, -1)}
                                  disabled={count === 0}
                                  className="grid h-9 w-9 place-items-center rounded-md border border-[#d4af37]/30 bg-[#0a0a0a] text-[#f0c75e] transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                  aria-label={`Decrease ${tier.qty}`}
                                >
                                  −
                                </button>
                                <span className="min-w-[2rem] text-center font-display text-lg text-white">{count}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, tier.qty, 1)}
                                  className="grid h-9 w-9 place-items-center rounded-md border border-[#d4af37]/30 bg-[#0a0a0a] text-[#f0c75e] transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/10 active:scale-95"
                                  aria-label={`Increase ${tier.qty}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 rounded-2xl border border-[#ffffff]/10 bg-black/60 p-4 text-sm text-[#e8dfc6]/80">
                        {orderLines.length > 0 ? (
                          <div className="space-y-3">
                            {orderLines.map((line) => (
                              <div key={line.qty} className="flex items-center justify-between text-white">
                                <span>{line.qty} × {line.count}</span>
                                <span className="font-display text-[#f0c75e]">₹{line.price * line.count}</span>
                              </div>
                            ))}
                            <div className="border-t border-[#ffffff]/10 pt-3 text-[#f0c75e] font-semibold flex items-center justify-between">
                              <span>Total</span>
                              <span>₹{totalAmount}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#e8dfc6]/70">Select your quantities using the buttons above, then tap Order Now.</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const productName = `${item.title} ${item.sub}`;
                        if (orderLines.length === 0) {
                          window.alert("Please select at least one quantity before ordering.");
                          return;
                        }
                        window.open(createWhatsAppOrderURL(productName, orderLines), "_blank");
                      }}
                      className="btn-gold w-full mt-5 py-3 rounded text-xs"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={600}>
          <div className="text-center mt-16">
            <p className="font-serif-lux italic text-lg text-[#e8dfc6]/60 mb-6">
              "Pure Taste. Pure Biryani. 100% Satisfaction."
            </p>
            {/* Reserve a Table button removed */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============= EXPERIENCE =============
function Experience() {
  const fallingSpices = Array.from({ length: 30 });

  return (
    <section id="experience" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/chef-dum.jpg" alt="Chef" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
      </div>

      {/* Warm fire glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-[#e8772e]/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#d4af37]/10 blur-3xl flicker"></div>

      {/* Falling spice particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fallingSpices.map((_, i) => {
          const colors = ["#d4af37", "#e8772e", "#c9a961", "#a67c00", "#ff8c00"];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="falling-spice absolute"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 10}px`,
                height: `${4 + Math.random() * 10}px`,
                background: `radial-gradient(circle, ${color}, transparent)`,
                boxShadow: `0 0 10px ${color}`,
                borderRadius: "50%",
                animationDuration: `${6 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 8}s`,
                filter: "blur(1px)",
              }}
            ></div>
          );
        })}
      </div>

      {/* Rice grain particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`r${i}`}
            className="falling-spice absolute"
            style={{
              left: `${Math.random() * 100}%`,
              width: "3px",
              height: "10px",
              background: "linear-gradient(180deg, #f5e6c8, #c9a961)",
              borderRadius: "50%",
              animationDuration: `${5 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 6}s`,
              transform: "rotate(30deg)",
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <Reveal>
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em] block mb-6">THE EXPERIENCE</span>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8">
              Witness the<br />
              <span className="title-shine">Magic of Dum</span>
            </h2>
          </Reveal>
          <Reveal delay={400}>
            <p className="font-serif-lux italic text-xl sm:text-2xl text-[#f0e6d0]/80 max-w-2xl mx-auto">
              Spices falling in slow motion. Rice grains dancing in the air.
              Fire, steam, and the ancient art of sealed cooking — all in one breath.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { n: "2hrs", l: "Slow Dum" },
                { n: "12+", l: "Whole Spices" },
                { n: "100%", l: "Handcrafted" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-3xl sm:text-5xl text-gold-gradient">{s.n}</div>
                  <div className="font-logo text-[9px] sm:text-[10px] text-[#d4af37]/70 tracking-[0.25em] mt-2">{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============= REVIEWS =============
function Reviews() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden royal-pattern">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em]">CUSTOMER TRUST</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient mt-4 mb-4">
              Google Customer Reviews
            </h2>
            <p className="font-serif-lux italic text-lg text-[#e8dfc6]/70 max-w-2xl mx-auto">
              Authentic reviews from our valued customers.
            </p>
            <p className="font-serif-lux text-base text-[#e8dfc6]/70 max-w-2xl mx-auto mt-4">
              Google Reviews integration coming soon.
            </p>
            <div className="gold-divider max-w-xs mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="testimonial-card rounded-lg p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
                    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.3-11.4-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.3 5.2C41.7 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
                  </svg>
                  <span className="font-logo text-[10px] text-[#d4af37]/70 tracking-[0.2em]">GOOGLE REVIEW</span>
                </div>

                <p className="font-serif-lux text-base text-[#e8dfc6]/70 leading-relaxed flex-1 italic">
                  Review cards are ready for future Google Reviews feed integration.
                </p>

                <div className="mt-6 pt-5 border-t border-[#d4af37]/15">
                  <div className="font-cinzel text-[#f0c75e] text-sm">Live Google reviews coming soon</div>
                  <div className="font-logo text-[10px] text-[#e8dfc6]/50 tracking-[0.15em] mt-1">
                    This section is prepared for future Google Reviews integration.
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============= GALLERY =============
const GALLERY = [
  { src: "/images/hero-biryani.jpg", label: "The Signature" },
  { src: "/images/hyderabadi-veg.jpg", label: "Hyderabadi Veg" },
  { src: "/images/hyderabadi-nonveg.jpg", label: "Hyderabadi Classic" },
  { src: "/images/HV.jpeg", label: "Hyderabadi Veg (Alt)" },
  { src: "/images/HNV.jpeg", label: "Hyderabadi Non-Veg (Alt)" },
  { src: "/images/dum-pot.jpg", label: "The Dum Seal" },
  { src: "/images/muradabadi-veg.jpg", label: "Muradabadi White" },
  { src: "/images/muradabadi-nonveg.jpg", label: "Muradabadi Non-Veg" },
  { src: "/images/MNV.jpeg", label: "Muradabadi Non-Veg (Alt)" },
  
  { src: "/images/spices-fall.jpg", label: "Whole Spices" },
  { src: "/images/rice-steam.jpg", label: "Saffron Basmati" },
  { src: "/images/chef-dum.jpg", label: "Chef's Touch" },
];

function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0604] to-[#050505]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#e8772e]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-logo text-[11px] text-[#d4af37] tracking-[0.5em]">VISUAL FEAST</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-gradient mt-4 mb-4">
              The Gallery
            </h2>
            <div className="gold-divider max-w-xs mx-auto mt-6"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 80}>
              <div
                className={`gallery-tile rounded-sm ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" :
                  i === 3 ? "md:col-span-2 aspect-video" :
                  "aspect-square"
                }`}
              >
                <img src={g.src} alt={g.label} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Spice marquee divider */}
        <div className="mt-20 py-6 border-y border-[#d4af37]/10 overflow-hidden relative">
          <div className="marquee">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex items-center gap-12 mx-6">
                {["★", "CARDAMOM", "SAFFRON", "CLOVES", "★", "CINNAMON", "STAR ANISE", "BASMATI", "★", "MINT", "FRIED ONION", "GHEE"].map((t, k) => (
                  <span key={k} className="font-display text-[#d4af37]/60 text-xl sm:text-2xl tracking-widest flex items-center gap-12">
                    {t}
                    <span className="text-[#e8772e]/60">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= FOOTER =============
function Footer() {
  return (
    <footer id="footer" className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 royal-pattern"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
                <img src="/images/logo.png" alt="Namaste Biryani logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-logo text-[#f0c75e] text-2xl">Namaste</div>
                <div className="font-logo text-[10px] text-[#d4af37]/70 tracking-[0.3em] -mt-1">BIRYANI</div>
              </div>
            </div>
            <p className="font-serif-lux italic text-[#e8dfc6]/70 leading-relaxed mb-6">
              Ek Biryani, Hazar Yaadein. A royal journey through authentic dum biryani — handcrafted with love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-[#f0c75e] text-lg mb-6 tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {["Our Story", "Signature Menu", "The Experience", "Gallery", "Reviews"].map((l) => (
                <li key={l}>
                  <a href="#" className="font-serif-lux text-[#e8dfc6]/70 hover:text-[#f0c75e] transition-colors flex items-center gap-2 group">
                    <span className="text-[#d4af37]/50 group-hover:text-[#f0c75e] transition-colors">›</span>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[#f0c75e] text-lg mb-6 tracking-wider">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1"><Icon.MapPin /></span>
                <span className="font-serif-lux text-[#e8dfc6]/70 leading-snug">
                  Near Rajeev Gandhi PG Ayurvedic College Gate No. 1,<br />
                  Paprola, Kangra, Himachal Pradesh,<br />
                  Panchrukhi Road, 176061, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1"><Icon.Phone /></span>
                <span className="font-serif-lux text-[#e8dfc6]/70">+91 83508 50150</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4af37] mt-1"><Icon.Clock /></span>
                <span className="font-serif-lux text-[#e8dfc6]/70 leading-snug">
                  opening timimg 12pm to 09pm closed on tuesday
                </span>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-display text-[#f0c75e] text-lg mb-6 tracking-wider">Order Instantly</h4>
            <p className="font-serif-lux text-[#e8dfc6]/70 mb-6 leading-relaxed">
              Skip the wait. WhatsApp us your order and get fresh hot biryani delivered to your doorstep.
            </p>
            <a
              href={generateWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-float inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-sm"
            >
              <Icon.WhatsApp />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="font-logo text-[10px] text-[#d4af37]/50 tracking-[0.3em]">
            © 2026 NAMASTE BIRYANI · ALL RIGHTS RESERVED
          </div>
          <div className="font-serif-lux italic text-sm text-[#e8dfc6]/50">
            "Thank you for choosing Namaste Biryani. Come Hungry, Leave Happy."
            <span className="text-[#d4af37]"> ♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============= FLOATING WHATSAPP =============
function FloatingWhatsApp() {
  return (
    <a
      href={generateWhatsAppURL()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white"
      aria-label="Order on WhatsApp"
    >
      <Icon.WhatsApp />
    </a>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioSrc = encodeURI('/audio/Tabla Saffron Glow (1).mp3');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;
    audio.loop = true;

    const onError = () => {
      setAudioError('Unable to load the audio track.');
      console.error('Audio playback error:', audio.error);
    };

    const onCanPlayThrough = () => {
      setAudioError(null);
    };

    audio.addEventListener('error', onError);
    audio.addEventListener('canplaythrough', onCanPlayThrough);

    return () => {
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplaythrough', onCanPlayThrough);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.error) {
      setAudioError('Unable to load the audio track.');
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Music playback requires user interaction.', error);
      setAudioError('Playback failed. Please try again.');
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="none" />
      <div className="fixed bottom-24 left-6 z-40 flex flex-wrap items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#0a0a0a]/90 px-4 py-2 text-sm text-[#f5f1e8] shadow-2xl backdrop-blur-md sm:bottom-6 sm:left-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#d4af37] animate-pulse"></span>
          <span className="uppercase tracking-[0.3em] text-[10px] text-[#d4af37]">Music</span>
        </div>
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-full bg-[#d4af37] px-3 py-2 text-xs font-semibold uppercase text-[#0a0a0a] transition hover:bg-[#f0c75e]"
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {audioError && (
          <div className="w-full text-left text-[10px] text-red-300">{audioError}</div>
        )}
      </div>
    </>
  );
}

// ============= APP =============
export default function App() {
  // Preload images
  useEffect(() => {
    const imgs = [
      "/images/hero-biryani.jpg",
      "/images/dum-pot.jpg",
      "/images/chef-dum.jpg",
      "/images/hyderabadi-veg.jpg",
      "/images/hyderabadi-nonveg.jpg",
      "/images/HV.jpeg",
      "/images/HNV.jpeg",
      "/images/muradabadi-veg.jpg",
      "/images/muradabadi-nonveg.jpg",
      "/images/MNV.jpeg",
      
      "/images/spices-fall.jpg",
      "/images/rice-steam.jpg",
    ];
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative bg-[#050505] text-[#f5f1e8] overflow-x-hidden">
      <Nav />
      <Hero />
      <Story />
      <SignatureMenu />
      <Experience />
      <Reviews />
      <Gallery />
      <Footer />
      <MusicPlayer />
      <FloatingWhatsApp />
    </div>
  );
}








