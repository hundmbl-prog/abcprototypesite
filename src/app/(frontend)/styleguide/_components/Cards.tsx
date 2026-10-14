import { BentoGrid } from '@/components/cards/BentoGrid'
import { CardClassic } from '@/components/cards/CardClassic'
import { CardHorizontal } from '@/components/cards/CardHorizontal'
import { CardOverlay } from '@/components/cards/CardOverlay'
import { CardRail } from '@/components/cards/CardRail'
import { Button } from '@/components/ui/Button'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { EditorialBlock } from '@/components/sections/EditorialBlock'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { SplitMedia } from '@/components/sections/SplitMedia'
import {
  demoArchImage,
  demoCards,
  demoExtraCards,
  demoSharpImage,
  demoSplitImage,
} from './demo-data'
import { SgLabel, SgSection, SgSub } from './SgSection'

const [c1, c2, c3, c4, c5, c6] = demoCards
const [x1, x2, x3, x4] = demoExtraCards

export function CardSection() {
  if (!c1 || !c2 || !c3 || !c4 || !c5 || !c6 || !x1 || !x2 || !x3 || !x4) return null
  return (
    <SgSection
      id="karten"
      title="Angebotskarten – 5 Varianten"
      intro="Jedes Angebot erscheint als Fotokarte. Die ganze Karte ist ein Link, per Tastatur erreichbar und hat auf dem Desktop einen Spotlight-/Neige-Effekt. Beispielinhalte mit Fakten von abc-mainz.de."
    >
      <SgSub
        title="1 · Klassisch – Bild oben"
        note="Hebt sich beim Hover mit tieferem Schatten. Für Sprachkurse, Lernförderung, Bildungsangebote, News-Übersicht."
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li className="min-w-0">
            <CardClassic card={c1} headingLevel="h4" />
          </li>
          <li className="min-w-0">
            <CardClassic card={c4} headingLevel="h4" />
          </li>
          <li className="flex min-w-0 flex-col gap-2">
            <SgLabel>Hover-Zustand</SgLabel>
            <CardClassic card={c6} headingLevel="h4" preview="hover" />
          </li>
        </ul>
      </SgSub>

      <SgSub
        title="2 · Vollbild mit Verlauf"
        note="Text liegt auf dem Foto; die Beschreibung gleitet beim Hover nach oben (auf Touch-Geräten immer sichtbar). Für Integrationskurse, Pädagogische Angebote, telc-Prüfungsstufen."
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li className="min-w-0">
            <CardOverlay card={c2} headingLevel="h4" />
          </li>
          <li className="min-w-0">
            <CardOverlay card={x1} headingLevel="h4" />
          </li>
          <li className="flex min-w-0 flex-col gap-2">
            <SgLabel>Hover-Zustand</SgLabel>
            <CardOverlay card={c3} headingLevel="h4" preview="hover" />
          </li>
        </ul>
      </SgSub>

      <SgSub
        title="3 · Horizontal – Bild links"
        note="Für Listen wie Prüfungstermine, Kurstermine, Projektarchiv, Formulare."
      >
        <ul className="flex flex-col gap-4">
          <li className="min-w-0">
            <CardHorizontal card={x1} headingLevel="h4" />
          </li>
          <li className="min-w-0">
            <CardHorizontal card={c4} headingLevel="h4" />
          </li>
          <li className="flex min-w-0 flex-col gap-2">
            <SgLabel>Hover-Zustand</SgLabel>
            <CardHorizontal card={c5} headingLevel="h4" preview="hover" />
          </li>
        </ul>
      </SgSub>

      <SgSub
        title="4 · Bento – eine große Karte und kleinere"
        note="Für „Unsere Angebote“ auf der Startseite, die Prüfungsübersicht und Über uns."
      >
        <BentoGrid cards={[c1, x2, c6, c5, x3]} headingLevel="h4" />
      </SgSub>

      <SgSub
        title="5 · Karussell auf Mobilgeräten, Raster auf dem Desktop"
        note="Unter 1024 px wischbar mit Vor/Zurück-Buttons, darüber ein dreispaltiges Raster. Für Projekte, verwandte Angebote, Mitmachen."
      >
        <CardRail
          cards={[x2, x3, x4, c5, c6, c1]}
          label="Beispiel-Karussell: Projekte und Angebote"
          headingLevel="h4"
        />
      </SgSub>
    </SgSection>
  )
}

export function LayoutSection() {
  return (
    <SgSection
      id="layouts"
      tone="light-2"
      title="Abschnitts-Layouts"
      intro="Bausteine, aus denen jede Seite zusammengesetzt wird. Die Hintergrund-Töne setzen automatisch passende Text- und Fokusfarben."
    >
      <SgSub
        title="Abschnittskopf"
        note="Eyebrow, Überschrift, Einleitung und optional eine Aktion rechts."
      >
        <div className="rounded-xl bg-surface p-6 md:p-10">
          <SectionHeader
            as="h3"
            eyebrow="Sprachkurse"
            title="Deutsch lernen in Mainz"
            intro="Vom ersten Wort bis zum Hochschulzugang – in kleinen Gruppen und mit erfahrenen Lehrkräften."
            action={
              <Button variant="outline" href="/styleguide#karten" icon="arrow-right">
                Alle Kurse
              </Button>
            }
            className="mb-0! md:mb-0!"
          />
        </div>
      </SgSub>

      <SgSub
        title="Bild und Text mit asymmetrischer Maske"
        note="Masken: organisch, Bogen, scharf (Editorial)."
      >
        <div className="flex flex-col gap-16">
          <SplitMedia image={demoSplitImage} mask="organic">
            <SgLabel>Maske „organisch“</SgLabel>
            <h4 className="text-h3 text-navy">Integration beginnt mit Sprache</h4>
            <p className="text-ink-muted">
              Im Integrationskurs lernen Sie Deutsch für Alltag und Beruf und erfahren im
              Orientierungskurs mehr über Geschichte, Politik und Kultur in Deutschland.
            </p>
            <div>
              <Button variant="pill" href="/styleguide#karten">
                Kurs ansehen
              </Button>
            </div>
          </SplitMedia>
          <SplitMedia image={demoArchImage} mask="arch" reverse>
            <SgLabel>Maske „Bogen“</SgLabel>
            <h4 className="text-h3 text-navy">Für junge Menschen von 16 bis 26</h4>
            <p className="text-ink-muted">
              Ein Lernkonzept, das auf die Bedürfnisse junger Zugewanderter zugeschnitten ist.
            </p>
          </SplitMedia>
          <SplitMedia image={demoSharpImage} mask="sharp">
            <SgLabel>Maske „scharf“</SgLabel>
            <h4 className="text-h3 text-navy">Projekte, die Mainz zeigen</h4>
            <p className="text-ink-muted">
              Straßenkunst, Rheinufer, Wochenmarkt – gemeinsam die Stadt mit der Kamera entdecken.
            </p>
          </SplitMedia>
        </div>
      </SgSub>

      <SgSub
        title="Editorial-Block"
        note="Scharfe Kanten und eine rote Akzentlinie – für Zitate und Leitsätze."
      >
        <EditorialBlock kicker="Unser Leitsatz" footer="Akademisches Bildungs-Center e.V.">
          Bildung für alle – jede und jeder ist willkommen.
        </EditorialBlock>
      </SgSub>

      <SgSub
        title="CTA-Banner"
        note="Navy als Standard, Rot nur für kurze, dringende Hinweise, Hellblau als ruhige Variante."
      >
        <div className="flex flex-col gap-6">
          <CtaBanner
            as="h4"
            title="Bereit für Ihren nächsten Schritt?"
            text="Wir beraten Sie gerne persönlich in Mainz oder Bad Kreuznach."
            actions={
              <>
                <Button variant="cta" href="/styleguide#karten" icon="arrow-right">
                  Beratung vereinbaren
                </Button>
                <Button variant="ghost" href="/styleguide#karten">
                  Kurse ansehen
                </Button>
              </>
            }
          />
          <CtaBanner
            as="h4"
            tone="red"
            title="Nur noch wenige Prüfungsplätze"
            text="Melden Sie sich rechtzeitig vor dem Anmeldeschluss an."
            actions={
              <Button variant="white-red" href="/styleguide#karten">
                Platz sichern
              </Button>
            }
          />
          <CtaBanner
            as="h4"
            tone="soft"
            title="Werden Sie Mitglied"
            text="Unterstützen Sie Bildung und Integration in Mainz."
            actions={
              <Button variant="navy" href="/styleguide#karten">
                Mitglied werden
              </Button>
            }
          />
        </div>
      </SgSub>
    </SgSection>
  )
}
