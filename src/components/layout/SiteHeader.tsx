import { getNavigation, getSiteSettings } from '@/content'
import { HeaderClient } from './HeaderClient'

export async function SiteHeader() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  return (
    <HeaderClient
      sections={navigation.main}
      cta={navigation.cta}
      location={settings.locations[0]}
    />
  )
}
