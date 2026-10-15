import { SectionHeader } from '@/components/sections/SectionHeader'
import { cn } from '@/lib/cn'
import type { ExamDate, Location, PageBlock, TelcExam } from '@/content/types'
import {
  CardsBlock,
  ColumnsBlock,
  ContactBlock,
  CtaBlock,
  FaqBlock,
  FeesBlock,
  IntroBlock,
  LinksBlock,
  StepsBlock,
} from './blocks'
import { CourseTypes, Features, Spotlight } from './catalog'
import { ExamDates } from './ExamDates'
import { ExamLevels } from './ExamLevels'
import { ExamStructure } from './ExamStructure'
import { TabsBlock } from './TabsBlock'
import { TelcRegistrationForm } from './TelcRegistrationForm'

type Data = { locations: Location[]; exams: TelcExam[]; dates: ExamDate[] }

function Block({ block, data }: { block: PageBlock; data: Data }) {
  const main = data.locations[0]
  switch (block.type) {
    case 'intro':
      return <IntroBlock block={block} />
    case 'cards':
      return <CardsBlock block={block} />
    case 'columns':
      return <ColumnsBlock block={block} />
    case 'steps':
      return <StepsBlock block={block} />
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
    case 'faq':
      return <FaqBlock block={block} />
    case 'links':
      return <LinksBlock block={block} />
    case 'fees':
      return <FeesBlock block={block} />
    case 'contact': {
      const location = data.locations.find((l) => l.id === block.locationId) ?? main
      return location ? <ContactBlock block={block} location={location} /> : null
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

/**
 * Renders a page's blocks as sections. Backgrounds alternate white / soft logo-blue;
 * CTA and contact blocks sit on the previous background without breaking the rhythm.
 */
export function BlockRenderer({ blocks, data }: { blocks: PageBlock[]; data: Data }) {
  let toned = 0
  return (
    <>
      {blocks.map((block) => {
        const plain = block.type === 'cta' || block.type === 'contact'
        const tone = plain ? (toned - 1) % 2 : toned++ % 2
        return (
          <section
            key={block.id}
            id={block.id}
            aria-labelledby={block.type === 'cta' ? undefined : `${block.id}-titel`}
            aria-label={block.type === 'cta' ? block.title : undefined}
            className={cn(
              'scroll-mt-28',
              tone === 1 ? 'bg-blue-50' : 'bg-surface',
              plain ? 'py-section-sm' : 'py-section',
            )}
          >
            <div className="container-page">
              <Block block={block} data={data} />
            </div>
          </section>
        )
      })}
    </>
  )
}
