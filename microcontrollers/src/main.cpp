#include <Arduino.h>
#include <DeviceCommunication.h>
#include "Properties.h"


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