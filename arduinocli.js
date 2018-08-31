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
            try {
                let tmpDir = tmp.dirSync({
                    unsafeCleanup: true
                });
                let filepath = tmpDir.name + "/" + path.basename(tmpDir.name) + ".ino";
                fs.writeFileSync(filepath, msg.payload);
                let proc = child_process.spawn('arduino-cli', ['compile', '--format', 'json', '--fqbn', msg.fqbn, tmpDir.name]);
                let output = '';
                proc.stdout.on('data', (data) => {
                    output += data;
                });
                proc.stdout.on('end', () => {
                    try {
                        msg.payload = JSON.parse(output);
                        this.error(msg);
                        tmpDir.removeCallback();
                    } catch (e) {
                        proc = child_process.spawn('arduino-cli', ['upload', '--format', 'json', '-p', msg.port, '--fqbn', msg.fqbn, tmpDir.name]);
                        output = '';
                        proc.stdout.on('data', (data) => {
                            output += data;
                        });
                        proc.stdout.on('end', () => {
                            try {
                                msg.payload = JSON.parse(output);
                                this.error(msg);
                            }catch(e){
                                msg.payload = {
                                    "Message": "success",
                                    "Cause": ""
                                };
                                this.send(msg);
                            }
                            tmpDir.removeCallback();
                        });
                    }
                });
            } catch (err) {
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("arduino-cli upload", ArduinoCliUploadNode);

    function ArduinoCliCompileNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        this.on("input", function (msg) {
            try {
                let tmpDir = tmp.dirSync({
                    unsafeCleanup: true
                });
                let filepath = tmpDir.name + "/" + path.basename(tmpDir.name) + ".ino";
                fs.writeFileSync(filepath, msg.payload);
                let proc = child_process.spawn('arduino-cli', ['compile', '--format', 'json', '--fqbn', msg.fqbn, tmpDir.name]);
                let output = '';
                proc.stdout.on('data', (data) => {
                    output += data;
                });
                proc.stdout.on('end', () => {
                    try{
                        msg.payload = JSON.parse(output);
                    }catch(e){
                        msg.payload = {
                            "Message": output,
                            "Cause": ""
                        }
                    }
                    this.send(msg);
                    tmpDir.removeCallback();
                });
            } catch (err) {
                this.error(err, msg);
            }
        });
    }
    RED.nodes.registerType("arduino-cli compile", ArduinoCliCompileNode);

    function ArduinoCliListNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.command = n.command;

        this.on("input", function (msg) {
            let proc = child_process.spawn('arduino-cli', ['--format', 'json', node.command, 'list']);
            let output = '';
            proc.stdout.on('data', (data) => {
                output += data;
            });
            proc.stdout.on('end', () => {
                try{
                    msg.payload = JSON.parse(output);
                }catch(e){
                    msg.payload = output;
                }
                this.send(msg);
            });
        });
    }
    RED.nodes.registerType("arduino-cli list", ArduinoCliListNode);

    function ArduinoCliSearchNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.command = n.command;
        node.target = n.target;

        this.on("input", function (msg) {
            if (node.target === "" && msg.payload === undefined && typeof msg.payload === "string") {
                node.target = msg.payload;
            }
            let proc = child_process.spawn('arduino-cli', ['--format', 'json', node.command, 'search', node.target]);
            let output = '';
            proc.stdout.on('data', (data) => {
                output += data;
            });
            proc.stdout.on('end', () => {
                try{
                    msg.payload = JSON.parse(output);
                    this.send(msg);
                }catch(err){
                    msg.payload = output;
                    this.send(msg);
                }
            });
        });
    }
    RED.nodes.registerType("arduino-cli search", ArduinoCliSearchNode);

    function ArduinoCliInstallNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.command = n.command;
        node.target = n.target;

        this.on("input", function (msg) {
            if (node.target === "" && msg.payload === undefined && typeof msg.payload === "string") {
                node.target = msg.payload;
            }
            let proc = child_process.spawn('arduino-cli', ['--format', 'json', node.command, 'install', node.target]);
            let output = '';
            proc.stdout.on('data', (data) => {
                output += data;
            });
            proc.stdout.on('end', () => {
                try{
                    msg.payload = JSON.parse(output);
                    this.send(msg);
                }catch(err){
                    msg.payload = output;
                    this.send(msg);
                }
            });
        });
    }
    RED.nodes.registerType("arduino-cli install", ArduinoCliInstallNode);
};
