import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';
import logoImg from '../assets/images/logo.png';

export default function Footer({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const whatsappDirectUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumberClean}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً دكتورة حسنى الصروخ، أود الاستفسار أو حجز موعد.'
      : 'Bonjour Dr Housna Sarroukh, je souhaite obtenir un renseignement ou prendre un rendez-vous.'
  )}`;

  return (
    <>
      <footer className="bg-brand-rose-deep text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
                  <img
                    src={logoImg}
                    alt={t.nav.brand}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {t.nav.brand}
                  </h2>
                  <p className="text-sm sm:text-base text-brand-rose-soft font-semibold">
                    {t.nav.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                {t.footer.tagline}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl bg-white/15 hover:bg-brand-rose text-white flex items-center justify-center transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-xl bg-white/15 hover:bg-brand-rose text-white flex items-center justify-center transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {t.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-white/85">
                <li>
                  <a href="#about" className="hover:text-brand-rose-soft transition">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-brand-rose-soft transition">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#cabinet" className="hover:text-brand-rose-soft transition">
                    {t.nav.cabinet}
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-brand-rose-soft transition">
                    {t.nav.reviews}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="hover:text-brand-rose-soft transition font-semibold text-start"
                  >
                    {t.hero.primaryCta}
                  </button>
                </li>
              </ul>
            </div>

            {/* Coordinates Column */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {t.footer.contactTitle}
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-rose-soft shrink-0 mt-1" />
                  <span>
                    {lang === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-rose-soft shrink-0" />
                  <a
                    href={BUSINESS_INFO.landlineHref}
                    dir="ltr"
                    className="hover:text-brand-rose-soft transition font-semibold"
                  >
                    {BUSINESS_INFO.landlineDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-rose-soft shrink-0" />
                  <a
                    href={`tel:${BUSINESS_INFO.whatsappInternational}`}
                    dir="ltr"
                    className="hover:text-brand-rose-soft transition font-bold"
                  >
                    {BUSINESS_INFO.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-rose-soft shrink-0" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="hover:text-brand-rose-soft transition break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/75">
            <p>
              © {currentYear} {t.nav.brand} — {t.footer.rights}
            </p>
            <p className="font-medium">Agdal, Rabat • Maroc</p>
          </div>
        </div>
      </footer>

      {/* Floating Direct WhatsApp Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Dr Housna Sarroukh"
        className="fixed bottom-5 end-5 z-30 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline">{t.footer.whatsappFloat}</span>
      </a>
    </>
  );
}
