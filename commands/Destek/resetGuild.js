const {Message, Client} = require( "discord.js" );

module.exports = {
	name: 'sifirla',
	description: '',
	permission: [],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
    run: async (client, message, args) => {
        console.log("Kanallar siliniyor");
        for (var channel of message.guild.channels.cache) {
            try {
                console.log(channel[1].name)
                if (channel[1].deletable())
                    channel[1].delete();
            } catch (e) {
                console.log("Kanal silinemedi: " + channel[1].name);
            }
            
        }

        console.log("Roller siliniyor");
        for (var role of message.guild.roles.cache) {
            try {
                console.log(role[1].name)
                if (role[1].deletable())
                    role[1].delete("Sunucu sıfırlandı.");
            } catch (e) {
                console.log("Rol silinemedi: " + role[1].name);
            }
        }
	}
}