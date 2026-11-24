import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Send,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BUSINESS_INFO } from '../translations';
import { generateSlotsForDate } from '../utils/clinicStatus';

function getTodayCasablancaISO() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const minDate = useMemo(() => getTodayCasablancaISO(), []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || '');
  const [date, setDate] = useState(minDate);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Sync preselected service when opened from a service card
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  // Lock background page scroll and listen for Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const slots = useMemo(() => generateSlotsForDate(date), [date]);

  // Reset selected slot if it becomes unavailable when date changes
  useEffect(() => {
    const stillValid = slots.some((s) => s.label === selectedSlot && !s.disabled);
    if (!stillValid) {
      setSelectedSlot('');
    }
  }, [date, slots, selectedSlot]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = t.modal.errors.nameRequired;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = t.modal.errors.phoneRequired;
    }
    if (!service.trim()) nextErrors.service = t.modal.errors.serviceRequired;
    if (!date) nextErrors.date = t.modal.errors.dateRequired;
    if (!selectedSlot) nextErrors.slot = t.modal.errors.slotRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanNotes = notes.trim() || (lang === 'ar' ? 'لا توجد ملاحظات' : 'Aucune');

    const message =
      lang === 'ar'
        ? `مرحباً،

أرغب في حجز موعد.

الاسم : ${name.trim()}
رقم الهاتف : ${phone.trim()}
الخدمة المطلوبة : ${service}
التاريخ : ${date}
الوقت : ${selectedSlot}
مدة الموعد : 30 دقيقة
ملاحظات : ${cleanNotes}

شكراً، يرجى تأكيد الموعد.`
        : `Bonjour,

Je souhaite prendre un rendez-vous.

Nom : ${name.trim()}
Téléphone : ${phone.trim()}
Prestation : ${service}
Date : ${date}
Heure : ${selectedSlot}
Durée : 30 minutes
Notes : ${cleanNotes}

Merci de me confirmer la disponibilité.`;

    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumberClean}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const isClosedDay = slots.length === 0;
  const hasEnabledSlots = slots.some((s) => !s.disabled);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-brand-charcoal/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-rose-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Sticky Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-white border-b border-brand-rose-soft/70 shrink-0">
          <div>
            <h2
              id="appointment-modal-title"
              className="text-lg sm:text-xl font-extrabold text-brand-charcoal"
            >
              {t.modal.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-rose font-semibold">
              {t.modal.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-rose-light hover:bg-brand-rose text-brand-charcoal hover:text-white text-xs sm:text-sm font-bold transition shrink-0"
          >
            <X className="w-4 h-4" />
            <span>{t.modal.closeBtn}</span>
          </button>
        </div>

        {/* Internally Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 sm:px-7 py-5 space-y-5">
          {/* Client Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-1.5">
                {t.modal.nameLabel}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-rose absolute top-3.5 start-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.modal.namePlaceholder}
                  className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-brand-rose-soft focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none text-sm"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-1.5">
                {t.modal.phoneLabel}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-rose absolute top-3.5 start-3.5 pointer-events-none" />
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.modal.phonePlaceholder}
                  className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-brand-rose-soft focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none text-sm"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Service Selection & Date */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-1.5">
                {t.modal.serviceLabel}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-rose-soft focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none text-sm bg-white"
              >
                <option value="">{t.modal.servicePlaceholder}</option>
                {t.services.items.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.service}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-1.5">
                {t.modal.dateLabel}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-brand-rose absolute top-3.5 start-3.5 pointer-events-none" />
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-brand-rose-soft focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none text-sm"
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>
          </div>

          {/* 30-Minute Time Slots Grid */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm font-bold text-brand-charcoal flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-rose" />
                <span>{t.modal.slotsLabel}</span>
              </label>
              <span className="text-xs font-semibold text-brand-rose">
                {t.modal.durationNotice}
              </span>
            </div>

            {isClosedDay ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-brand-rose-soft text-sm font-semibold text-brand-rose-deep">
                {t.modal.noSlotsClosed}
              </div>
            ) : !hasEnabledSlots ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800">
                {t.modal.noSlotsToday}
              </div>
            ) : (
              <div
                dir="ltr"
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1"
              >
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.label;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.disabled}
                      onClick={() => setSelectedSlot(slot.label)}
                      className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition ${
                        slot.disabled
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-brand-rose text-white border-brand-rose shadow-sm'
                          : 'bg-brand-cream hover:bg-brand-rose-light text-brand-charcoal border-brand-rose-soft'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}

            {errors.slot && (
              <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.slot}</span>
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-bold text-brand-charcoal mb-1.5">
              {t.modal.notesLabel}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-brand-rose absolute top-3 start-3.5 pointer-events-none" />
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.modal.notesPlaceholder}
                className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-brand-rose-soft focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none text-sm"
              />
            </div>
          </div>

          {/* Pending Confirmation Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-brand-rose-light/70 border border-brand-rose-soft flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal">
            <Info className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
            <span>{t.modal.pendingNotice}</span>
          </div>

          {/* Action Footer with Explicit Annuler / إلغاء Cancel Button */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2 border-t border-brand-rose-soft/60">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-charcoal font-bold text-sm transition text-center"
            >
              {t.modal.cancelBtn}
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-rose hover:bg-brand-rose-dark text-white font-bold text-sm shadow-md transition"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>{t.modal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
