'use strict';

const Wit = require('../').Wit;
const interactive = require('../').interactive;
const tts = require('../').tts;

const accessToken = 'RFRGXQZMN3CZPGAI5CG7FZYVY2LNUF4Z';

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

const actions = {
    send(request, response) {
        const {sessionId, context, entities} = request;
        const {text, quickreplies} = response;
        return new Promise(function (resolve, reject) {
            console.log('sending...', JSON.stringify(response));
            tts(response.text);
            return resolve();
        });
    },
    getForecast({context, entities}) {
        return new Promise(function (resolve, reject) {
            let location = firstEntityValue(entities, 'location');
            if (location) {
                context.forecast = 'sunny in ' + location; // we should call a weather API here
                delete context.missingLocation;
            } else {
                context.missingLocation = true;
                delete context.forecast;
            }
            return resolve(context);
        });
    },
};

const client = new Wit({accessToken, actions});

interactive(client);



