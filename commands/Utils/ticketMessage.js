const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "destek-tepki",
    aliases: ['ticket-reaction', 'tr-message'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // ticket kanalına butonlu(component) mesaj atacak, bu butona göre de bilet oluşturacak bir interaction oluşturacaksın
    },
};
