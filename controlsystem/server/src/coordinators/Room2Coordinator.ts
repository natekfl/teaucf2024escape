import { Room2LaserDevice } from "../devices/Room2Laser"
import { Room2SoundAndLightingDevice } from "../devices/Room2SoundAndLighting"
import { Group } from "../operations/Group"
import { BaseRoomCoordinator, RoomState } from "./BaseCoordinator"

class Room2Coordinator extends BaseRoomCoordinator {

    // -- Room Properties --

    get targetRoomDurationMs() { return 8 * 60 * 1000 }
    get targetResetDurationMs() { return 2 * 60 * 1000}
    get targetTransitionInDurationMs() { return 30 * 2000 }
    get previousRoom() { return undefined }
    get nextRoom(){ return undefined }
    
    // -- Core Functions --

    enableAll(): void {
        Room2SoundAndLightingDevice.device?.setEnabled(true)
        Room2LaserDevice.device?.setEnabled(true)
    }

    disableAll(): void {
        Room2SoundAndLightingDevice.device?.setEnabled(false)
        Room2LaserDevice.device?.setEnabled(false)
    }

    override startRoomTransitionIn(group: Group): void {
        super.startRoomTransitionIn(group)
        Room2SoundAndLightingDevice.device?.setEnabled(true)
        Room2SoundAndLightingDevice.device?.triggerEnterStartCue()
    }

    override startRoom(): void {
        super.startRoom()
        this.enableAll()
        Room2SoundAndLightingDevice.device?.triggerEnterCue()
    }

    override startRoomTransitionOut(): void {
        super.startRoomTransitionOut()
        Room2LaserDevice.device?.setEnabled(false)
        Room2SoundAndLightingDevice.device?.triggerExitCue()
    }

    override endRoom(): void {
        super.endRoom()
        this.disableAll()
    }

    // -- Puzzle Solved Markers --

    markSundialPuzzleSolved() {
        if (!this.activeGroup) return
        this.activeGroup!.room2.sundialPuzzleFinishedAt = Date.now()
    }

    markLaserPuzzleSolved() {
        if (!this.activeGroup) return
        this.activeGroup!.room2.laserPuzzleFinishedAt = Date.now()
    }

    // -- Event Handlers --

    private onLaserDetected() {
        Room2SoundAndLightingDevice.device?.triggerLaserOnCue()
    }

    private onLaserUndetected() {
        Room2SoundAndLightingDevice.device?.triggerLaserOffCue()
    }

    // -- Device Relinkers --

    relinkSoundAndLightingDevice() {
        if ([RoomState.TRANSITION_IN, RoomState.TRANSITION_OUT, RoomState.RUNNING].includes(this.state)) {
            Room2SoundAndLightingDevice.device?.setEnabled(true)
        }
        if (this.state === RoomState.TRANSITION_IN) {
            Room2SoundAndLightingDevice.device?.triggerEnterStartCue()
        }
        if (this.state === RoomState.RUNNING) {
            Room2SoundAndLightingDevice.device?.triggerEnterCue()
        }
        if (this.state === RoomState.TRANSITION_OUT) {
            Room2SoundAndLightingDevice.device?.triggerExitCue()
        }
    }

    relinkLaserDevice() {
        Room2LaserDevice.device?.on("laserDetected", this.onLaserDetected)
        Room2LaserDevice.device?.on("laserUndetected", this.onLaserUndetected)
        if (this.state === RoomState.RUNNING) {
            Room2LaserDevice.device?.setEnabled(true)
        }
    }

    

}

export const Room2 = new Room2Coordinator()
