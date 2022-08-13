const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

exports.closeCollector = (interaction) => {
    var embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setAuthor({ name: `| Destek`, iconURL: interaction.member.displayAvatarURL({ dynamic: true}) })
        .addFields(
            {
                name: "Desteği biletini kapatmak istiyor musunuz?",
                value: `**Evet » ✅ **\n**Hayır » ❌ **`,
                inline: true,
            },
        )
        .setFooter({ text: 'Developed by xaprier', iconURL: interaction.guild.members.cache.get(config.developer).displayAvatarURL({ dynamic: true }) });
    
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
    interaction.reply({ embeds: [embed], components: [buttons] });
}

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "destek-kapat") {
            if (interaction.member.id != interaction.channel.name.split("talep-").join("")) {
                interaction.reply({ content: `Sadece talep sahibi, talebi kapatabilir` });
                return;
            }
            this.closeCollector(interaction);
        } else if (interaction.customId === "destek-onayla") {
            if (interaction.member.id != interaction.channel.name.split("talep-").join("")) {
                interaction.reply({ content: `Sadece talep sahibi, talebi kapatabilir` });
                return;
            }

            interaction.guild.channels.cache.find(c => c.name == "Talepler" && c.type == "GUILD_CATEGORY").permissionOverwrites.edit(interaction.guild.members.cache.get(interaction.channel.name.split("talep-").join("")), { VIEW_CHANNEL: false });

            interaction.channel.permissionOverwrites.set([{
                id: interaction.guild.roles.everyone,
                deny: 'VIEW_CHANNEL',
            }]);

            interaction.channel.setParent(interaction.guild.channels.cache.find(cha => cha.name == "Kapalı Talepler" && cha.type == "GUILD_CATEGORY"));
            interaction.channel.setName(`kapalı-${interaction.channel.name.split("talep-").join("")}`);

            interaction.reply({ content: `Bu destek talebi <@${interaction.member.id}> tarafından kapatılmıştır.` });
        } else if (interaction.customId === "destek-reddet") {
            if (interaction.member.id != interaction.channel.name.split("talep-").join("")) {
                interaction.reply({ content: `Sadece talep sahibi, talebi kapatabilir` });
                return;
            }

            var embed2 = new MessageEmbed()
                .setTimestamp()
                .setColor("ORANGE")
                .setAuthor({ name: `| Destek`, iconURL: interaction.member.displayAvatarURL() })
                .setDescription("Kapatma iptal edildi")
                .setFooter({ text: 'Developed by xaprier', url: interaction.guild.members.cache.get(config.developer).displayAvatarURL({ dynamic: true }) });
                    
            interaction.reply({ embeds: [embed2] });
        } else if (interaction.customId === "destek-oluştur") {
            if (interaction.member.roles.cache.some(role => [config.ticketBanRole].includes(role.id))) {
                await interaction.reply({ content: `<@${interaction.user.id}> destek taleplerinden yasaklandığınız için talep oluşturamazsınız.` });
                setTimeout(() => { interaction.deleteReply(); }, 10000);
                return;
            }

            if (interaction.member.roles.cache.some(r => [`${config.ticketAttendant}`].includes(r.id))) {
                await interaction.reply({ content: `<@${interaction.user.id}>, destek yetkilisi destek talebi oluşturamaz!`});
                setTimeout(() => interaction.deleteReply(), 10000);
                return;
            }

            if (interaction.guild.channels.cache.find(c => c.name == `talep-${interaction.member.id}`)) {
                await interaction.reply({ content: `<@${interaction.user.id}>, zaten açık bir destek talebiniz var! Bir sorun olduğunu düşünüyorsanız yetkiliyle iletişime geçiniz.`});
                setTimeout(() => interaction.deleteReply(), 10000);
                return;
            }

            let findCategory = interaction.guild.channels.cache.find(c => c.name == "Talepler" && c.type == "GUILD_CATEGORY");
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
                    findCategory.permissionOverwrites.edit(interaction.member, {
                        VIEW_CHANNEL: true,
                    })
                } catch (e) { console.log(e); }
            }

            let cha;
            try {
                cha = interaction.guild.channels.create(`talep-${interaction.member.id}`, {
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
            } catch (e) { console.log(e); }
            
            const buttons = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("destek-kapat")
                    .setLabel("Talep Kapat")
                    .setStyle("DANGER"),
            )
    
            var embed = new MessageEmbed()
                .setTimestamp()
                .setColor("ORANGE")
                .setAuthor({ name: `Hoşgeldiniz ${interaction.member.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
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
                .setFooter({ text: 'Developed by xaprier', iconURL: interaction.guild.members.cache.get(config.developer).displayAvatarURL({ dynamic: true }) });
            
            try {
                (await cha).send({ embeds: [embed], components: [buttons] });
                await interaction.reply({ content: `<@${interaction.member.id}>, başarıyla bilet oluşturdunuz, kanala gitmek için <#${(await cha).id}> tıklayınız.` });
                setTimeout(() => interaction.deleteReply(), 5000);
            } catch(e) { console.log(e); }
        }
    }

});