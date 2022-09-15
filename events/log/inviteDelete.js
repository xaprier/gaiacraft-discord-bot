// noinspection JSCheckFunctionSignatures
const client = require( "../../index" );
const config = require( "../../config.json" );
const {MessageEmbed} = require( "discord.js" );

client.on( "inviteDelete", async ( invite ) => {
	const logCha = invite.guild.channels.cache.get( config.logChannel );
	const fetchedLogs = await invite.guild.fetchAuditLogs( {
		limit: 1,
		type: 42, // INVITE_DELETE
	} );
	const deletionLog = fetchedLogs.entries.first();

	if ( logCha ) {
		let embed = new MessageEmbed()
			.setTimestamp()
			.setColor( "ORANGE" )
			.setAuthor( {name: `• Davet Silindi`, iconURL: invite.guild.iconURL( {dynamic: true} )} )
			.setThumbnail( deletionLog.executor?.displayAvatarURL( {dynamic: true} ) )
			.addFields(
				{
					name: `Başlıklar`,
					value: `**Silen Üye**\n**Davet Bağlantısı**\n**Davet Adresi**${invite.expiresAt !== null ? `\n**Bitiş Tarihi**` : ``}\n**Kullanım Sayısı**`,
					inline: true
				},
				{
					name: `Açıklamalar`,
					value: `**» ${deletionLog.executor.tag}**\n**» ${invite.url}**\n**» ${invite.channel.name}**${invite.expiresAt !== null ? `\n**» ` + invite.expiresAt.toDateString() + " " + invite.expiresAt.getHours() + ":" + invite.expiresAt.getMinutes() + `**` : ``}\n**» ${invite.uses !== null ? invite.uses : `0`}**`,
					inline: true
				}
			)
			.setFooter( {
				text: 'Developed by xaprier',
				iconURL: invite.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
			} );

		await logCha?.send( {embeds: [embed]} );
	} else {
		console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
	}
} )