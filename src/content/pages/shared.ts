/** Building blocks shared by several pages (contact card, closing call to action, official links). */
import type { ContactBlock, CtaBlock, ResourceLink } from '../types'

export const CONTACT_EMAIL_COURSES = 'sprachkurse@abc-mainz.de'
export const CONTACT_EMAIL_GENERAL = 'kontakt@abc-mainz.de'

export function contact(text: string, email = CONTACT_EMAIL_GENERAL): ContactBlock {
  return {
    type: 'contact',
    id: 'kontakt',
    eyebrow: 'Persönliche Beratung',
    title: 'Wir beraten Sie kostenlos',
    locationId: 'mainz',
    email,
    text,
  }
}

export function cta(block: Omit<CtaBlock, 'type' | 'id'>): CtaBlock {
  return { type: 'cta', id: 'jetzt-starten', ...block }
}

/** Official telc pages (all checked on 15.10.2026, HTTP 200). */
export const telcLinks = {
  faq: {
    label: 'telc FAQ für Prüfungsteilnehmende',
    href: 'https://www.telc.net/sprachpruefungen/sprachpruefungen-support-faqs/',
    description: 'Antworten der telc gGmbH zu Anmeldung, Ergebnis und Zertifikat.',
    kind: 'Website',
  },
  rules: {
    label: 'Prüfungsordnung der telc gGmbH',
    href: 'https://www.telc.net/fileadmin/user_upload/pdfs/AGB_Pruefungsordnung/9994-P00-150010.pdf',
    description: 'Prüfungsregularien, gültig ab 15.04.2025.',
    kind: 'PDF',
  },
  verify: {
    label: 'Echtheit eines Zertifikats prüfen',
    href: 'https://results.telc.net/',
    description: 'Offizielle Verifikation von telc Zertifikaten.',
    kind: 'Website',
  },
  overview: {
    label: 'Alle telc Deutschprüfungen',
    href: 'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/',
    description: 'Übersicht der telc gGmbH über alle Prüfungen für Deutsch.',
    kind: 'Website',
  },
} satisfies Record<string, ResourceLink>
