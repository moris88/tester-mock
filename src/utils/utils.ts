import Settings from "../lib/settings"

export type TypeErrorAccess = 'username' | 'password' | 'all' | 'no-access' | 'access'
export interface ResponseAccess {
    isError: boolean
    typeError: TypeErrorAccess
}
export function checkAccess(u: string, p: string): ResponseAccess {
    if (
        u === undefined ||
        p === undefined ||
        typeof u !== 'string' ||
        typeof p !== 'string'
    ) {
        if (u === undefined || typeof u !== 'string')
            return { isError: true, typeError: 'username' }
        else if (p === undefined || typeof p !== 'string') {
            return { isError: true, typeError: 'password' }
        } else {
            return { isError: true, typeError: 'all' }
        }
    } else {
        if (u === Settings.getUser() && p === Settings.getPass())
            return { isError: false, typeError: 'access' }
        else return { isError: true, typeError: 'no-access' }
    }
}