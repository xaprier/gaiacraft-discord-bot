const config = require( "../../config.json" );
const client = require( "../../index" );
const {MessageEmbed} = require( "discord.js" );
client.on( "guildBanAdd", async ( ban ) => {
	const logCha = ban.guild.channels.cache.get( config.logChannel );
	const fetchedLogs = await ban.guild.fetchAuditLogs( {
		limit: 1,
		type: 22, // GUILD_BAN_ADD
	} );
	const additionLog = fetchedLogs.entries.first();

	if ( logCha ) {
		const date = new Date();
		let embed = new MessageEmbed()
			.setAuthor( {name: `• Yasaklandı`, iconURL: ban.guild.iconURL( {dynamic: true} )} )
			.setTimestamp()
			.setColor( "ORANGE" )
			.addFields(
				{
					name: `Başlıklar`,
					value: `**Yasaklanan Üye**\n**Yasaklayan Üye**\n**Yasaklanma Zamanı**\n**Üye ID**`,
					inline: true
				},
				{
					name: `Açıklamalar`,
					value: `**\`${ban.user?.tag}\`**\n**\`${additionLog.executor?.tag}\`**\n**\`${date.toDateString() + " " + date.getHours() + ":" + date.getMinutes()}\`**\n**\`${ban.user.id}\`**`,
					inline: true
				}
			)
			.setThumbnail( ban.user.avatarURL( {dynamic: true} ) )
			.setFooter( {
				text: `Developed by xaprier`,
				iconURL: ban.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
			} );

		await logCha?.send( {embeds: [embed]} );
	} else {
		console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
	}
} );