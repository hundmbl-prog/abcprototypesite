import type { OpeningSlot } from '@/content/types'

export const weekdayNames = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]
const shortNames = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.']
const weekdayIndex: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
}

/** Current weekday (1–7) and minutes since midnight in Mainz, independent of the visitor's time zone. */
export function nowInBerlin(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: weekdayIndex[get('weekday')] ?? 1,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

function toMinutes(time: string) {
  const [h = '0', m = '0'] = time.split(':')
  return Number(h) * 60 + Number(m)
}

export function formatTime(time: string) {
  const [h = '0', m = '00'] = time.split(':')
  return `${Number(h)}:${m}`
}

export type OpenStatus =
  | { state: 'open'; until: string }
  | { state: 'closed'; next?: { label: string; time: string } }
  | { state: 'appointment' }

/** Open/closed right now, and when it opens next. */
export function openStatus(schedule: OpeningSlot[], date = new Date()): OpenStatus {
  if (schedule.length === 0) return { state: 'appointment' }
  const { day, minutes } = nowInBerlin(date)
  const today = schedule.filter((s) => s.day === day)
  const current = today.find((s) => minutes >= toMinutes(s.open) && minutes < toMinutes(s.close))
  if (current) return { state: 'open', until: formatTime(current.close) }
  for (let offset = 0; offset < 8; offset++) {
    const d = ((day - 1 + offset) % 7) + 1
    const slot = schedule
      .filter((s) => s.day === d && (offset > 0 || toMinutes(s.open) > minutes))
      .sort((a, b) => toMinutes(a.open) - toMinutes(b.open))[0]
    if (slot) {
      const label = offset === 0 ? 'heute' : offset === 1 ? 'morgen' : (shortNames[d - 1] ?? '')
      return { state: 'closed', next: { label, time: formatTime(slot.open) } }
    }
  }
  return { state: 'closed' }
}
