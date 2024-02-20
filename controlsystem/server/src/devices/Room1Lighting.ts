import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room1LightingDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export class Room1LightingDevice extends BaseDevice {
    static #device: Room1LightingDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room1LightingDevice(dev.detachSocket())
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

    triggerVideoStartCue() {
        this.sendCommand("VIDEOSTARTCUE")
    }

    triggerVideoEndCue() {
        this.sendCommand("VIDEOSTARTCUE")
    }

    triggerDoorOpenCue() {
        this.sendCommand("DOOROPENCUE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(_key: string, _value: string) {}
}