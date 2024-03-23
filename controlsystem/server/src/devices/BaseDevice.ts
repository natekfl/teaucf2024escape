import net from "node:net"
import { EventEmitter } from "node:events"

export declare interface BaseDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export abstract class BaseDevice extends EventEmitter {
    private socket: net.Socket
    private buf = ''

    get connected() { return !this.socket.closed }

    #enabled = false
    get enabled() { return this.#enabled }

    constructor(socket: net.Socket) {
        super()
        this.socket = socket
        this.socket.on('close', () => this.onClose())
        this.socket.on('error', () => this.onClose())
        this.socket.on('data', (d) => this.onData(d))
    }

    private onClose() {
        console.log(this.constructor.name, "closed")
        this.destroySocket()
    }

    private onData(data: Buffer) {
        this.buf += data.toString()

        const eof = this.buf.indexOf(';')
        if (eof != -1) {
            const packet = this.buf.substring(0, eof)
            this.buf = this.buf.substring(eof+1)
            if (packet.indexOf("=") === -1) {
                this.onReceiveCommand(packet)
            } else {
                const [key, value] = packet.split('=')
                this.onReceiveProperty(key, value)
            }
        }
    }

    private onReceiveCommand(cmd: string) {
        if (cmd === "PING") {
            this.sendCommand("PONG")
        }
        this.emit("cmd", cmd)
    }

    private onReceiveProperty(key: string, value: string) {
        if (key === "ENABLED") {
            this.#enabled = value === "true"
        }
        this.emit("propertyUpdate", key, value)
    }

    protected sendProperty(key: string, value: string) {
        if (!/^([a-zA-Z0-9 ]+)$/.test(key)) {
            throw new Error("Invalid key")
        }
        if (!/^([a-zA-Z0-9 ]+)$/.test(value)) {
            throw new Error("Invalid value")
        }
        this.socket.write(`${key}=${value};`)
    }

    protected sendCommand(cmd: string) {
        if (!/^([a-zA-Z0-9 ]+)$/.test(cmd)) {
            throw new Error("Invalid command")
        }
        this.socket.write(cmd + ';')
    }

    restartDevice() {
        this.sendCommand("RESTART")
    }

    setEnabled(x: boolean) {
        this.sendProperty("ENABLED", x.toString())
    }

    detachSocket(): net.Socket {
        this.socket.removeAllListeners('close')
        this.socket.removeAllListeners('data')
        this.socket.removeAllListeners('error')
        this.emit("socketDetached")
        return this.socket
    }

    destroySocket() {
        this.socket.destroy()
        this.detachSocket()
        this.removeAllListeners()
    }
}