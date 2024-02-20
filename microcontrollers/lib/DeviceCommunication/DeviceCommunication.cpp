#include "DeviceCommunication.h"
#include <Arduino.h>
#include <stdio.h>
#include <string.h>

char DeviceCommunication::packetBuffer[MAX_PACKET_BUFFER];
int DeviceCommunication::packetBufferIdx = 0;

void DeviceCommunication::init()
{
    Serial.begin(115200);
    while (!Serial)
    {
    } // wait for serial port to connect. Needed for native USB
    Serial.println("IDENT=ROOM1PROJECTOR;");
}

void DeviceCommunication::tick()
{
    readIntoBuffer();
    parsePackets();
}

void DeviceCommunication::readIntoBuffer()
{
    while (Serial.available() > 0)
    {
        size_t read = Serial.readBytes(&packetBuffer[packetBufferIdx], MAX_PACKET_BUFFER - packetBufferIdx);
        packetBufferIdx += read;
    }
}

void DeviceCommunication::parsePackets()
{
    char packet[MAX_PACKET_BUFFER];
    size_t len = strcspn(packetBuffer, ";");
    if (len < strlen(packetBuffer))
    {
        memcpy(packet, packetBuffer, len);
        packet[len] = '\0';

        Serial.println(packet); //TODO Handle Packet

        memmove(packetBuffer, &packetBuffer[len + 1], MAX_PACKET_BUFFER-(len+1));
        packetBufferIdx = 0;
    }
}