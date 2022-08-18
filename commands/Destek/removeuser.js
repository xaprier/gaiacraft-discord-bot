const {Message, Client} = require("discord.js");
const functions = require("../Utils/funcs");

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
        console.log(mem);

        let ticketCategory = message.guild.channels.cache.find(cha => cha.name === 'Talepler' && cha.type === "GUILD_CATEGORY");
        try {

            ticketCategory.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {VIEW_CHANNEL: false});

            if (!message.guild.channels.cache.get(cha => cha.name === `talep-${mem.id}`) && mem) {}
                ticketCategory.permissionOverwrites.edit(mem, {VIEW_CHANNEL: false});

            if (mem) {
                await message.channel.permissionOverwrites.delete(mem);
                await message.reply({content: `<@${mem.user.id}> üyesi destek talebinizden çıkarıldı`});
            } else {
                await message.reply({content: `Üye bulunamadı`});
            }

        } catch (e) {
            console.log(e);
        }
    }
}