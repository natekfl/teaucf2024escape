import { Room1LightingDevice } from "../devices/Room1Lighting"
import { Room1ProjectorDevice } from "../devices/Room1Projector"
import { sleep } from "../lib"
import { Group } from "../operations/Group"
import { BaseRoomCoordinator, RoomState } from "./BaseCoordinator"
import { Room2 } from "./Room2Coordinator"

class Room1Coordinator extends BaseRoomCoordinator {

    // -- Room Properties --

    get targetRoomDurationMs() { return 8 * 60 * 1000 }
    get targetResetDurationMs() { return 2 * 60 * 1000 }
    get targetTransitionInDurationMs() { return 30 * 2000 }
    get previousRoom() { return undefined }
    get nextRoom(): BaseRoomCoordinator { return Room2 }

    // -- Core Functions --

    enableAll(): void {
        Room1ProjectorDevice.device?.setEnabled(true)
        Room1LightingDevice.device?.setEnabled(true)
    }

    disableAll(): void {
        Room1ProjectorDevice.device?.setEnabled(false)
        Room1LightingDevice.device?.setEnabled(false)
    }

    override startRoomTransitionIn(group: Group): void {
        super.startRoomTransitionIn(group)
        this.enableAll()
        Room1ProjectorDevice.device?.triggerEnterStartCue()
        Room1LightingDevice.device?.triggerEnterStartCue()
    }

    override startRoom(): void {
        super.startRoom()
        this.enableAll()
        Room1ProjectorDevice.device?.triggerEnterCue()
        Room1LightingDevice.device?.triggerEnterCue()
        Room1ProjectorDevice.device?.startVideo()
    }

    override async startRoomTransitionOut(): Promise<void> {
        super.startRoomTransitionOut()
        Room1ProjectorDevice.device?.triggerDoorOpenCue()
        Room1LightingDevice.device?.triggerDoorOpenCue()
        sleep(8 * 1000)
        Room1ProjectorDevice.device?.triggerExitCue()
        Room1LightingDevice.device?.triggerExitCue()
    }

    override endRoom(): void {
        super.endRoom()
        this.disableAll()
    }

    override allPuzzlesSolved(): boolean {
        return this.activeGroup?.room1.doorPuzzleFinishedAt != null
    }

    tick(): void {
        super.tick()
        if (this.allPuzzlesSolved() && this.activeGroup?.room1.finishedAt == null) {
            this.activeGroup!.room1.finishedAt = Date.now()
        }
    }

    // -- Puzzle Solved Markers --

    markDoorPuzzleSolved() {
        if (!this.activeGroup) return
        this.activeGroup!.room1.doorPuzzleFinishedAt = Date.now()
    }

    // -- Event Handlers --

    // None

    // -- Device Relinkers --

    relinkProjectorDevice() {
        if ([RoomState.TRANSITION_IN, RoomState.TRANSITION_OUT, RoomState.RUNNING].includes(this.state)) {
            Room1ProjectorDevice.device?.setEnabled(true)
        }
        if (this.state === RoomState.TRANSITION_IN) {
            Room1ProjectorDevice.device?.triggerEnterStartCue()
        }
        if (this.state === RoomState.RUNNING) {
            Room1ProjectorDevice.device?.triggerEnterCue()
        }
        if (this.state === RoomState.TRANSITION_OUT) {
            Room1ProjectorDevice.device?.triggerExitCue()
        }

        Room1ProjectorDevice.device?.on("videoStart", () => Room1LightingDevice.device?.triggerVideoStartCue())
        Room1ProjectorDevice.device?.on("videoEnd", () => Room1LightingDevice.device?.triggerVideoEndCue())
    }

    relinkLightingDevice() {
        if ([RoomState.TRANSITION_IN, RoomState.TRANSITION_OUT, RoomState.RUNNING].includes(this.state)) {
            Room1LightingDevice.device?.setEnabled(true)
        }
        if (this.state === RoomState.TRANSITION_IN) {
            Room1LightingDevice.device?.triggerEnterStartCue()
        }
        if (this.state === RoomState.RUNNING) {
            Room1LightingDevice.device?.triggerEnterCue()
        }
        if (this.state === RoomState.TRANSITION_OUT) {
            Room1LightingDevice.device?.triggerExitCue()
        }
    }

}

export const Room1 = new Room1Coordinator()
