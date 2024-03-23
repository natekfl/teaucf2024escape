import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room5LightingDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export class Room5LightingDevice extends BaseDevice {
    static #device: Room5LightingDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room5LightingDevice(dev.detachSocket())
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

    triggerDestructionStage1Cue() {
        this.sendCommand("DESTRUCTION1CUE")
    }

    triggerDestructionStage2Cue() {
        this.sendCommand("DESTRUCTION2CUE")
    }
    
    triggerDestructionStage3Cue() {
        this.sendCommand("DESTRUCTION3CUE")
    }

    triggerDestructionStage4Cue() {
        this.sendCommand("DESTRUCTION4CUE")
    }

    triggerDoorOpenCue() {
        this.sendCommand("DOOROPENCUE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(_key: string, _value: string) {}
}