import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room3BoxesDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'solved', listener: () => void): this
}

export class Room3BoxesDevice extends BaseDevice {
    static #device: Room3BoxesDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room3BoxesDevice(dev.detachSocket())
    }
    // ---------- //

    #boxesState: [boolean, boolean, boolean, boolean] = [false, false, false, false]
    get boxesState() { return this.#boxesState }

    #overridden = false
    get overridden() { return this.#overridden }

    #solved = false
    get solved() { return this.#solved }
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    openBox() {
        this.sendCommand("OPENBOX")
    }

    setOverridden(x: boolean) {
        this.sendProperty("OVERRIDDEN", x.toString())
    }

    reset() {
        this.sendCommand("RESET")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(key: string, value: string) {
        if (key === "BOX0STATE") {
            this.#boxesState[0] = value === "true"
        }
        if (key === "BOX1STATE") {
            this.#boxesState[1] = value === "true"
        }
        if (key === "BOX2STATE") {
            this.#boxesState[2] = value === "true"
        }
        if (key === "BOX3STATE") {
            this.#boxesState[3] = value === "true"
        }
        if (key === "SOLVED") {
            const val = value === "true"
            this.#solved = val
            if (val) {
                this.emit("solved")
            }
        }

        if (key === "OVERRIDDEN") {
            this.#overridden = value === "true"
        }
    }
}