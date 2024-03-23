package info.nathankutzan.projectors.comm

import javafx.beans.property.SimpleBooleanProperty

interface DeviceCommunicationHandler {
    val identName: String
    val enabled: SimpleBooleanProperty

    fun onReceiveCommand(cmd: String)

    fun onReceiveProperty(key: String, value: String)
}