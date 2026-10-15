/**
 * Legal pages. Texts carried over word for word from the current abc-mainz.de (decision 15.10.2026);
 * only line breaks from the old layout were joined. The review notes list what must be checked
 * before launch – no legal text was invented.
 */
import { images } from '../images'
import type { ContentPage, LegalContent } from '../types'

const impressumSections: LegalContent['sections'] = [
  {
    id: 'angaben-gemaess-5-tmg',
    title: 'Angaben gemäß § 5 TMG',
    content: [
      {
        type: 'p',
        text: 'Akademisches Bildungs-Center e.V.',
      },
      {
        type: 'p',
        text: 'Rhabanusstraße 5',
      },
      {
        type: 'p',
        text: 'Vereinsregister: VR 3224',
      },
      {
        type: 'p',
        text: 'Registergericht: Mainz',
      },
      {
        type: 'p',
        text: 'Vertreten durch:',
      },
      {
        type: 'p',
        text: 'Geschäftsführer: Eren Aksit',
      },
      {
        type: 'p',
        text: '1. Vorsitzender: Abdulcelil Adigüzel',
      },
      {
        type: 'p',
        text: '2. Vorsitzender: Erkam Cebi',
      },
      {
        type: 'p',
        text: 'Stellvertretende Vorsitzende: Mukaddes Kara',
      },
      {
        type: 'p',
        text: 'Telefon: +49 (0) 6131 385 147',
      },
      {
        type: 'p',
        text: 'E-Mail: info[at]abc-mainz.de',
      },
    ],
  },
  {
    id: 'eu-streitschlichtung',
    title: 'EU-Streitschlichtung',
    content: [
      {
        type: 'p',
        text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr .',
      },
      {
        type: 'p',
        text: 'Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      },
    ],
  },
  {
    id: 'verbraucherstreitbeilegung-universalschlichtungsstelle',
    title: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
    content: [
      {
        type: 'p',
        text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer',
      },
      {
        type: 'p',
        text: 'Verbraucherschlichtungsstelle teilzunehmen.',
      },
    ],
  },
  {
    id: 'haftung-fuer-inhalte',
    title: 'Haftung für Inhalte',
    content: [
      {
        type: 'p',
        text: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      },
      {
        type: 'p',
        text: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen',
      },
      {
        type: 'p',
        text: 'Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der',
      },
      {
        type: 'p',
        text: 'Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden',
      },
      {
        type: 'p',
        text: 'Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      },
    ],
  },
  {
    id: 'haftung-fuer-links',
    title: 'Haftung für Links',
    content: [
      {
        type: 'p',
        text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.',
      },
      {
        type: 'p',
        text: 'Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten',
      },
      {
        type: 'p',
        text: 'Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
      },
      {
        type: 'p',
        text: 'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer',
      },
      {
        type: 'p',
        text: 'Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
      },
    ],
  },
  {
    id: 'urheberrecht',
    title: 'Urheberrecht',
    content: [
      {
        type: 'p',
        text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen',
      },
      {
        type: 'p',
        text: 'Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der',
      },
      {
        type: 'p',
        text: 'Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      },
      {
        type: 'p',
        text: 'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
      },
      {
        type: 'p',
        text: 'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine',
      },
      {
        type: 'p',
        text: 'Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei',
      },
      {
        type: 'p',
        text: 'Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
      },
    ],
  },
]

const datenschutzSections: LegalContent['sections'] = [
  {
    id: 'praeambel',
    title: 'Präambel',
    content: [
      {
        type: 'p',
        text: 'Mit den folgenden Informationen möchten wir Ihnen einen Überblick über die Verarbeitung Ihrer personenbezogenen Daten durch uns und Ihre Rechte aus dem Datenschutzrecht geben. Welche Daten im Einzelnen verarbeitet und in welcher Weise genutzt werden, richtet sich maßgeblich nach den vereinbarten Dienstleistungen.',
      },
      {
        type: 'h3',
        text: '1. Für wen gilt diese Datenschutzerklärung?',
      },
      {
        type: 'p',
        text: 'Wenn wir personenbezogene Daten verarbeiten, bedeutet dies, dass wir diese z.B. erheben, speichern, nutzen, ggfs. An Finanzbehörden, Sozialversicherungs-träger, BAMF etc. übermitteln oder löschen. In diesen Datenschutzhinweisen geht es um personenbezogene Daten von',
      },
      {
        type: 'p',
        text: 'Kunden des Akademischen Bildungs-Centrums, die natürliche Personen sind, allen anderen natürlichen Personen, die in Kontakt mit unserem Verein stehen, z.B. Mitarbeiter, Bevoll-mächtigte, Erziehungsberechtigte etc.',
      },
      {
        type: 'h3',
        text: '2. Wer ist verantwortlich und an wen kann ich mich wenden?',
      },
      {
        type: 'p',
        text: 'Verantwortlich im Sinne des Datenschutzrechts und der Datenschutzbeauftragter ist der interne Datenschutzbeauftragter in unserem Verein. Den Datenschutzbeauftragten können Sie unter folgender Mailadresse erreichen: datenschutz@abc-mainz.de',
      },
      {
        type: 'h3',
        text: '3. Was sind personenbezogene Daten',
      },
      {
        type: 'p',
        text: 'Personenbezogene Daten sind alle Daten, die auf, Sie persönlich beziehbar sind, z.B. Name, Adresse, E-Mail-Adressen, Geburtstag und –ort, Staatsangehörigkeit, Ausweisdaten, Personenkennziffer etc.',
      },
      {
        type: 'h3',
        text: '4. Welche Daten werden von uns erhoben?',
      },
      {
        type: 'p',
        text: 'Wenn wir für Sie tätig werden, verarbeiten wir personenbezogene Daten von Ihnen bzw. von Ihrem Kind. Diese Daten werden von uns stets vertraulich behandelt. Insbesondere verarbeiten wir die folgenden personenbezogenen Daten:',
      },
      {
        type: 'ul',
        items: [
          'Vor- und Nachname, Anrede, ggf. Titel',
          'Geburtstag und –ort',
          'Ausweisdaten',
          'Postanschriften',
          'Telefonnummern',
          'E-Mail-Adressen',
          'Personenkennziffern; Screenshots für die Teilnahme',
          'Steuernummer und Steueridentifikationsnummer',
          'Sozialversicherungsnummern',
          'Kontodaten',
          'Prüfungsergebnisse',
          'Sowie alle für die angemessene Kundenausführung benötigten Informationen',
        ],
      },
      {
        type: 'h3',
        text: '5. Für welche Zwecke verarbeiten wir Ihre Daten?',
      },
      {
        type: 'p',
        text: 'Wir verarbeiten personenbezogene Daten ausschließlich zu Zwecken der',
      },
      {
        type: 'p',
        text: 'Ausführung und Abwicklung des Kundenverhältnisses einschließlich der Korrespondenz, Erfüllung unserer vertraglichen und gesetzlichen Pflichten als Integrationskursträger und',
      },
      {
        type: 'p',
        text: 'Bearbeitung im Rahmen von gegenseitigen Ansprüchen aus der Anmeldung (z.B. Rechnungsstellung usw.)',
      },
      {
        type: 'p',
        text: 'Rechtsgrundlagen für die Datenverarbeitung in unserem Verein sind',
      },
      {
        type: 'p',
        text: 'Art. 6 Abs. 1 Unterabsatz 1 Buchstabe b DSGVO zur Erfüllung der Anmeldung',
      },
      {
        type: 'p',
        text: 'Art. 6 Abs. 1 Unterabsatz 1 Buchstabe c DSGVO zur Erfüllung der gesetzlichen Pflichten, denen wir als Integrationskursträger unterliegen, Art. 6 Abs. 1 Unterabsatz 1 Buchstabe a DSGVO, soweit Sie und Ihre Einwilligung zur Verarbeitung der Sie betreffenden personenbezogenen Daten für bestimmte Zwecke gegeben haben.',
      },
      {
        type: 'h3',
        text: '6. An wen werden Daten übermittelt?',
      },
      {
        type: 'p',
        text: 'Die Übermittlung von personenbezogenen Daten an Dritte erfolgt nur in Ihrem Auftrag oder mit Ihrem Einverständnis. Wir geben personenbezogene Daten im Rahmen des Arbeitsverhältnisses oder Kundenverhältnisses an folgende Empfänger weiter:',
      },
      {
        type: 'ul',
        items: [
          'Finanzbehörden',
          'Sozialversicherungsträger',
          'Banken, Versicherungen und Berufsgenossenschaften',
          'Auftragsverarbeiter (z.B. Prüfungsabnehmer, Rechen-zentren, Entsorgungsfirmen, Druckdienstleister etc.)',
          'BAMF',
          'IHK',
          'Steuerberater',
          'AmkA',
          'Arbeitsamt, Sozialamt, Ausländerbehörde',
          'Je nach Auftrag an weitere Empfänger, die wir mit Ihnen abstimmen',
        ],
      },
      {
        type: 'h3',
        text: '7. Werden Daten an Drittstaaten übermittelt',
      },
      {
        type: 'p',
        text: 'Eine Datenübermittlung in Drittstaaten (Staaten außerhalb des europäischen Wirtschaftsraums - EWR) findet nicht statt.',
      },
      {
        type: 'h3',
        text: '8. Wie lange werden die Daten gespeichert?',
      },
      {
        type: 'p',
        text: 'Die personenbezogenen Daten werden bei uns für eine Dauer der gesetzlichen Aufbewahrungsfristen gespeichert. In der Regel sind dies max. 10 Jahre. Nach Ablauf der Aufbewahrungs-fristen werden die Daten gelöscht.',
      },
      {
        type: 'h3',
        text: '9. Welche Rechte habe ich?',
      },
      {
        type: 'p',
        text: 'Sie haben folgende Rechte als „betroffene Person“, deren Daten wir verarbeiten:',
      },
      {
        type: 'ul',
        items: [
          'Recht auf Auskunft nach Art. 15 DSGVO',
          'Recht auf Berichtigung nach Art. 16 DSGVO',
          'Recht auf Löschung („Vergessenwerden“) nach Art. 17 DSGVO',
          'Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO',
        ],
      },
      {
        type: 'p',
        text: 'Recht auf Übertragung Ihrer Daten in einem strukturierten, gängigen und maschinenlesbaren Format nach Art. 20 DSGVO',
      },
      {
        type: 'p',
        text: 'Soweit wir die Verarbeitung für bestimmte Zwecke Ihrer personenbezogenen Daten auf Grundlage Ihrer Einwilligung durchführen, haben Sie nach Art. 7 Abs. 3 DSGVO das Recht, ihre Einwilligung jederzeit zu wiederrufen. Nach Erhalt Ihres Wiederrufs werden wir die Datenverarbeitung für die Zwecke einstellen, für die Sie uns die Einwilligung erteilt haben. Die Rechtmäßigkeit der Verarbeitung vor Erhalt Ihres Widerrufs bleibt unberührt.',
      },
      {
        type: 'p',
        text: 'Widerspruchsrecht: Wenn wir Ihre personenbezogenen Daten zur Wahrung von berechtigten Interessen im Sinne von Art. 6 Abs. 1 Unterabsatz 1 Buchstabe f DSGVO verarbeiten, haben Sie nach Art. 21 Abs. 1 DSGVO das Recht, dieser Verarbeitung aus Gründen zu widersprechen, die sich aus Ihrer besonderen Situation ergeben. Gegen die Verarbeitung zu Zwecken der Direktwerbung können Sie gem. Art. 21 Abs. 2 DSGVO jederzeit ohne Begründung wiedersprechen. Um Ihr Widerspruchsrecht auszuüben, genügt eine formlose Mitteilung an uns mit der Angabe, welcher Datenverarbeitung Sie wiedersprechen.',
      },
      {
        type: 'p',
        text: 'Wenn Sie der Meinung sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Datenschutz-Grundverordnung verstößt, haben Sie das Recht zur Beschwerde nach Art. 77 Abs. 1 DSGVO bei einer Aufsichtsbehörde für den Datenschutz (in der Regel Landesbeauftragte für Datenschutz und Informations-freiheit).',
      },
      {
        type: 'p',
        text: 'Die Beschwerde kann insbesondere bei der Aufsichts-behörde eingelegt werden, die am Ort Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des mutmaßlichen Verstoßes zuständig ist.',
      },
      {
        type: 'p',
        text: 'Diese Hinweise entsprechen dem Rechtsstand vom 25. Mai 2018. Wir behalten uns vor, unsere Datenschutzhinweise an Änderungen in Vorschriften oder der Rechtsprechung anzupassen.',
      },
    ],
  },
  {
    id: 'aufsichtsbehoerde-rheinland-pfalz',
    title: 'Aufsichtsbehörde Rheinland-Pfalz',
    content: [
      {
        type: 'p',
        text: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz',
      },
      {
        type: 'p',
        text: 'Anschrift: Hintere Bleiche 34, 55116 Mainz',
      },
      {
        type: 'p',
        text: 'Tel.: 06131 2082449',
      },
      {
        type: 'p',
        text: 'E-Mail: poststelle@datenschutz.rlp.de',
      },
      {
        type: 'p',
        text: 'Internet: www.datenschutz.rlp.de',
      },
    ],
  },
  {
    id: '1-datenschutz-auf-einen-blick',
    title: '1. Datenschutz auf einen Blick',
    content: [
      {
        type: 'h3',
        text: 'Allgemeine Hinweise',
      },
      {
        type: 'p',
        text: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.',
      },
      {
        type: 'h3',
        text: 'Kontaktdaten des Datenschutzbeauftragten',
      },
      {
        type: 'p',
        text: 'Kontaktdaten Datenschutzbeauftragter des Akademisches-Bildungs-Center e. V. : z.Hd. Datenschutzbeauftragter datenschutz[at]abc-mainz.de',
      },
      {
        type: 'h3',
        text: 'Datenerfassung auf dieser Website',
      },
      {
        type: 'h3',
        text: 'Wer ist verantwortlich für die Datenerfassung auf dieser Website?',
      },
      {
        type: 'p',
        text: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
      },
      {
        type: 'h3',
        text: 'Wie erfassen wir Ihre Daten?',
      },
      {
        type: 'p',
        text: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.',
      },
      {
        type: 'p',
        text: 'Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.',
      },
      {
        type: 'h3',
        text: 'Wofür nutzen wir Ihre Daten?',
      },
      {
        type: 'p',
        text: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.',
      },
      {
        type: 'h3',
        text: 'Welche Rechte haben Sie bezüglich Ihrer Daten?',
      },
      {
        type: 'p',
        text: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder',
      },
      {
        type: 'p',
        text: 'Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
      },
      {
        type: 'p',
        text: 'Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.',
      },
      {
        type: 'p',
        text: 'Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
      },
      {
        type: 'h3',
        text: 'Analyse-Tools und Tools von Drittanbietern',
      },
      {
        type: 'p',
        text: 'Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.',
      },
      {
        type: 'p',
        text: 'Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden  Datenschutzerklärung.',
      },
    ],
  },
  {
    id: '2-hosting-und-content-delivery-networks-cdn',
    title: '2. Hosting und Content Delivery Networks (CDN)',
    content: [
      {
        type: 'h3',
        text: 'Externes Hosting',
      },
      {
        type: 'p',
        text: 'Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.',
      },
      {
        type: 'p',
        text: 'Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten',
      },
      {
        type: 'p',
        text: 'Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).',
      },
      {
        type: 'p',
        text: 'Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.',
      },
      {
        type: 'p',
        text: 'Wir setzen folgenden Hoster ein:',
      },
      {
        type: 'ul',
        items: ['1&1 IONOS SE', 'Elgendorfer Str. 57', '56410 Montabaur'],
      },
      {
        type: 'h3',
        text: 'Abschluss eines Vertrages über Auftragsverarbeitung',
      },
      {
        type: 'p',
        text: 'Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über',
      },
      {
        type: 'p',
        text: 'Auftragsverarbeitung mit unserem Hoster geschlossen.',
      },
    ],
  },
  {
    id: '3-allgemeine-hinweise-und-pflichtinformationen',
    title: '3. Allgemeine Hinweise und Pflichtinformationen',
    content: [
      {
        type: 'h3',
        text: 'Datenschutz',
      },
      {
        type: 'p',
        text: 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.',
      },
      {
        type: 'p',
        text: 'Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.',
      },
      {
        type: 'p',
        text: 'Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.',
      },
      {
        type: 'p',
        text: 'Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)',
      },
      {
        type: 'p',
        text: 'Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.',
      },
      {
        type: 'h3',
        text: 'Hinweis zur verantwortlichen Stelle',
      },
      {
        type: 'p',
        text: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:',
      },
      {
        type: 'p',
        text: 'Akademisches Bildungs-Center e.V.',
      },
      {
        type: 'p',
        text: 'Rhabanusstraße 5',
      },
      {
        type: 'p',
        text: 'Telefon: +49 (0) 6131 385 147',
      },
      {
        type: 'p',
        text: 'E-Mail: kontakt[at]abc-mainz.de',
      },
      {
        type: 'p',
        text: 'Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.',
      },
      {
        type: 'h3',
        text: 'Speicherdauer',
      },
      {
        type: 'p',
        text: 'Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben',
      },
      {
        type: 'p',
        text: 'Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keinen anderen rechtlich zulässigen Gründe für die Speicherung',
      },
      {
        type: 'p',
        text: 'Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.',
      },
      {
        type: 'h3',
        text: 'Hinweis zur Datenweitergabe in die USA',
      },
      {
        type: 'p',
        text: 'Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA eingebunden. Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten an die US-Server der jeweiligen Unternehmen weitergegeben werden. Wir weisen darauf hin, dass die USA kein sicherer Drittstaat im Sinne des EU-Datenschutzrechts sind. US-Unternehmen sind dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten.',
      },
      {
        type: 'p',
        text: 'Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z.B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.',
      },
      {
        type: 'h3',
        text: 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
      },
      {
        type: 'p',
        text: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten',
      },
      {
        type: 'p',
        text: 'Datenverarbeitung bleibt vom Widerruf unberührt.',
      },
      {
        type: 'p',
        text: 'Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen',
      },
      {
        type: 'p',
        text: 'Direktwerbung (Art. 21 DSGVO)',
      },
      {
        type: 'p',
        text: 'WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO',
      },
      {
        type: 'p',
        text: 'ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN',
      },
      {
        type: 'p',
        text: 'SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN',
      },
      {
        type: 'p',
        text: 'WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES',
      },
      {
        type: 'p',
        text: 'PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES',
      },
      {
        type: 'p',
        text: 'SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG',
      },
      {
        type: 'p',
        text: 'NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE',
      },
      {
        type: 'p',
        text: 'VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON',
      },
      {
        type: 'p',
        text: 'RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).',
      },
      {
        type: 'p',
        text: 'WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE',
      },
      {
        type: 'p',
        text: 'BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG',
      },
      {
        type: 'p',
        text: 'EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN',
      },
      {
        type: 'p',
        text: 'VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN',
      },
      {
        type: 'p',
        text: 'ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH',
      },
      {
        type: 'p',
        text: 'NACH ART. 21 ABS. 2 DSGVO).',
      },
      {
        type: 'h3',
        text: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
      },
      {
        type: 'p',
        text: 'Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer',
      },
      {
        type: 'p',
        text: 'Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.',
      },
      {
        type: 'h3',
        text: 'Recht auf Datenübertragbarkeit',
      },
      {
        type: 'p',
        text: 'Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.',
      },
      {
        type: 'p',
        text: 'SSL- bzw. TLS-Verschlüsselung',
      },
      {
        type: 'p',
        text: 'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum',
      },
      {
        type: 'p',
        text: 'Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLSVerschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',
      },
      {
        type: 'p',
        text: 'Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.',
      },
      {
        type: 'h3',
        text: 'Auskunft, Löschung und Berichtigung',
      },
      {
        type: 'p',
        text: 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche',
      },
      {
        type: 'p',
        text: 'Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den',
      },
      {
        type: 'p',
        text: 'Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
      },
      {
        type: 'h3',
        text: 'Recht auf Einschränkung der Verarbeitung',
      },
      {
        type: 'p',
        text: 'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
      },
      {
        type: 'p',
        text: 'Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:',
      },
      {
        type: 'p',
        text: 'Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die',
      },
      {
        type: 'p',
        text: 'Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
      },
      {
        type: 'p',
        text: 'Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.',
      },
      {
        type: 'p',
        text: 'Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der',
      },
      {
        type: 'p',
        text: 'Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
      },
      {
        type: 'p',
        text: 'Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen',
      },
      {
        type: 'p',
        text: 'Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
      },
      {
        type: 'p',
        text: 'Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder',
      },
      {
        type: 'p',
        text: 'Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.',
      },
      {
        type: 'h3',
        text: 'Widerspruch gegen Werbe-E-Mails',
      },
      {
        type: 'p',
        text: 'Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die',
      },
      {
        type: 'p',
        text: 'Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von',
      },
      {
        type: 'p',
        text: 'Werbeinformationen, etwa durch Spam-E-Mails, vor.',
      },
    ],
  },
  {
    id: '4-datenerfassung-auf-dieser-website',
    title: '4. Datenerfassung auf dieser Website',
    content: [
      {
        type: 'h3',
        text: 'Cookies',
      },
      {
        type: 'p',
        text: 'Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf',
      },
      {
        type: 'p',
        text: 'Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung',
      },
      {
        type: 'p',
        text: '(Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.',
      },
      {
        type: 'p',
        text: 'Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter',
      },
      {
        type: 'p',
        text: 'Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).',
      },
      {
        type: 'p',
        text: 'Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte',
      },
      {
        type: 'p',
        text: 'Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.',
      },
      {
        type: 'p',
        text: 'Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur',
      },
      {
        type: 'p',
        text: 'Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die',
      },
      {
        type: 'p',
        text: 'Warenkorbfunktion) oder zur Optimierung der Website (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere',
      },
      {
        type: 'p',
        text: 'Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine',
      },
      {
        type: 'p',
        text: 'Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden',
      },
      {
        type: 'p',
        text: 'Cookies ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'p',
        text: 'Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und',
      },
      {
        type: 'p',
        text: 'Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der',
      },
      {
        type: 'p',
        text: 'Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.',
      },
      {
        type: 'p',
        text: 'Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.',
      },
      {
        type: 'h3',
        text: 'Kontaktformular',
      },
      {
        type: 'p',
        text: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem',
      },
      {
        type: 'p',
        text: 'Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre',
      },
      {
        type: 'p',
        text: 'Einwilligung weiter.',
      },
      {
        type: 'p',
        text: 'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer',
      },
      {
        type: 'p',
        text: 'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.',
      },
      {
        type: 'p',
        text: 'Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt',
      },
      {
        type: 'p',
        text: '(z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.',
      },
      {
        type: 'h3',
        text: 'Anfrage per E-Mail, Telefon oder Telefax',
      },
      {
        type: 'p',
        text: 'Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
      },
      {
        type: 'p',
        text: 'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer',
      },
      {
        type: 'p',
        text: 'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.',
      },
      {
        type: 'p',
        text: 'Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt',
      },
      {
        type: 'p',
        text: '(z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.',
      },
    ],
  },
  {
    id: '5-soziale-medien',
    title: '5. Soziale Medien',
    content: [
      {
        type: 'h3',
        text: 'Facebook Plugins (Like & Share-Button)',
      },
      {
        type: 'p',
        text: 'Auf dieser Website sind Plugins des sozialen Netzwerks Facebook integriert. Anbieter dieses Dienstes ist die',
      },
      {
        type: 'p',
        text: 'Facebook Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland. Die erfassten Daten werden nach Aussage von Facebook jedoch auch in die USA und in andere Drittländer übertragen.',
      },
      {
        type: 'p',
        text: 'Die Facebook Plugins erkennen Sie an dem Facebook-Logo oder dem „Like-Button“ („Gefällt mir“) auf dieser',
      },
      {
        type: 'p',
        text: 'Website. Eine Übersicht über die Facebook Plugins finden Sie hier: https://developers.facebook.com/docs/plugins/?locale=de_DE.',
      },
      {
        type: 'p',
        text: 'Wenn Sie diese Website besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IPAdresse diese Website besucht haben. Wenn Sie den Facebook „Like-Button“ anklicken während Sie in',
      },
      {
        type: 'p',
        text: 'Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte dieser Website auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren',
      },
      {
        type: 'p',
        text: 'Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter: https://de-de.facebook.com/privacy/explanation.',
      },
      {
        type: 'p',
        text: 'Wenn Sie nicht wünschen, dass Facebook den Besuch dieser Website Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.',
      },
      {
        type: 'p',
        text: 'Die Verwendung der Facebook Plugins erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der',
      },
      {
        type: 'p',
        text: 'Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit in den',
      },
      {
        type: 'p',
        text: 'Sozialen Medien. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'h3',
        text: 'Instagram Plugin',
      },
      {
        type: 'p',
        text: 'Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA 94025, USA integriert.',
      },
      {
        type: 'p',
        text: 'Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch dieser',
      },
      {
        type: 'p',
        text: 'Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine',
      },
      {
        type: 'p',
        text: 'Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.',
      },
      {
        type: 'p',
        text: 'Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der',
      },
      {
        type: 'p',
        text: 'Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit in den',
      },
      {
        type: 'p',
        text: 'Sozialen Medien. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'p',
        text: 'Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram: https://instagram.com/about/legal/privacy/.',
      },
    ],
  },
  {
    id: '6-analyse-tools-und-werbung',
    title: '6. Analyse-Tools und Werbung',
    content: [
      {
        type: 'h3',
        text: 'IONOS WebAnalytics',
      },
      {
        type: 'p',
        text: 'Diese Website nutzt die Analysedienste von IONOS WebAnalytics (im Folgenden: IONOS). Anbieter ist die',
      },
      {
        type: 'p',
        text: '1&1 IONOS SE, Elgendorfer Straße 57, D – 56410 Montabaur. Im Rahmen der Analysen mit IONOS können u. a. Besucherzahlen und –verhalten (z. B. Anzahl der Seitenaufrufe, Dauer eines Webseitenbesuchs, Absprungraten), Besucherquellen (d. h., von welcher Seite der Besucher kommt), Besucherstandorte sowie technische Daten (Browser- und Betriebssystemversionen) analysiert werden. Zu diesem Zweck speichert',
      },
      {
        type: 'p',
        text: 'IONOS insbesondere folgende Daten:',
      },
      {
        type: 'ul',
        items: [
          'Referrer (zuvor besuchte Webseite) angeforderte Webseite oder Datei',
          'Browsertyp und Browserversion verwendetes Betriebssystem verwendeter Gerätetyp',
          'Uhrzeit des Zugriffs',
          'IP-Adresse in anonymisierter Form (wird nur zur Feststellung des Orts des Zugriffs verwendet)',
        ],
      },
      {
        type: 'p',
        text: 'Die Datenerfassung erfolgt laut IONOS vollständig anonymisiert, sodass sie nicht zu einzelnen Personen zurückverfolgt werden kann. Cookies werden von IONOS WebAnalytics nicht gespeichert.',
      },
      {
        type: 'p',
        text: 'Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der',
      },
      {
        type: 'p',
        text: 'Websitebetreiber hat ein berechtigtes Interesse an der statistischen Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die',
      },
      {
        type: 'p',
        text: 'Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'p',
        text: 'Weitere Informationen zur Datenerfassung und Verarbeitung durch IONOS WebAnalytics entnehmen Sie der Datenschutzerklärung von IONOS unter folgendem Link: https://www.ionos.de/terms-gtc/index.php?id=6',
      },
    ],
  },
  {
    id: '7-plugins-und-tools',
    title: '7. Plugins und Tools',
    content: [
      {
        type: 'h3',
        text: 'Google Web Font',
      },
      {
        type: 'p',
        text: 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren',
      },
      {
        type: 'p',
        text: 'Browsercache, um Texte und Schriftarten korrekt anzuzeigen.',
      },
      {
        type: 'p',
        text: 'Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google WebFonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.',
      },
      {
        type: 'p',
        text: 'Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'p',
        text: 'Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.',
      },
      {
        type: 'p',
        text: 'Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de.',
      },
      {
        type: 'h3',
        text: 'Google Maps',
      },
      {
        type: 'p',
        text: 'Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon',
      },
      {
        type: 'p',
        text: 'House, Barrow Street, Dublin 4, Irland.',
      },
      {
        type: 'p',
        text: 'Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese',
      },
      {
        type: 'p',
        text: 'Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.',
      },
      {
        type: 'p',
        text: 'Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.',
      },
      {
        type: 'p',
        text: 'Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende',
      },
      {
        type: 'p',
        text: 'Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a',
      },
      {
        type: 'p',
        text: 'DSGVO; die Einwilligung ist jederzeit widerrufbar.',
      },
      {
        type: 'p',
        text: 'Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de.',
      },
      {
        type: 'p',
        text: 'Damit unsere Inhalte in jedem Browser korrekt und grafisch ansprechend dargestellt werden, verwenden wir für diese Webseite Skript- und Schriftbibliotheken wie Google Web Fonts ( https://www.google.com/webfonts ). Google Web Fonts werden in den Cache Ihres Browsers übertragen, sodass sie nur einmal geladen werden müssen. Wenn Ihr Browser Google Web Fonts nicht unterstützt oder den Zugriff verweigert, werden die Inhalte in einer Standardschriftart dargestellt.',
      },
      {
        type: 'p',
        text: 'Beim Aufrufen von Skript- oder Schriftbibliotheken wir automatisch eine Verbindung zum Betreiber der Bibliothek hergestellt. Es besteht hierbei theoretisch die Möglichkeit für diesen Betreiber, Daten zu erfassen. Derzeit ist nicht bekannt, ob und zu welchem Zweck die Betreiber der entsprechenden Bibliotheken tatsächlich Daten erfassen.',
      },
      {
        type: 'p',
        text: 'Hier finden Sie die Datenschutzbestimmungen des Betreibers der Google-Bibliothek: https://www.google.com/policies/privacy .',
      },
      {
        type: 'h3',
        text: 'OpenStreetMap',
      },
      {
        type: 'p',
        text: 'Wir nutzen den Kartendienst von OpenStreetMap (OSM). Anbieterin ist die Open-Street-Map Foundation',
      },
      {
        type: 'p',
        text: '(OSMF), 132 Maney Hill Road, Sutton Coldfield, West Midlands, B72 1JU, United Kingdom.',
      },
      {
        type: 'p',
        text: 'Wenn Sie eine Website besuchen, auf der OpenStreetMap eingebunden ist, werden u. a. Ihre IP-Adresse und weitere Informationen über Ihr Verhalten auf dieser Website an die OSMF weitergeleitet. OpenStreetMap speichert hierzu unter Umständen Cookies in Ihrem Browser oder setzt vergleichbare',
      },
      {
        type: 'p',
        text: 'Wiedererkennungstechnologien ein.',
      },
      {
        type: 'p',
        text: 'Ferner kann Ihr Standort erfasst werden, wenn Sie dies in Ihren Geräteeinstellungen – z. B. auf Ihrem Handy',
      },
      {
        type: 'p',
        text: '– zugelassen haben. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Details entnehmen Sie der Datenschutzerklärung von OpenStreetMap unter folgendem Link: https://wiki.osmfoundation.org/wiki/Privacy_Policy.',
      },
      {
        type: 'p',
        text: 'Die Nutzung von OpenStreetMap erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.',
      },
    ],
  },
]

const hausordnungSections: LegalContent['sections'] = [
  {
    id: 'praeambel',
    title: 'Präambel',
    content: [
      {
        type: 'p',
        text: 'Eine Gemeinschaft von Teilnehmer, Lehrkräften und Mitarbeitern braucht bestimmte Regeln das reibungslose     Zusammenleben. Das Akademische Bildungs-Center e.V. ist eine friedliche, interkulturelle und weltoffene Lehr- und Lernstätte. Wir beachten in unserem täglichen Miteinander die Prinzipien unserer Gemeinschaft mit respektvollem Umgang und gegenseitiger Toleranz, Rücksichtnahme, Hilfsbereitschaft und Gleichberechtigung.',
      },
    ],
  },
  {
    id: 'allgemeines',
    title: 'Allgemeines',
    content: [
      {
        type: 'ul',
        items: [
          'Das Gebäude, das Treppenhaus, die Klassenräume, der Flur sowie die WCs sind sauber zu halten. Nach dem Verlassen des Unterrichts ist der Raum, die Tafel und der Arbeitsplatzt sauber zu hinterlassen.',
          'Für Abfälle und Wertstoffe sind die dafür Vorgesehenen Behälter zu benutzen.',
          'Das Rauchen ist innerhalb des Gebäudes (auch auf den Toiletten) nicht gestattet. Beachten Sie hierzu die ausgewiesene Raucherzone vor dem Gebäude.',
          'Der Konsum von alkoholischen Getränken innerhalb der Einrichtung ist in der Regel nicht gestattet.',
          'Das Betreiben ungeprüfter elektrischer Geräte (Wasserkocher, Kaffeemaschinen usw.) sind nicht gestattet.',
          'Wertgegenstände und größere Geld beträge sollten nicht mitgebracht werden.',
          'Das Akademische Bildungs-Center haftet im Falle eines Verlustes nicht.',
          'Während des Unterrichts darf nicht gegessen werden. Essen und offene Getränke gehören dabei auch nicht auf den Schreibtisch.',
          'Bekanntmachungen aller Art müssen von der Geschäftsführung genehmigt werden.',
          'Das Betreten von unbefugten Räumen ist nicht gestattet. Dies beinhaltet auch den Zutritt in die Küche.',
          'Jegliche Art von Handgreiflichkeiten oder sexuelle Belästigungen sind verboten.',
        ],
      },
    ],
  },
  {
    id: 'kursbesuch',
    title: 'Kursbesuch',
    content: [
      {
        type: 'ul',
        items: [
          'Jeder Teilnehmer ist verpflichtet, den Unterricht regelmäßig und ordnungsgemäß zu besuchen. Einzelheiten regelt die IntV.',
          'Bei Krankheit gelten die Bestimmungen der IntV. über die der TN während der Anmeldung benachrichtigt wird.',
          'Änderungen der Personalien sind der Verwaltung umgehend mitzuteilen.',
          'Im Unterricht dürfen keine Auseinandersetzungen zu politischen oder religiösen Themen geführt werden.',
        ],
      },
    ],
  },
  {
    id: 'unterrichtsbesuch',
    title: 'Unterrichtsbesuch',
    content: [
      {
        type: 'ul',
        items: [
          'Die Unterrichtszeiten richten sich nach dem ausgehändigten Plan. Lehrkräfte und Teilnehmer beginnen und beenden den Unterricht pünktlich.',
          'Während den Unterrichtszeiten und in den Pausen ist in der Einrichtung Lärm zu vermeiden.',
          'Während des Unterrichts müssen Handys und andere mitgebrachte elektronische Geräte ausgeschaltet oder lautlos in den Taschen aufbewahrt werden.',
          'Während des Unterrichts ist das Aufsuchen des WCs nur in Ausnahmefällen erlaubt. Hierzu sollten die Pausen abgewartet werden.',
        ],
      },
    ],
  },
  {
    id: 'weisungsrecht',
    title: 'Weisungsrecht',
    content: [
      {
        type: 'ul',
        items: [
          'Den Weisungen der Verwaltung, Geschäftsführung, Lehrkräfte ist Folge zu leisten.',
          'Bei Brand- und Katastrophenalarm gelten die Weisungen der in diesem Fall Zuständigen (z.B. Feuerwehr oder Polizei)',
        ],
      },
    ],
  },
  {
    id: 'versicherung-und-haftung',
    title: 'Versicherung und Haftung',
    content: [
      {
        type: 'ul',
        items: [
          'Jeder Teilnehmer ist innerhalb den Unterrichtszeiten im Gebäude gegen Unfälle versichert.',
          'Bei mutwilliger Beschädigung vom',
          'Eigentum muss der/die Verursacher/in für den Schaden aufkommen.',
          'Für verlorene oder vergessene Gegenstände kann das Akademische Bildungs-Center nicht haftbar gemacht werden.',
        ],
      },
    ],
  },
  {
    id: 'unfaelle-gefahren-katastrophen',
    title: 'Unfälle, Gefahren, Katastrophen',
    content: [
      {
        type: 'ul',
        items: [
          'Bei einem Brand oder Erste Hilfe Bedarf ist der in der Einrichtung ausgehängte Plan zur Kenntnis zu nehmen und zu befolgen.',
          'Unfallgefahren müssen jederzeit vermieden werden. Dazu müssen die Flure, Notausgänge und der Zugang zu den Feuerlöschern unbedingt freigehalten werden.',
          'Das Mitführen von gefährlichen Gegenständen ist verboten.',
          'Mängel oder Gefahrenquellen, die möglicherweise zu Unfällen führen können, müssen dem Sicherheitsbeauftragten sofort gemeldet werden.',
          'Die Lehrkräfte informieren zu Beginn des Kurses die Klasse über das richtige Verhalten im Alarmfall. Die Teilnehmer müssen sich im Alarmfall an diese Richtlinien halten.',
        ],
      },
    ],
  },
]

const legalHero = (title: string) => ({
  eyebrow: 'Rechtliches',
  title,
  intro: '',
  image: images.g03419,
})

export const impressumPage: ContentPage = {
  path: 'impressum',
  label: 'Impressum',
  seo: {
    title: 'Impressum',
    description: 'Impressum des Akademischen Bildungs-Centers e.V. in Mainz.',
  },
  hero: legalHero('Impressum'),
  blocks: [],
  legal: {
    reviewNote:
      'Vor dem Livegang prüfen: Seit 14.05.2024 gilt das Digitale-Dienste-Gesetz (§ 5 DDG statt § 5 TMG, §§ 7–10 DDG statt TMG). Die EU-Plattform zur Online-Streitbeilegung wurde am 20.07.2025 eingestellt. Postleitzahl und Ort der Anschrift ergänzen, E-Mail-Adresse und Vertretungsberechtigte auf Aktualität prüfen.',
    sections: impressumSections,
  },
}

export const datenschutzPage: ContentPage = {
  path: 'datenschutz',
  label: 'Datenschutz',
  seo: {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung des Akademischen Bildungs-Centers e.V. in Mainz.',
  },
  hero: legalHero('Datenschutzerklärung'),
  blocks: [],
  legal: {
    reviewNote:
      'Von der bisherigen Website übernommen – vor dem Livegang von einer fachkundigen Person prüfen und anpassen: Die neue Website nutzt kein IONOS-Hosting und keine IONOS WebAnalytics, keine Facebook- oder Instagram-Plugins, keine Google Fonts (Schriften lokal) und kein Google Maps. Neu und zu beschreiben sind u. a. die Karte (OpenStreetMap erst nach Einwilligung), das Hosting der neuen Website sowie Formulare und E-Mail-Versand.',
    sections: datenschutzSections,
  },
}

export const hausordnungPage: ContentPage = {
  path: 'hausordnung',
  label: 'Hausordnung',
  seo: {
    title: 'Hausordnung',
    description:
      'Hausordnung des Akademischen Bildungs-Centers e.V. für Teilnehmende, Lehrkräfte und Mitarbeitende.',
  },
  hero: legalHero('Hausordnung'),
  blocks: [],
  legal: {
    intro: 'Regeln für ein respektvolles und sicheres Miteinander in unseren Räumen.',
    sections: hausordnungSections,
  },
}
