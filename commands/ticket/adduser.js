const { Message, Client, MessageEmbed } = require("discord.js");

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: 'ekle',
    description: 'Destek talebine üye ekler',
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

        if (!message.channel.name.includes(`talep-${message.author.id}`)) {
            const sendMsg = await message.reply({ content: 'Komutu sadece destek talebinin sahibi kullanabilir.' });
            deleteMsg(sendMsg, message);
            return;
        }

        const addMem = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0] || x.user.id === args.slice(0).join(' '));

        if (!addMem) {
            message.channel.send({ content: `Belirttiğiniz üye sunucuda bulunamadı. Lütfen geçerli ID, Kullanıcı Adı veya Etiket belirtin` });
            return;
        }

        let ticketCategory = message.guild.channels.cache.find(cha => cha.name == 'Talepler' && cha.type == "GUILD_CATEGORY");
        try {
            ticketCategory.permissionOverwrites.edit(addMem, { VIEW_CHANNEL: true });
            ticketCategory.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false });
            message.channel.permissionOverwrites.edit(addMem, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
                EMBED_LINKS: true,
                ADD_REACTIONS: true,
            });
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false });
            message.reply({ content: `<@${addMem.user.id}> üyesi destek talebinize eklendi` });
        } catch (e) { console.log(e); }
    }
}