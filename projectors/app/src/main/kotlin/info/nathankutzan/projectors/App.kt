package info.nathankutzan.projectors

import info.nathankutzan.projectors.preshow.PreshowLauncher
import javafx.application.Application
import javafx.application.Platform
import javafx.geometry.Insets
import javafx.geometry.Pos
import javafx.scene.Parent
import javafx.scene.Scene
import javafx.scene.control.Button
import javafx.scene.layout.StackPane
import javafx.scene.layout.VBox
import javafx.scene.text.Font
import javafx.scene.text.Text
import javafx.stage.Stage
import kotlin.system.exitProcess


class MainLauncher : Application() {

    lateinit var stage: Stage

    private fun createContent(): Parent {
        return VBox().apply {
            padding = Insets(32.0)
            spacing = 8.0
            alignment = Pos.TOP_CENTER
            children.addAll(
                    Text("TEA@UCF 2024 Projector").apply {
                        font = Font(48.0)
                    },
                    Button("Preshow").apply {
                        font = Font(32.0)
                        setOnMouseClicked {
                            stage.scene = Scene(PreshowLauncher(stage))
                        }
                    },
                    Button("Room 5").apply {
                        font = Font(32.0)
                    }
            )
        }
    }

    override fun start(initStage: Stage) {
        stage = initStage
        stage.title = "TEA@UCF Escape 2024 Projector"
        stage.width = 800.0
        stage.height = 600.0
        stage.scene = Scene(createContent())
        stage.setOnCloseRequest { Platform.exit(); exitProcess(0) }
        stage.show()
    }
}

fun main() {
    Application.launch(MainLauncher::class.java)
}