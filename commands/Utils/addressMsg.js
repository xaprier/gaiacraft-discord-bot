// noinspection JSCheckFunctionSignatures

const {Message, Client, MessageEmbed} = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "adres", aliases: ['address'], permission: [], /**
     *
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        const user = message.guild.members.cache.get(message.author.id);
        const addressChannel = message.guild.channels.cache.find(cha => cha.id === `${config.addressChannel}`);
        if (user.permissions.has("ADMINISTRATOR")) {
            let embed = new MessageEmbed()
                .setAuthor({name: `Adreslerimiz`, iconURL: message.guild.iconURL({dynamic: true})})
                .addFields({name: `Minecraft Sunucu Adresimiz;`, value: `mc.gaiacraft.net`}, {
                    name: `Web Adresimiz;`,
                    value: `https://gaiacraft.net/`
                }, {name: `Discord Adresimiz;`, value: `https://discord.gg/NdA3nZrufW`}, {
                    name: `Instagram Adresimiz;`,
                    value: `https://www.instagram.com/mcgaiacraft/`
                }, {name: `YouTube Adresimiz;`, value: `https://www.youtube.com/channel/UCB0fqW6gWxqy7oir7lRM9wg`})
                .setColor("ORANGE")
                .setFooter({
                    text: 'Developed by xaprier',
                    iconURL: message.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
                })
                .setTimestamp();
            try {
                addressChannel.send({embeds: [embed]});
                await message.delete();
            } catch (e) {
                console.log(e);
            }

        } else {
            message.channel.send({content: `Adreslerimiz <#${config.addressChannel.id}> kanalındadır.`}).then(cha => {
                setTimeout(() => {
                    cha.delete();
                    message.delete();
                }, 15000);
            }).catch((e) => console.log(e));
        }
    },
};
