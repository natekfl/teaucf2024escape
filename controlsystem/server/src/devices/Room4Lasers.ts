import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room4Lasers {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'lasersOn', listener: () => void): this
    on(event: 'lasersOff', listener: () => void): this
    on(event: 'laserBroken', listener: () => void): this
    on(event: 'solved', listener: () => void): this
}

export class Room4Lasers extends BaseDevice {
    static #device: Room4Lasers | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room4Lasers(dev.detachSocket())
    }
    // ---------- //

    #overridden = false
    get overridden() { return this.#overridden }

    #solved = false
    get solved() { return this.#solved }

    #lasersOn = false
    get lasersOn() { return this.#lasersOn }
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    openBox() {
        this.sendCommand("OPENBOX")
    }

    relightLasers() {
        this.sendCommand("RELIGHT")
    }

    setOverridden(x: boolean) {
        this.sendProperty("OVERRIDDEN", x.toString())
    }

    reset() {
        this.sendCommand("RESET")
    }

    private onCmd(cmd: string) {
        if (cmd === "LASERBROKEN") {
            this.emit("laserBroken")
        }
    }

    private onPropertyUpdate(key: string, value: string) {
        if (key === "SOLVED") {
            const val = value === "true"
            this.#solved = val
            if (val) {
                this.emit("solved")
            }
        }
        if (key === "LASERSON") {
            const val = value === "true"
            this.#lasersOn = val
            if (val) {
                this.emit("lasersOn")
            } else {
                this.emit("lasersOff")
            }
        }

        if (key === "OVERRIDDEN") {
            this.#overridden = value === "true"
        }
    }
}