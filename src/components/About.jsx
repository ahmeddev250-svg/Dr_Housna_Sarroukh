import React from 'react';
import { GraduationCap, Heart, Stethoscope, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import waitingRoomImg from '../assets/images/waiting-room.jpg';

export default function About() {
  const { t } = useLanguage();
  const pillarIcons = [Heart, Stethoscope, ShieldCheck];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-rose-light text-brand-rose text-xs sm:text-sm font-bold">
              {t.about.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-brand-slate leading-relaxed">
              {t.about.lead}
            </p>

            {/* Academic Qualifications Card */}
            <div className="glass-card p-6 bg-brand-cream/80 border-brand-rose-soft/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-rose text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-brand-charcoal">
                  {t.about.credentialsTitle}
                </h3>
              </div>

              <ul className="space-y-3">
                {t.about.credentials.map((cred, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-brand-charcoal font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-rose mt-2.5 shrink-0" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Authentic Cabinet Space & 3 Core Pillars */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-card p-3 shadow-glass">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-brand-rose-light">
                <img
                  src={waitingRoomImg}
                  alt={t.about.cardCaption}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-xs text-center text-brand-slate font-medium mt-2.5">
                {t.about.cardCaption}
              </p>
            </div>

            <div className="space-y-3.5">
              {t.about.pillars.map((pillar, idx) => {
                const IconComponent = pillarIcons[idx % pillarIcons.length];
                return (
                  <div key={idx} className="glass-card p-4 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-rose-light text-brand-rose flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-charcoal">{pillar.title}</h4>
                      <p className="text-sm text-brand-slate mt-1 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
