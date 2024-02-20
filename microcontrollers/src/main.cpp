#include <Arduino.h>
#include <DeviceCommunication.h>

void setup() {
  DeviceCommunication::init();
}

void loop() {
  DeviceCommunication::tick();
}