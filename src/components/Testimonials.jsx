import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-16 lg:py-24 hero-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header + Verified Google Rating Summary */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-rose-light text-brand-rose text-xs sm:text-sm font-bold">
            {t.reviews.eyebrow}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
            {t.reviews.title}
          </h2>

          {/* Rating Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-2xl glass-card shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-base sm:text-lg font-extrabold text-brand-charcoal">
              {t.reviews.ratingBadge}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-brand-slate">
              ({t.reviews.countBadge})
            </span>
          </div>

          {/* Patient Keyword Chips */}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              {t.reviews.keywordsLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {t.reviews.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-rose-soft text-xs sm:text-sm font-bold text-brand-charcoal shadow-sm"
                >
                  <span>{kw.word}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-brand-rose-light text-brand-rose text-xs font-extrabold">
                    {kw.count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Authentic Reviews Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {t.reviews.items.map((review, idx) => (
            <article
              key={idx}
              className="glass-card glass-card-hover p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-rose/35" />
                </div>

                <p
                  dir={review.lang === 'ar' ? 'rtl' : 'ltr'}
                  className="text-sm sm:text-base text-brand-charcoal/90 leading-relaxed"
                >
                  {review.text}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-rose-soft/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-rose text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-brand-charcoal">{review.author}</h3>
                  <span className="text-xs font-semibold text-brand-slate">{review.meta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Direct Google Maps Reviews Button */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-brand-rose hover:text-white text-brand-charcoal border border-brand-rose-soft hover:border-brand-rose font-bold text-sm sm:text-base shadow-sm transition"
          >
            <span>{t.reviews.viewAllBtn}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
