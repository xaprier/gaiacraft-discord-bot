const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const config = require("../../config.json");
exports.checks = async function (msg, arg) {
    if (!msg.channel.name.includes(`talep-`)) {
        const sendMsg = await msg.reply({content: 'Komutu destek talebinizde uygulayınız.'});
        await this.deleteMsg(sendMsg, msg);
        return;
    }

    if (!msg.channel.name.includes(`talep-${msg.author.id}`)) {
        const sendMsg = await msg.reply({content: 'Komutu sadece destek talebinin sahibi kullanabilir.'});
        await this.deleteMsg(sendMsg, msg);
        return;
    }

    let arg3 = msg.mentions.members.first() || msg.guild.members.cache.get(arg[0]) || msg.guild.members.cache.find(x => x.user.username === arg.slice(0).join(' ') || x.user.username === arg[0] || x.user.id === arg.slice(0).join(' '));

    if (!arg3) {
        msg.channel.send({content: `Belirttiğiniz üye sunucuda bulunamadı. Lütfen geçerli ID, Kullanıcı Adı veya Etiket belirtin`});
        return;
    }
    return arg3;
}

exports.deleteMsg = async function (msg1, msg2) {
    setTimeout(() => {
        try {
            msg1.delete();
            if (msg2) {
                msg2.delete();
            }
        } catch (e) {
            console.log(e);
        }
    }, 5000);
}

exports.ticketCreate = async (interaction) => {
    if (interaction.member.roles.cache.some(role => [config.ticketBanRole].includes(role.id))) {
        const msg = await interaction.reply({content: `<@${interaction.toString().startsWith(config.prefix) ? interaction.author.id : interaction.member.id}> destek taleplerinden yasaklandığınız için talep oluşturamazsınız.`});
        setTimeout(() => interaction.toString().startsWith(config.prefix) ? msg.delete().then(interaction.delete()) : interaction.deleteReply(), 5000);
        return;
    }

    if (interaction.member.roles.cache.some(r => [`${config.ticketAttendant}`].includes(r.id))) {
        const msg = await interaction.reply({content: `<@${interaction.toString().startsWith(config.prefix) ? interaction.author.id : interaction.member.id}>, destek yetkilisi destek talebi oluşturamaz!`});
        setTimeout(() => interaction.toString().startsWith(config.prefix) ? msg.delete().then(interaction.delete()) : interaction.deleteReply(), 5000);
        return;
    }

    if (interaction.guild.channels.cache.find(c => c.name === `talep-${interaction.member.id}`)) {
        const msg = await interaction.reply({content: `<@${interaction.toString().startsWith(config.prefix) ? interaction.author.id : interaction.member.id}>, zaten açık bir destek talebiniz var! Bir sorun olduğunu düşünüyorsanız yetkiliyle iletişime geçiniz.`});
        setTimeout(() => interaction.toString().startsWith(config.prefix) ? msg.delete().then(interaction.delete()) : interaction.deleteReply(), 5000);
        return;
    }

    let findCategory = interaction.guild.channels.cache.find(c => c.name === "Talepler" && c.type === "GUILD_CATEGORY");
    if (!findCategory) {
        try {
            findCategory = interaction.guild.channels.create("Talepler", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    {
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
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
            await findCategory.permissionOverwrites.edit(interaction.member, {
                VIEW_CHANNEL: true,
            })
        } catch (e) {
            console.log(e);
        }
    }

    let cha;
    try {
        cha = await interaction.guild.channels.create(`talep-${interaction.member.id}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: interaction.member.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                },
                {
                    id: interaction.guild.roles.everyone,
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
    } catch (e) {
        console.log(e);
    }

    const buttons = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("destek-kapat")
            .setLabel("🔐 Talep Kapat")
            .setStyle("DANGER"),
    )

    const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setAuthor({
            name: `Hoşgeldiniz ${interaction.toString().startsWith(config.prefix) ? interaction.author.tag : interaction.user.tag}`,
            iconURL: interaction.member.displayAvatarURL({dynamic: true})
        })
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
        .setFooter({
            text: 'Developed by xaprier',
            iconURL: interaction.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
        });

    try {
        await cha.send({embeds: [embed], components: [buttons]});
        const msg = await interaction.reply({content: `<@${interaction.member.id}>, başarıyla bilet oluşturdunuz, kanala gitmek için <#${cha.id}> tıklayınız.`});
        setTimeout(() => interaction.toString().startsWith(config.prefix) ? msg.delete().then(interaction.delete()) : interaction.deleteReply(), 5000);
    } catch (e) {
        console.log(e);
    }
}

exports.closeCollector = async (interaction) => {
    const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setAuthor({name: `| Destek`, iconURL: interaction.member.displayAvatarURL({dynamic: true})})
        .addFields(
            {
                name: "Desteği biletini kapatmak istiyor musunuz?",
                value: `**Evet » Onayla **\n**Hayır » Reddet **`,
                inline: true,
            },
        )
        .setFooter({
            text: 'Developed by xaprier',
            iconURL: interaction.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
        });

    // noinspection JSCheckFunctionSignatures
    const buttons = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("destek-onayla")
            .setLabel("Onayla")
            .setStyle("SUCCESS"),
        new MessageButton()
            .setCustomId("destek-reddet")
            .setLabel("Reddet")
            .setStyle("DANGER")
    )
    interaction.reply({embeds: [embed], components: [buttons]});
}