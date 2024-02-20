# Device Communication

Devices will connect using a TCP socket to the server.

Devices can send or receive two types of packets: Commands and Properties. All packets are delimited with a semicolon (;).

## Commands

Commands are just a string. All devices accept the command `RESTART`, which should cause the device to reboot. All other commands are dependent on the function of the device.

## Properties

Properties are sent in the form `KEY=VALUE`. Value can be a string or numeric type. All devices accept the following properties:

- `ENABLED=[true/false]`

All other properties are dependent on the function of the device.

## Initial connection

Upon establishing a TCP connection, the device needs to send the `IDENT=[deviceId]` property. Sending any other property before a valid IDENT, or sending an invalid IDENT, will result in an error. If there is an error, the server will terminate the TCP connection.

### Common Commands

TODO: Write 

### Common Properties

TODO: Write 