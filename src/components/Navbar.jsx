import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';
import logoImg from '../assets/images/logo.png';

export default function Navbar({ onOpenBooking }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 glass-navigation">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-3 lg:gap-5">
          {/* Brand Logo + Name */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="h-14 w-16 sm:h-16 sm:w-20 rounded-2xl bg-white/90 border border-brand-rose-soft/80 p-1.5 flex items-center justify-center shadow-sm group-hover:shadow-md transition">
              <img
                src={logoImg}
                alt={t.nav.brand}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block text-lg sm:text-xl font-extrabold text-brand-charcoal tracking-tight leading-tight whitespace-nowrap">
                {t.nav.brand}
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-brand-rose whitespace-nowrap">
                {t.nav.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-brand-charcoal/85 hover:text-brand-rose transition whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Controls */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 shrink-0">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center rounded-full bg-brand-rose-light/80 p-1 border border-brand-rose-soft shrink-0"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => toggleLanguage('fr')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap ${
                  lang === 'fr'
                    ? 'bg-brand-rose text-white shadow-sm'
                    : 'text-brand-charcoal hover:text-brand-rose'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => toggleLanguage('ar')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap ${
                  lang === 'ar'
                    ? 'bg-brand-rose text-white shadow-sm'
                    : 'text-brand-charcoal hover:text-brand-rose'
                }`}
              >
                AR
              </button>
            </div>

            {/* Unified Mobile / WhatsApp Phone Pill */}
            <a
              href={`tel:${BUSINESS_INFO.whatsappInternational}`}
              dir="ltr"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-brand-rose-soft text-brand-charcoal hover:border-brand-rose hover:text-brand-rose text-sm font-bold shadow-sm transition whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-brand-rose shrink-0" />
              <span>{t.nav.callBtn}</span>
            </a>

            {/* Primary Appointment CTA */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-rose hover:bg-brand-rose-dark text-white text-sm font-bold shadow-md hover:shadow-lg transition whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleLanguage()}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-brand-rose-light text-brand-rose text-xs font-extrabold border border-brand-rose-soft"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
              className="p-2.5 rounded-xl bg-white border border-brand-rose-soft text-brand-charcoal hover:text-brand-rose"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-rose-soft px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-semibold text-brand-charcoal hover:bg-brand-rose-light hover:text-brand-rose transition"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-brand-rose-soft/60 flex flex-col gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.whatsappInternational}`}
              dir="ltr"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-rose-light text-brand-charcoal font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-brand-rose" />
              <span>{BUSINESS_INFO.whatsappDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-rose text-white font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
