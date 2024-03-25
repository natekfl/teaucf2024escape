#pragma once

#include <stdint.h>

class TileRow
{
public:
    TileRow(uint8_t trigPin, uint8_t echoPin);
    void tick();
    bool tilePressed(uint8_t column);

private:
    uint8_t trigPin, echoPin;
    int8_t activeTileColumn; //-1 means none
    bool tileColumnChangedThisTick;

    int8_t readTileColumn;
    uint8_t tileColumnStableCount; //Counts how many ticks the readTileColumn has been stable for
};