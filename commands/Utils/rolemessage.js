const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "rrekle",
    aliases: ['rrmesaj', 'rrmessage'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.guild.members.cache.get(message.author.id);
        const recordChannel = message.guild.channels.cache.get(config.recordChannel);
        if (user.permissions.has("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setAuthor({ name: "• Tepki Rol", iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription("Rol almak için lütfen mesaja tepki veriniz")
                .setColor("ORANGE")
                .setFooter({ text: 'Developed by xaprier', iconURL: message.guild.members.cache.get(config.developer).avatarURL() })
                .setTimestamp();
            const msg = await recordChannel.send({ embeds: [embed] });
            message.delete();
            msg.react('✅');
        }
    },
};
