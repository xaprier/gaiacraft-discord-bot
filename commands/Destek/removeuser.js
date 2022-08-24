const {Message, Client} = require("discord.js");
const functions = require("../Utils/funcs");
const config = require("../../config.json");

module.exports = {
    name: 'çıkar',
    description: 'Destek talebinden üyeyi çıkarır',
    permission: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let mem = await functions.checks(message, args);
        // check if there is an error on checks
        if (mem === 1) return;
        // check ticket system is correct
        await functions.ticketSystemCreate(message);

        let ticketCategory = message.guild.channels.cache.find(cha => cha.name === config.ticketsCategoryName && cha.type === "GUILD_CATEGORY");
        try {

            ticketCategory.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});

            if (mem) {
                if (!message.guild.channels.cache.get(cha => cha.name === `talep-${mem.id}`) && mem) {}
                    ticketCategory.permissionOverwrites.edit(mem, {VIEW_CHANNEL: false});
                await message.channel.permissionOverwrites.delete(mem);
                await message.reply({content: `<@${mem.user.id}> üyesi destek talebinizden çıkarıldı`});
            } else {
                await message.reply({content: `Üye bulunamadı`}).then(msg => setTimeout(() => msg.delete(), 5000));
            }

        } catch (e) {
            console.log(e);
        }
    }
}