import express, { Express } from 'express'
import Logger from './utils/logger'
import Token from './lib/token'
import Settings from './lib/settings'
import { ServerResponseToken } from './types/global'
import bodyParser from 'body-parser'
import { checkAccess } from './utils/utils'

export interface ServerResponse {
    users?: any
    records?: any
    token?: string
    message: string
    error: string
}

export default class Server {
    private app: Express
    private listService: string[]

    constructor() {
        this.app = express()
        this.listService = []
    }

    serviceAllowCors() {
        // enable CORS without external module
        this.listService.push('allowCors')
        this.app.use(bodyParser.json()) // for parsing application/json
        this.app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        this.app.use(function (req: any, res: any, next: any) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            )
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            )
            req.setEncoding('utf8')
            next()
        })
    }

    serviceHome() {
        this.listService.push('Home')
        this.app.get('/', (req: any, res: any) => {
            Logger.print('No route!')
            const response: ServerResponse = {
                message: 'run /auth',
                error: 'route Not found',
            }
            return res.status(501).json(response)
        })
    }

    serviceAuth() {
        this.listService.push('auth')
        this.app.post('/authenticate', (req: any, res: any) => {
            Logger.print('Auth login')
            let response: ServerResponseToken = {}
            // console.info(req)
            const { username, password } = req.body
            try {
                Logger.print(`Control body! ${username} - ${password}`)
                const error = checkAccess(username, password)
                response = {
                    type: 'https://httpstatuses.com/400',
                    title: 'Validation Error',
                    status: 400,
                    detail: 'See ValidationErrors for details',
                }
                if (error.isError)
                    Logger.printInfo(`Error! ${error.typeError}`)
                switch (error.typeError) {
                    case 'access':
                        Logger.print(`User ${username} authorized`)
                        return res.status(200).json({
                            token: Token.generateToken(128),
                            message: 'Authorized',
                        })
                    case 'no-access':
                        Logger.printError(`User ${username} not authorized`)
                        return res.status(401).json({
                            message:
                                'Access denied -  Please check that your username and password are correct.  Please be aware that usernames and passwords are case sensitive. If the problem persists, please contact your Creditsafe account manager.',
                        })
                    case 'username':
                        Logger.printError(`The Username field is required.`)
                        response.ValidationErrors = [
                            {
                                Name: 'Username',
                                Description: 'The Username field is required.',
                            },
                        ]
                        break
                    case 'password':
                        Logger.printError(`The Password field is required.`)
                        response.ValidationErrors = [
                            {
                                Name: 'Password',
                                Description: 'The Password field is required.',
                            },
                        ]
                        break
                    case 'all':
                        Logger.printError(
                            `The Password field and the Username field are required.`
                        )
                        response.ValidationErrors = [
                            {
                                Name: 'Password',
                                Description: 'The Password field is required.',
                            },
                            {
                                Name: 'Username',
                                Description: 'The Username field is required.',
                            },
                        ]
                        break
                }
                return res.status(400).json(response)
            } catch (error) {
                return res.status(500).json({
                    message: 'Internal Server Error',
                    error: JSON.stringify(error),
                })
            }
        })
    }

    run(port: string) {
        Settings.printSettings()
        Logger.printInfo('Mock Server!!!')
        Logger.printInfo('Servizi attivi: ' + this.listService)
        this.app.listen(port, () => {
            Logger.printInfo(`Server listening on http://localhost:${port}`)
        })
    }
}
