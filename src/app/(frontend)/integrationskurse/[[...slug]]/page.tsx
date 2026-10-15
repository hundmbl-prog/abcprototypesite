import { contentRoute } from '@/components/page/ContentRoute'

const route = contentRoute('integrationskurse')

export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
