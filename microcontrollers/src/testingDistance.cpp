/**#include <Arduino.h>
#include <DeviceCommunication.h>

#define TRIG_PIN1 3
#define TRIG_PIN2 4
#define ECHO_PIN1 5
#define ECHO_PIN2 6

void setup()
{
    Serial.begin(115200);
    pinMode(TRIG_PIN1, OUTPUT);
    digitalWrite(TRIG_PIN1, LOW);
    pinMode(TRIG_PIN2, OUTPUT);
    digitalWrite(TRIG_PIN2, LOW);
    pinMode(ECHO_PIN1, INPUT);
    pinMode(ECHO_PIN2, INPUT);
}

unsigned long readSensor(uint8_t trigPin, uint8_t echoPin)
{
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    unsigned long pulseLength = pulseIn(echoPin, HIGH, 46400);
    unsigned long dist = pulseLength / 58;
    return dist;
}

void loop()
{
    unsigned long dist;
    dist = readSensor(TRIG_PIN1, ECHO_PIN1);
    Serial.print("Sensor 1: ");
    if (dist == 0) {
        Serial.println("None");
    } else {
        Serial.println(dist/30);
    }
    dist = readSensor(TRIG_PIN2, ECHO_PIN2);
    Serial.print("Sensor 2: ");
    if (dist == 0) {
        Serial.println("None");
    } else {
        Serial.println(dist/30);
    }
    Serial.println();
    delay(500);
    
}
**/