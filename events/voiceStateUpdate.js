const client = require("../index");
const config = require("../config.json");
const {MessageEmbed} = require("discord.js");

client.on("voiceStateUpdate", async (oldState, newState) => {
    // this section is going to be temporary voice channel handling
})