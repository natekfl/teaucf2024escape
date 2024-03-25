import { initTRPC } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from "cors"
import { Room1LightingDevice } from './devices/Room1Lighting';
import { Room1ProjectorDevice } from './devices/Room1Projector';
import { Room2LaserDevice } from './devices/Room2Laser';
import { Room2SoundAndLightingDevice } from './devices/Room2SoundAndLighting';
import { Room3SimonDevice } from './devices/Room3Simon';
import { Room3SoundAndLightingDevice } from './devices/Room3SoundAndLighting';
import { Room4SoundAndLightingDevice } from './devices/Room4SoundAndLighting';
import { Room4CompressorDevice } from './devices/Room4Compressor';
import { Room4HandDevice } from './devices/Room4Hand';
import { Room4PedistalDevice } from './devices/Room4Pedistal';
import { Room5LightingDevice } from './devices/Room5Lighting';
import { Room5ProjectorDevice } from './devices/Room5Projector';
import { Room5BricksDevice } from './devices/Room5Bricks';
import { z } from 'zod';
import { Room4TileFloor } from './devices/Room4TileFloor';

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

const appRouter = router({
    devices: publicProcedure
        .query(async () => {
            return {
                room1: {
                    lighting: {
                        connected: Room1LightingDevice.device?.connected ?? false,
                        enabled: Room1LightingDevice.device?.enabled
                    },
                    projector: {
                        connected: Room1ProjectorDevice.device?.connected ?? false,
                        enabled: Room1ProjectorDevice.device?.enabled,
                        videoTimestamp: Room1ProjectorDevice.device?.videoTimestamp,
                    }
                },
                room2: {
                    soundAndLighting: {
                        connected: Room2SoundAndLightingDevice.device?.connected ?? false,
                        enabled: Room2SoundAndLightingDevice.device?.enabled
                    },
                    laserPuzzle: {
                        connected: Room2LaserDevice.device?.connected ?? false,
                        enabled: Room2LaserDevice.device?.enabled,
                        laserDetected: Room2LaserDevice.device?.laserDetected,
                        overridden: Room2LaserDevice.device?.overridden
                    },
                },
                room3: {
                    soundAndLighting: {
                        connected: Room3SoundAndLightingDevice.device?.connected ?? false,
                        enabled: Room3SoundAndLightingDevice.device?.enabled,
                    },
                    simonPuzzle: {
                        connected: Room3SimonDevice.device?.connected ?? false,
                        enabled: Room3SimonDevice.device?.enabled,
                        solved: Room3SimonDevice.device?.solved,
                        overridden: Room3SimonDevice.device?.overridden,
                        difficulty: Room3SimonDevice.device?.difficulty,
                    },
                },
                room4: {
                    soundAndLighting: {
                        connected: Room4SoundAndLightingDevice.device?.connected ?? false,
                        enabled: Room4SoundAndLightingDevice.device?.enabled,
                    },
                    compressor: {
                        connected: Room4CompressorDevice.device?.connected ?? false,
                        enabled: Room4CompressorDevice.device?.enabled,
                        running: Room4CompressorDevice.device?.running,
                        cooldownTimeRemainingMs: Room4CompressorDevice.device?.cooldownTimeRemainingMs
                    },
                    handPads: [0, 1, 2, 3, 4, 5].map((i) => ({
                        connected: Room4HandDevice.devices[i]?.connected ?? false,
                        enabled: Room4HandDevice.devices[i]?.enabled,
                        pressed: Room4HandDevice.devices[i]?.pressed,
                    })),
                    pedistal: {
                        connected: Room4PedistalDevice.device?.connected ?? false,
                        enabled: Room4PedistalDevice.device?.enabled,
                        state: Room4PedistalDevice.device?.state
                    },
                    tileFloor: {
                        connected: Room4TileFloor.device?.connected ?? false,
                        enabled: Room4TileFloor.device?.enabled,
                        solved: Room4TileFloor.device?.solved,
                        overridden: Room4TileFloor.device?.overridden,
                    }
                },
                room5: {
                    lighting: {
                        connected: Room5LightingDevice.device?.connected ?? false,
                        enabled: Room5LightingDevice.device?.enabled,
                    },
                    projector: {
                        connected: Room5ProjectorDevice.device?.connected ?? false,
                        enabled: Room5ProjectorDevice.device?.enabled,
                        videoTimestamp: Room5ProjectorDevice.device?.videoTimestamp
                    },
                    bricksPuzzle: {
                        connected: Room5BricksDevice.device?.connected ?? false,
                        enabled: Room5BricksDevice.device?.enabled,
                        solved: Room5BricksDevice.device?.solved,
                        overridden: Room5BricksDevice.device?.overridden
                    },
                }
            }
        }),

    room1Lighting: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room1LightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room1LightingDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room1LightingDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room1LightingDevice.device?.triggerExitCue()
            }),
        triggerVideoStartCue: publicProcedure
            .mutation(async () => {
                Room1LightingDevice.device?.triggerVideoStartCue()
            }),
        triggerDoorOpenCue: publicProcedure
            .mutation(async () => {
                Room1LightingDevice.device?.triggerDoorOpenCue()
            }),
    }),

    room1Projector: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room1ProjectorDevice.device?.setEnabled(input)
            }),
        startVideo: publicProcedure
            .mutation(async () => {
                Room1ProjectorDevice.device?.startVideo()
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room1ProjectorDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room1ProjectorDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room1ProjectorDevice.device?.triggerExitCue()
            }),
        triggerDoorOpenCue: publicProcedure
            .mutation(async () => {
                Room1ProjectorDevice.device?.triggerDoorOpenCue()
            }),
    }),

    room2SoundAndLighting: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room2SoundAndLightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room2SoundAndLightingDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room2SoundAndLightingDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room2SoundAndLightingDevice.device?.triggerExitCue()
            }),
        triggerLaserOnCue: publicProcedure
            .mutation(async () => {
                Room2SoundAndLightingDevice.device?.triggerLaserOnCue()
            }),
        triggerLaserOffCue: publicProcedure
            .mutation(async () => {
                Room2SoundAndLightingDevice.device?.triggerLaserOffCue()
            }),
    }),

    room2LaserPuzzle: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room2LaserDevice.device?.setEnabled(input)
            }),
        setOverridden: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room2LaserDevice.device?.setOverridden(input)
            }),
    }),

    room3SoundAndLighting: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room3SoundAndLightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room3SoundAndLightingDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room3SoundAndLightingDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room3SoundAndLightingDevice.device?.triggerExitCue()
            }),
        triggerSimonSolvedCue: publicProcedure
            .mutation(async () => {
                Room3SoundAndLightingDevice.device?.triggerSimonSolvedCue()
            }),
    }),

    room3SimonPuzzle: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room3SimonDevice.device?.setEnabled(input)
            }),
        setOverridden: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room3SimonDevice.device?.setOverridden(input)
            }),
        setDifficulty: publicProcedure
            .input(z.number().int().gte(1))
            .mutation(async (opts) => {
                const { input } = opts
                Room3SimonDevice.device?.setDifficulty(input)
            }),
        openBox: publicProcedure
            .mutation(async () => {
                Room3SimonDevice.device?.openBox()
            }),
        reset: publicProcedure
            .mutation(async () => {
                Room3SimonDevice.device?.reset()
            }),
    }),

    room4SoundAndLighting: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room4SoundAndLightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerExitCue()
            }),
        triggerTilesSolvedCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesSolvedCue()
            }),
        triggerTilesFailedCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesFailedCue()
            }),
        triggerTilesNote1Cue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesNote1Cue()
            }),
        triggerTilesNote2Cue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesNote2Cue()
            }),
        triggerTilesNote3Cue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesNote3Cue()
            }),
        triggerTilesNote4Cue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesNote4Cue()
            }),
        triggerTilesNote5Cue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerTilesNote5Cue()
            }),
        triggerHandFailedCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerHandFailedCue()
            }),
        triggerHandSolvedCue: publicProcedure
            .mutation(async () => {
                Room4SoundAndLightingDevice.device?.triggerHandSolvedCue()
            }),
    }),

    room4Compressor: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room4CompressorDevice.device?.setEnabled(input)
            }),
        attemptStartCompressor: publicProcedure
            .mutation(async () => {
                Room4CompressorDevice.device?.attemptStartCompressor()
            }),
        stopCompressor: publicProcedure
            .mutation(async () => {
                Room4CompressorDevice.device?.stopCompressor()
            }),
        setCooldownTimeRemainingMs: publicProcedure
            .input(z.number().int().gte(0))
            .mutation(async (opts) => {
                const { input } = opts
                Room4CompressorDevice.device?.setCooldownTimeRemainingMs(input)
            }),
    }),

    room4Hand: router({
        setEnabled: publicProcedure
            .input(z.object({ enabled: z.boolean(), idx: z.number().int().gte(0).lte(6) }))
            .mutation(async (opts) => {
                const { input } = opts
                Room4HandDevice.devices[input.idx]?.setEnabled(input.enabled)
            }),
        stab: publicProcedure
            .input(z.object({ idx: z.number().int().gte(0).lte(6) }))
            .mutation(async (opts) => {
                const { input } = opts
                Room4HandDevice.devices[input.idx]?.stab()
            }),
    }),

    room4Pedistal: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room4PedistalDevice.device?.setEnabled(input)
            }),
        open: publicProcedure
            .mutation(async () => {
                Room4PedistalDevice.device?.open()
            }),
        close: publicProcedure
            .mutation(async () => {
                Room4PedistalDevice.device?.close()
            }),
    }),

    room4TileFloor: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room4TileFloor.device?.setEnabled(input)
            }),
        setOverridden: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room4TileFloor.device?.setOverridden(input)
            }),
        openBox: publicProcedure
            .mutation(async () => {
                Room4TileFloor.device?.openBox()
            }),
        reset: publicProcedure
            .mutation(async () => {
                Room4TileFloor.device?.reset()
            }),
    }),

    room5Lighting: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room5LightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerExitCue()
            }),
        triggerDestructionStage1Cue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerDestructionStage1Cue()
            }),
        triggerDestructionStage2Cue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerDestructionStage2Cue()
            }),
        triggerDestructionStage3Cue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerDestructionStage3Cue()
            }),
        triggerDestructionStage4Cue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerDestructionStage4Cue()
            }),
        triggerDoorOpenCue: publicProcedure
            .mutation(async () => {
                Room5LightingDevice.device?.triggerDoorOpenCue()
            }),
    }),

    room5Projector: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room5LightingDevice.device?.setEnabled(input)
            }),
        triggerEnterStartCue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerEnterStartCue()
            }),
        triggerEnterCue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerEnterCue()
            }),
        triggerExitCue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerExitCue()
            }),
        startVideo: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.startVideo()
            }),
        triggerDestructionStage1Cue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerDestructionStage1Cue()
            }),
        triggerDestructionStage2Cue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerDestructionStage2Cue()
            }),
        triggerDestructionStage3Cue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerDestructionStage3Cue()
            }),
        triggerDestructionStage4Cue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerDestructionStage4Cue()
            }),
        triggerDoorOpenCue: publicProcedure
            .mutation(async () => {
                Room5ProjectorDevice.device?.triggerDoorOpenCue()
            }),
    }),

    room5Bricks: router({
        setEnabled: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room5BricksDevice.device?.setEnabled(input)
            }),
        setOverridden: publicProcedure
            .input(z.boolean())
            .mutation(async (opts) => {
                const { input } = opts
                Room5BricksDevice.device?.setOverridden(input)
            }),
        openBox: publicProcedure
            .mutation(async () => {
                Room5BricksDevice.device?.openBox()
            }),
        reset: publicProcedure
            .mutation(async () => {
                Room5BricksDevice.device?.reset()
            }),
    }),

})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
})

export function startTrpcServer() {
    server.listen(2024)
}