import net from "node:net"
import { UnknownDevice } from "./devices/UnknownDevice"

const server = net.createServer({ keepAlive: true })

server.on('connection', (socket) => {
    socket.setEncoding('utf8')
    new UnknownDevice(socket)
})

server.on('error', (err) => {
    console.log("Devices Server Error:", err)
})

export function startDevicesServer() {
    server.listen(2051)
}