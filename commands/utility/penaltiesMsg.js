const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "cezalar",
    aliases: ['penalties', 'punishes'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.guild.members.cache.get(message.author.id);
        const penaltyChannel = message.guild.channels.cache.find(cha => cha.id == `${config.punishChannel}`);
        if (user.permissions.has("ADMINISTRATOR")) {
            var embed = new MessageEmbed()
                .setAuthor({ name: `Oyun Sohbet`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .addFields(
                    { name: `Sebepler`, value: `**Hakaret**\n**Kışkırtma**\n**Küfür**\n**Ailevi Küfür**\n**Tehdit**\n**Kavga**\n**Spam**\n**Harf Uzatma**\n**Reklam**\n**Sunucu Hakaret**\n**Yetkili Hakaret**\n**Yetkili Kışkırtma**\n**Yetkili Küfür**\n**Yetkili Ailevi Küfür**\n**Yetkili Tehdit**\n**Dini Küfür/Hakaret**`, inline: true },
                    { name: `Cezalar`, value: `**»** 2 saat susturma\n**»** 2 saat susturma\n**»** 4 saat susturma\n**»** 8 saat susturma\n**»** 8 saat susturma\n**»** 30 dakika susturma\n**»** 30 dakika susturma\n**»** 30 dakika susturma\n**»** 1 yıl susturma\n**»** 1 gün susturma\n**»** 4 saat susturma\n**»** 4 saat susturma\n**»** 8 saat susturma\n**»** 16 saat susturma\n**»** 16 saat susturma\n**»** 1 yıl susturma`, inline: true }
                )
                .setFooter({ text: 'Developed by xaprier', iconURL: message.guild.members.cache.get(config.developer).avatarURL() })
                .setColor("ORANGE")
                .setTimestamp();
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 2 saat hapis\n**»** 2 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Lavacast tespit edildiğinde önce oyuncunun o alanda yaptıkları silinir, sonra aşağıdaki cezalar uygulanır. Yapılan LavaCast'in büyüklüğüne göre ağırlaştırılmış ceza verilebilir.`).author.name = `Lavacast`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 1 gün yasaklanma\n**»** 2 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Bozuk sistem tespit edildiğinde önce sistem geri alınmaksızın silinir, sonra aşağıdaki cezalar uygulanır. Sistemin doğurduğu sonuçlara göre ağırlaştırılmış ceza verilebilir.`).author.name = `Bozuk Sistemler`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 1 gün yasaklanma\n**»** 2 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Tuzak sistemleri tapu içerisinde ise ceza uygulanmaz, fakat değilse aşağıdaki cezalar uygulanır.`).author.name = `Tuzak Sistemleri`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }
            
            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 1 gün yasaklanma\n**»** 2 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Tapu Troll kuralları çiğnenirse ve oyuncu geri düzeltmezse aşağıdaki cezalar uygulanır. Yapılanın büyüklüğüne göre ağırlaştırılmış ceza verilebilir.`).author.name = `Tapu Trolleme`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 1 gün yasaklanma\n**»** 2 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Tp Tuzağı kuralları çiğnenirse aşağıdaki cezalar uygulanır.`).author.name = `TP Tuzağı`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 7 gün yasaklanma\n**»** 14 gün yasaklanma\n**»** 30 gün yasaklanma\n**»** Kalıcı yasaklanma`, inline: true }
            ).setDescription(`Dupe/Bug kuralları çiğnenirse aşağıdaki cezalar uygulanır.`).author.name = `Dupe/Bug`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Adet`, value: `**1**\n**2**\n**3**\n**4**`, inline: true },
                { name: `Cezalar`, value: `**»** 1 gün yasaklanma\n**»** 7 gün yasaklanma\n**»** 14 gün yasaklanma\n**»** 30 gün yasaklanma`, inline: true }
            ).setDescription(`Hile yaptığınıza dair herhangi kanıt vb. şeyler rapor edilirse ve hile yetkili gözünden kanıtlanırsa aşağıdaki cezalar uygulanır.`).author.name = `Hile`;
            try {
                penaltyChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setFields(
                { name: `Sebep`, value: `**Küfür/Hakaret ve diğerleri**\n**Sohbeti sorunlarla kirletmek**\n**İsim ve Açıklama**\n**Destek**`, inline: true },
                { name: `Cezalar`, value: `**»** 7 gün susturma\n**»** 7 gün susturma\n**»** 15 gün yasaklanma\n**»** 7 gün destek yasağı`, inline: true }
            ).setDescription(`Aşağıdaki Discord kurallarına uymadığınızda belirtilen cezalara tabi tutulacaksınız. Yapılana göre ağırlaştırılmış ceza verilebilir.`).author.name = `Discord`;
            try {
                penaltyChannel.send({ embeds: [embed] });
                message.delete();
            } catch (e) { console.log(e); }
            
        } else {
            message.channel.send({ content: `Cezalar bölümümüz <#${config.punishChannel.id}> kanalındadır.` }).then(cha => {
                setTimeout(() => { cha.delete(); message.delete(); }, 15000);
            }).catch((e) => console.log(e));
        }
    },
};
