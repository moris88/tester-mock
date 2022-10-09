import Settings from './lib/settings'
import Server from './server'

const server = new Server()
server.serviceAllowCors()
server.serviceHome()
server.serviceAuth()
server.run(Settings.getPort())
