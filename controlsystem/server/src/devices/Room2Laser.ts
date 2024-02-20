import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room2LaserDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'laserDetected', listener: () => void): this
    on(event: 'laserUndetected', listener: () => void): this
}

export class Room2LaserDevice extends BaseDevice {
    static #device: Room2LaserDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room2LaserDevice(dev.detachSocket())
    }
    // ---------- //

    #laserDetected = false
    get laserDetected() { return this.#laserDetected }

    #overridden = false
    get overridden() { return this.#overridden }
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    setOverridden(x: boolean) {
        this.sendProperty("OVERRIDDEN", x.toString())
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(key: string, value: string) {
        if (key === "LASERDETECTED") {
            const val = value === "true"
            this.#laserDetected = val
            if (val) {
                this.emit("laserDetected")
            } else {
                this.emit("laserUnetected")
            }
        }

        if (key === "OVERRIDDEN") {
            this.#overridden = value === "true"
        }
    }
}