#pragma once

#include <DeviceCommunication.h>
#include <string.h>

#define BOOL_PROPERTY(NAME)                                 \
private:                                                    \
    static bool NAME;                                       \
                                                            \
public:                                                     \
    static void set##NAME(bool value)                       \
    {                                                       \
        NAME = value;                                       \
        const char *strValue = (value ? "true" : "false");  \
        DeviceCommunication::sendProperty(#NAME, strValue); \
    }                                                       \
    static bool get##NAME()                                 \
    {                                                       \
        return NAME;                                        \
    }                                                       \
    static void on##NAME##PropertyChange(const char *value) \
    {                                                       \
        set##NAME(strcmp("true", value) == 0);              \
    }

#define INT_PROPERTY(NAME)                                  \
private:                                                    \
    static int NAME;                                        \
                                                            \
public:                                                     \
    static void set##NAME(int value)                        \
    {                                                       \
        NAME = value;                                       \
        const char *strValue = itoa(value);                 \
        DeviceCommunication::sendProperty(#NAME, strValue); \
    }                                                       \
    static int get##NAME()                                  \
    {                                                       \
        return NAME;                                        \
    }                                                       \
    static void on##NAME##PropertyChange(const char *value) \
    {                                                       \
        set##NAME(atoi(value));                             \
    }

#define ATTACH_PROPERTY(NAME) DeviceCommunication::addPropertyListener(#NAME, Properties::on##NAME##PropertyChange);

struct Properties
{
    BOOL_PROPERTY(ENABLED)

    static void init()
    {
        ATTACH_PROPERTY(ENABLED)
    }
};

bool Properties::ENABLED = false;