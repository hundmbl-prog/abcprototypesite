/**
 * telc exams offered at the ABC and their dates (Payload collections "telc-exams" and
 * "exam-dates" in Step 5, editable by staff).
 *
 * examDates is empty on purpose: there are no confirmed dates yet. The page then shows
 * "Neue Termine folgen in Kürze" instead of invented dates.
 */
import type { ExamDate, TelcExam } from './types'

export const telcExams: TelcExam[] = [
  {
    id: 'a1',
    level: 'A1',
    name: 'Start Deutsch 1 / telc Deutsch A1',
    slug: 'telc-deutsch-a1',
    partialRetake: false,
  },
  {
    id: 'a2',
    level: 'A2',
    name: 'Start Deutsch 2 / telc Deutsch A2',
    slug: 'telc-deutsch-a2',
    partialRetake: false,
  },
  {
    id: 'b1',
    level: 'B1',
    name: 'Zertifikat Deutsch / telc Deutsch B1',
    slug: 'telc-deutsch-b1',
    partialRetake: true,
  },
  { id: 'b2', level: 'B2', name: 'telc Deutsch B2', slug: 'telc-deutsch-b2', partialRetake: true },
  { id: 'c1', level: 'C1', name: 'telc Deutsch C1', slug: 'telc-deutsch-c1', partialRetake: true },
  {
    id: 'c1-hochschule',
    level: 'C1 Hochschule',
    name: 'telc Deutsch C1 Hochschule',
    slug: 'telc-deutsch-c1-hochschule',
    partialRetake: true,
  },
]

export const examDates: ExamDate[] = []
