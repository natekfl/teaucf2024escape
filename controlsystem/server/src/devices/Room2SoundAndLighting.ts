import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"
import { Room2 } from "../coordinators/Room2Coordinator"

export declare interface Room2SoundAndLightingDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export class Room2SoundAndLightingDevice extends BaseDevice {
    static #device: Room2SoundAndLightingDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room2SoundAndLightingDevice(dev.detachSocket())
        Room2.relinkSoundAndLightingDevice()
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

    triggerLaserOnCue() {
        this.sendCommand("LASERONCUE")
    }

    triggerLaserOffCue() {
        this.sendCommand("LASEROFFCUE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(_key: string, _value: string) {}
}