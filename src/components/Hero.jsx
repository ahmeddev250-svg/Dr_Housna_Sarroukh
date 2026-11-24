import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Star,
  MapPin,
  HeartHandshake,
  Sparkles,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';
import { getClinicStatus } from '../utils/clinicStatus';
import doctorOfficeImg from '../assets/images/doctor-office.jpg';
import logoEmblemImg from '../assets/images/logo-emblem.png';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 hero-mesh overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left / Start Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Status & Google Rating Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border shadow-sm ${
                  status.isOpen
                    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50/95 text-brand-rose-deep border-brand-rose-soft'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-brand-rose shrink-0" />
                )}
                <span>{status.label}</span>
                {status.detail && (
                  <span className="font-medium opacity-80">• {status.detail}</span>
                )}
              </span>

              <a
                href="#reviews"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill text-xs sm:text-sm font-bold text-brand-charcoal hover:border-brand-rose transition shadow-sm"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>{t.hero.ratingText}</span>
              </a>
            </div>

            {/* Welcoming Multi-Line Headline starting with Bienvenue / مرحباً بكم */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-brand-charcoal tracking-tight leading-[1.16] whitespace-pre-line">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-slate leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand-rose hover:bg-brand-rose-dark text-white font-bold text-base shadow-glass-lg transition"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.whatsappInternational}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/90 hover:bg-white text-brand-charcoal border border-brand-rose-soft hover:border-brand-rose font-bold text-base shadow-sm transition"
              >
                <Phone className="w-5 h-5 text-brand-rose shrink-0" />
                <span dir="ltr">{t.hero.secondaryCta}</span>
              </a>
            </div>

            {/* 3 Glass Quick Info Cards */}
            <div className="grid sm:grid-cols-3 gap-3.5 pt-4">
              <div className="glass-card p-4">
                <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-rose flex items-center justify-center mb-2.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-charcoal">{t.hero.card1Title}</h2>
                <p className="text-xs text-brand-slate mt-1 leading-relaxed">{t.hero.card1Sub}</p>
              </div>

              <div className="glass-card p-4">
                <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-rose flex items-center justify-center mb-2.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-charcoal">{t.hero.card2Title}</h2>
                <p className="text-xs text-brand-slate mt-1 leading-relaxed">{t.hero.card2Sub}</p>
              </div>

              <div className="glass-card p-4">
                <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-rose flex items-center justify-center mb-2.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-charcoal">{t.hero.card3Title}</h2>
                <p className="text-xs text-brand-slate mt-1 leading-relaxed">{t.hero.card3Sub}</p>
              </div>
            </div>
          </div>

          {/* Right / End Authentic Doctor Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="glass-card p-3 sm:p-4 shadow-glass-lg">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.3] bg-brand-rose-light">
                  <img
                    src={doctorOfficeImg}
                    alt={`${BUSINESS_INFO.doctorNameFr} — ${BUSINESS_INFO.specialtyFr}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent p-5 text-white">
                    <p className="text-lg font-extrabold leading-snug">
                      {lang === 'ar' ? BUSINESS_INFO.doctorNameAr : BUSINESS_INFO.doctorNameFr}
                    </p>
                    <p className="text-xs sm:text-sm text-brand-rose-soft font-medium">
                      {lang === 'ar' ? BUSINESS_INFO.specialtyAr : BUSINESS_INFO.specialtyFr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Logo Emblem Badge */}
              <div className="hidden sm:flex items-center gap-3 glass-card px-4 py-3 absolute -bottom-5 -start-5 shadow-glass-lg">
                <div className="w-14 h-14 rounded-2xl bg-brand-rose-light p-2 flex items-center justify-center shrink-0">
                  <img
                    src={logoEmblemImg}
                    alt="Emblème Dr Housna Sarroukh"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-rose">
                    {t.hero.badge}
                  </span>
                  <span className="block text-sm font-extrabold text-brand-charcoal" dir="ltr">
                    {BUSINESS_INFO.landlineDisplay}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
