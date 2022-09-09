const {MessageEmbed, MessageActionRow, MessageButton} = require( "discord.js" );
const replaceJSONProperty = require( 'replace-json-property' );
const config = require( "../../config.json" );
exports.checks = async function ( msg, arg ) {
	if ( !msg.channel.name.includes( `talep-` ) ) {
		const sendMsg = await msg?.reply( {content: 'Komutu destek talebinizde uygulayınız.'} );
		await this.deleteMsg( sendMsg, msg );
		return 1;
	}

	if ( !msg.channel.name.includes( `talep-${msg.author.id}` ) ) {
		const sendMsg = await msg?.reply( {content: 'Komutu sadece destek talebinin sahibi kullanabilir.'} );
		await this.deleteMsg( sendMsg, msg );
		return 1;
	}

	let arg3 = msg.mentions.members.first() || msg.guild.members.cache.get( arg[0] ) || msg.guild.members.cache.find( x => x.user.username === arg.slice( 0 ).join( ' ' ) || x.user.username === arg[0] || x.user.id === arg.slice( 0 ).join( ' ' ) );

	if ( !arg3 ) {
		await msg.channel?.send( {content: `Belirttiğiniz üye sunucuda bulunamadı. Lütfen geçerli ID, Kullanıcı Adı veya Etiket belirtin`} );
		return 1;
	}
	return arg3;
}

exports.deleteMsg = async function ( msg1, msg2 ) {
	setTimeout( () => {
		try {
			msg1?.delete();
			msg2?.delete();
		} catch ( e ) {
			console.log( e );
		}
	}, 5000 );
}

exports.ticketCreate = async ( interaction ) => {
	if ( interaction.member.roles.cache.some( role => [config.ticketBanRole].includes( role?.id ) ) ) {
		await interaction?.reply( {
			content: `<@${interaction.toString().startsWith( config.prefix ) ? interaction.author.id : interaction.member.id}> destek taleplerinden yasaklandığınız için talep oluşturamazsınız.`,
			ephemeral: true
		} );
		return 1;
	}

	if ( interaction.member.roles.cache.some( r => [`${config.ticketAttendant}`].includes( r?.id ) ) ) {
		await interaction?.reply( {
			content: `<@${interaction.toString().startsWith( config.prefix ) ? interaction?.author.id : interaction?.member.id}>, destek yetkilisi destek talebi oluşturamaz!`,
			ephemeral: true
		} );
		return 1;
	}

	if ( interaction.guild.channels.cache.find( c => c.name === `talep-${interaction.member.id}` ) ) {
		await interaction?.reply( {
			content: `<@${interaction.toString().startsWith( config.prefix ) ? interaction.author.id : interaction.member.id}>, zaten açık bir destek talebiniz var! Bir sorun olduğunu düşünüyorsanız yetkiliyle iletişime geçiniz.`,
			ephemeral: true
		} );
		return 1;
	}
	this.ticketSystemCreate( interaction );
	let findCategory = interaction.guild.channels.cache.find( c => c.name === config.ticketsCategoryName && c.type === "GUILD_CATEGORY" );

	try {
		await findCategory?.permissionOverwrites.edit( interaction.member, {
			VIEW_CHANNEL: true,
		} )
	} catch ( e ) {
		console.log( e );
	}

	let cha;
	try {
		cha = await interaction.guild.channels.create( `talep-${interaction.member.id}`, {
			type: "GUILD_TEXT",
			permissionOverwrites: [
				{
					id: interaction.member.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
				{
					// destek yetkilisi
					id: `${config.ticketAttendant}`,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
				},
			],
			parent: findCategory
		} )
	} catch ( e ) {
		console.log( e );
	}

	const buttons = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId( "destek-kapat" )
			.setLabel( "🔐 Talep Kapat" )
			.setStyle( "DANGER" )
	)

	const embed = new MessageEmbed()
		.setTimestamp()
		.setColor( "ORANGE" )
		.setAuthor( {
			name: `Hoşgeldiniz ${interaction.toString().startsWith( config.prefix ) ? interaction.author.tag : interaction.user.tag}`,
			iconURL: interaction.member?.displayAvatarURL( {dynamic: true} )
		} )
		.addFields(
			{
				name: "`Bilgilendirme`",
				value: `> Lütfen önce oyun içi adınızı ve ayrıntılı şekilde sorununuzu belirtiniz. Destek ekibi en kısa sürede dönüş yapacaktır. Sorun çözüldükten sonra gc!kapat ile destek talebini kapatınız.\n\u200b`,
				inline: false,
			},
			{
				name: "`Destek Komutlar`",
				value: '**gc!ekle** @GC-Bot\n**gc!çıkar** @GC-Bot\n**gc!kapat**',
				inline: true,
			},
			{
				name: "`Açıklama`",
				value: '**»** Destek biletine kullanıcıyı ekler\n**»** Destek biletinden kullanıcıyı çıkarır\n**»** Destek biletini kapatır',
				inline: true,
			},
			{
				name: "\u200b",
				value: "**Kurallar**\nYetkilileri çok acil olmayan durumlarda etiketlemeniz **yasaktır!**\nYetkilileri etiketlemeniz durumunda **Destek Yasağı** cezası alabilirsiniz.\nVerilen desteği oyalamak veya kötüye kullanmak durumunda **Destek Yasağı** cezası alabilirsiniz.",
				inline: false,
			}
		)
		.setFooter( {
			text: 'Developed by xaprier',
			iconURL: interaction.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
		} );


	try {
		await cha?.send( {embeds: [embed], components: [buttons]} );
		await interaction?.reply( {
			content: `<@${interaction.member.id}>, başarıyla bilet oluşturdunuz, kanala gitmek için <#${cha?.id}> tıklayınız.`,
			ephemeral: true
		} );
	} catch ( e ) {
		console.log( e );
	}
}

exports.closeCollector = async ( interaction ) => {
	const embed = new MessageEmbed()
		.setTimestamp()
		.setColor( "ORANGE" )
		.setAuthor( {name: `| Destek`, iconURL: interaction.member?.displayAvatarURL( {dynamic: true} )} )
		.addFields(
			{
				name: "Desteği biletini kapatmak istiyor musunuz?",
				value: `**Evet » Onayla **\n**Hayır » Reddet **`,
				inline: true,
			},
		)
		.setFooter( {
			text: 'Developed by xaprier',
			iconURL: interaction.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
		} );

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
	)
	interaction.reply( {embeds: [embed], components: [buttons], ephemeral: true} );
}

exports.ticketSystemCreate = async ( interaction ) => {
	let embed = new MessageEmbed()
		.setFooter( {
			text: `Developed by xaprier`,
			iconURL: interaction.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
		} ).setTimestamp().setAuthor( {
			name: `• Log`,
			iconURL: interaction.guild.iconURL( {dynamic: true} )
		} ).setColor( "ORANGE" );

	let ticketsCategory = interaction.guild.channels.cache.find( cha => cha.name === config.ticketsCategoryName && cha.type === "GUILD_CATEGORY" );

	let closedCategory = interaction.guild.channels.cache.find( cha => cha.name === config.ticketsClosedCategoryName && cha.type === "GUILD_CATEGORY" );

	let ticketAttendantRole = interaction.guild.roles.cache.find( r => r.id === config.ticketAttendant );

	let ticketBanRole = interaction.guild.roles.cache.find( r => r.id === config.ticketBanRole );

	if ( !ticketsCategory ) {
		try {
			await interaction.guild.channels.create( config.ticketsCategoryName, {
				type: "GUILD_CATEGORY",
				permissionOverwrites: [
					{
						id: interaction.guild.roles.everyone,
						deny: ['VIEW_CHANNEL'],
					},
					{
						// destek yetkilisi
						id: `${config.ticketAttendant}`,
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
					},
				]
			} );
			embed.setDescription( `${config.ticketsCategoryName} bulunamadığından yeni oluşturuldu.` )
			await interaction.guild.channels.cache.get( config.logChannel )?.send( {embeds: [embed]} );
		} catch ( e ) {
			console.log( e );
		}
	}

	if ( !closedCategory ) {
		try {
			await interaction.guild.channels.create( config.ticketsClosedCategoryName, {
				type: "GUILD_CATEGORY",
				permissionOverwrites: [
					{
						id: interaction.guild.roles.everyone,
						deny: ['VIEW_CHANNEL'],
					},
					{
						// destek yetkilisi
						id: `${config.ticketAttendant}`,
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
					},
				]
			} );
			embed.setDescription( `${config.ticketsClosedCategoryName} bulunamadığından yeni oluşturuldu.` )
			await interaction.guild.channels.cache.get( config.logChannel )?.send( {embeds: [embed]} );
		} catch ( e ) {
			console.log( e );
		}
	}

	if ( !ticketAttendantRole ) {
		try {
			let role = await interaction.guild.roles.create( {
				name: `Destek Yetkilisi`,
				color: `BLUE`
			} )
			embed.setDescription( `${config.ticketAttendant} ID ile Destek Yetkilisi bulunamadığından yeni oluşturuldu. Yeni rol <@&${role.id}>` );
			await interaction.guild.channels.cache.get( config.logChannel )?.send( {embeds: [embed]} );
			replaceJSONProperty.replace( `${__dirname}/../../config.json`, `ticketAttendant`, role.id );
		} catch ( e ) {
			console.log( e );
		}
	}

	if ( !ticketBanRole ) {
		try {
			let role = await interaction.guild.roles.create( {
				name: `Destek Yasağı`,
				color: `RED`
			} )
			embed.setDescription( `${config.ticketBanRole} ID ile Destek Yasağı bulunamadığından yeni oluşturuldu. Yeni rol <@&${role.id}>` );
			await interaction.guild.channels.cache.get( config.logChannel )?.send( {embeds: [embed]} );
			replaceJSONProperty.replace( `${__dirname}/../../config.json`, `ticketBanRole`, role.id );
		} catch ( e ) {
			console.log( e );
		}
	}
}