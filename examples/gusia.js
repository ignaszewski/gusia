'use strict';

// const NodeSpotify = require ("node-spotify-helper");
// const webApi = new NodeSpotify.SpotifyWebApi ();
// async function webApiDemo () {
//     // Connect to the Web Api using your clientId and clientSecret
//     await webApi.authenticate ('fe5c83f5c5064ae5bc5996eb40fc5055', '6a8323c3530d423f8087830148299c3f');
//
//     // Run a query
//     const artists = await webApi.searchArtists ("Jackson 5");
//     console.log(artists);
// }
// webApiDemo ();

const NodeSpotify = require ("node-spotify-helper");
const api = new NodeSpotify.SpotifyWebHelper();

// Using an async function
// You an also use Promises (.then(), .catch(), ...)
async function apiDemo () {
    try {
        // Grab the volume
        const volume = await api.volume ();
        console.log ("Current volume: " + volume);

        // Skip to next track
        await api.next ();
        console.log ("Skipped to next track.");

        // View current track
        const track = await api.currentTrack ();
        console.log (`Playing: ${track.artist} - ${track.name}`);

        // Jump to the middle
        const midTime = track.duration / 2;
        await api.position (midTime);
        console.log ("Jumped to the middle of the track");

        // Where are we at now?
        const position = await api.position ();
        console.log ("We're now at " + position + " seconds");

        // Lets play some Calvin Harris
        await api.play ("spotify:track:5bcTCxgc7xVfSaMV3RuVke");
        console.log ("Played Calvin Harris");

        // Pause da tunes
        await api.pause ();
        console.log ("Pausing the playback...");

        // Continue playing
        await api.play ();
        console.log ("Aand resuming. The music is important!");

        // Mute
        await api.mute ();
        console.log ("Muted the client");

        // And unmute
        await api.unmute ();
        console.log ("But we want to hear the music!");

        // Now open the window, we might want to do a search
        await api.focusWindow ();
        console.log ("Gotta open this window right here");

        // Or, enable shuffling
        await api.setShuffling (true);
        // or setRepeat (true)

        // Are we repeating?
        const repeatState = await api.repeating ();
        console.log ("We are " + ((repeatState) ? "" : "not ") + "repeating!");
    } catch (err) {
        console.log (err.stack);
    }
}

apiDemo ();

// const stt = require('../lib/stt-witai');
// stt();

