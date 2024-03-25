import { millisToMinutesAndSeconds } from "../utils/time"
import { trpc } from "../utils/trpc"

export default function HmiPage() {
    const [devices] = trpc.devices.useSuspenseQuery(undefined, { refetchInterval: 200 })
    const { client } = trpc.useUtils()

    return (
        <div className="flex flex-col items-stretch p-6">
            <div className="flex flex-col items-stretch mb-10">
                <div className="bg-white text-black text-lg font-bold rounded-t-lg p-2">
                    Room 1
                </div>
                <div className="rounded-b-lg border-solid border-x-2 border-b-2 border-white p-6">
                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Lighting
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room1.lighting.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room1.lighting.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room1.lighting.enabled && <HmiButton label="Set Enabled" onClick={() => client.room1Lighting.setEnabled.mutate(true)} />}
                            {devices.room1.lighting.enabled && <HmiButton label="Set Disabled" onClick={() => client.room1Lighting.setEnabled.mutate(false)} />}
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room1Lighting.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room1Lighting.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room1Lighting.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Video Start Cue" onClick={() => client.room1Lighting.triggerVideoStartCue.mutate()} />
                            <HmiButton label="Trigger Door Open Cue" onClick={() => client.room1Lighting.triggerDoorOpenCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Projector
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room1.projector.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room1.projector.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <NumericValue value={devices.room1.projector.videoTimestamp ?? 0} label="Video Timestamp" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room1.projector.enabled && <HmiButton label="Set Enabled" onClick={() => client.room1Projector.setEnabled.mutate(true)} />}
                            {devices.room1.projector.enabled && <HmiButton label="Set Disabled" onClick={() => client.room1Projector.setEnabled.mutate(false)} />}
                            <HmiButton label="Start Video" onClick={() => client.room1Projector.startVideo.mutate()} />
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room1Projector.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room1Projector.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room1Projector.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Door Open Cue" onClick={() => client.room1Projector.triggerDoorOpenCue.mutate()} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-stretch mb-10">
                <div className="bg-white text-black text-lg font-bold rounded-t-lg p-2">
                    Room 2
                </div>
                <div className="rounded-b-lg border-solid border-x-2 border-b-2 border-white p-6">
                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Sound and Lighting
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room2.soundAndLighting.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room2.soundAndLighting.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room2.soundAndLighting.enabled && <HmiButton label="Set Enabled" onClick={() => client.room2SoundAndLighting.setEnabled.mutate(true)} />}
                            {devices.room2.soundAndLighting.enabled && <HmiButton label="Set Disabled" onClick={() => client.room2SoundAndLighting.setEnabled.mutate(false)} />}
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room2SoundAndLighting.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room2SoundAndLighting.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room2SoundAndLighting.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Laser On Cue" onClick={() => client.room2SoundAndLighting.triggerLaserOnCue.mutate()} />
                            <HmiButton label="Trigger Laser Off Cue" onClick={() => client.room2SoundAndLighting.triggerLaserOffCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Laser Puzzle
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room2.laserPuzzle.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room2.laserPuzzle.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <BooleanValueOutlined value={devices.room2.laserPuzzle.laserDetected ?? false} trueText="Laser Detected" falseText="Laser Not Detected" />
                            <BooleanValueOutlined value={devices.room2.laserPuzzle.overridden ?? false} trueText="Overridden" falseText="Not Overridden" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room2.laserPuzzle.enabled && <HmiButton label="Set Enabled" onClick={() => client.room2LaserPuzzle.setEnabled.mutate(true)} />}
                            {devices.room2.laserPuzzle.enabled && <HmiButton label="Set Disabled" onClick={() => client.room2LaserPuzzle.setEnabled.mutate(false)} />}
                            {!devices.room2.laserPuzzle.overridden && <HmiButton label="Override" onClick={() => client.room2LaserPuzzle.setOverridden.mutate(true)} />}
                            {devices.room2.laserPuzzle.overridden && <HmiButton label="Reset Override" onClick={() => client.room2LaserPuzzle.setOverridden.mutate(false)} />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-stretch mb-10">
                <div className="bg-white text-black text-lg font-bold rounded-t-lg p-2">
                    Room 3
                </div>
                <div className="rounded-b-lg border-solid border-x-2 border-b-2 border-white p-6">
                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Sound and Lighting
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room3.soundAndLighting.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room3.soundAndLighting.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room3.soundAndLighting.enabled && <HmiButton label="Set Enabled" onClick={() => client.room3SoundAndLighting.setEnabled.mutate(true)} />}
                            {devices.room3.soundAndLighting.enabled && <HmiButton label="Set Disabled" onClick={() => client.room3SoundAndLighting.setEnabled.mutate(false)} />}
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room3SoundAndLighting.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room3SoundAndLighting.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room3SoundAndLighting.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Simon Solved Cue" onClick={() => client.room3SoundAndLighting.triggerSimonSolvedCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Simon Puzzle
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room3.simonPuzzle.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room3.simonPuzzle.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <BooleanValueOutlined value={devices.room3.simonPuzzle.solved ?? false} trueText="Solved" falseText="Not Solved" />
                            <BooleanValueOutlined value={devices.room3.simonPuzzle.overridden ?? false} trueText="Overridden" falseText="Not Overridden" />
                            <NumericValue value={devices.room3.simonPuzzle.difficulty ?? 0} label="Difficulty" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room3.simonPuzzle.enabled && <HmiButton label="Set Enabled" onClick={() => client.room3SimonPuzzle.setEnabled.mutate(true)} />}
                            {devices.room3.simonPuzzle.enabled && <HmiButton label="Set Disabled" onClick={() => client.room3SimonPuzzle.setEnabled.mutate(false)} />}
                            {!devices.room3.simonPuzzle.overridden && <HmiButton label="Override" onClick={() => client.room3SimonPuzzle.setOverridden.mutate(true)} />}
                            {devices.room3.simonPuzzle.overridden && <HmiButton label="Reset Override" onClick={() => client.room3SimonPuzzle.setOverridden.mutate(false)} />}
                            {/* TODO Set Difficulty */}
                            <HmiButton label="Open Box" onClick={() => client.room3SimonPuzzle.openBox.mutate()} />
                            <HmiButton label="Reset" onClick={() => client.room3SimonPuzzle.reset.mutate()} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-stretch mb-10">
                <div className="bg-white text-black text-lg font-bold rounded-t-lg p-2">
                    Room 4
                </div>
                <div className="rounded-b-lg border-solid border-x-2 border-b-2 border-white p-6">
                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Sound and Lighting
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room4.soundAndLighting.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room4.soundAndLighting.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room4.soundAndLighting.enabled && <HmiButton label="Set Enabled" onClick={() => client.room4SoundAndLighting.setEnabled.mutate(true)} />}
                            {devices.room4.soundAndLighting.enabled && <HmiButton label="Set Disabled" onClick={() => client.room4SoundAndLighting.setEnabled.mutate(false)} />}
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room4SoundAndLighting.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room4SoundAndLighting.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room4SoundAndLighting.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Tiles Solved Cue" onClick={() => client.room4SoundAndLighting.triggerTilesSolvedCue.mutate()} />
                            <HmiButton label="Trigger Tiles Failed Cue" onClick={() => client.room4SoundAndLighting.triggerTilesFailedCue.mutate()} />
                            <HmiButton label="Trigger Tiles Note 1 Cue" onClick={() => client.room4SoundAndLighting.triggerTilesNote1Cue.mutate()} />
                            <HmiButton label="Trigger Tiles Note 2 Cue" onClick={() => client.room4SoundAndLighting.triggerTilesNote2Cue.mutate()} />
                            <HmiButton label="Trigger Tiles Note 3 Cue" onClick={() => client.room4SoundAndLighting.triggerTilesNote3Cue.mutate()} />
                            <HmiButton label="Trigger Tiles Note 4 Cue" onClick={() => client.room4SoundAndLighting.triggerTilesNote4Cue.mutate()} />
                            <HmiButton label="Trigger Tiles Note 5 Cue" onClick={() => client.room4SoundAndLighting.triggerTilesNote5Cue.mutate()} />
                            <HmiButton label="Trigger Hand Failed Cue" onClick={() => client.room4SoundAndLighting.triggerHandFailedCue.mutate()} />
                            <HmiButton label="Trigger Hand Solved Cue" onClick={() => client.room4SoundAndLighting.triggerHandSolvedCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Compressor
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room4.compressor.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room4.compressor.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <BooleanValueOutlined value={devices.room4.compressor.running ?? false} trueText="Running" falseText="Not Running" />
                            <TextValue value={millisToMinutesAndSeconds(devices.room4.compressor.cooldownTimeRemainingMs ?? 0)} label="Cooldown Time Remaining" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room4.compressor.enabled && <HmiButton label="Set Enabled" onClick={() => client.room4Compressor.setEnabled.mutate(true)} />}
                            {devices.room4.compressor.enabled && <HmiButton label="Set Disabled" onClick={() => client.room4Compressor.setEnabled.mutate(false)} />}
                            <HmiButton label="Start Compressor" disabled={(devices.room4.compressor.cooldownTimeRemainingMs ?? 0) > 0} onClick={() => client.room4Compressor.attemptStartCompressor.mutate()} />
                            <HmiButton label="Stop Compressor" onClick={() => client.room4Compressor.stopCompressor.mutate()} />
                            <HmiButton label="Clear Cooldown Time" onClick={() => client.room4Compressor.setCooldownTimeRemainingMs.mutate(0.0)} />
                        </div>
                    </div>


                    {devices.room4.handPads.map((pad, i) => (
                        <div className="flex flex-col items-stretch mb-4">
                            <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                                Hand Pad {i + 1}
                            </div>
                            <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                                <BooleanValue value={pad.connected} trueText="Connected" falseText="Not Connected" />
                                <BooleanValue value={pad.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                                <BooleanValueOutlined value={pad.pressed ?? false} trueText="Pressed" falseText="Not Pressed" />
                            </div>
                            <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                                {!pad.enabled && <HmiButton label="Set Enabled" onClick={() => client.room4Hand.setEnabled.mutate({ enabled: true, idx: i })} />}
                                {pad.enabled && <HmiButton label="Set Disabled" onClick={() => client.room4Hand.setEnabled.mutate({ enabled: false, idx: i })} />}
                                <HmiButton label="Stab" onClick={() => client.room4Hand.stab.mutate({ idx: i })} />

                            </div>
                        </div>
                    ))}


                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Pedistal
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room4.pedistal.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room4.pedistal.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <TextValue value={devices.room4.pedistal.state ?? "Unknown"} label="State" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room4.pedistal.enabled && <HmiButton label="Set Enabled" onClick={() => client.room4Pedistal.setEnabled.mutate(true)} />}
                            {devices.room4.pedistal.enabled && <HmiButton label="Set Disabled" onClick={() => client.room4Pedistal.setEnabled.mutate(false)} />}
                            <HmiButton label="Open" onClick={() => client.room4Pedistal.open.mutate()} />
                            <HmiButton label="Close" onClick={() => client.room4Pedistal.close.mutate()} />
                        </div>
                    </div>


                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Tile Floor
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room4.tileFloor.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room4.tileFloor.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <BooleanValueOutlined value={devices.room4.tileFloor.solved ?? false} trueText="Solved" falseText="Not Solved" />
                            <BooleanValueOutlined value={devices.room4.tileFloor.overridden ?? false} trueText="Overridden" falseText="Not Overridden" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room4.tileFloor.enabled && <HmiButton label="Set Enabled" onClick={() => client.room4TileFloor.setEnabled.mutate(true)} />}
                            {devices.room4.tileFloor.enabled && <HmiButton label="Set Disabled" onClick={() => client.room4TileFloor.setEnabled.mutate(false)} />}
                            {!devices.room4.tileFloor.overridden && <HmiButton label="Override" onClick={() => client.room4TileFloor.setOverridden.mutate(true)} />}
                            {devices.room4.tileFloor.overridden && <HmiButton label="Reset Override" onClick={() => client.room4TileFloor.setOverridden.mutate(false)} />}
                            <HmiButton label="Open Box" onClick={() => client.room4TileFloor.openBox.mutate()} />
                            <HmiButton label="Reset" onClick={() => client.room4TileFloor.reset.mutate()} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-stretch mb-10">
                <div className="bg-white text-black text-lg font-bold rounded-t-lg p-2">
                    Room 5
                </div>
                <div className="rounded-b-lg border-solid border-x-2 border-b-2 border-white p-6">
                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Lighting
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room5.lighting.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room5.lighting.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room5.lighting.enabled && <HmiButton label="Set Enabled" onClick={() => client.room5Lighting.setEnabled.mutate(true)} />}
                            {devices.room5.lighting.enabled && <HmiButton label="Set Disabled" onClick={() => client.room5Lighting.setEnabled.mutate(false)} />}
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room5Lighting.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room5Lighting.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room5Lighting.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Destruction 1 Cue" onClick={() => client.room5Lighting.triggerDestructionStage1Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 2 Cue" onClick={() => client.room5Lighting.triggerDestructionStage2Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 3 Cue" onClick={() => client.room5Lighting.triggerDestructionStage3Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 4 Cue" onClick={() => client.room5Lighting.triggerDestructionStage4Cue.mutate()} />
                            <HmiButton label="Trigger Door Open Cue" onClick={() => client.room5Lighting.triggerDoorOpenCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Projector
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room5.projector.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room5.projector.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <NumericValue value={devices.room5.projector.videoTimestamp ?? 0} label="Video Timestamp" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room5.projector.enabled && <HmiButton label="Set Enabled" onClick={() => client.room5Projector.setEnabled.mutate(true)} />}
                            {devices.room5.projector.enabled && <HmiButton label="Set Disabled" onClick={() => client.room5Projector.setEnabled.mutate(false)} />}
                            <HmiButton label="Start Video" onClick={() => client.room5Projector.startVideo.mutate()} />
                            <HmiButton label="Trigger Enter Start Cue" onClick={() => client.room5Projector.triggerEnterStartCue.mutate()} />
                            <HmiButton label="Trigger Enter Cue" onClick={() => client.room5Projector.triggerEnterCue.mutate()} />
                            <HmiButton label="Trigger Exit Cue" onClick={() => client.room5Projector.triggerExitCue.mutate()} />
                            <HmiButton label="Trigger Destruction 1 Cue" onClick={() => client.room5Projector.triggerDestructionStage1Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 2 Cue" onClick={() => client.room5Projector.triggerDestructionStage2Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 3 Cue" onClick={() => client.room5Projector.triggerDestructionStage3Cue.mutate()} />
                            <HmiButton label="Trigger Destruction 4 Cue" onClick={() => client.room5Projector.triggerDestructionStage4Cue.mutate()} />
                            <HmiButton label="Trigger Door Open Cue" onClick={() => client.room5Projector.triggerDoorOpenCue.mutate()} />
                        </div>
                    </div>

                    <div className="flex flex-col items-stretch mb-4">
                        <div className="bg-gray-300 text-black text-lg rounded-t-lg p-2">
                            Bricks Puzzle
                        </div>
                        <div className="flex flex-row flex-wrap border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            <BooleanValue value={devices.room5.bricksPuzzle.connected} trueText="Connected" falseText="Not Connected" />
                            <BooleanValue value={devices.room5.bricksPuzzle.enabled ?? false} trueText="Enabled" falseText="Disabled" />
                            <BooleanValueOutlined value={devices.room5.bricksPuzzle.solved ?? false} trueText="Solved" falseText="Not Solved" />
                            <BooleanValueOutlined value={devices.room5.bricksPuzzle.overridden ?? false} trueText="Overridden" falseText="Not Overridden" />
                        </div>
                        <div className="flex flex-row flex-wrap rounded-b-lg border-solid border-x-2 border-b-2 border-gray-300 p-6 gap-4">
                            {!devices.room5.bricksPuzzle.enabled && <HmiButton label="Set Enabled" onClick={() => client.room5Bricks.setEnabled.mutate(true)} />}
                            {devices.room5.bricksPuzzle.enabled && <HmiButton label="Set Disabled" onClick={() => client.room5Bricks.setEnabled.mutate(false)} />}
                            {!devices.room5.bricksPuzzle.overridden && <HmiButton label="Override" onClick={() => client.room5Bricks.setOverridden.mutate(true)} />}
                            {devices.room5.bricksPuzzle.overridden && <HmiButton label="Reset Override" onClick={() => client.room5Bricks.setOverridden.mutate(false)} />}
                            <HmiButton label="Open Box" onClick={() => client.room5Bricks.openBox.mutate()} />
                            <HmiButton label="Reset" onClick={() => client.room5Bricks.reset.mutate()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


type BooleanValueProps = {
    value: boolean
    trueText: string
    falseText: string
}
function BooleanValue(props: BooleanValueProps) {
    return (
        <div className="p-2 text-lg font-bold uppercase inline-flex items-center justify-center" style={{ backgroundColor: props.value ? "green" : "red" }}>
            {props.value ? props.trueText : props.falseText}
        </div>
    )
}
function BooleanValueOutlined(props: BooleanValueProps) {
    return (
        <div className="p-2 text-lg font-bold uppercase border-solid border-2 inline-flex items-center justify-center" style={{ borderColor: props.value ? "green" : "red" }}>
            {props.value ? props.trueText : props.falseText}
        </div>
    )
}

type NumericValueProps = {
    value: number
    label: string
}
function NumericValue(props: NumericValueProps) {
    return (
        <div className="p-2 text-lg font-bold uppercase border-solid border-white border-2 inline-flex items-center justify-center">
            {props.label}: {props.value}
        </div>
    )
}

type TextValueProps = {
    value: string
    label: string
}
function TextValue(props: TextValueProps) {
    return (
        <div className="p-2 text-lg font-bold uppercase border-solid border-white border-2 inline-flex items-center justify-center">
            {props.label}: {props.value}
        </div>
    )
}

type HmiButtonProps = {
    onClick(): void
    label: string
    disabled?: boolean
}
function HmiButton(props: HmiButtonProps) {
    return (
        <button
            disabled={props.disabled}
            onClick={() => props.onClick()}
            className="p-2 text-lg text-white font-bold uppercase inline-flex items-center justify-center"
            style={{
                background: props.disabled === true ? "#444444" : "#7C7C7C",
                color: props.disabled === true ? "#5f5f5f" : "white",
                borderBottom: "6px inset rgba(0,0,0,.5)",
                borderLeft: "6px inset rgba(0,0,0,.5)",
                borderRight: "6px inset rgba(255,255,255,.5)",
                borderTop: "6px inset rgba(255,255,255,.5)",
                boxSizing: "border-box"
            }}>
            {props.label}
        </button>
    )
}