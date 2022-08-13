const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../config.json")

const interactions = require("../../events/interactionCreate");

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: "destek",
    aliases: ['ticket'],
    description: "Destek talebi oluşturur",
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // controls
        if (message.channel.id != config.onlyCommands) {
            const sendMsg = await message.reply({ content: `Komutları <#${config.onlyCommands}> kanalında kullanınız.` });
            deleteMsg(sendMsg, message);
            return;
        }
        
        interactions.ticketCreate(message);
    },
};
