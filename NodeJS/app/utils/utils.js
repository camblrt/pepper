"use strict";

const fs = require("fs");
const path = require("path");
const consts = require("../utils/constants");

const contentDir = JSON.parse(process.env.CONFIG).contentDirectory;
let num_movement = 287;

class Utils {

    static listDirFilesInRes(dir, res) {
        this._listDir(dir, res, function (dirContentMap) {
            res.json(dirContentMap);
            res.end();
        });
    }

    static listDirFilesInCallback(callback) {
        this._listDir(contentDir, null, function (dirContentMap) {
            callback(dirContentMap);
        });
    }

    static _listDir(dir, res, cb) {
        let map = {};
        fs.readdir(dir, function (err, files) {
            if (err) {
                console.error(err);
                if (res !== null ){return res.status(500).end(err.message)}
                else {return}
            }

            let listPres = [];
            for (let i = 0; i < files.length; i++) {
                if (path.extname(files[i]) === ".json") {
                    listPres.push(files[i]);
                }
            }

            listPres.forEach(function (fileName) {
                fs.readFile(path.join(dir, fileName), function (err, data) {
                    if (err) {return console.log(err);}

                    let jsonObject = JSON.parse(data);
                    map[jsonObject.id] = jsonObject;
                    if (listPres.length === Object.keys(map).length) {
                        cb(map);
                    }
                })
            })
        })
    }

    static pokePepper (something) {
        num_movement++;
        let data = "{" +
            "\"id_movement\":\"100\"," +
            "\"name\":\"" + something + "\"," +
            "\"content\":\"" + something + "\"," +
            "\"num_movement\":\"" + num_movement + "\"" +
            "}";

        let filePath = path.join(contentDir, "movement.json");
        fs.writeFile(filePath, JSON.stringify(data), "utf8", function (err) {
            if (err) {console.log("\n\nshit Happened while writing to movement.json\n\n");}

            else console.log("movement successfully sent to movement.json!");
        });
    }

    static generateUUID () {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
    };

    static generateName() {
        let randName = Math.abs(Math.floor(Math.random() * consts.ANIMALS.length -1));
        let randBehavior = Math.abs(Math.floor(Math.random() * consts.BEHAVIOR.length -1));
        let rand = Math.floor(Math.random() * 1000);
        return consts.ANIMALS[randName] + " " + consts.BEHAVIOR[randBehavior] + " " + rand.toString();
    }
}

module.exports = Utils;
