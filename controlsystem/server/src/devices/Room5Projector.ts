import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room5ProjectorDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'videoStart', listener: () => void): this
    on(event: 'videoEnd', listener: () => void): this
}

export class Room5ProjectorDevice extends BaseDevice {
    static #device: Room5ProjectorDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room5ProjectorDevice(dev.detachSocket())
    }
    // ---------- //

    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    #videoTimestamp: number = 0
    get videoTimestamp() { return this.#videoTimestamp }

    startVideo() {
        this.sendCommand("STARTVIDEO")
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

    private onCmd(cmd: string) {
        if (cmd === "VIDEOSTARTED") {
            this.emit("videoStart")
        }
        if (cmd === "VIDEOENDED") {
            this.emit("videoEnd")
        }
    }

    private onPropertyUpdate(key: string, value: string) {
        if (key === "VIDEOTIMESTAMP") {
            const val = parseInt(value)
            if (isNaN(val)) {
                //TODO Fault
                console.log("Fault:", "VIDEOTIMESTAMP received non-integer value")
                return
            }
            this.#videoTimestamp = val
        }
    }
}