import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room4HandDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'pressed', listener: () => void): this
    on(event: 'unpressed', listener: () => void): this
}

export class Room4HandDevice extends BaseDevice {
    static #devices: [
        Room4HandDevice | undefined,
        Room4HandDevice | undefined,
        Room4HandDevice | undefined,
        Room4HandDevice | undefined,
        Room4HandDevice | undefined,
        Room4HandDevice | undefined
    ] = [undefined, undefined, undefined, undefined, undefined, undefined]
    static get devices() { return this.#devices }

    static assignDevice(dev: UnknownDevice, idx: number) {
        if (idx >= this.devices.length) { throw new Error("Invalid device idx") }
        if (this.#devices[idx] != undefined) {
            this.#devices[idx]!.destroySocket()
        }
        this.#devices[idx] = new Room4HandDevice(dev.detachSocket())
    }
    // ---------- //

    #pressed = false
    get pressed() { return this.#pressed }
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    stab() {
        this.sendCommand("STAB")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(key: string, value: string) {
        if (key === "PRESSED") {
            const val = value === "true"
            this.#pressed = val
            if (val) { this.emit("pressed") } else { this.emit("unpressed") }
        }
    }
}