// noinspection JSCheckFunctionSignatures

const client = require( "../index" );
const config = require( "../config.json" );
const functions = require( "../commands/Utils/funcs" );
const {MessageEmbed, MessageActionRow, MessageButton} = require( "discord.js" );

client.on( 'interactionCreate', async ( interaction ) => {
	if ( interaction.isButton() ) {
		const member = interaction.guild.members.cache.get( interaction.user.id );

		const embed = new MessageEmbed()
			.setAuthor( {name: "• Log", iconURL: interaction.guild.iconURL( {dynamic: true} )} )
			.setFooter( {
				text: 'Developed by xaprier',
				iconURL: interaction.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
			} )
			.setThumbnail( interaction.user?.displayAvatarURL( {dynamic: true} ) )
			.setTimestamp();

		const logChannel = interaction.guild.channels.cache.get( config.logChannel );

		if ( interaction?.customId === "destek-kapat" ) {
			if ( member.id !== interaction.channel.name.split( "talep-" ).join( "" ) && (!member.roles.cache.some( r => [config.ticketAttendant].includes( r.id ) ) && !member.permissions.has( "ADMINISTRATOR" )) ) {
				embed.setDescription( `${interaction.member?.user.tag}, ${interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) )?.user.tag} üyesinin destek talebini kapatmaya çalıştı` ).setColor( "RED" );
				if ( logChannel )
					await logChannel?.send( {embeds: [embed]} );
				else
					console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
				await interaction?.reply( {content: `Sadece talep sahibi, talebi kapatabilir`, ephemeral: true} );
				return;
			}
			embed.setDescription( `${interaction.member} destek talebini kapatma işlemi başlattı` ).setColor( "GREEN" ).author.name = `• Destek`;
			if ( logChannel )
				await logChannel?.send( {embeds: [embed]} );
			else
				console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );

			// if attendant clicks the button bot is going to send a message to close ticket
			if ( member.roles.cache.some( r => [config.ticketAttendant].includes( r.id ) ) || member.permissions.has( "ADMINISTRATOR" ) ) {
				embed.setDescription( `Başka sorununuz yoksa destek talebinizi kapatılacaktır` ).setColor( "ORANGE" );
				// noinspection JSCheckFunctionSignatures
				const buttons = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId( "destek-onayla" )
						.setLabel( "Onayla" )
						.setStyle( "SUCCESS" ),
					new MessageButton()
						.setCustomId( "destek-reddet" )
						.setLabel( "Reddet" )
						.setStyle( "DANGER" )
				);
				await interaction?.reply( {embeds: [embed], components: [buttons]} );
				return;
			}

			await functions.closeCollector( interaction );
		} else if ( interaction?.customId === "destek-onayla" ) {
			if ( member.id !== interaction.channel.name.split( "talep-" ).join( "" ) && (!member.roles.cache.some( r => [config.ticketAttendant].includes( r.id ) ) && !member.permissions.has( "ADMINISTRATOR" )) ) {
				await interaction?.reply( {content: `Sadece talep sahibi, talebi kapatabilir`, ephemeral: true} );
				embed.setDescription( `${interaction.member?.user.tag}, ${interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) )?.user.tag} üyesinin destek talebini kapatma işlemini onaylamaya çalıştı` ).setColor( "RED" );
				if ( logChannel )
					await logChannel?.send( {embeds: [embed]} );
				else
					console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
				return;
			}

			embed.setDescription( `${interaction.member}, ${interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) ).user.tag} üyesinin destek talebini kapatma işlemini onayladı` ).setColor( "GREEN" )
			if ( logChannel )
				await logChannel?.send( {embeds: [embed]} );

			await functions.ticketSystemCreate( interaction );

			let ticketsCategory = interaction.guild.channels.cache.find( cha => cha.name === config.ticketsCategoryName && cha.type === "GUILD_CATEGORY" );
			let closedCategory = interaction.guild.channels.cache.find( cha => cha.name === config.ticketsClosedCategoryName && cha.type === "GUILD_CATEGORY" );

			try {
				await ticketsCategory?.permissionOverwrites.edit( interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) ), {VIEW_CHANNEL: false} );

				await interaction.channel?.permissionOverwrites.set( [{
					id: interaction.guild.roles.everyone,
					deny: 'VIEW_CHANNEL',
				}] );

				await interaction.channel?.setParent( closedCategory )
				await interaction.channel?.setName( `kapalı-${interaction.channel.name.split( "talep-" ).join( "" )}` );

				await interaction?.reply( {content: `Bu destek talebi <@${interaction.member?.id}> tarafından kapatılmıştır.`} );
			} catch ( e ) {
				console.log( e );
			}

		} else if ( interaction?.customId === "destek-reddet" ) {
			if ( interaction.member?.id !== interaction.channel.name.split( "talep-" ).join( "" ) && (!member.roles.cache.some( r => [config.ticketAttendant].includes( r.id ) ) && !member.permissions.has( "ADMINISTRATOR" )) ) {
				await interaction?.reply( {content: `Sadece talep sahibi, talebi kapatabilir`, ephemeral: true} );
				embed.setDescription( `${interaction.member?.user.tag}, ${interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) )?.user.tag} üyesinin destek talebini kapatma işlemini reddetmeye çalıştı` ).setColor( "RED" );
				if ( logChannel )
					await logChannel?.send( {embeds: [embed]} );
				else
					console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
				return;
			}

			const embed2 = new MessageEmbed()
				.setTimestamp()
				.setColor( "ORANGE" )
				.setAuthor( {name: `• Destek`, iconURL: interaction.member?.displayAvatarURL( {dynamic: true} )} )
				.setDescription( "Kapatma iptal edildi" )
				.setFooter( {
					text: 'Developed by xaprier',
					url: interaction.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} ) || null
				} );
			await interaction?.reply( {embeds: [embed2], ephemeral: true} );
			embed.setDescription( `${interaction.member}, ${interaction.guild.members.cache.get( interaction.channel.name.split( "talep-" ).join( "" ) ).user.tag} üyesinin destek talebini kapatma işlemini reddetti` ).setColor( "GREEN" )
			if ( logChannel )
				await logChannel?.send( {embeds: [embed]} );
			else
				console.log( `${config.logChannel} ID'li log kanalı bulunamadı` );
		} else if ( interaction?.customId === "destek-oluştur" ) {
			// controlling ticket system
			await functions.ticketSystemCreate( interaction );

			await functions.ticketCreate( interaction );
		}
	}

} );