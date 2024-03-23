package info.nathankutzan.projectors.preshow

import info.nathankutzan.projectors.comm.Room1ProjectorHandler
import javafx.beans.value.ChangeListener
import javafx.geometry.Insets
import javafx.geometry.Rectangle2D
import javafx.scene.Cursor
import javafx.scene.Scene
import javafx.scene.layout.Background
import javafx.scene.layout.BackgroundFill
import javafx.scene.layout.CornerRadii
import javafx.scene.layout.VBox
import javafx.scene.media.Media
import javafx.scene.media.MediaPlayer
import javafx.scene.media.MediaView
import javafx.scene.paint.Color
import javafx.stage.Screen
import javafx.stage.Stage
import javafx.util.Duration

class Projector1: VBox() {
    companion object {
        fun start(screen: Screen) {
            val stage = Stage()
            //stage.initStyle(StageStyle.UNDECORATED)
            stage.title = "Projector 1"
            stage.width = screen.bounds.width
            stage.height = screen.bounds.height
            stage.isResizable = false
            stage.isAlwaysOnTop = true
            stage.x = screen.bounds.minX
            stage.y = screen.bounds.minY
            stage.scene = Scene(Projector1())
            stage.show()
        }
    }

    private val videoPlayer = MediaPlayer(Media(this::class.java.getResource("/room1Video1.mp4")?.toExternalForm())).apply {
        volume = 0.0
    }
    private val videoView = MediaView(videoPlayer).apply {
        viewport = Rectangle2D(0.0, 0.0, 1920.0, 1080.0)
        fitHeight = 1080.0
        fitWidth = 1920.0
        isVisible = false
    }

    private val background1Player = MediaPlayer(Media(this::class.java.getResource("/room1Background1.mp3")?.toExternalForm())).apply {
        cycleCount = MediaPlayer.INDEFINITE
        volume = 0.0
    }
    private val background2Player = MediaPlayer(Media(this::class.java.getResource("/room1Background2.mp3")?.toExternalForm())).apply {
        cycleCount = MediaPlayer.INDEFINITE
        volume = 0.0
    }
    private val doorOpenPlayer = MediaPlayer(Media(this::class.java.getResource("/room1DoorOpen.mp3")?.toExternalForm())).apply {
        volume = 0.0
    }

    init {
        cursor = Cursor.NONE
        background = Background(BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY))
        children.addAll(videoView)
        Room1ProjectorHandler.videoTimestamp.bind(videoPlayer.currentTimeProperty().map { it.toSeconds() })

        videoPlayer.onPlaying = Runnable { Room1ProjectorHandler.sendVideoStarted() }
        videoPlayer.onEndOfMedia = Runnable {
            Room1ProjectorHandler.sendVideoEnded()
            background1Player.stop()
            background2Player.seek(Duration.ZERO)
            background2Player.play()
            doorOpenPlayer.stop()
        }

        Room1ProjectorHandler.onStartVideo = {
            background1Player.stop()
            background2Player.stop()
            videoPlayer.seek(Duration.ZERO)
            videoPlayer.play()
        }

        Room1ProjectorHandler.onEnterStartCue = {
            background1Player.seek(Duration.ZERO)
            background1Player.play()
            background2Player.stop()
            doorOpenPlayer.stop()
            videoPlayer.seek(Duration.ZERO)
            videoPlayer.stop()
        }

        Room1ProjectorHandler.onEnterCue = {
            background1Player.play()
            background2Player.stop()
            doorOpenPlayer.stop()
        }

        Room1ProjectorHandler.onDoorOpenCue = {
            doorOpenPlayer.seek(Duration.ZERO)
            doorOpenPlayer.play()
        }

        Room1ProjectorHandler.onExitCue = {
            background1Player.stop()
            background2Player.stop()
            doorOpenPlayer.stop()
        }

        Room1ProjectorHandler.onRoomResetCue = {
            background1Player.stop()
            background2Player.stop()
            doorOpenPlayer.stop()
        }

        Room1ProjectorHandler.enabled.addListener { _, _, enabled ->
            if (enabled) {
                videoView.isVisible = true
                videoPlayer.volume = 1.0
                background1Player.volume = 1.0
                background2Player.volume = 1.0
                doorOpenPlayer.volume = 1.0
            } else {
                videoView.isVisible = false
                videoPlayer.volume = 0.0
                background1Player.volume = 0.0
                background2Player.volume = 0.0
                doorOpenPlayer.volume = 0.0
            }
        }
    }
}