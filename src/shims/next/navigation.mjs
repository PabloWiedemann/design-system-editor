// next/navigation outside Next: inert router and route hooks.
const router = { push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {} }
export const useRouter = () => router
export const usePathname = () => '/'
export const useSearchParams = () => new URLSearchParams()
export const useParams = () => ({})
export const useSelectedLayoutSegment = () => null
export const useSelectedLayoutSegments = () => []
export const redirect = () => {}
export const permanentRedirect = () => {}
export const notFound = () => {}
