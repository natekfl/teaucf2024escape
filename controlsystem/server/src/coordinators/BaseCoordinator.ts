import { Group } from "../operations/Group"

export enum RoomState {
    TRANSITION_IN,
    RUNNING,
    TRANSITION_OUT,
    NEEDS_RESET,
    READY
}

class InvalidStateTransitionError extends Error {
    constructor() {
        super("invalid room state transition")
    }
}

export abstract class BaseRoomCoordinator {
    constructor() {
        setInterval(this.tick, 500)
    }

    #state = RoomState.NEEDS_RESET
    get state() { return this.#state }

    #activeGroup?: Group = undefined
    get activeGroup(): Group | undefined { return this.#activeGroup }

    preventGroupAdvance = false

    #changedStateAt: number = Date.now()
    get changedStateAt() { return this.#changedStateAt }

    #roomStartedAt: number = -1

    getRoomTimeMs(): number {
        const now = Date.now()
        if (this.#roomStartedAt === -1 || this.#roomStartedAt > now) {
            return -1
        }
        return now - this.#roomStartedAt
    }

    get isStalling() { return this.state === RoomState.RUNNING && this.getRoomTimeMs() > this.targetRoomDurationMs }

    startRoomTransitionIn(group: Group) {
        if (this.state !== RoomState.READY) {
            throw new InvalidStateTransitionError()
        }
        this.#state = RoomState.TRANSITION_IN
        this.#changedStateAt = Date.now()
        this.#activeGroup = group
    }
    startRoom(): void {
        if (this.state !== RoomState.TRANSITION_IN) {
            throw new InvalidStateTransitionError()
        }
        this.#state = RoomState.RUNNING
        this.#changedStateAt = Date.now()
        this.#roomStartedAt = this.changedStateAt
    }
    startRoomTransitionOut(): void {
        if (this.state !== RoomState.RUNNING) {
            throw new InvalidStateTransitionError()
        }
        this.#state = RoomState.TRANSITION_OUT
        this.#changedStateAt = Date.now()
    }
    endRoom() {
        if (this.state !== RoomState.TRANSITION_OUT) {
            throw new InvalidStateTransitionError()
        }
        this.#state = RoomState.NEEDS_RESET
        this.#changedStateAt = Date.now()
        this.#activeGroup = undefined
        this.#roomStartedAt = -1
    }
    markRoomReset() {
        if (this.state !== RoomState.NEEDS_RESET) {
            throw new InvalidStateTransitionError()
        }
        this.#state = RoomState.READY
        this.#changedStateAt = Date.now()
    }

    abstract get targetRoomDurationMs(): number
    abstract get targetResetDurationMs(): number
    abstract get targetTransitionInDurationMs(): number
    abstract get previousRoom(): BaseRoomCoordinator | undefined
    abstract get nextRoom(): BaseRoomCoordinator | undefined


    /**
     * Get an estimate of how long in ms until this room returns to a READY state
     *
     * @returns An estimate of how long in ms until this room returns to a READY state. A value of -1 means no estimate can be obtained.
     */
    willBeReadyIn(): number {
        const now = Date.now()
        if (this.state === RoomState.READY) {
            return 0
        }
        if (this.nextRoom?.willBeReadyIn() === -1) {
            return -1
        }
        if (this.preventGroupAdvance) {
            return -1
        }
        
        let timeForTransitionIn = 0
        let timeForRunning = 0
        let extraTimeForNextRoom = 0
        let timeForTransitionOut = 0
        let timeForReset = 0
        if (this.state === RoomState.TRANSITION_IN) {
            timeForTransitionIn = this.targetTransitionInDurationMs - (now - this.#changedStateAt)
            if (timeForTransitionIn < 0) { return -1 }
            timeForRunning = this.targetRoomDurationMs
            if (this.nextRoom && this.nextRoom.willBeReadyIn() > (timeForTransitionIn + timeForRunning)) {
                extraTimeForNextRoom = this.nextRoom.willBeReadyIn() - (timeForTransitionIn + timeForRunning)
            }
            timeForTransitionOut = this.nextRoom?.targetTransitionInDurationMs ?? 0
            timeForReset = this.targetResetDurationMs
        }
        if (this.state === RoomState.RUNNING) {
            timeForRunning = this.targetRoomDurationMs - (now - this.#changedStateAt)
            if (timeForRunning < 0) { return -1 }
            if (this.nextRoom && this.nextRoom.willBeReadyIn() > timeForRunning) {
                extraTimeForNextRoom = this.nextRoom.willBeReadyIn() - timeForRunning
            }
            timeForTransitionOut = this.nextRoom?.targetTransitionInDurationMs ?? 0
            timeForReset = this.targetResetDurationMs
        }
        if (this.state === RoomState.TRANSITION_OUT) {
            timeForTransitionOut = (this.nextRoom?.targetTransitionInDurationMs ?? 0) - (now - this.#changedStateAt)
            if (timeForTransitionOut < 0) { timeForTransitionOut = 0 }
            timeForReset = this.targetResetDurationMs
        }
        if (this.state === RoomState.NEEDS_RESET) {
            timeForReset = this.targetResetDurationMs - (now - this.#changedStateAt)
            if (timeForReset < 0) { return -1 }
        }

        return timeForTransitionIn + timeForRunning + extraTimeForNextRoom + timeForTransitionOut + timeForReset
    }

    abstract enableAll(): void
    abstract disableAll(): void

    protected tick(): void {
        if (this.state === RoomState.RUNNING) {
            if (this.getRoomTimeMs() > this.targetRoomDurationMs) {
                if (!this.preventGroupAdvance) {
                    if (this.nextRoom == null || this.nextRoom.state === RoomState.READY) {
                        this.startRoomTransitionOut()
                    }
                }
            }
        }
    }

}