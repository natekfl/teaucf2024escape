package info.nathankutzan.projectors.comm

import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleDoubleProperty
import javafx.beans.value.ChangeListener

object Room1ProjectorHandler: DeviceCommunicationHandler  {
    override val identName: String = "R1PROJECTOR"

    val videoTimestamp = SimpleDoubleProperty()
    override val enabled = SimpleBooleanProperty().apply {
        addListener { _, _, v ->
            DeviceCommunication.sendProperty("ENABLED", v.toString())
        }
    }
    
    init {
        videoTimestamp.addListener { _, _, new ->
            DeviceCommunication.sendProperty("VIDEOTIMESTAMP", new.toString())
        }
    }

    override fun onReceiveCommand(cmd: String) {
        if (cmd == "STARTVIDEO") onStartVideo()
        if (cmd == "ENTERSTARTCUE") onEnterStartCue()
        if (cmd == "ENTERCUE") onEnterCue()
        if (cmd == "EXITCUE") onExitCue()
        if (cmd == "ROOMRESETCUE") onRoomResetCue()
        if (cmd == "DOOROPENCUE") onDoorOpenCue()
    }

    override fun onReceiveProperty(key: String, value: String) {
        if (key == "ENABLED") {
            enabled.value = value == "true"
        }
    }

    fun sendVideoStarted() {
        DeviceCommunication.sendCommand("VIDEOSTARTED")
    }

    fun sendVideoEnded() {
        DeviceCommunication.sendCommand("VIDEOENDED")
    }

    var onStartVideo: () -> Unit = {}

    var onEnterStartCue: () -> Unit = {}

    var onEnterCue: () -> Unit = {}

    var onExitCue: () -> Unit = {}

    var onRoomResetCue: () -> Unit = {}

    var onDoorOpenCue: () -> Unit = {}
}