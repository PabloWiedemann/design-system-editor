// next/router outside Next.
const router = { pathname: '/', asPath: '/', query: {}, push: async () => true, replace: async () => true, back() {}, prefetch: async () => {}, events: { on() {}, off() {} } }
export const useRouter = () => router
export default router
