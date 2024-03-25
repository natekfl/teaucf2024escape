#ifdef COMM_TYPE_WIFI

#include "DeviceCommunication.h"

#ifdef ARDUINO_ARCH_ESP8266
#include <ESP8266WiFi.h>
#endif
#ifdef ARDUINO_ARCH_ESP32
#include <WiFi.h>
#endif

#ifndef WIFI_COMM_HOST
#error WIFI_COMM_HOST not defined
#endif
#define WIFI_COMM_PORT 2051
#ifndef WIFI_SSID
#error WIFI_SSID not defined
#endif
#ifndef WIFI_PASS
#error WIFI_SSID not defined
#endif

namespace WifiCommunication
{
    WiFiClient client;
}
using namespace WifiCommunication;

void DeviceCommunication::initCommstream()
{
    WiFi.mode(WIFI_STA);
    WiFi.setHostname(DeviceCommunication::identName);
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    client.connect(WIFI_COMM_HOST, WIFI_COMM_PORT);
}

bool DeviceCommunication::isCommstreamReady()
{
    return WiFi.status() == WL_CONNECTED && client.connected();
}

void DeviceCommunication::readCommstreamIntoBuffer()
{
    while (!client.connected())
    {
        initCommstream();
    }
    while (client.available() > 0)
    {
        size_t read = client.readBytes(&packetBuffer[packetBufferIdx], MAX_PACKET_BUFFER - packetBufferIdx);
        packetBufferIdx += read;
    }
}

void DeviceCommunication::writeToCommstream(char *data)
{
    while (!client.connected())
    {
        initCommstream();
    }
    client.print(data);
}

#endif