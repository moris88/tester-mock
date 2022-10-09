import { readFileSync, writeFileSync } from 'fs'
import { Token } from '../types/global'
import settings from './settings'

namespace Token {
    const getFileTokens = (): Token[] => {
        return JSON.parse(readFileSync(settings.getTokenPath()).toString())
    }

    const setFileTokens = (tokens: Token[]) => {
        writeFileSync(settings.getTokenPath(), JSON.stringify(tokens))
    }

    export const generateToken = (n: number) => {
        controlTokens()
        const token = generateRandomString(n)
        setTokenFromFile(token)
        return token
    }

    const generateRandomString = (lunghezza: number): string => {
        let randomString = ''
        const listChar =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        for (let i = 0; i < lunghezza; i++) {
            const randomPos = Math.floor(Math.random() * listChar.length)
            randomString += listChar.substring(randomPos, randomPos + 1)
        }
        return randomString
    }

    export const isTokenCorrect = (token: string): boolean => {
        if (token !== '') {
            const tokens = getFileTokens()
            controlTokens()
            for (const t of tokens) {
                if (t.token === token) {
                    return true
                }
            }
        }
        return false
    }

    const setTokenFromFile = (token: string): void => {
        const tokens = getFileTokens()
        let id = 1
        if (tokens.length !== 0) {
            id = tokens[tokens.length - 1].id + 1
        }
        const objToken: Token = {
            id: id,
            token: token,
            date: new Date(),
        }
        tokens.push(objToken)
        setFileTokens(tokens)
    }

    const controlTokens = () => {
        let tokens = getFileTokens()
        let index = 0
        for (const token of tokens) {
            const today = new Date()
            const dateToken = new Date(token.date)
            const difference = Math.floor(
                (today.getTime() - dateToken.getTime()) / (1000 * 60)
            )
            if (difference > settings.getTimeToken()) {
                tokens.splice(index, 1)
                setFileTokens(tokens)
            }
            index++
        }
    }
}

export default Token
