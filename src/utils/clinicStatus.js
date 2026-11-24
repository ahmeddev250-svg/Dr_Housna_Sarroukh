/**
 * Real-time Open / Closed evaluator synchronized with Africa/Casablanca timezone.
 * Operating Schedule:
 * - Monday to Friday (1..5): 09:00 – 18:00 (continuous)
 * - Saturday (6): 09:00 – 13:00
 * - Sunday (0): Closed
 */

export const SCHEDULE_CONFIG = {
  1: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  2: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  3: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  4: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  5: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  6: { open: 9 * 60, close: 13 * 60, openStr: '09:00', closeStr: '13:00' },
  0: null,
};

const DAY_NAMES = {
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

export function getCasablancaNow() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Casablanca',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[map.weekday] ?? now.getDay();
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);

  return {
    dayOfWeek,
    minutesFromMidnight: hour * 60 + minute,
  };
}

export function getClinicStatus(lang = 'fr') {
  const { dayOfWeek, minutesFromMidnight } = getCasablancaNow();
  const todaySchedule = SCHEDULE_CONFIG[dayOfWeek];

  if (
    todaySchedule &&
    minutesFromMidnight >= todaySchedule.open &&
    minutesFromMidnight < todaySchedule.close
  ) {
    return {
      isOpen: true,
      label: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      detail:
        lang === 'ar'
          ? `يغلق على الساعة ${todaySchedule.closeStr}`
          : `Ferme à ${todaySchedule.closeStr}`,
    };
  }

  // Before opening today
  if (todaySchedule && minutesFromMidnight < todaySchedule.open) {
    return {
      isOpen: false,
      label: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
      detail:
        lang === 'ar'
          ? `يفتح اليوم على الساعة ${todaySchedule.openStr}`
          : `Ouvre aujourd'hui à ${todaySchedule.openStr}`,
    };
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (dayOfWeek + offset) % 7;
    const nextSched = SCHEDULE_CONFIG[nextDay];
    if (nextSched) {
      const dayLabel =
        offset === 1
          ? lang === 'ar'
            ? 'غداً'
            : 'demain'
          : DAY_NAMES[lang][nextDay];
      return {
        isOpen: false,
        label: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
        detail:
          lang === 'ar'
            ? `يفتح ${dayLabel} على الساعة ${nextSched.openStr}`
            : `Ouvre ${dayLabel} à ${nextSched.openStr}`,
      };
    }
  }

  return {
    isOpen: false,
    label: lang === 'ar' ? 'مغلق' : 'Fermé',
    detail: '',
  };
}

/**
 * Generates fixed 30-minute time slots for a given YYYY-MM-DD date string.
 * Marks past slots on the current Casablanca day as disabled.
 */
export function generateSlotsForDate(dateString) {
  if (!dateString) return [];

  const [year, month, day] = dateString.split('-').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = dateObj.getUTCDay();
  const schedule = SCHEDULE_CONFIG[dayOfWeek];

  if (!schedule) return [];

  // Check if selected date is today in Casablanca
  const now = new Date();
  const todayStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  const isToday = dateString === todayStr;
  const { minutesFromMidnight } = getCasablancaNow();

  const slots = [];
  for (let start = schedule.open; start + 30 <= schedule.close; start += 30) {
    const end = start + 30;
    const formatTime = (mins) => {
      const h = String(Math.floor(mins / 60)).padStart(2, '0');
      const m = String(mins % 60).padStart(2, '0');
      return `${h}:${m}`;
    };

    const startStr = formatTime(start);
    const endStr = formatTime(end);
    const disabled = isToday && start <= minutesFromMidnight + 15;

    slots.push({
      id: `${startStr}-${endStr}`,
      label: `${startStr} – ${endStr}`,
      startStr,
      disabled,
    });
  }

  return slots;
}
