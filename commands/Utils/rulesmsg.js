// noinspection JSCheckFunctionSignatures

const {Message, Client, MessageEmbed} = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "kurallar",
    aliases: ['rules'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message) => {
        const user = message.guild.members.cache.get(message.author.id);
        const ruleChannel = message.guild.channels.cache.find(cha => cha.id === `${config.rulesChannel}`);
        if (user.permissions.has("ADMINISTRATOR")) {
            let embed = new MessageEmbed()
                .setAuthor({name: `Sohbet`, iconURL: message.guild.iconURL({dynamic: true})})
                .setDescription(`Oyunda veya Discord'da Küfür, Hakaret, Spam, Reklam, Kışkırtma, Tehdit, Capslock, Harf Uzatma; susturma veya yasaklama cezalarına tâbi tutulur. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`)
                .setColor("ORANGE")
                .setFooter({
                    text: 'Developed by xaprier',
                    iconURL: message.guild.members.cache.get(config.developer).displayAvatarURL({dynamic: true})
                })
                .setTimestamp();
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(`Sunucuyu laga/çökmeye vb. olaylara sebep olacak sistemler geri alınmaksızın silinir. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`).author.name = `Bozuk Sistemler`;
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(`Lavacast yapmak yasaktır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`).author.name = `Lavacast`;
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(`Birisinin tapusunun etrafına tapu atmak, tapusunun etrafına sur çekmek, eşik kazmak, lav veya su koymak Tapu Troll'e girer ve cezalandırılır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`).author.name = `Tapu Trolleme`;
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(`Tapusuz alana tuzak yapmak, çukur kazmak yasaktır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`).author.name = `Tuzak Sistemleri`;
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(`Sorunlarınızı genel-sohbet, galeri, ve diğer herkese açık metin kanalları, yetkiliye özelden ulaşmak yerine <#${config.onlyCommands}> kanalına **gc!destek** yazıp destek talebi açarak sorunlarınızı belirtiniz. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`).author.name = `Sorunlar`;
            try {
                ruleChannel.send({embeds: [embed]});
            } catch (e) {
                console.log(e);
            }

            embed.setDescription(``).addFields(
                {
                    name: `İsim/Açıklama/Hakkında`,
                    value: `Discord hesabınızın **İsim/Açıklama/Hakkında** bölümlerinde reklam, uygunsuz içerik olması yasaktır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`
                },
                {
                    name: `Destek`,
                    value: `Unutmayın ki yetkililer de insan, bu yüzden onları sunucu kapanma gibi olaylar dışında taleplerde etiketlemeyiniz. Yetkililer müsait ise zaten en kısa sürede talebe dönüş yapacaklardır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.
                `
                },
                {
                    name: `Sohbet`,
                    value: `Sohbeti sorunlarınızla ve kavga ile kirletmek, her türlü küfür/hakaret ve diğer sohbet kurallarını çiğnemek yasaktır. Ceza hakkında bilgi almak için <#${config.punishChannel}> kanalını görüntüleyebilirsiniz.`
                }
            ).author.name = `Discord`;
            try {
                ruleChannel.send({embeds: [embed]});
                await message.delete();
            } catch (e) {
                console.log(e);
            }

        } else {
            message.channel.send({content: `Kurallarımız <#${config.rulesChannel.id}> kanalındadır.`}).then(cha => {
                setTimeout(() => {
                    cha.delete();
                    message.delete();
                }, 15000);
            }).catch((e) => console.log(e));
        }
    },
};
