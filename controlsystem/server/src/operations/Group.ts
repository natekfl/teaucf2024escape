export type Group = {
    id: string
    createdAt: number
    teamName: string
    guideName: string
    rerun: boolean
    members: GroupMember[]
    room1: {
        startedAt: number | null
        finishedAt: number | null
        doorPuzzleFinishedAt: number | null
    },
    room2: {
        startedAt: number | null
        finishedAt: number | null
        sundialPuzzleFinishedAt: number | null
        laserPuzzleFinishedAt: number | null
    },
    room3: {
        startedAt: number | null
        finishedAt: number | null
        simonPuzzleFinishedAt: number | null
        snakePitPuzzleFinishedAt: number | null
        symbolsPuzzleFinishedAt: number | null
    },
    room4: {
        startedAt: number | null
        finishedAt: number | null
        tileFloorPuzzleFinishedAt: number | null
        cabinetDoorsPuzzleFinishedAt: number | null
        cooperativeHandPuzzleFinishedAt: number | null
        spearPuzzleFinishedAt: number | null
    },
    room5: {
        startedAt: number | null
        finishedAt: number | null
        ropePuzzleFinishedAt: number | null
        bricksPuzzleFinishedAt: number | null
    }
    photoIds: string[]
}

export type GroupMember = {
    name: string
    email?: string
    phoneNum?: string
}