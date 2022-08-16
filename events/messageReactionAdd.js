const client = require("../index");
const config = require("../config.json");
const {MessageEmbed} = require("discord.js");

client.on("messageReactionAdd", async (interaction, ruser) => {
    if (interaction.message.channelId === `${config.recordChannel}` && !ruser.bot) {
        const user = interaction.message.guild.members.cache.get(ruser.id);

        await user.roles.add(interaction.message.guild.roles.cache.find(r => r.id === `${config.recordRole}`));

        const embed = new MessageEmbed().setAuthor({
            name: "• Kayıt",
            iconURL: interaction.message.guild.iconURL({dynamic: true})
        }).setDescription(`${user.user.tag} oyuncusu tepki vererek kayıt oldu`).setFooter({
            text: "Developed by xaprier",
            iconURL: interaction.message.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
        }).setColor("ORANGE").setTimestamp();

        interaction.message.guild.channels.cache.get(`${config.logChannel}`).send({embeds: [embed]});

        await interaction.message.reactions.removeAll();
        await interaction.message.react('✅');
    }
});