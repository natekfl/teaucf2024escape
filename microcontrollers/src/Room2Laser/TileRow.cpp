#ifdef ROOM2LASER

#include <Arduino.h>
#include "TileRow.h"

#define SR04Timeout 15000
#define SR04DebounceReads 7

TileRow::TileRow(uint8_t t, uint8_t e) : trigPin(t), echoPin(e), tileColumnStableCount(0)
{
    pinMode(trigPin, OUTPUT);
    digitalWrite(trigPin, LOW);
    pinMode(echoPin, INPUT);
}

void TileRow::tick()
{
    // Read Sensor
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    unsigned long pulseLength = pulseIn(echoPin, HIGH, SR04Timeout);

    // Calculate Column
    int8_t columnDetected = -1;
    if (pulseLength > 0)
    {
        unsigned long rawCM = pulseLength / 58;
        columnDetected = rawCM / 30;
        if (columnDetected > 3)
        {
            columnDetected = -1;
        }
    }

    // Debounce and store
    if (columnDetected != readTileColumn)
    {
        tileColumnStableCount = 0;
    }
    else
    {
        if (tileColumnStableCount > SR04DebounceReads)
        {
            if (readTileColumn != activeTileColumn)
            {
                activeTileColumn = readTileColumn;
                tileColumnChangedThisTick = true;
            }
            else
            {
                tileColumnChangedThisTick = false;
            }
        }
        else
        {
            tileColumnStableCount++;
        }
    }

    readTileColumn = columnDetected;
}

bool TileRow::tilePressed(uint8_t column)
{
    return activeTileColumn == column && tileColumnChangedThisTick;
}

#endif