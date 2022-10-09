const dotenv = require('dotenv')
dotenv.config()

namespace Settings {
    export const printSettings = () => {
        const port = getPort()
        const time = getTimeToken()
        console.log('SERVER_PORT: ' + port)
        console.log('TIME_EXPIRED_TOKEN: ' + time)
    }
    export const getPass = () => {
        return process.env.CREDITSAFE_PWD === undefined
            ? ''
            : process.env.CREDITSAFE_PWD
    }
    export const getUser = () => {
        return process.env.CREDITSAFE_USER === undefined
            ? ''
            : process.env.CREDITSAFE_USER
    }
    export const getPort = () => {
        return process.env.SERVER_PORT === undefined
            ? '3001'
            : process.env.SERVER_PORT
    }
    export const getTimeToken = () => {
        return process.env.TIME_EXPIRED_TOKEN === undefined
            ? 30
            : parseInt(process.env.TIME_EXPIRED_TOKEN)
    }
    export const getTokenPath = () => {
        return process.env.PATH_TOKEN === undefined
            ? ''
            : process.env.PATH_TOKEN
    }
}
export default Settings
