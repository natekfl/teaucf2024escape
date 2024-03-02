#ifdef ROOM2LASER

#include <Arduino.h>
#include <DeviceCommunication.h>
#include "Room2LaserProperties.h"


void setup()
{
    DeviceCommunication::init("ROOM2LASER");
    Properties::init();

    pinMode(LED_BUILTIN, OUTPUT);   
}

void loop()
{
    DeviceCommunication::tick();
    digitalWrite(LED_BUILTIN, Properties::getENABLED());
}

#endif