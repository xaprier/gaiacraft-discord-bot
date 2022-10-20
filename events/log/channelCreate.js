const {MessageEmbed} = require( "discord.js" );
const config = require( "../../config.json" );
const client = require( "../../index" );

client.on( "channelCreate", async ( channel ) => {
	const logCha = channel.guild.channels.cache.get( config.logChannel );
	const fetchedLogs = await channel.guild.fetchAuditLogs( {
		limit: 1,
		type: 10, // ChannelDelete
	} );
	const createLog = fetchedLogs.entries.first();

	if ( logCha ) {
		let embed = new MessageEmbed()
			.setAuthor( {name: `• Kanal oluşturuldu`, iconURL: channel.guild.iconURL( {dynamic: true} )} )
			.setColor( "ORANGE" )
			.setThumbnail( createLog.executor?.displayAvatarURL( {dynamic: true} ) )
			.addFields(
				{
					name: `Başlıklar`,
					value: `**Oluşturan**\n**Kanal İsmi**\n**Kanal Türü**\n${channel.parent ? `**Kanal Kategorisi**\n` : ``}${channel.userLimit ? `**Üye Sınırı**\n` : ``}**Oluşturma Tarihi**\n**Üyeler**`,
					inline: true
				},
				{
					name: `Açıklamalar`,
					value: `**» ${createLog?.executor.tag}**\n**» ${channel.name}**\n**» ${channel.type}**\n${channel.parent ? `**» ${channel.parent}**\n` : ``}${channel.userLimit ? `**» ${channel.userLimit}**\n` : ``}**» ${channel.createdAt.toDateString() + " " + channel.createdAt.getHours() + ":" + channel.createdAt.getMinutes()}**\n**»${channel.members.filter( member => !member.user.bot ).map( member => ` \`${member.user.tag}\`` )}**`,
					inline: true
				}
			)
			.setTimestamp()
			.setFooter( {
				text: `Developed by xaprier`,
				iconURL: channel.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
			} );
		await logCha?.send( {embeds: [embed]} );
	} else {
		console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
	}
} )