import net from "node:net"
import { BaseDevice } from "./BaseDevice"
import { UnknownDevice } from "./UnknownDevice"

export declare interface Room4CompressorDevice {
    on(event: 'cmd', listener: (cmd: string) => void): this
    on(event: 'propertyUpdate', listener: (key: string, value: string) => void): this
    on(event: 'socketDetached', listener: () => void): this
    on(event: 'startedRunning', listener: () => void): this
    on(event: 'stoppedRunning', listener: () => void): this
}

export class Room4CompressorDevice extends BaseDevice {
    static #device: Room4CompressorDevice | undefined = undefined
    static get device() { return this.#device }

    static assignDevice(dev: UnknownDevice) {
        let oldCooldownTimeRemaining = this.device?.cooldownTimeRemainingMs ?? 0
        if (this.device != undefined) {
            this.device.destroySocket()
        }
        this.#device = new Room4CompressorDevice(dev.detachSocket())
        if (oldCooldownTimeRemaining > 0) {
            this.device?.setCooldownTimeRemainingMs(oldCooldownTimeRemaining)
        }
    }
    // ---------- //

    #running = false
    get running() { return this.#running }

    #cooldownTimeRemainingMs = 0
    get cooldownTimeRemainingMs() { return this.#cooldownTimeRemainingMs }

    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
        this.setEnabled(true) //Enable on connect
    }

    attemptStartCompressor() {
        this.sendCommand("STARTCOMPRESSOR")
    }

    stopCompressor() {
        this.sendCommand("STOPCOMPRESSOR")
    }

    setCooldownTimeRemainingMs(t: number) {
        this.sendProperty("COOLDOWNTIMEREMAINING", t.toString())
    }

    private onCmd(_cmd: string) { }

    private onPropertyUpdate(key: string, value: string) {
        if (key === "RUNNING") {
            const val = value === "true"
            this.#running = val
            if (val) {
                this.emit("startedRunning")
            } else {
                this.emit("stoppedRunning")
            }
        }

        if (key === "COOLDOWNTIMEREMAINING") {
            const val = parseInt(value)
            this.#cooldownTimeRemainingMs = val
        }
    }
}