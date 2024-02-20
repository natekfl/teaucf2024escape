import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export type Room4PedistalState = "DOWN" | "RISING" | "UP" | "LOWERING"

export declare interface Room4PedistalDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'stateChanged', listener: (state: Room4PedistalState) => void): this
}

export class Room4PedistalDevice extends BaseDevice {
    static #device: Room4PedistalDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        if (this.#device != undefined) {
            this.#device.destroySocket()
        }
        this.#device = new Room4PedistalDevice(dev.detachSocket())
    }
    // ---------- //

    #state: Room4PedistalState = "DOWN"
    get state() { return this.#state }
    
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    open() {
        this.sendCommand("OPEN")
    }

    close() {
        this.sendCommand("CLOSE")
    }

    private onCmd(_cmd: string) {}

    private onPropertyUpdate(key: string, value: string) {
        if (key === "STATE") {
            if (!["DOWN", "RISING", "UP", "LOWERING"].includes(value)) {
                console.log("Fault:", "STATE received invalid value")
                return
            }
            this.#state = value as Room4PedistalState
            this.emit("stateChanged", this.state)
        }
    }
}