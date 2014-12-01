Fairy Lights
============

Turn on a light when you receive a message.

Fairy Lights is a collection of code and hardware that allows you to turn on or off a light (in this case a christmas light) using a web interface or when you receive a notification (e.g. email)

## Hardware

This project will need

- An Arduino (or similar microcontroller)
- A computer with networking and a usb port (I'm using a Hackberry from Miniand)
- A relais
- A light
- Some perfboard

**Note on the light:**
I don't recommend using a light operating directly of mains (230V)!
Wiring in the relais requires parts of the cable to be exposed, be careful or use a lower voltage light, like some 24V christmas lights.

**Note on Raspberry Pis:**
If you're using a raspberry pi as a computer you can use its GPIO pins instead of the Arduino. This requires some modification to the source code. If you want to do this, please fork this repo and submit a pull request with your modifications.

![Schematic](https://raw.githubusercontent.com/xanecs/fairylights/master/doc/schematic.png)

## Software

The software in this project consists of two parts:

### The Arduino sketch
The Arduino sketch is used to turn the relais on or off based on serial input over the usb connection. It is located in the file `arduino.pde`. Just paste it into the Arduino IDE and flash it to your board. If you're not using pin 2, change the variable `relaisPin` in the
first line.

### The node.js control server
This code will run on the computer, serving a web interface and checking for messages and emails. It is written in node.js and should work on all platforms and architectures (x86 and ARM).

To install:

1. Install node.js and git (refer to your operating system/distribution)
2. Clone this repository
```
git clone https://github.com/xanecs/fairylights
cd fairylights
```
3. Install dependencies with npm
```
npm install
```
4. Copy config.example.js to config.js and edit it
```
cp config.example.js config.js
nano config.js
```
5. Run it
```
node index.js
```
or to keep it running after logout
```
screen node index.js
```

**Configuration**

The options under `server` specify the port and ip adress for the web interface.

`lights.serial` specifies the serial port your arduino is found at

`notify` is an array of notify-modules. The lights will turn on if any of those modules is triggered and turns off, when none of them are triggered. Each notify entry has a `type`, specifying whick module to use, a `name` to identify the module (you can have multiple modules of the same type, e.g. multiple email inboxes) and `config` options specific to the module

## Notify Modules

### Email

This module will check an imap server periodically and trigger the light if it contains unread messages. It will turn off, once you've read the mail.

**Configuration**

- `interval`: How often to contact the server (in seconds)
- `email.user`: The imap username
- `email.password`: The imap password
- `email.server`: The imap server adress
- `email.port`: The imap server port
- `email.tls`: Whether the imap server uses SSL/TLS

### Telegram

This module will invoke an instance of the [telegram-cli](https://github.com/vysheng/tg) client. And turn on if you receive a message. It will turn off when your status changes to online (e.g. you've read the message)

**Configuration**

- `bin`: path to the telegram-cli executable
- `key`: path to the telegram-server public key, found in `server.pub` in the telegram-cli repository
- `name`: your name on telegram (used to detect wether you're online)

**Setup**

1. Install / Build the telegram-cli readme (make sure to clone with `--recursive`)
2. Launch manually with
```
./bin/telegram-cli -k server.pub
```
3. Confirm your phone number

Now you can use this module

## Web interface

The web interface is found at the port specified in the `server` section of `config.js`, the default is `1338`.

Clicking the green *ON* button will leave the light on, no matter what, until you turn it off in the web interface.

Clicking the red *OFF* button will turn the light off, until another notification is triggered. (If you have received a telegram message it will turn off even though you haven't read it yet)

Below it says wether the light is currently off or on. If it is on, it will also give you a list of the currently triggered notify modules.

![Web interface](https://raw.githubusercontent.com/xanecs/fairylights/master/doc/webif.jpg)
