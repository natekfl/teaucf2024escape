#pragma once

#include "PropertiesHelper.h"
#include <DeviceCommunication.h>
#include <string.h>

struct Properties
{
    BOOL_PROPERTY(ENABLED)

    static void init()
    {
        ATTACH_PROPERTY(ENABLED)
    }
};

bool Properties::ENABLED = true;