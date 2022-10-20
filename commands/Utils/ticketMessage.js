const {Message, Client, MessageEmbed, MessageActionRow, MessageButton} = require( "discord.js" );
const config = require( "../../config.json" )
module.exports = {
	name: "destek-tepki", aliases: ['ticket-reaction', 'tr-message'], permission: [], /**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 */
	run: async ( client, message ) => {
		const user = message.guild.members.cache.get( message.author.id );
		const ticketChannel = message.guild.channels.cache.find( cha => cha.id === `${config.ticketChannel}` );
		if ( user.permissions.has( "ADMINISTRATOR" ) ) {
			const embed = new MessageEmbed()
				.setAuthor( {name: `• Destek`, iconURL: message.guild.iconURL( {dynamic: true} )} )
				.setColor( "ORANGE" )
				.setFooter( {
					text: 'Developed by xaprier',
					iconURL: message.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
				} )
				.setDescription( `Destek talebi oluşturmak için butona tıklayınız` );
			// noinspection JSCheckFunctionSignatures
			const buttons = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId( "destek-oluştur" )
					.setLabel( "📩 Talep Oluştur" )
					.setStyle( "SUCCESS" )
			);
			await ticketChannel?.send( {embeds: [embed], components: [buttons]} );
		} else {
			message?.reply( {content: `Bunun için yeterli izniniz yok. Talep açmak için <#${config.ticketChannel}>`} ).then( msg => {
				setTimeout( () => {
					msg?.delete();
					message?.delete();
				}, 10000 );
			} ).catch( ( e ) => console.log( e ) );
		}
	},
};
