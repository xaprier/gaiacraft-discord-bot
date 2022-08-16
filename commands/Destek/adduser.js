const {Message, Client} = require("discord.js");
const functions = require("../Utils/funcs");

module.exports = {
    name: 'ekle',
    description: 'Destek talebine üye ekler',
    permission: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = await functions.checks(message, args);

        let ticketCategory = message.guild.channels.cache.find(cha => cha.name === 'Talepler' && cha.type === "GUILD_CATEGORY");
        try {
            ticketCategory.permissionOverwrites.edit(member, {VIEW_CHANNEL: true});
            ticketCategory.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});
            await message.channel.permissionOverwrites.edit(member, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
                EMBED_LINKS: true,
                ADD_REACTIONS: true,
            });
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});
            await message.reply({content: `<@${member.user.id}> üyesi destek talebinize eklendi`});
        } catch (e) {
            console.log(e);
        }
    }
}