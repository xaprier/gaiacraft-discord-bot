const { Client, Collection, Intents } = require("discord.js");

const client = new Client({
    intents: [32767, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    restRequestTimeout: 60000
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");


// Initializing the project
require("./handler")(client);

client.login(client.config.token);
