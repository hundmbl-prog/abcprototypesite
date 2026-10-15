import { contentRoute } from '@/components/page/ContentRoute'

const route = contentRoute('sprachkurse')

export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
