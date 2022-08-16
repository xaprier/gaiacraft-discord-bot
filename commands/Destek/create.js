const {Message, Client} = require("discord.js");
const config = require("../../config.json")
const functions = require("../Utils/funcs");

module.exports = {
    name: "destek",
    aliases: ['ticket'],
    description: "Destek talebi oluşturur",
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        // controls
        if (message.channel.id !== config.onlyCommands) {
            const sendMsg = await message.reply({content: `Komutları <#${config.onlyCommands}> kanalında kullanınız.`});
            await functions.deleteMsg(sendMsg, message);
            return;
        }

        await functions.ticketCreate(message);
    },
};
