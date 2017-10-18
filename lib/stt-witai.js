'use strict';

const request = require('request');
const rec = require('node-record-lpcm16');
const sampleRate = 16000;
const accessToken = 'RFRGXQZMN3CZPGAI5CG7FZYVY2LNUF4Z';
const {Wit} = require('node-wit');
const client = new Wit({accessToken: accessToken});

const stt = function() {
    console.log('...Slucham (witAI)...');
    return rec.start({sampleRate: sampleRate}).pipe(request.post({
        'url'     : 'https://api.wit.ai/speech?v=20170307',
        'headers' : {
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type'  : 'audio/wav'
        }
    }, parseResult));
};

const parseResult = function (err, resp, body) {
    if (resp && !err) {
        let data = JSON.parse(body);
        console.log(data._text);
        client.message(data._text, {})
            .then((e => {
                console.log(e.entities);
            }))
            .catch(console.error);
    }
    stt();
};

module.exports = stt;