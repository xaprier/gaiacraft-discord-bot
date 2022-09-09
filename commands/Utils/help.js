// noinspection JSCheckFunctionSignatures

const {Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu} = require( "discord.js" );
const config = require( "../../config.json" )

module.exports = {
	name: `yardım`,
	aliases: [`help`],
	permission: [],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 */
	run: async ( client, message ) => {
		const emojis = {
			utility: `⚙️`,
			ticket: `📩`,
		}
		const commandChannel = message.guild.channels.cache.get( `${config.onlyCommands}` );
		let embed = new MessageEmbed().setFooter( {
			text: `Developed by XAPRIER`,
			iconURL: message.guild.members.cache.get( config.developer ).displayAvatarURL( {dynamic: true} )
		} ).setTimestamp().setAuthor( {
			name: ``,
			iconURL: message.guild.iconURL( {dynamic: true} )
		} ).setColor( "ORANGE" );
		if ( message.channel.id === commandChannel.id ) {
			const directories = [...new Set( client.commands.map( cmd => cmd.directory ) )];

			const formatString = ( str ) => `${str[0].toUpperCase()}${str.slice( 1 ).toLowerCase()}`;

			const categories = directories.map( dir => {
				const getCmds = client.commands.filter( cmd => cmd.directory === dir ).map( cmd => {
					return {
						name: cmd.name || "İsim yok",
						description: cmd.description || "Açıklama yok",
					}
				} );

				return {
					directory: formatString( dir ),
					commands: getCmds,
				};
			} );

			embed.setDescription( `Kategori seçiniz` );

			const components = ( state ) => [
				new MessageActionRow().addComponents(
					new MessageSelectMenu()
						.setCustomId( `help-menu` )
						.setPlaceholder( `Kategori seçiniz` )
						.setDisabled( state )
						.addOptions(
							categories.map( cmd => {
								return {
									label: cmd.directory,
									value: cmd.directory.toLowerCase(),
									description: `${cmd.directory} kategorisindeki komutlar`,
									emoji: emojis[cmd.directory.toLowerCase()] || null,
								};
							} )
						)
				)
			];

			const initMessage = await message.channel?.send( {embeds: [embed], components: components( false )} );

			const filter = ( interaction ) => interaction.user.id === message.author.id;

			const collector = message.channel.createMessageComponentCollector( {
				filter,
				componentType: 'SELECT_MENU',
				time: 30000
			} );

			collector.on( 'collect', ( interaction ) => {
				const [directory] = interaction.values;
				const category = categories.find( x => x.directory.toLowerCase() === directory );

				const categoryEmbed = new MessageEmbed()
					.setTitle( `${directory} komutları` ).setDescription( `Komutlarımız` ).addFields(
						category.commands.map( cmd => {
							return {
								name: `\`${cmd.name}\``,
								value: cmd.description,
								inline: true,
							}
						} )
					).setColor( "ORANGE" ).setAuthor( {name: ``, iconURL: message.guild.iconURL( {dynamic: true} )} );
				interaction?.update( {embeds: [categoryEmbed]} );
			} );

			collector.on( `end`, () => {
				initMessage.edit( {components: components( true )} );
			} );

		} else {
			embed.setDescription( `Komutu <#${config.onlyCommands}> kanalında kullanınız` ).author.name = `• Hata`;
			await message.channel?.send( {embeds: [embed]} ).then( msg => {
				setTimeout( () => {
					msg?.delete();
					message?.delete();
				}, 5000 );
			} )
		}
	}
}