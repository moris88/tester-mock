export interface Token {
    id: number
    token: string
    date: Date
}

export interface ServerResponseToken {
    token?: string
    detail?: string
    ValidationErrors?: ValidationError[]
    type?: string
    title?: string
    status?: number
}

export type TypeError = 'Password' | 'Username'
export interface ValidationError {
    Name: TypeError
    Description: string
}