import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import serviceGrossesseImg from '../assets/images/service-grossesse.jpg';
import serviceEchographieImg from '../assets/images/service-echographie.jpg';
import doctorUltrasoundImg from '../assets/images/doctor-ultrasound.jpg';
import examRoom1Img from '../assets/images/exam-room-1.jpg';
import serviceCesarienneImg from '../assets/images/service-cesarienne.jpg';
import examRoom2Img from '../assets/images/exam-room-2.jpg';

const SERVICE_IMAGES = {
  grossesse: serviceGrossesseImg,
  echographie: serviceEchographieImg,
  ultrasound: doctorUltrasoundImg,
  exam1: examRoom1Img,
  cesarienne: serviceCesarienneImg,
  exam2: examRoom2Img,
};

export default function Services({ onSelectService }) {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" className="py-16 lg:py-24 hero-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-rose-light text-brand-rose text-xs sm:text-sm font-bold">
            {t.services.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-slate">
            {t.services.subtitle}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.services.items.map((service) => {
            const imgSrc = SERVICE_IMAGES[service.imageKey] || examRoom1Img;
            return (
              <article
                key={service.id}
                className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-52 overflow-hidden bg-brand-rose-light">
                    <img
                      src={imgSrc}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3.5 start-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-rose text-xs font-bold shadow-sm">
                      {service.category}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-extrabold text-brand-charcoal leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-brand-rose-light/90 text-brand-rose-deep text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-rose-light hover:bg-brand-rose text-brand-rose hover:text-white font-bold text-sm transition group"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{t.services.bookAction}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
