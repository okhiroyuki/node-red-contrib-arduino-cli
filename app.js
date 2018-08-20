const exec = require('child_process').exec;
const fs = require('fs');
const tempWrite = require('temp-write');

let arduino;

// RED.settings.arduino = '/Applications/Arduino.app/Contents/MacOS/Arduino';

if(RED.settings.arduino !== undefined){
    arduino = RED.settings.arduino;
}else{
    return;
}

let code = "void setup() { \n pinMode(LED_BUILTIN, OUTPUT);}\nvoid loop() {\ndigitalWrite(LED_BUILTIN, HIGH); \ndelay(1000);\n digitalWrite(LED_BUILTIN, LOW);\ndelay(1000);\n}";

let file = tempWrite.sync(code, 'output.ino');

exec(arduino + ' --board esp8266:esp8266:generic --verify ' + file, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
    }
    console.log(stdout);
});
