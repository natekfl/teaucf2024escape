#pragma once

#define MAX_PACKET_BUFFER 32
#define MAX_CALLBACKS 32

class DeviceCommunication
{
public:
    static void init(const char *ident);
    static void tick();
    static void sendProperty(const char *key, const char *value);
    static void sendCommand(const char *cmd);

    typedef void (*commandCallbackFunc)();
    typedef void (*propertyCallbackFunc)(const char *value);

    static void addCommandListener(const char *cmd, commandCallbackFunc func);
    static void addPropertyListener(const char *key, propertyCallbackFunc func);

private:
    static const char *identName;
    static char packetBuffer[MAX_PACKET_BUFFER];
    static int packetBufferIdx;

    static void initCommstream();
    static void readCommstreamIntoBuffer();
    static void writeToCommstream(char *data);
    static void processPacketsFromBuffer();

    static void processPacket(const char *packet);
    static void processCommand(const char *cmd);
    static void processProperty(const char *key, const char *value);

    static void restartDevice();

    struct CommandCallback
    {
        const char *cmd;
        commandCallbackFunc func;
    };
    static CommandCallback *commandCallbacks[MAX_CALLBACKS];

    struct PropertyCallback
    {
        const char *key;
        propertyCallbackFunc func;
    };
    static PropertyCallback *propertyCallbacks[MAX_CALLBACKS];
};