const client = require("../index");
const config = require('../config.json');
const {MessageEmbed} = require(`discord.js`);

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.prefix))
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    let embed = new MessageEmbed()
        .setAuthor({name: "• Log", iconURL: message.guild.iconURL({dynamic: true})})
        .setFooter({
            text: 'Developed by xaprier',
            iconURL: message.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
        })
        .setTimestamp();

    if (!command) {
        embed.setDescription(`${message.author.tag} oyuncusu **${cmd}** komutunu gerçekleştiremedi`).setColor("RED");
        message.guild.channels.cache.get(`${config.logChannel}`).send({embeds: [embed]});
        return;
    }
    await command.run(client, message, args);
    embed.setDescription(`${message.author.tag} oyuncusu **${cmd}** komutunu gerçekleştirdi`).setColor("GREEN");
    message.guild.channels.cache.get(`${config.logChannel}`).send({embeds: [embed]});
});
