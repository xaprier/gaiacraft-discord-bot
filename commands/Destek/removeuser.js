const { Message, Client } = require("discord.js");

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: 'çıkar',
    description: 'Destek talebinden üyeyi çıkarır',
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

        const remMem = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0] || x.user.id === args.slice(0).join(' '));

        if (!remMem || !message.channel.members.find(user => user.id == remMem.id)) {
            message.channel.send({ content: `Belirttiğiniz üye bulunamadı. Lütfen geçerli ID, Kullanıcı Adı veya Etiket belirtin` });
            return;
        }

        let ticketCategory = message.guild.channels.cache.find(cha => cha.name == 'Talepler' && cha.type == "GUILD_CATEGORY");
        try {

            if (!message.guild.channels.cache.get(cha => cha.name == `talep-${remMem.id}`)) 
                ticketCategory.permissionOverwrites.edit(remMem, { VIEW_CHANNEL: false });
            
            ticketCategory.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false });

            message.channel.permissionOverwrites.edit(remMem, { VIEW_CHANNEL: false });
            
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false });
            
            message.reply({ content: `<@${remMem.user.id}> üyesi destek talebinizden çıkarıldı` });
        } catch (e) { console.log(e); }
    }
}