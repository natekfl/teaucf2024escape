#ifndef DEVICE_COMMUNICATION
#define DEVICE_COMMUNICATION

#define MAX_PACKET_BUFFER 32

class DeviceCommunication
{
public:
    static void init();
    static void tick();

private:
    static char packetBuffer[MAX_PACKET_BUFFER];
    static int packetBufferIdx;

    static void readIntoBuffer();
    static void parsePackets();
};

#endif