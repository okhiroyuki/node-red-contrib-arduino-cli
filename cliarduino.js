module.exports = function (RED) {
    "use strict";
    const exec = require('child_process').exec;
    const fs = require('fs');
    const tempWrite = require('temp-write');

    function CliArduinoNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.on("input", function (msg) {
            let arduino;
            if(RED.settings.arduino !== undefined){
                arduino = RED.settings.arduino;
            }else{
                this.error(RED._("httpin.errors.no-arduino"), msg);
                return;
            }
            try{
                let file = tempWrite.sync(msg.payload, 'output.ino');
                exec(arduino + ' --board esp8266:esp8266:generic --verify ' + file, (err, stdout, stderr) => {
                    if (err) {
                        msg.status = err.code;
                    }else{
                        msg.status = 0;
                    }
                    msg.payload = stdout;
                    this.send(msg);
                });
            }catch(err){
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("cliarduino", CliArduinoNode);
};
