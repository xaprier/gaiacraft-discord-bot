const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

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

        var embed = new MessageEmbed()
            .setTimestamp()
            .setColor("ORANGE")
            .setAuthor({ name: `| Destek`, iconURL: message.author.displayAvatarURL() })
            .addFields(
                {
                    name: "Desteği biletini kapatmak istiyor musunuz?",
                    value: `**Evet » ✅ **\n**Hayır » ❌ **`,
                    inline: true,
                },
            )
            .setFooter({ text: 'Developed by xaprier', iconURL: message.guild.members.cache.get(config.developer).avatarURL() });
        
        try {
            message.channel.send({ embeds: [embed] }).then(msg => {
                msg.react("✅");
                msg.react("❌");
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;
                }

                msg.awaitReactions({ filter, max: 1, time: 15000 }).then(collected => {
                    collected.filter(obj => {
                        return obj ? obj.emoji.name : "❌";
                    })

                    if (collected.first().emoji.name == '✅') {
                        message.guild.channels.cache.find(c => c.name == "Talepler" && c.type == "GUILD_CATEGORY").permissionOverwrites.edit(message.guild.members.cache.get(message.channel.name.split("talep-").join("")), { VIEW_CHANNEL: false });

                        message.channel.permissionOverwrites.set([{
                            id: message.guild.roles.everyone,
                            deny: 'VIEW_CHANNEL',
                        }]);

                        message.channel.setParent(message.guild.channels.cache.find(cha => cha.name == "Kapalı Talepler" && cha.type == "GUILD_CATEGORY"));
                        message.channel.setName(`kapalı-${message.channel.name.split("talep-").join("")}`);

                        message.channel.send({ content: `Bu destek talebi <@${message.author.id}> tarafından kapatılmıştır.` });
                    } else {
                        msg.delete();
                        var embed2 = new MessageEmbed()
                            .setTimestamp()
                            .setColor("ORANGE")
                            .setAuthor({ name: `| Destek`, iconURL: message.author.displayAvatarURL() })
                            .setDescription("Kapatma iptal edildi")
                            .setFooter({ text: 'Developed by xaprier', url: message.guild.members.cache.get(config.developer).avatarURL() });
                        
                        message.channel.send({ embeds: [embed2] });
                    }
                })
            })
        } catch (e) { console.log(e); }
        
    }
}