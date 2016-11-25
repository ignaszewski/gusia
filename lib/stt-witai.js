'use strict';

const request = require('request');
const path = require('path');
const rec = require('node-record-lpcm16');

const accessToken = 'RFRGXQZMN3CZPGAI5CG7FZYVY2LNUF4Z';

const stt = function() {
    return rec.start().pipe(request.post({
        'url'     : 'https://api.wit.ai/speech?v=20160526lang=pl-pl&output=json',
        'headers' : {
            'Accept'        : 'application/vnd.wit.20160202+json',
            'Authorization' : 'Bearer ' + accessToken,
            'Content-Type'  : 'audio/wav'
        }
    }));
};

const parseResult = function (err, resp, body) {
    let data = JSON.parse(body);
    console.log(data._text);
    stt();
};

module.exports = stt;