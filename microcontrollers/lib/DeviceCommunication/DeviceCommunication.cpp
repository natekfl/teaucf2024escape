#include "DeviceCommunication.h"
#include <Arduino.h>
#include <stdio.h>
#include <string.h>

char DeviceCommunication::packetBuffer[MAX_PACKET_BUFFER];
int DeviceCommunication::packetBufferIdx = 0;

void DeviceCommunication::init(const char *ident)
{
    Serial.begin(115200);
    while (!Serial)
    {
    } // wait for serial port to connect. Needed for native USB

    // TODO Move to external func
    char identPacket[MAX_PACKET_BUFFER];
    sprintf(identPacket, "IDENT=%s;", ident);
    Serial.println(identPacket);
}

void DeviceCommunication::tick()
{
    readIntoBuffer();
    processPacketsFromBuffer();
}

void DeviceCommunication::readIntoBuffer()
{
    while (Serial.available() > 0)
    {
        size_t read = Serial.readBytes(&packetBuffer[packetBufferIdx], MAX_PACKET_BUFFER - packetBufferIdx);
        packetBufferIdx += read;
    }
}

void DeviceCommunication::processPacketsFromBuffer()
{
    char packet[MAX_PACKET_BUFFER];
    size_t idxOfSep = strcspn(packetBuffer, ";");
    if (idxOfSep < strlen(packetBuffer))
    {
        memcpy(packet, packetBuffer, idxOfSep);
        packet[idxOfSep] = '\0';
        memmove(packetBuffer, &packetBuffer[idxOfSep + 1], MAX_PACKET_BUFFER - (idxOfSep + 1));
        packetBufferIdx = 0;
        processPacket(packet);
    }
}

void DeviceCommunication::processPacket(char *packet)
{
    size_t idxOfSep = strcspn(packet, "=");
    if (idxOfSep < strlen(packet))
    {
        char key[MAX_PACKET_BUFFER];
        char value[MAX_PACKET_BUFFER];
        strncpy(key, packet, idxOfSep);
        key[idxOfSep] = '\0';
        size_t valLen = strlen(&packet[idxOfSep + 1]);
        strncpy(value, &packet[idxOfSep + 1], valLen);
        value[valLen] = '\0';
        processProperty(key, value);
    }
    else
    {
        processCommand(packet);
    }
}

void DeviceCommunication::processCommand(char* cmd)
{
    Serial.println(cmd);
}

void DeviceCommunication::processProperty(char* key, char* value)
{
    Serial.print(key);
    Serial.print(", ");
    Serial.println(value);
}