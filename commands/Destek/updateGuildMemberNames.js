const {Message, Client} = require( "discord.js" );

module.exports = {
	name: 'rolekle',
	description: '',
	permission: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
    run: async (client, message, args) => {
        message.guild.members.cache.forEach(user => { 
            /* türkçe karakter
            if (user.displayName.split("").some(function (char) {
                return char.charCodeAt(0) > 127 && char.charCodeAt(0) != 214 && char.charCodeAt(0) != 246 && char.charCodeAt(0) != 220 && char.charCodeAt(0) != 252 && char.charCodeAt(0) != 199 && char.charCodeAt(0) != 231 && char.charCodeAt(0) != 286 && char.charCodeAt(0) != 287 && char.charCodeAt(0) != 304 && char.charCodeAt(0) != 305 && char.charCodeAt(0) != 350 && char.charCodeAt(0) != 351;
            })) {
                console.log(user.displayName + " -> " + user.displayName.replace(/[^\x00-\x7F]/g, ""));
            }
            */
        });
	}
}