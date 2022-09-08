// noinspection JSCheckFunctionSignatures

const client = require( "../index" );
const config = require( "../config.json" );
const {MessageEmbed} = require( "discord.js" );

client.on( "guildMemberAdd", async ( interaction ) => {
	const member = interaction.guild.members.cache.get( interaction.user.id );

	let embed = new MessageEmbed()
		.setTimestamp()
		.setColor( "ORANGE" )
		.setAuthor( {name: `| Hoşgeldiniz`, iconURL: member.displayAvatarURL( {dynamic: true} )} )
		.setDescription( `GaiaCraft Minecraft sunucumuzun Discord sunucusuna hoşgeldiniz. Lütfen aşağıdaki bilgileri okuyunuz.` )
		.addFields(
			{
				name: `Bağlantı`,
				value: `Sunucumuz her ay üye temizliğine gitmektedir, Discord hesabı ile Minecraft hesabı bağlı olmayan üyeler atılacaktır. Lütfen Minecraft'tan **/dceşle** komutu ile Discord hesabınızı Minecraft hesabınız ile bağlayınız.`
			},
			{
				name: `Kurallar ve Politikamız`,
				value: `Kurallarımız ve Politikamız üye okumamış olsa bile okumuş kabul edilir ve ona göre davranılır. Lütfen okumadan geçmeyiniz`
			},
			{
				name: "\0200b",
				value: `İyi oyunlar dileriz`
			}
		)
		.setFooter( {
			text: 'Developed by xaprier',
			iconURL: interaction.guild.members.cache.get( config.developer ).displayAvatarURL( {dynamic: true} )
		} );

	try {
		await member.send( {embeds: [embed]} );
	} catch ( e ) {
		console.log( `${member} üyesine giriş mesajı gönderilemedi` );
	}
} )