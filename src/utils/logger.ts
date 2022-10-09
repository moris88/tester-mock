import colors from 'colors'
import { writeFileSync } from 'fs'

const writeLog = (data: string): void => {
    writeFileSync('./logs/info.log', data + '\n', {
        encoding: 'utf8',
        flag: 'a+',
    })
}

const getDateNow = () => {
    const date = new Date()
    const dataString = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return dataString
}

namespace Logger {
    export const print = (text: string) => {
        writeLog(text)
        console.log(getDateNow() + ' ' + text)
    }
    export const printInfo = (text: string) => {
        writeLog('INFO: ' + text)
        console.info(colors.cyan(getDateNow() + ' ' + text))
    }

    export const printError = (text: string) => {
        writeLog('ERROR: ' + text)
        console.error(colors.red(getDateNow() + ' ' + text))
    }

    export const printWarn = (text: string) => {
        writeLog('WARNING: ' + text)
        console.warn(colors.yellow(getDateNow() + ' ' + text))
    }
}

export default Logger
