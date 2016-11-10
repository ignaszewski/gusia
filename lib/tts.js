"use strict";
require('es6-promise').polyfill();

const co = require('co');   // npm install co
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const urlParse  = require('url').parse;
const googleTTS = require('google-tts-api');
const Mpg = require('mpg123');


// Setting up player queue
const player = new Mpg();
const playerQueue = [];
var playerPlaying = false;

player.on('end',function() {
    playerQueue.shift();
    playerPlaying = false;
});

//checking if something is to play when not playing
setInterval(function() {
    if(playerQueue.length>0 && !playerPlaying) {
        fs.access(playerQueue[0], function() {
            playerPlaying = true;
            player.play(playerQueue[0]);
        });
    }
}, 1000);



function downloadFile (url, dest) {
    return new Promise((resolve, reject) => {
            const info = urlParse(url);
    const httpClient = info.protocol === 'https:' ? https : http;
    const options = {
        host: info.host,
        path: info.path,
        headers: {
            'user-agent': 'WHAT_EVER'
        }
    };

    httpClient.get(options, function(res) {
        // check status code
        if (res.statusCode !== 200) {
            reject(new Error(`request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`));
            return;
        }

        const file = fs.createWriteStream(dest);
        file.on('finish', function() {
            // close() is async, call resolve after close completes.
            file.close(resolve);
        });
        file.on('error', function (err) {
            // Delete the file async. (But we don't check the result)
            fs.unlink(dest);
            reject(err);
        });

        res.pipe(file);
    })
        .on('error', function(err) {
            reject(err);
        })
        .end();
    });
}

const tts = function(text) {
    const filename = text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const dest = path.resolve(__dirname+'/../mp3/', filename+'.mp3');
    playerQueue.push(dest);
    co(function * () {
        const url = yield googleTTS(text,'pl');
        yield downloadFile(url, dest);
    }).catch(err => console.error(err.stack));
}

module.exports = tts;