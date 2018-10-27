# node-red-contrib-arduino-cli

This node can control Arduino using arduino-cli.

## Prepare
- install [arduino-cli 0.2.1-alpha.preview](https://github.com/arduino/arduino-cli)

## install
```
$ npm install node-red-contrib-arduino-cli
```

## Node functions
- get board or library list
- compile
- upload

![image](https://user-images.githubusercontent.com/23309/44916261-3ca21e00-ad70-11e8-8718-2df9d094eec2.png)

## sample

### get board list
```
[{"id":"59eb5acc.b01f94","type":"inject","z":"22c618d6.2d5218","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":232.5,"y":107,"wires":[["cb53d5de.a439d8"]]},{"id":"88fca5f.dcac958","type":"debug","z":"22c618d6.2d5218","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":754.5,"y":111,"wires":[]},{"id":"cb53d5de.a439d8","type":"arduino-cli list","z":"22c618d6.2d5218","name":"","command":"board","x":424.5,"y":118,"wires":[["88fca5f.dcac958"]]}]
```

### get library list
```
[{"id":"59eb5acc.b01f94","type":"inject","z":"22c618d6.2d5218","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":232.5,"y":107,"wires":[["cb53d5de.a439d8"]]},{"id":"88fca5f.dcac958","type":"debug","z":"22c618d6.2d5218","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":754.5,"y":111,"wires":[]},{"id":"cb53d5de.a439d8","type":"arduino-cli list","z":"22c618d6.2d5218","name":"","command":"lib","x":424.5,"y":118,"wires":[["88fca5f.dcac958"]]}]
```

### compile sketch
```
[{"id":"10c77d95.09a532","type":"inject","z":"22c618d6.2d5218","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":233,"y":435,"wires":[["1ce384d.a7b757b"]]},{"id":"1ce384d.a7b757b","type":"arduino-cli list","z":"22c618d6.2d5218","name":"","command":"board","x":299,"y":522,"wires":[["1ed61e94.d9cd31"]]},{"id":"1ed61e94.d9cd31","type":"function","z":"22c618d6.2d5218","name":"","func":"msg = msg.payload.serialBoards[0];\nreturn msg;","outputs":1,"noerr":0,"x":427,"y":454,"wires":[["6e773517.34081c"]]},{"id":"6e773517.34081c","type":"template","z":"22c618d6.2d5218","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}","output":"str","x":566,"y":520,"wires":[["ae74c07c.adf99"]]},{"id":"ae74c07c.adf99","type":"arduino-cli compile","z":"22c618d6.2d5218","name":"","x":706.5,"y":464,"wires":[["62fc2ea7.a88d1"]]},{"id":"62fc2ea7.a88d1","type":"debug","z":"22c618d6.2d5218","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":879,"y":528,"wires":[]}]
```

### upload skecth
```
[{"id":"5feb06cc.4b3d18","type":"function","z":"22c618d6.2d5218","name":"","func":"msg = msg.payload.serialBoards[0];\nreturn msg;","outputs":1,"noerr":0,"x":433.5,"y":335,"wires":[["b34b3694.e5f378"]]},{"id":"b34b3694.e5f378","type":"template","z":"22c618d6.2d5218","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}","output":"str","x":579,"y":285,"wires":[["dd9b370d.d5f338"]]},{"id":"dd9b370d.d5f338","type":"arduino-cli upload","z":"22c618d6.2d5218","name":"","x":729.5,"y":342,"wires":[["3ccc7213.198c6e"]]},{"id":"e0967017.8da52","type":"arduino-cli list","z":"22c618d6.2d5218","name":"","command":"board","x":349,"y":264,"wires":[["5feb06cc.4b3d18"]]},{"id":"3eabf99e.e19cb6","type":"inject","z":"22c618d6.2d5218","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":229,"y":325,"wires":[["e0967017.8da52"]]},{"id":"3ccc7213.198c6e","type":"debug","z":"22c618d6.2d5218","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":873,"y":282,"wires":[]}]
```

