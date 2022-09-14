// noinspection JSCheckFunctionSignatures
const client = require( "../../index" );
const config = require( "../../config.json" );
const {MessageEmbed} = require( "discord.js" );

client.on( "inviteCreate", async ( invite ) => {
	const logCha = invite.guild.channels.cache.get( config.logChannel );

	if ( logCha ) {
		const member = invite.guild.members.cache.get( invite.inviter.id );

		let embed = new MessageEmbed()
			.setTimestamp()
			.setColor( "ORANGE" )
			.setAuthor( {name: `• Davet Oluşturuldu`, iconURL: invite.guild.iconURL( {dynamic: true} )} )
			.setThumbnail( invite.inviter?.displayAvatarURL( {dynamic: true} ) )
			.addFields(
				{
					name: `Başlıklar`,
					value: `**Oluşturan**\n**Davet Bağlantısı**\n**Davet Adresi**${invite.expiresAt !== null ? `\n**Bitiş Tarihi**` : ``}\n**Maksimum Kullanım Sayısı**`,
					inline: true
				},
				{
					name: `Açıklamalar`,
					value: `**» ${member.user.tag}**\n**» ${invite.url}**\n**» ${invite.channel.name}**${invite.expiresAt !== null ? `\n**» ` + invite.expiresAt.toDateString() + " " + invite.expiresAt.getHours() + ":" + invite.expiresAt.getMinutes() + `**` : ``}\n**» ${invite.maxUses !== 0 ? `${invite.maxUses}**` : `Sınırsız**`}`,
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