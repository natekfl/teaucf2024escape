import net from "node:net"
import { BaseDevice } from "./BaseDevice";
import { Room2LaserDevice } from "./Room2Laser";
import { Room1LightingDevice } from "./Room1Lighting";
import { Room1ProjectorDevice } from "./Room1Projector";
import { Room2SoundAndLightingDevice } from "./Room2SoundAndLighting";
import { Room3BoxesDevice } from "./Room3Boxes";
import { Room3SimonDevice } from "./Room3Simon";
import { Room3SoundAndLightingDevice } from "./Room3SoundAndLighting";
import { Room4HandDevice } from "./Room4Hand";
import { Room4Lasers } from "./Room4Lasers";
import { Room4PedistalDevice } from "./Room4Pedistal";
import { Room4SoundAndLightingDevice } from "./Room4SoundAndLighting";
import { Room4TileFloor } from "./Room4TileFloor";
import { Room5BricksDevice } from "./Room5Bricks";
import { Room5LightingDevice } from "./Room5Lighting";
import { Room5ProjectorDevice } from "./Room5Projector";

export class UnknownDevice extends BaseDevice {
    constructor(socket: net.Socket) {
        super(socket)
        this.on('cmd', this.onCmd)
        this.on('propertyUpdate', this.onPropertyUpdate)
    }

    private onCmd() {
        console.error("Received command from unknown device")
        //TODO Throw Warning
        this.destroySocket()
    }

    private onPropertyUpdate(key: string, value: string) {
        if (key !== "IDENT") {
            console.error("Received invalid property from unknown device")
            //TODO Throw Warning
            this.destroySocket()
            return
        }

        const identMap: { [key: string]: { assignDevice(dev: UnknownDevice): void } } = {
            "R1LIGHTING": Room1LightingDevice,
            "R1PROJECTOR": Room1ProjectorDevice,
            "R2LASER": Room2LaserDevice,
            "R2SAL": Room2SoundAndLightingDevice,
            "R3BOXES": Room3BoxesDevice,
            "R3SIMON": Room3SimonDevice,
            "R3SAL": Room3SoundAndLightingDevice,
            "R4HAND0": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 0) } },
            "R4HAND1": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 1) } },
            "R4HAND2": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 2) } },
            "R4HAND3": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 3) } },
            "R4HAND4": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 4) } },
            "R4HAND5": { assignDevice(dev: UnknownDevice) { Room4HandDevice.assignDevice(dev, 5) } },
            "R4LASERS": Room4Lasers,
            "R4PEDISTAL": Room4PedistalDevice,
            "R4SAL": Room4SoundAndLightingDevice,
            "R4TILEFLOOR": Room4TileFloor,
            "R5BRICKS": Room5BricksDevice,
            "R5LIGHTING": Room5LightingDevice,
            "R5PROJECTOR": Room5ProjectorDevice
        }

        const parent = identMap[value]
        if (parent == null) {
            console.error("Received invalid IDENT " + value)
            //TODO Throw Warning
            this.destroySocket()
            return
        } else {
            parent.assignDevice(this)
            console.log("Assigned", value)
        }
        
        
    }
}