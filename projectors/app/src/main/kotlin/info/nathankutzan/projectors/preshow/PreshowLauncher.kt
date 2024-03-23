package info.nathankutzan.projectors.preshow

import info.nathankutzan.projectors.comm.DeviceCommunication
import info.nathankutzan.projectors.comm.Room1ProjectorHandler
import info.nathankutzan.projectors.screenidentifier.IdentifyScreens
import javafx.geometry.Insets
import javafx.geometry.Pos
import javafx.scene.Scene
import javafx.scene.control.Button
import javafx.scene.control.ChoiceBox
import javafx.scene.layout.HBox
import javafx.scene.layout.VBox
import javafx.scene.text.Font
import javafx.scene.text.Text
import javafx.stage.Screen
import javafx.stage.Stage
import javafx.util.Pair
import javafx.util.StringConverter

class PreshowLauncher(val stage: Stage) : VBox() {

    val projector1ScreenSelector = ChoiceBox<Pair<String, Screen>>().apply {
        items.addAll(Screen.getScreens().mapIndexed { idx, it ->
            Pair("Screen $idx", it)
        })
        value = items[0]
        converter = object : StringConverter<Pair<String, Screen>>() {
            override fun toString(v: Pair<String, Screen>): String {
                return v.key
            }

            override fun fromString(s: String?): Pair<String, Screen>? {
                return null
            }
        }
    }

    init {
        padding = Insets(32.0)
        spacing = 8.0
        alignment = Pos.TOP_CENTER
        children.addAll(
                Text("Launch Preshow Projector").apply {
                    font = Font(48.0)
                },
                Button("Identify Screens").apply {
                    setOnMouseClicked { IdentifyScreens.show() }
                },
                HBox().apply {
                    alignment = Pos.CENTER
                    children.addAll(
                            Text("Projector 1: ").apply {
                                font = Font(24.0)
                            },
                            projector1ScreenSelector
                    )
                },
                Button("Launch").apply {
                    font = Font(32.0)
                    setOnMouseClicked {
                        stage.scene = Scene(PreshowStatus(stage))
                        Projector1.start(projector1ScreenSelector.value.value)
                        DeviceCommunication.handler = Room1ProjectorHandler
                        DeviceCommunication.connect()
                    }
                }
        )
    }
}