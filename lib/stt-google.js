'use strict';

const path = require('path');
const rec = require('node-record-lpcm16');
const fs = require('fs');
const Speech = require('@google-cloud/speech');

const projectId = 'loyal-surfer-120111';
const speechClient = Speech({
    projectId: projectId
});
const options = {
    encoding: 'LINEAR16',
    sampleRate: 16000
};


const stt = function() {
    let filename = Math.random().toString(36).substring(2);
    let dest = path.resolve(__dirname+'/../wav/', filename+'.wav');
    let file = fs.createWriteStream(dest, { encoding: 'binary' });

    rec.start().pipe(file).on('finish', ()=>googleTTS(dest));
};

const googleTTS = function (fileName) {
    speechClient.recognize(fileName, options)
        .then((results) => {
            const transcription = results[0];
            console.log(`Transcription: ${transcription}`);
        });
};

stt();

module.exports = stt;