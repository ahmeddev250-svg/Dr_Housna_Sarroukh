import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  DoorOpen,
  DoorClosed,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';
import { getClinicStatus } from '../utils/clinicStatus';
import receptionImg from '../assets/images/reception.jpg';
import waitingRoomImg from '../assets/images/waiting-room.jpg';
import examRoom1Img from '../assets/images/exam-room-1.jpg';
import examRoom2Img from '../assets/images/exam-room-2.jpg';
import doctorOfficeImg from '../assets/images/doctor-office.jpg';
import deliveryCareImg from '../assets/images/delivery-care.jpg';

const CABINET_IMAGES = {
  reception: receptionImg,
  waiting: waitingRoomImg,
  exam1: examRoom1Img,
  exam2: examRoom2Img,
  office: doctorOfficeImg,
  delivery: deliveryCareImg,
};

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const filterKeys = ['all', 'waiting', 'exam', 'care'];
  const filteredPhotos =
    activeFilter === 'all'
      ? t.cabinet.photos
      : t.cabinet.photos.filter((p) => p.category === activeFilter);

  return (
    <section id="cabinet" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-rose-light text-brand-rose text-xs sm:text-sm font-bold">
            {t.cabinet.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
            {t.cabinet.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-slate">
            {t.cabinet.subtitle}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  activeFilter === key
                    ? 'bg-brand-rose text-white shadow-sm'
                    : 'bg-brand-rose-light/75 text-brand-charcoal hover:bg-brand-rose-light'
                }`}
              >
                {t.cabinet.filters[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Authentic Photo Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, idx) => (
            <div
              key={`${item.key}-${idx}`}
              className="group relative rounded-2xl overflow-hidden shadow-glass border border-brand-rose-soft/60 aspect-[4/3] bg-brand-rose-light"
            >
              <img
                src={CABINET_IMAGES[item.key]}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/35 to-transparent p-4">
                <p className="text-sm font-bold text-white">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hours, Coordinates & Google Map Grid */}
        <div id="contact" className="grid lg:grid-cols-12 gap-8 items-stretch pt-4">
          {/* Operating Hours + Contact Card */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* Hours Card with Live DoorOpen / DoorClosed Badge */}
            <div className="glass-card p-6 sm:p-7 bg-brand-cream/85 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-charcoal">
                    {t.cabinet.hoursTitle}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-brand-rose-deep border-brand-rose-soft'
                  }`}
                >
                  {status.isOpen ? (
                    <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <DoorClosed className="w-4 h-4 text-brand-rose shrink-0" />
                  )}
                  <span>{status.label}</span>
                </span>
              </div>

              <div className="divide-y divide-brand-rose-soft/60">
                {t.cabinet.scheduleRows.map((row, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <span className="font-bold text-brand-charcoal text-sm sm:text-base">
                      {row.days}
                    </span>
                    <span
                      dir="ltr"
                      className="px-3 py-1 rounded-lg bg-white text-brand-rose font-bold text-sm border border-brand-rose-soft/70"
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                {t.cabinet.scheduleNote}
              </p>
            </div>

            {/* Coordonnées Card */}
            <div className="glass-card p-6 sm:p-7 bg-brand-cream/85 space-y-4">
              <h3 className="text-xl font-extrabold text-brand-charcoal">
                {t.cabinet.contactTitle}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-rose shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-slate">
                      {t.cabinet.addressLabel}
                    </span>
                    <span className="font-semibold text-brand-charcoal">
                      {lang === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                    </span>
                    <span className="block text-xs text-brand-slate mt-0.5">
                      {lang === 'ar' ? BUSINESS_INFO.landmarkAr : BUSINESS_INFO.landmarkFr}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-brand-slate">
                        {t.cabinet.landlineLabel}
                      </span>
                      <a
                        href={BUSINESS_INFO.landlineHref}
                        dir="ltr"
                        className="font-bold text-brand-charcoal hover:text-brand-rose transition"
                      >
                        {BUSINESS_INFO.landlineDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-brand-slate">
                        {t.cabinet.mobileLabel}
                      </span>
                      <a
                        href={`tel:${BUSINESS_INFO.whatsappInternational}`}
                        dir="ltr"
                        className="font-bold text-brand-rose hover:text-brand-rose-dark transition"
                      >
                        {BUSINESS_INFO.whatsappDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Mail className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-slate">
                      {t.cabinet.emailLabel}
                    </span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="font-semibold text-brand-charcoal hover:text-brand-rose transition break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Instagram & Facebook Links inside Coordonnées */}
                <div className="pt-3 border-t border-brand-rose-soft/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <a
                      href={BUSINESS_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Dr Housna Sarroukh"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-rose-soft text-brand-charcoal hover:text-brand-rose hover:border-brand-rose text-xs sm:text-sm font-bold transition shadow-sm"
                    >
                      <Instagram className="w-4 h-4 text-brand-rose" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={BUSINESS_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Dr Housna Sarroukh"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-rose-soft text-brand-charcoal hover:text-brand-rose hover:border-brand-rose text-xs sm:text-sm font-bold transition shadow-sm"
                    >
                      <Facebook className="w-4 h-4 text-brand-rose" />
                      <span>Facebook</span>
                    </a>
                  </div>

                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-rose hover:text-brand-rose-dark transition"
                  >
                    <span>{t.cabinet.directionsBtn}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-6">
            <div className="glass-card p-3 h-full min-h-[380px] flex flex-col shadow-glass">
              <iframe
                title="Localisation Cabinet Dr Housna Sarroukh Agdal Rabat"
                src={BUSINESS_INFO.googleMapsEmbedUrl}
                className="w-full h-full min-h-[360px] rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
