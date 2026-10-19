import { SectionHeader } from '@/components/sections/SectionHeader'
import { cn } from '@/lib/cn'
import type {
  ContactBlock as ContactData,
  CtaBlock as CtaData,
  ExamDate,
  Location,
  PageBlock,
  TelcExam,
} from '@/content/types'
import {
  CardsBlock,
  ClosingBlock,
  ColumnsBlock,
  CtaBlock,
  FaqBlock,
  FeesBlock,
  IntroBlock,
  LinksBlock,
  StepsBlock,
  type SectionTone,
} from './blocks'
import { CourseTypes, Features, Spotlight } from './catalog'
import { Article, Contacts, FormSection, Locations, Press } from './extra'
import { ExamDates } from './ExamDates'
import { Gallery } from './Gallery'
import { ExamLevels } from './ExamLevels'
import { ExamStructure } from './ExamStructure'
import { TabsBlock } from './TabsBlock'
import { TelcRegistrationForm } from './TelcRegistrationForm'

type Data = { locations: Location[]; orgName: string; exams: TelcExam[]; dates: ExamDate[] }

type Section =
  | { kind: 'block'; block: PageBlock; tone: SectionTone }
  | { kind: 'closing'; contact: ContactData; cta?: CtaData; tone: SectionTone }

/**
 * Turns the page blocks into sections:
 * - a contact block followed by a CTA becomes one closing card (no repeated contact details),
 * - backgrounds strictly alternate white / Blue wash after the navy hero, including the
 *   closing section, so the colour order is the same on every page (navy footer follows).
 */
function toSections(blocks: PageBlock[]): Section[] {
  const sections: Section[] = []
  const nextTone = (): SectionTone => (sections.length % 2 === 0 ? 'white' : 'soft')
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    if (!block) continue
    if (block.type === 'contact') {
      const next = blocks[i + 1]
      const cta = next?.type === 'cta' ? next : undefined
      if (cta) i++
      sections.push({ kind: 'closing', contact: block, cta, tone: nextTone() })
      continue
    }
    sections.push({ kind: 'block', block, tone: nextTone() })
  }
  return sections
}

function Block({ block, data, tone }: { block: PageBlock; data: Data; tone: SectionTone }) {
  const main = data.locations[0]
  switch (block.type) {
    case 'intro':
      return <IntroBlock block={block} />
    case 'cards':
      return <CardsBlock block={block} />
    case 'columns':
      return <ColumnsBlock block={block} tone={tone} />
    case 'steps':
      return <StepsBlock block={block} tone={tone} />
    case 'tabs':
      return <TabsBlock block={block} />
    case 'exam-structure':
      return <ExamStructure block={block} />
    case 'exam-levels':
      return <ExamLevels block={block} />
    case 'course-types':
      return <CourseTypes block={block} />
    case 'features':
      return <Features block={block} />
    case 'spotlight':
      return <Spotlight block={block} />
    case 'form':
      return <FormSection block={block} phone={main?.phone ?? ''} email={main?.email ?? ''} />
    case 'contacts':
      return <Contacts block={block} />
    case 'locations':
      return <Locations block={block} locations={data.locations} orgName={data.orgName} />
    case 'gallery':
      return <Gallery block={block} />
    case 'press':
      return <Press block={block} />
    case 'article':
      return <Article block={block} />
    case 'faq':
      return <FaqBlock block={block} />
    case 'links':
      return <LinksBlock block={block} />
    case 'fees':
      return <FeesBlock block={block} />
    case 'contact': {
      const location = data.locations.find((l) => l.id === block.locationId) ?? main
      return location ? <ClosingBlock contact={block} location={location} /> : null
    }
    case 'cta':
      return <CtaBlock block={block} />
    case 'exam-dates':
      return (
        <>
          <SectionHeader
            id={`${block.id}-titel`}
            eyebrow={block.eyebrow}
            title={block.title}
            intro={block.intro}
          />
          <ExamDates
            exams={data.exams}
            dates={data.dates}
            emptyText={block.emptyText}
            phone={main?.phone ?? ''}
            email={main?.email ?? ''}
          />
        </>
      )
    case 'telc-registration':
      return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id={`${block.id}-titel`}
              eyebrow={block.eyebrow}
              title={block.title}
              intro={block.intro}
            />
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-md md:p-10 lg:col-span-8">
            <TelcRegistrationForm
              exams={data.exams}
              dates={data.dates}
              phone={main?.phone ?? ''}
              email={main?.email ?? ''}
            />
          </div>
        </div>
      )
  }
}

const toneClass: Record<SectionTone, string> = {
  white: 'bg-surface',
  soft: 'bg-blue-50',
  deep: 'bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]',
}

/** Renders a page's blocks as sections (see toSections for backgrounds and merging). */
export function BlockRenderer({ blocks, data }: { blocks: PageBlock[]; data: Data }) {
  return (
    <>
      {toSections(blocks).map((section) => {
        if (section.kind === 'closing') {
          const { contact } = section
          const location =
            data.locations.find((l) => l.id === contact.locationId) ?? data.locations[0]
          if (!location) return null
          return (
            <section
              key={contact.id}
              id={contact.id}
              aria-labelledby={`${contact.id}-titel`}
              className={cn('scroll-mt-28 py-section-sm', toneClass[section.tone])}
            >
              <div className="container-page">
                <ClosingBlock contact={contact} cta={section.cta} location={location} />
              </div>
            </section>
          )
        }
        const { block, tone } = section
        const isCta = block.type === 'cta'
        return (
          <section
            key={block.id}
            id={block.id}
            aria-labelledby={isCta ? undefined : `${block.id}-titel`}
            aria-label={isCta ? block.title : undefined}
            className={cn(
              'relative isolate scroll-mt-28 overflow-hidden',
              toneClass[tone],
              isCta ? 'py-section-sm' : 'py-section',
            )}
          >
            <div className="container-page">
              <Block block={block} data={data} tone={tone} />
            </div>
          </section>
        )
      })}
    </>
  )
}
