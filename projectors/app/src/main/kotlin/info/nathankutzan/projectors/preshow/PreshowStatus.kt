package info.nathankutzan.projectors.preshow

import info.nathankutzan.projectors.comm.DeviceCommunication
import info.nathankutzan.projectors.comm.Room1ProjectorHandler
import javafx.geometry.Pos
import javafx.scene.layout.AnchorPane
import javafx.scene.layout.HBox
import javafx.scene.layout.Pane
import javafx.scene.layout.VBox
import javafx.scene.paint.Color
import javafx.scene.shape.Rectangle
import javafx.scene.text.Font
import javafx.scene.text.Text
import javafx.stage.Stage

class PreshowStatus(val stage: Stage) : VBox() {
    init {
        alignment = Pos.CENTER
        spacing = 8.0
        children.addAll(
                Text("Preshow Projector Status").apply {
                    font = Font(48.0)
                },
                HBox().apply {
                    alignment = Pos.CENTER
                    children.addAll(
                            Rectangle(20.0, 20.0).apply {
                                fillProperty().bind(DeviceCommunication.connected.map {
                                    if (it) Color.GREEN  else Color.RED
                                })
                            },
                            Text().apply {
                                font = Font(24.0)
                                textProperty().bind(DeviceCommunication.connected.map {
                                    if (it) "Connected and ready" else "Not connected"
                                })
                            }
                    )
                }
        )
    }
}