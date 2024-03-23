import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room4SoundAndLightingDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
}

export class Room4SoundAndLightingDevice extends BaseDevice {
    static #device: Room4SoundAndLightingDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room4SoundAndLightingDevice(dev.detachSocket())
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

    triggerTilesSolvedCue() {
        this.sendCommand("TILESSOLVEDCUE")
    }

    triggerTilesFailedCue() {
        this.sendCommand("TILESFAILEDCUE")
    }

    triggerTilesNote1Cue() {
        this.sendCommand("TILESNOTE1CUE")
    }

    triggerTilesNote2Cue() {
        this.sendCommand("TILESNOTE2CUE")
    }

    triggerTilesNote3Cue() {
        this.sendCommand("TILESNOTE3CUE")
    }

    triggerTilesNote4Cue() {
        this.sendCommand("TILESNOTE4CUE")
    }

    triggerHandFailedCue() {
        this.sendCommand("HANDFAILEDCUE")
    }

    triggerHandSolvedCue() {
        this.sendCommand("HANDSOLVEDCUE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(_key: string, _value: string) {}
}