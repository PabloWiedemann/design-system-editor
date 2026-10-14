// next/headers is server-only; client specimens get empty stand-ins.
const empty = { get: () => undefined, getAll: () => [], has: () => false, set() {}, delete() {} }
export const cookies = () => empty
export const headers = () => new Headers()
export const draftMode = () => ({ isEnabled: false })
