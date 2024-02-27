#if COMM_TYPE_SERIAL
#include "DeviceCommunication.h"
#include <Arduino.h>

void DeviceCommunication::initCommstream()
{
    Serial.begin(115200);
    while (!Serial)
    {
    } // wait for serial port to connect. Needed for native USB
    sendProperty("IDENT", identName);
}

void DeviceCommunication::readCommstreamIntoBuffer()
{
    while (Serial.available() > 0)
    {
        size_t read = Serial.readBytes(&packetBuffer[packetBufferIdx], MAX_PACKET_BUFFER - packetBufferIdx);
        packetBufferIdx += read;
    }
}

void DeviceCommunication::writeToCommstream(char *data)
{
    Serial.print(data);
}

#endif