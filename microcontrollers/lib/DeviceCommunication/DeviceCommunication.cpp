#include "DeviceCommunication.h"
#include <Arduino.h>
#include <stdio.h>
#include <string.h>

#ifdef ARDUINO_ARCH_AVR
#include <SoftReset.h>
#endif

const char *DeviceCommunication::identName;
char DeviceCommunication::packetBuffer[MAX_PACKET_BUFFER];
int DeviceCommunication::packetBufferIdx = 0;
DeviceCommunication::CommandCallback *DeviceCommunication::commandCallbacks[MAX_CALLBACKS];
DeviceCommunication::PropertyCallback *DeviceCommunication::propertyCallbacks[MAX_CALLBACKS];

void DeviceCommunication::init(const char *ident)
{
    identName = ident;
    initCommstream();
}

void DeviceCommunication::tick()
{
    readCommstreamIntoBuffer();
    processPacketsFromBuffer();
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

void DeviceCommunication::processPacket(const char *packet)
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

void DeviceCommunication::sendCommand(const char *cmd)
{
    char packet[MAX_PACKET_BUFFER];
    sprintf(packet, "%s;", cmd);
    writeToCommstream(packet);
}

void DeviceCommunication::sendProperty(const char *key, const char *value)
{
    char packet[MAX_PACKET_BUFFER];
    sprintf(packet, "%s=%s;", key, value);
    writeToCommstream(packet);
}

void DeviceCommunication::processCommand(const char *cmd)
{
    // Builtin commands
    if (strcmp(cmd, "RESTART") == 0)
    {
        restartDevice();
        return;
    }

    // Device defined commands
    for (int i = 0; i < MAX_CALLBACKS; i++)
    {
        CommandCallback *callback = commandCallbacks[i];
        if (callback != NULL && strcmp(callback->cmd, cmd) == 0)
        {
            callback->func();
        }
    }
}

void DeviceCommunication::processProperty(const char *key, const char *value)
{
    // No Builtin properties
    for (int i = 0; i < MAX_CALLBACKS; i++)
    {
        PropertyCallback *callback = propertyCallbacks[i];
        if (callback != NULL && strcmp(callback->key, key) == 0)
        {
            callback->func(value);
        }
    }
}

void DeviceCommunication::addPropertyListener(const char *key, propertyCallbackFunc func)
{
    PropertyCallback *callback = new PropertyCallback;
    callback->key = key;
    callback->func = func;

    for (int i = 0; i < MAX_CALLBACKS; i++)
    {
        if (propertyCallbacks[i] == NULL)
        {
            propertyCallbacks[i] = callback;
            return;
        }
    }
}

void DeviceCommunication::addCommandListener(const char *cmd, commandCallbackFunc func)
{
    CommandCallback *callback = new CommandCallback;
    callback->cmd = cmd;
    callback->func = func;

    for (int i = 0; i < MAX_CALLBACKS; i++)
    {
        if (commandCallbacks[i] == NULL)
        {
            commandCallbacks[i] = callback;
        }
    }
}

void DeviceCommunication::restartDevice()
{
#ifdef ARDUINO_ARCH_ESP8266
    ESP.restart();
#elif defined ARDUINO_ARCH_ESP32
    ESP.restart();
#elif defined ARDUINO_ARCH_AVR
    soft_restart();
#else
#error No valid device restart method found
#endif
}