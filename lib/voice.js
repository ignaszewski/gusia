'use strict';

const { DEFAULT_MAX_STEPS } = require('./config');
const uuid = require('node-uuid');
const stt = require('./stt-witai');


module.exports = (wit, initContext, maxSteps) => {
    let context = typeof initContext === 'object' ? initContext : {};
    const sessionId = uuid.v1();
    const steps = maxSteps ? maxSteps : DEFAULT_MAX_STEPS;

    let action = function(line) {
        wit.runActions(sessionId, line, context, steps)
            .then((ctx) => {
            context = ctx;
            })
            .catch(err => console.error(err));
    };

    // initialize speech recognition
    stt();

};
