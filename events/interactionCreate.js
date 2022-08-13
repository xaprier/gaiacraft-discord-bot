const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

exports.closeCollector = (interaction) => {
    var embed = new MessageEmbed()
        .setTimestamp()
        .setColor("ORANGE")
        .setAuthor({ name: `| Destek`, iconURL: interaction.member.displayAvatarURL() })
        .addFields(
            {
                name: "Desteği biletini kapatmak istiyor musunuz?",
                value: `**Evet » ✅ **\n**Hayır » ❌ **`,
                inline: true,
            },
        )
        .setFooter({ text: 'Developed by xaprier', iconURL: interaction.guild.members.cache.get(config.developer).avatarURL() });
    
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
        console.log(interaction.customId);
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
                .setFooter({ text: 'Developed by xaprier', url: interaction.guild.members.cache.get(config.developer).avatarURL() });
                    
            interaction.reply({ embeds: [embed2] });
        }
    }

});