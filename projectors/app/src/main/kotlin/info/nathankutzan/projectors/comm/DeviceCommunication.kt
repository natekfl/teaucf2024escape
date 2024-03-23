package info.nathankutzan.projectors.comm

import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleDoubleProperty
import jdk.net.ExtendedSocketOptions
import java.io.BufferedInputStream
import java.io.InputStream
import java.io.OutputStream
import java.net.InetSocketAddress
import java.net.Socket

object DeviceCommunication {
    lateinit var handler: DeviceCommunicationHandler

    private var socket = Socket()
    private var inputStream: BufferedInputStream? = null
    private var outputStream: OutputStream? = null

    private var lastHeartbeatAt = System.currentTimeMillis()

    val connected = SimpleBooleanProperty()

    init {
        socket.keepAlive = true
    }

    private fun reconnect() {
        Thread {
            Thread.sleep(3000)
            if (socket.isConnected && !socket.isClosed) return@Thread
            socket = Socket()
            connect()
        }.start()
    }

    fun connect() {
        println("Trying to connect to server")
        try {
            socket.connect(InetSocketAddress("127.0.0.1", 2051))
            println("Connected")
            lastHeartbeatAt = System.currentTimeMillis()
            connected.value = true
            inputStream = socket.getInputStream().buffered()
            outputStream = socket.getOutputStream()
            sendProperty("IDENT", handler.identName)

            Thread {
                val buf = mutableListOf<Byte>()
                try {
                    while (socket.isConnected && !socket.isClosed) {
                        inputStream?.let {
                            if (it.available() > 0) {
                                buf.add(it.read().toByte())
                            }
                            val str = String(buf.toByteArray())
                            if (str.isNotEmpty() && str[str.length - 1] == ';') {
                                val packet = str.slice(0..str.length - 2)
                                if (packet.indexOf('=') > 0) {
                                    val split = packet.split("=", limit = 2)
                                    val key = split[0]
                                    val value = split[1]
                                    handler.onReceiveProperty(key, value)
                                } else {
                                    if (packet == "PONG") lastHeartbeatAt = System.currentTimeMillis()
                                    else handler.onReceiveCommand(packet)
                                }
                                buf.clear()
                            }
                        }
                        Thread.yield()
                    }
                } catch (e: Exception) {
                    println(e)
                }
                if (!socket.isConnected || socket.isClosed) {
                    reconnect()
                }
            }.start()

            Thread {
                while (socket.isConnected && !socket.isClosed) {
                    if (System.currentTimeMillis() - lastHeartbeatAt > 6 * 1000) socket.close()
                    Thread.sleep(3000)
                    sendCommand("PING")
                }
            }.start()
        } catch (e: Exception) {
            println(e)
            connected.value = false
            reconnect()
        }
    }

    fun sendCommand(cmd: String) {
        try {
            outputStream?.write("$cmd;".toByteArray())
        } catch (e: Exception) {
            println(e)
            Thread {
                Thread.sleep(3000)
                sendCommand(cmd)
            }.start()
        }
    }

    fun sendProperty(key: String, value: String) {
        try {
            outputStream?.write("$key=$value;".toByteArray())
        } catch (e: Exception) {
            println(e)
            Thread {
                Thread.sleep(3000)
                sendProperty(key, value)
            }.start()
        }
    }


}