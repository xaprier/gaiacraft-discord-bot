const client = require( "../index" );
const {MessageEmbed} = require( `discord.js` );

client.on( "messageCreate", async ( message ) => {
    if (message.author.bot || !message.guild)
        return
    
    if (!message.channel.name.includes("kayıt")) return

    var username = message.content.split(" ")[0];
    if (username.split("").some(
        function (char) {
            return char.charCodeAt(0) > 127 && char.charCodeAt(0) != 214 && char.charCodeAt(0) != 246 && char.charCodeAt(0) != 220 && char.charCodeAt(0) != 252 && char.charCodeAt(0) != 199 && char.charCodeAt(0) != 231 && char.charCodeAt(0) != 286 && char.charCodeAt(0) != 287 && char.charCodeAt(0) != 304 && char.charCodeAt(0) != 305 && char.charCodeAt(0) != 350 && char.charCodeAt(0) != 351;
        })) {
        
    }
});
