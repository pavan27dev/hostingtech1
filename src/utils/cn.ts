/** Tiny className joiner (no runtime dependency). */
export type ClassValue = string | number | null | false | undefined
export const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(' ')
