package info.nathankutzan.projectors.screenidentifier

import javafx.application.Platform
import javafx.geometry.Pos
import javafx.scene.Scene
import javafx.scene.layout.VBox
import javafx.scene.text.Font
import javafx.scene.text.Text
import javafx.stage.Screen
import javafx.stage.Stage
import javafx.stage.StageStyle
import java.util.concurrent.TimeUnit

object IdentifyScreens {
    fun show() {
        Screen.getScreens().forEachIndexed { idx, it ->
            val stage = Stage()
            stage.initStyle(StageStyle.UNDECORATED)
            stage.title = "Screen Identifier"
            stage.width = 100.0
            stage.height = 100.0
            stage.isResizable = false
            stage.isAlwaysOnTop = true
            stage.x = it.bounds.minX
            stage.y = it.bounds.minY
            stage.scene = Scene(VBox().apply {
                alignment = Pos.CENTER
                children.addAll(
                        Text("$idx").apply {
                            font = Font(64.0)
                        }
                )
            })
            stage.show()
            Thread {
                TimeUnit.SECONDS.sleep(3)
                Platform.runLater { stage.close() }
            }.start()
        }
    }
}