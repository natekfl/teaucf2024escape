import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room3SoundAndLightingDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export class Room3SoundAndLightingDevice extends BaseDevice {
    static #device: Room3SoundAndLightingDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room3SoundAndLightingDevice(dev.detachSocket())
    }
    // ---------- //
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    triggerEnterStartCue() {
        this.sendCommand("ENTERSTARTCUE")
    }

    triggerEnterCue() {
        this.sendCommand("ENTERCUE")
    }

    triggerExitCue() {
        this.sendCommand("EXITCUE")
    }

    triggerBoxesSolvedCue() {
        this.sendCommand("BOXESSOLVEDCUE")
    }

    triggerSimonSolvedCue() {
        this.sendCommand("SIMONSOLVEDCUE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(_key: string, _value: string) {}
}