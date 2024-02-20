#include <Arduino.h>
#include <DeviceCommunication.h>

void setup()
{
    DeviceCommunication::init("ROOM2LASER");
}

void loop()
{
    DeviceCommunication::tick();
}