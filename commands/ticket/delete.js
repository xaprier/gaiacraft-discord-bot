const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json");

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: 'sil',
    description: 'Destek talebini siler',
    permission: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.channel.name.includes(`talep-`)) {
            const sendMsg = await message.reply({ content: 'Komutu destek talebinizde uygulayınız.' });
            deleteMsg(sendMsg, message);
            return;
        }

        if (!message.member.roles.cache.some(role => [`${config.ticketAttendant}`].includes(role.id)) && !message.member.permissions.has("ADMINISTRATOR")) {
            const sendMsg = await message.reply({ content: 'Desteği sadece destek yetkilisi silebilir.' });
            deleteMsg(sendMsg, message);
            return;
        }

        const ticketMember = message.guild.members.cache.get(message.channel.name.split("talep-").join(""));

        let category = message.guild.channels.cache.find(cha => cha.name == "Talepler" && cha.type == "GUILD_CATEGORY");

        try {
            category.permissionOverwrites.edit(ticketMember, { VIEW_CHANNEL: false });

            message.channel.permissionOverwrites.set([{
                id: message.guild.roles.everyone,
                deny: 'VIEW_CHANNEL',
            }])

            message.channel.setParent(message.guild.channels.cache.find(cha => cha.name == "Kapalı Talepler" && cha.type == "GUILD_CATEGORY"));
            message.channel.setName(`kapalı-${message.channel.name.split("talep-").join("")}`);

            message.channel.send({ content: `Bu destek talebi <@${message.author.id}> tarafından silinmiştir.` });
        } catch (e) { console.log(e); }
        
    }
}