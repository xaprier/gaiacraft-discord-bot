const {Client, Message} = require( 'discord.js' );
const config = require( '../../config.json' );
const functions = require( "../Utils/funcs" );


module.exports = {
	name: 'kapat',
	description: 'Destek talebini kapatır',
	permission: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 */
	run: async ( client, message ) => {

		if ( !message.channel.name.includes( `talep-` ) ) {
			const sendMsg = await message.reply( {content: 'Komutu destek talebinizde uygulayınız.'} );
			await functions.deleteMsg( sendMsg, message );
			return;
		}

		if ( !message.channel.name.includes( `talep-${message.author.id}` ) && !message.member.roles.cache.some( role => [`${config.ticketAttendant}`].includes( role.id ) ) && !message.member.permissions.has( "ADMINISTRATOR" ) ) {
			const sendMsg = await message.reply( {content: 'Komutu sadece destek talebinin sahibi veya yetkili kullanabilir.'} );
			await functions.deleteMsg( sendMsg, message );
			return;
		}

		try {
			await functions.closeCollector( message );
		} catch ( e ) {
			console.log( e );
		}

	}
}