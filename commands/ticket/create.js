const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json")

function deleteMsg(msg1, msg2) {
    setTimeout(() => {
        try { msg1.delete(); if (msg2) { msg2.delete(); } } catch (e) { console.log(e); }
    }, 5000);
}

module.exports = {
    name: "destek",
    aliases: ['ticket'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // controls
        if (message.channel.name != "・💢・komut-kanalı") {
            const sendMsg = await message.reply({ content: `Komutları <#${config.onlyCommands}> kanalında kullanınız.` });
            deleteMsg(sendMsg, message);
            return;
        }
        
        if (message.member.roles.cache.some(role => ["Destek Yasağı"].includes(role.name))) {
            const sendMsg = await message.reply({ content: 'Destek taleplerinden yasaklanmışsınız.' });
            deleteMsg(sendMsg, message);
            return;
        }

        if (message.member.roles.cache.some(r => [`${config.ticketAttendant}`].includes(r.id))) {
            const sendMsg = await message.reply({ content: 'Destek yetkilisi destek talebi oluşturamaz!'});
            deleteMsg(sendMsg, message);
            return;
        }

        if (message.guild.channels.cache.find(c => c.name == `talep-${message.author.id}`)) {
            const sendMsg = await message.reply({ content: 'Zaten açık bir destek talebiniz var. Bir sorun olduğunu düşünüyorsanız yetkiliyle iletişime geçiniz.' });
            deleteMsg(sendMsg, message);
            return;
        }

        let findCategory = message.guild.channels.cache.find(c => c.name == "Talepler" && c.type == "GUILD_CATEGORY");
        if (!findCategory) {
            try {
                findCategory = message.guild.channels.create("Talepler", {
                    type: "GUILD_CATEGORY",
                    permissionOverwrites: [
                        {
                            id: message.author.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: message.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            // destek yetkilisi
                            id: `${config.ticketAttendant}`,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                        },
                    ]
                })
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                findCategory.permissionOverwrites.edit(message.author, {
                    VIEW_CHANNEL: true,
                })
            } catch (e) { console.log(e); }
        }
        let cha;
        try {
            cha = message.guild.channels.create(`talep-${message.author.id}`, {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: message.author.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                    },
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        // destek yetkilisi
                        id: `${config.ticketAttendant}`,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                    },
                ],
                parent: findCategory
            })
        } catch(e) { console.log(e); }
        

        var embed = new MessageEmbed()
            .setTimestamp()
            .setColor("ORANGE")
            .setAuthor(`Hoşgeldiniz ${message.author.username}`, message.author.displayAvatarURL())
            .addFields(
                {
                    name: "`Bilgilendirme`",
                    value: `> Lütfen önce oyun içi adınızı ve ayrıntılı şekilde sorununuzu belirtiniz. Destek ekibi en kısa sürede dönüş yapacaktır. Sorun çözüldükten sonra gc!kapat ile destek talebini kapatınız.\n\u200b`,
                    inline: false,
                },
                {
                    name: "`Destek Komutlar`",
                    value: '**gc!ekle** @GC-Bot\n**gc!çıkar** @GC-Bot\n**gc!kapat**',
                    inline: true,
                },
                {
                    name: "`Açıklama`",
                    value: '**»** Destek biletine kullanıcıyı ekler\n**»** Destek biletinden kullanıcıyı çıkarır\n**»** Destek biletini kapatır',
                    inline: true,
                },
                {
                    name: "\u200b",
                    value: "**Kurallar**\nYetkilileri çok acil olmayan durumlarda etiketlemeniz **yasaktır!**\nYetkilileri etiketlemeniz durumunda **Destek Yasağı** cezası alabilirsiniz.\nVerilen desteği oyalamak veya kötüye kullanmak durumunda **Destek Yasağı** cezası alabilirsiniz.",
                    inline: false,
                }
            )
            .setFooter({ text: 'Developed by xaprier', iconURL: message.guild.members.cache.get(config.developer).avatarURL() });
        
        try {
            (await cha).send({ embeds: [embed] });
            await message.reply({ content: `Başarıyla bilet oluşturdunuz, kanala gitmek için <#${(await cha).id}> tıklayınız.` });
            deleteMsg(message);
        } catch(e) { console.log(e); }
    },
};
