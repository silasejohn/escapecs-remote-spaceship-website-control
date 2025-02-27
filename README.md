# EscapeSC Spaceship Remote Website Control

## Overview
This repo will set up a web-based monitor system where the appearance / functionality of a display website can be controlled remotely from another device (control website) on the same WiFi network. Technically, we locally host a server that handles WebSocket communication and an HTTP endpoint for sending commands.

### Features
- website display on laptop / monitor screen
- remote control over website display / style
- websockets for real-time communication
- control via wifi to avoid 2nd device node.js setup

### File Structure
- **server.js**: handles HTTP requests & websocket connections
- **index.html**: main displayed website (for monitor) capable of dynamic change
- **control.html**: admin website used to send commands to dynamically affect index.html

## Setup Instructions

### 1. Install Dependecies
ensure that node.js and websockets is installed on the machine that will display the monitor content (index.html)
```
npm install express ws
```

### 2. Determine Your Local IP Address
run the following commands on your device to determine ur ip_addr
```
ifconfig | grep inet  # macOS/Linux
ipconfig             # Windows
```
look for an ip_addr in the format of `192.168.X.X` example output:
```
inet 192.168.1.28 netmask 0xffffff00 broadcast 192.168.1.255
```
here, ur local device ip_addr is `192.168.1.28`. 

> NOTE: if you want to test the code functionality just using a single laptop, then you can use the localhost ip_addr of `127.0.0.1`. but if you want to control via another device (like phone) on the same network, you need to determine ur device ip as outlined above

### 3. Update Code w/ ur IP_DDR
Edit **server.js** and **index.html** depending on if you are testing or running this across wifi network, replacing:
```
const ip_addr = "127.0.0.1"; // Default (localhost) for testing
```
with
```
const ip_addr = "192.168.X.XX"; // Your local device IP
```
### 4. Start Node.JS Server
Run the following command on the laptop / pc that will be connected to the monitors:
```
node server.js
```

### 5. Access the Monitor / Control websites
Test Mode:
```
http://127.0.0.1:8081/ # test display website

http://127.0.0.1:8081/control # only same device can access

```
Live Mode:
```
http://<device_ip>:8081/ # live display website (access by machine powering the monitors)

http://<device_ip>:8081/control # live control panel (any device on wifi can access)
```

### 6. Expected Behavior 
`CHANGE_TO_BLACK_SCREEN` - monitor display switches to black screen

`CHANGE_TO_PASSWORD_SITE` - monitor display switches to password / interactable site

`CHANGE_TO_FINAL_SCREEN` - monitor display switches to green screen


## TODO
- [ ] make the actual 2 website links output
- [ ] host the actual control website for easy access
- [ ] dockerize the requirements
