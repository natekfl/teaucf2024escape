#ifndef DEVICE_COMMUNICATION
#define DEVICE_COMMUNICATION

#define MAX_PACKET_BUFFER 32

class DeviceCommunication
{
public:
    static void init(const char *ident);
    static void tick();

private:
    static char packetBuffer[MAX_PACKET_BUFFER];
    static int packetBufferIdx;

    static void readIntoBuffer();
    static void processPacketsFromBuffer();
    static void processPacket(char* packet);
    static void processCommand(char* cmd);
    static void processProperty(char* key, char* value);
};

#endif