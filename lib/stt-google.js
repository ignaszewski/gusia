'use strict';

const path = require('path');
const rec = require('node-record-lpcm16');
const fs = require('fs');
const request = require('request');

const sampleRate = 16000;

const stt = function() {
    let filename = Math.random().toString(36).substring(2);
    let dest = path.resolve(__dirname+'/../wav/', filename+'.wav');
    let file = fs.createWriteStream(dest, { encoding: 'binary' });

    rec.start({sampleRate: sampleRate}).pipe(file).on('finish', ()=>googleTTS(dest));
};

const googleTTS = function (fileName) {
    request.post({
        'url': 'https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyBmmqjUsStJat65IP7KgKuH2cz6rRvlIr8',
        'headers': {
            'Referer' : 'https://cloud.google.com/speech/',
            'Origin' : 'https://cloud.google.com',
            'Content-Type'  : 'text/plain;charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36'
        },
        'json': {
            'config': {
                'encoding': 'LINEAR16',
                'sampleRate': sampleRate,
                'languageCode': 'pl-PL',
                'maxAlternatives': 1
            },
            'audio': {
                'content': base64_encode(fileName)
            }
        }
    }, parseResult);
};

function base64_encode(file) {
    var content = fs.readFileSync(file);
    fs.unlinkSync(file);
    return new Buffer(content).toString('base64');
}

const parseResult = function (err, resp) {
    let trans = resp.toJSON().body.results ? resp.toJSON().body.results[0].alternatives[0].transcript : 'null' ;
    console.log(trans);
    stt();
};

module.exports = stt;