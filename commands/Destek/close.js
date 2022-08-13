const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const interaction = require("../../events/interactionCreate");

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: 'kapat',
    description: 'Destek talebini kapatır',
    permission: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        if (!message.channel.name.includes(`talep-`)) {
            const sendMsg = await message.reply({ content: 'Komutu destek talebinizde uygulayınız.' });
            deleteMsg(sendMsg, message);
            return;
        }

        if (!message.channel.name.includes(`talep-${message.author.id}`) && !message.member.roles.cache.some(role => [`${config.ticketAttendant}`].includes(role.id)) && !message.member.permissions.has("ADMINISTRATOR")) {
            const sendMsg = await message.reply({ content: 'Komutu sadece destek talebinin sahibi veya yetkili kullanabilir.' });
            deleteMsg(sendMsg, message);
            return;
        }
        
        try {
            interaction.closeCollector(message);
        } catch (e) { console.log(e); }
        
    }
}