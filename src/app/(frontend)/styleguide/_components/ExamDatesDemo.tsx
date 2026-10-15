'use client'

import { useEffect, useState } from 'react'
import { ExamDates } from '@/components/page/ExamDates'
import { telcExams } from '@/content/exams'
import type { ExamDate } from '@/content/types'

/** ISO date n days from today (Europe/Berlin). */
function inDays(n: number) {
  const d = new Date(Date.now() + n * 86_400_000)
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(d)
}

/**
 * Styleguide only: the real exam-dates component with clearly marked example data, built relative
 * to today so the demo never runs out of date. Never shown on public pages.
 */
export function ExamDatesDemo() {
  const [dates, setDates] = useState<ExamDate[] | null>(null)
  useEffect(() => {
    setDates([
      {
        id: 'demo-1',
        examId: 'b1',
        date: inDays(30),
        time: '09:00',
        location: 'Mainz',
        registrationDeadline: inDays(9),
        seatsTotal: 16,
        seatsFree: 9,
      },
      {
        id: 'demo-2',
        examId: 'b2',
        date: inDays(37),
        time: '09:00',
        location: 'Mainz',
        registrationDeadline: inDays(16),
        seatsTotal: 12,
        seatsFree: 2,
      },
      {
        id: 'demo-3',
        examId: 'a1',
        date: inDays(44),
        time: '10:00',
        location: 'Bad Kreuznach',
        registrationDeadline: inDays(23),
        seatsTotal: 8,
        seatsFree: 0,
      },
      {
        id: 'demo-4',
        examId: 'c1-hochschule',
        date: inDays(51),
        time: '08:30',
        location: 'Mainz',
        registrationDeadline: inDays(30),
        seatsTotal: 16,
        seatsFree: 11,
      },
      {
        id: 'demo-5',
        examId: 'b1',
        date: inDays(5),
        time: '09:00',
        location: 'Mainz',
        registrationDeadline: inDays(-2),
        seatsTotal: 16,
        seatsFree: 4,
      },
    ])
  }, [])
  if (!dates) return <div className="h-64 animate-pulse rounded-2xl bg-surface-3" aria-hidden />
  return (
    <ExamDates
      exams={telcExams}
      dates={dates}
      emptyText=""
      phone="+49 6131 385147"
      email="kontakt@abc-mainz.de"
    />
  )
}
