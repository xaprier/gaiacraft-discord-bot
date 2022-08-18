// noinspection JSCheckFunctionSignatures

const client = require("../index");
const config = require("../config.json");
const functions = require("../commands/Utils/funcs");
const {MessageEmbed} = require("discord.js");

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        const embed = new MessageEmbed()
            .setAuthor({name: "• Log", iconURL: interaction.guild.iconURL({dynamic: true})})
            .setFooter({
                text: 'Developed by xaprier',
                iconURL: interaction.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
            })
            .setTimestamp();

        const logChannel = interaction.guild.channels.cache.get(config.logChannel);

        if (interaction.customId === "destek-kapat") {
            if (interaction.member.id !== interaction.channel.name.split("talep-").join("")) {
                embed.setDescription(`${interaction.member.user.tag}, ${interaction.guild.members.cache.get(interaction.channel.name.split("talep-").join("")).user.tag} üyesinin destek talebini kapatmaya çalıştı`).setColor("RED");
                logChannel.send({embeds: [embed]});
                interaction.reply({content: `Sadece talep sahibi, talebi kapatabilir`});
                return;
            }
            embed.setDescription(`${interaction.member} destek talebini kapatma işlemi başlattı`).setColor("GREEN")
            logChannel.send({embeds: [embed]});

            await functions.closeCollector(interaction);
        } else if (interaction.customId === "destek-onayla") {
            if (interaction.member.id !== interaction.channel.name.split("talep-").join("")) {
                interaction.reply({content: `Sadece talep sahibi, talebi kapatabilir`});
                embed.setDescription(`${interaction.member.user.tag}, ${interaction.guild.members.cache.get(interaction.channel.name.split("talep-").join("")).user.tag} üyesinin destek talebini kapatma işlemini onaylamaya çalıştı`).setColor("RED");
                logChannel.send({embeds: [embed]});
                return;
            }

            embed.setDescription(`${interaction.member} destek talebini kapatma işlemini onayladı`).setColor("GREEN")
            logChannel.send({embeds: [embed]});

            await functions.ticketSystemCreate(interaction);

            let ticketsCategory = interaction.guild.channels.cache.find(cha => cha.name === config.ticketsCategoryName && cha.type === "GUILD_CATEGORY");
            let closedCategory = interaction.guild.channels.cache.find(cha => cha.name === config.ticketsClosedCategoryName && cha.type === "GUILD_CATEGORY");

            try {
                await ticketsCategory.permissionOverwrites.edit(interaction.guild.members.cache.get(interaction.channel.name.split("talep-").join("")), {VIEW_CHANNEL: false});

                await interaction.channel.permissionOverwrites.set([{
                    id: interaction.guild.roles.everyone,
                    deny: 'VIEW_CHANNEL',
                }]);

                await interaction.channel.setParent(closedCategory)
                await interaction.channel.setName(`kapalı-${interaction.channel.name.split("talep-").join("")}`);

                await interaction.reply({content: `Bu destek talebi <@${interaction.member.id}> tarafından kapatılmıştır.`});
            } catch (e) {
                console.log(e);
            }

        } else if (interaction.customId === "destek-reddet") {
            if (interaction.member.id !== interaction.channel.name.split("talep-").join("")) {
                interaction.reply({content: `Sadece talep sahibi, talebi kapatabilir`});
                embed.setDescription(`${interaction.member.user.tag}, ${interaction.guild.members.cache.get(interaction.channel.name.split("talep-").join("")).user.tag} üyesinin destek talebini kapatma işlemini reddetmeye çalıştı`).setColor("RED");
                logChannel.send({embeds: [embed]});
                return;
            }

            const embed2 = new MessageEmbed()
                .setTimestamp()
                .setColor("ORANGE")
                .setAuthor({name: `| Destek`, iconURL: interaction.member.displayAvatarURL({dynamic: true})})
                .setDescription("Kapatma iptal edildi")
                .setFooter({
                    text: 'Developed by xaprier',
                    url: interaction.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true}) || null
                });

            interaction.reply({embeds: [embed2]});
            embed.setDescription(`${interaction.member} destek talebini kapatma işlemini reddetti`).setColor("GREEN")
            logChannel.send({embeds: [embed]});
        } else if (interaction.customId === "destek-oluştur") {
            // controlling ticket system
            await functions.ticketSystemCreate(interaction);

            await functions.ticketCreate(interaction);
        }
    }

});