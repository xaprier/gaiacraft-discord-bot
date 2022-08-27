const client = require("../index");
const config = require("../config.json");
const {MessageEmbed} = require("discord.js");

client.on("voiceStateUpdate", async (oldState, newState) => {
	const logCha = newState.guild.channels.cache.get(config.logChannel);
	let embed = new MessageEmbed()
		.setAuthor({ name: '• Sesli Aktivitesi'})
		.setColor("ORANGE")
		.setDescription("")
		.setTimestamp()
		.setFooter({ text: 'Developed by xaprier', iconURL: newState.member.displayAvatarURL({dynamic: true})});
	// if user's channel not the same as before
	if(newState.channelId !== oldState.channelId) {
		// if user joins to tempVoice2People
		if (newState.channelId === config.tempVoice2People) {
			const cha = await newState.guild.channels.create(newState.member.displayName + ' Odası', {
				type: "GUILD_VOICE",
				parent: config.tempVoiceChannelCategory,
				userLimit: 2,
			});
			await newState.member.voice.setChannel(cha);
			embed.setDescription(`2 kişilik geçici oda oluşturdu.`);
		}
		// if user joins to tempVoice4People
		if (newState.channelId === config.tempVoice4People) {
			const cha = await newState.guild.channels.create(newState.member.displayName + ' Odası', {
				type: "GUILD_VOICE",
				parent: config.tempVoiceChannelCategory,
				userLimit: 4,
			});
			await newState.member.voice.setChannel(cha);
			embed.setDescription(`4 kişilik geçici oda oluşturdu.`);
		}
		// if user joins to tempVoice6People
		if (newState.channelId === config.tempVoice6People) {
			const cha = await newState.guild.channels.create(newState.member.displayName + ' Odası', {
				type: "GUILD_VOICE",
				parent: config.tempVoiceChannelCategory,
				userLimit: 6,
			});
			await newState.member.voice.setChannel(cha);
			embed.setDescription(`6 kişilik geçici oda oluşturdu.`);
		}
		// if user joins to tempVoice8People
		if (newState.channelId === config.tempVoice8People) {
			const cha = await newState.guild.channels.create(newState.member.displayName + ' Odası', {
				type: "GUILD_VOICE",
				parent: config.tempVoiceChannelCategory,
				userLimit: 8,
			});
			await newState.member.voice.setChannel(cha);
			embed.setDescription(`8 kişilik geçici oda oluşturdu.`);
		}
		// if user joins to tempVoiceUnlimitedPeople
		if (newState.channelId === config.tempVoiceUnlimitedPeople) {
			const cha = await newState.guild.channels.create(newState.member.displayName + ' Odası', {
				type: "GUILD_VOICE",
				parent: config.tempVoiceChannelCategory,
			});
			await newState.member.voice.setChannel(cha);
			embed.setDescription(`Sınırsız kişilik geçici oda oluşturdu.`);
		}

		// if the user leave the temporary channel
		if (oldState.channel && oldState.channel.name.toString().startsWith(oldState.member.displayName)) {
			await oldState.channel.delete('Oda sahibi odadan ayrıldı');
			embed.setDescription(`Geçici odasından ayrılarak kanalı bozdu.`);
		}
		embed.description += `\n\n**Ayrılınan Oda »** ${oldState.channel ? oldState.channel.name : 'Bilinmiyor'}\n**Katılınan Oda »** ${newState.channel ? newState.channel.name : 'Bilinmiyor'}\n**Kişi »** ${newState.member.user.tag}`
		if (logCha)
			await logCha.send({ embeds: [embed]});
		else
			console.log(`${config.logChannel} ID'li log kanalı bulunamadı`);
	}
})