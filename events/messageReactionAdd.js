const client = require("../index");
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

client.on("messageReactionAdd", async (interaction, ruser) => {
    if (interaction.message.channelId === `${config.recordChannel}` && !ruser.bot) {
        const user = interaction.message.guild.members.cache.get(ruser.id);
        
        user.roles.add(interaction.message.guild.roles.cache.find(r => r.id == `${config.recordRole}`));

        const embed = new MessageEmbed().setAuthor("• Kayıt", interaction.message.guild.iconURL({ dynamic: true })).setDescription(`${user.user.tag} oyuncusu tepki vererek kayıt oldu`).setFooter("Developed by xaprier", interaction.message.guild.members.cache.get(config.developer).avatarURL({ dynamic: true })).setColor("ORANGE").setTimestamp();

        interaction.message.guild.channels.cache.get(`${config.logChannel}`).send({ embeds: [embed] });
        
        interaction.message.reactions.removeAll();
        interaction.message.react('✅');
    }
});