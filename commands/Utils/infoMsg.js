const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "bilgi",
    aliases: ['info'],
    permission: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.guild.members.cache.get(message.author.id);
        const infoChannel = message.guild.channels.cache.find(cha => cha.id == `${config.infoChannel}`);
        if (user.permissions.has("ADMINISTRATOR")) {
            var embed = new MessageEmbed()
                .setAuthor({ name: `Gaia Nedir`, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setDescription(`Gaia, Yunan Mitolojisinde yeryüzünü simgeleyen tanrıçadır. Bu tanrıça bir ana tanrıça, doğa ana olan ve diğer tanrıçaların kendisinden türemiş olup en başta Yunan'lar tapsa da zaman içinde onun konumu değişmiş ve ona olan ilgi azalmıştır. Minecraft, doğanın bulunduğu bir hayatta kalma oyunu olup, sizlere bu oyunda bambaşka bir dünya oluşturduğumuz için GaiaCraft ismini tercih ettik.`)
                .setColor("ORANGE")
                .setFooter({ text: 'Developed by xaprier', iconURL: message.guild.members.cache.get(config.developer).displayAvatarURL({ dynamic: true }) })
                .setTimestamp();
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }
            
            embed.setDescription(`GaiaCraft ekibi uzun süredir çeşitli sunucularla ve eklentilerle uğraşmış ve uğraşmakta olan bir ekiptir. Kurucu ve yönetici ekibi aslında reel ortamda arkadaş olup yıllarca Minecraft-Survival sunucularda oynamıştır. Böylelikle sizlere en iyi sistemleri nasıl sunabileceğimizi bilen ve sunan bir ekip olup ve her gün bunu geliştirmeye çalışan bir ekibiz.`).author.name = `Biz kimiz?`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Oyundaki bakımlar, yenilikler, sorunlar, güncellemeler gibi duyuruları görüntülemek için <#${config.announcementChannel}> kanalından takip edebilirsiniz.`).author.name = `Duyuru ve gelişmeler`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Kurallarımızı görüntülemek için <#${config.rulesChannel}>, politikamızı görüntülemek için <#${config.policyChannel}> kanallarına göz atabilirsiniz. Uyulmadığı takdirde kurallar ve politikamızı okumuş varsayılıp gerekli cezaya tâbi tutulacaktır.`).author.name = `Kurallar ve Politika`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Destek ekibimiz tarafından destek almak, sorun bildirmek, şikayet ve benzeri olaylar için <#${config.onlyCommands}> kanalına **gc!destek** yazarak destek ekibine ulaşabilirsiniz.`).author.name = `Destek Talebi`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Sunucu hakkında öneri ve tavsiye vererek sonucu sunucuyu şekillendirebilirsiniz. Öneri/Tavsiye için <#${config.adviceChannel}> kanalına önerinizi yazmanız yeterlidir.`).author.name = `Öneri/Tavsiye`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Tag alabilmek için sunucumuzda video çekmeli veya yayın yapmalısınız. Çekilen video ve yayının toplam izlenmesine göre taglar verilir. Tag sayesinde sunucumuzda çekilen video veya yayınlanan yayınların reklamını <#${config.streamerChannel}> kanalında yapabileceksiniz.`).author.name = `Youtube/Yayıncı Tagı`
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Sunucumuzun çeşitli forumlarda reklamları bulunmaktadır. Eğer belirtilen forumlarda sunucu hakkında reel yorumlar yapılırsa bazı ödüllendirmeler yapılır. Forum konuları ve ödülleri hakkında bilgi almak için <#${config.forumAds}>`).author.name = `Forum Reklamları`;
            try {
                infoChannel.send({ embeds: [embed] });
            } catch (e) { console.log(e); }

            embed.setDescription(`Sunucumuzda yapılması, söylenmesi, gerçekleştirilmesi yasak olan olaylar yasaklama/susturma gibi yöntemlerle cezalandırılır. Ceza bilgi hakkında detaylı bilgi almak için <#${config.punishChannel}> kanalına göz atabilirsiniz.`).author.name = `Ceza Bilgi`;
            try {
                infoChannel.send({ embeds: [embed] });
                message.delete();
            } catch (e) { console.log(e); }
            
        } else {
            message.channel.send({ content: `Bilgi bölümümüz <#${config.infoChannel.id}> kanalındadır.` }).then(cha => {
                setTimeout(() => { cha.delete(); message.delete(); }, 15000);
            }).catch((e) => console.log(e));
        }
    },
};
