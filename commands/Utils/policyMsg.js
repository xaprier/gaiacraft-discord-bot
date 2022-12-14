const {Message, Client, MessageEmbed} = require( "discord.js" );
const config = require( "../../config.json" )

module.exports = {
	name: "politika",
	aliases: ['policy'],
	permission: [],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 */
	run: async ( client, message ) => {
		const user = message.guild.members.cache.get( message.author.id );
		const policyChannel = message.guild.channels.cache.find( cha => cha.id === `${config.policyChannel}` );
		if ( user.permissions.has( "ADMINISTRATOR" ) ) {
			let embed = new MessageEmbed()
				.setAuthor( {name: `Sorumluluklar`, iconURL: message.guild.iconURL( {dynamic: true} )} )
				.setDescription( `Hesap güvenliği ve eşya kaybı sorumluluğu size aittir. GaiaCraft yalnızca kendi sebep olduğu durumların sorumlusudur.` )
				.setFooter( {
					text: 'Developed by xaprier',
					iconURL: message.guild.members.cache.get( config.developer )?.displayAvatarURL( {dynamic: true} )
				} )
				.setColor( "ORANGE" )
				.setTimestamp();
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `Güvendiğiniz kişilerin sorumluluğu size aittir. GaiaCraft sizlere bunun için tapu/takas/müzayede gibi çeşitli sistemler sunmuştur. Herhangi bir eşya kaybında GaiaCraft sorumlu değildir.` ).author.name = `Güvenilir Sistemler`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `Hesap güvenliği için GaiaCraft sunucusunda başka yerlerde kullanmadığınız şifreler kullanınız. 123456, kullanıcı adınız gibi çeşitli şifreler belirlenen hesaplar kolay şekilde çalınabilir. Hesap çalmalara karşın oto-ban sistemimiz bulunmaktadır. Bu yüzden şifrelerinizi bir yere kaydediniz. Yoksa şifre unutma durumunda hesabınızı kurtaramayabiliriz.` ).author.name = `Hesap Güvenliği`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft sunucusu ticari kullanım amaçlı sunulan bir hizmet değildir. Bu yüzden oyun içi eşyalarınızı, gerçek parayla oyuncuya satmak kalıcı ban sebebidir.` ).author.name = `Ticari Kullanım`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft gerekli durumlarda hesabınıza el koyabilir, silebilir, düzenleyebilir veya kalıcı yasaklayabilir.` ).author.name = `El Koyma Hakkı`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft sunucusuna yaptığınız bağışların geri dönüşü yoktur. Yaptığınız her bağış sunucuya katkıda bulunup aynı zamanda oyunda dilediğiniz ürünü alabilmenizi sağlar. Ürünler sadece GaiaCraft'ın kendi sitesinde satılıp, başka yerde satışı kalıcı yasaklanır.` ).author.name = `Yapılan Bağışlar`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft ekibini oyalayıcı yönde destek talebinde bulunmak 7 gün yasaklanır. Destek ekibi aynı zamanda hile kontrol gibi gerekli görüldüğü durumlarda Alpemix/TeamViewer gibi uygulamalarla bilgisayarınıza erişim sağlayıp kişisel verilerinize dokunmadan kontrol yapma yetkisine sahiptir. Bu kontrolü reddetmek 7 gün yasaklanır.` ).author.name = `Destek Ekibi`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft'ta oynayan her oyuncu bu kuralları ve hizmet politikasını kabul etmiş sayılır. İşlem yapılırken bunları okuduğunuz göz önüne alınır.` ).author.name = `Hizmet Şartları ve Gizlilik Politikası`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft gerekli gördüğü durumlarda bu politikayı ve hizmet koşullarını değiştirme hakkına sahiptir.` ).author.name = `Değiştirme Hakkı`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
			} catch ( e ) {
				console.log( e );
			}

			embed.setDescription( `GaiaCraft yetkili ekibinden olan insanların yetkilerini kötüye kullanımı sonucu yetkisi alınıp sunucudan 7 gün yasaklanır.` ).author.name = `Yetkiyi Kötüye Kullanım`;
			try {
				await policyChannel?.send( {embeds: [embed]} );
				await message?.delete();
			} catch ( e ) {
				console.log( e );
			}

		} else {
			await message.channel?.send( {content: `Politikamız <#${policyChannel.id}> kanalındadır.`} ).then( cha => {
				setTimeout( () => {
					cha?.delete();
					message?.delete();
				}, 15000 );
			} ).catch( ( e ) => console.log( e ) );
		}
	},
};
