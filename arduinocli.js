module.exports = function (RED) {
    "use strict";
    const child_process = require('child_process');
    const fs = require('fs');
    const tmp = require('tmp');
    const path = require('path');

    function ArduinoCliUploadNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.on("input", function (msg) {
            try{
                let tmpDir = tmp.dirSync({ unsafeCleanup:true });
                let filepath = tmpDir.name + "/" + path.basename(tmpDir.name) + ".ino";
                fs.writeFileSync(filepath, msg.payload);
                let  proc =  child_process.spawn('arduino-cli', ['compile','--format','json','--fqbn', msg.fqbn, tmpDir.name]);
                let output = '';
                proc.stdout.on('data', (data) => {
                    output += data;
                });
                proc.stdout.on('end', () => {
                    try{
                        msg.payload = JSON.parse(output);
                        this.error(msg);
                        tmpDir.removeCallback();
                    }catch(e){
                        proc =  child_process.spawn('arduino-cli', ['upload','--format','json','-p', msg.port, '--fqbn', msg.fqbn, tmpDir.name]);
                        output = '';
                        proc.stdout.on('data', (data) => {
                            output += data;
                        });
                        proc.stdout.on('end', () => {
                            try{
                                if(output === ""){
                                    msg.payload = "success";
                                    this.send(msg);
                                }else{
                                    msg.payload = JSON.parse(output);
                                    this.error(msg);
                                }
                            }catch(e){
                                console.log(e);
                            }
                            tmpDir.removeCallback();
                        });
                    }
                });
            }catch(err){
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("arduino-cli upload", ArduinoCliUploadNode);

    function ArduinoCliCompileNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.on("input", function (msg) {
            try{
                let tmpDir = tmp.dirSync({ unsafeCleanup:true });
                let filepath = tmpDir.name + "/" + path.basename(tmpDir.name) + ".ino";
                fs.writeFileSync(filepath, msg.payload);
                let  proc =  child_process.spawn('arduino-cli', ['compile','--format','json','--fqbn', msg.fqbn, tmpDir.name]);
                let output = '';
                proc.stdout.on('data', (data) => {
                    output += data;
                });
                proc.stdout.on('end', () => {
                    this.send(msg);
                    tmpDir.removeCallback();
                });
            }catch(err){
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("arduino-cli compile", ArduinoCliCompileNode);

    function ArduinoCliBoardListNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.on("input", function (msg) {
            try{
                let  proc =  child_process.spawn('arduino-cli', ['--format','json', 'board', 'list']);
                let output = '';
                proc.stdout.on('data', (data) => {
                    output += data;
                });
                proc.stdout.on('end', () => {
                    msg.payload = JSON.parse(output);
                    this.send(msg);
                });
            }catch(err){
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("arduino-cli boardlist", ArduinoCliBoardListNode);
};
