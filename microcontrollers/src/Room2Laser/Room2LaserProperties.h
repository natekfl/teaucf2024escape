#pragma once

#include "PropertiesHelper.h"
#include <DeviceCommunication.h>
#include <string.h>

struct Properties
{
    BOOL_PROPERTY(ENABLED)
    BOOL_PROPERTY(OVERRIDDEN)
    BOOL_PROPERTY(SOLVED)

    static void init()
    {
        ATTACH_PROPERTY(ENABLED)
        ATTACH_PROPERTY(OVERRIDDEN)
        ATTACH_PROPERTY(SOLVED)
    }
};

bool Properties::ENABLED = true;
bool Properties::OVERRIDDEN = false;
bool Properties::SOLVED = false;