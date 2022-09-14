const client = require( "../index" );

client.on( "ready", () => {
	console.log( `${client.user.tag} çalışmaya hazır!` );
	client.user.setActivity( "Yardım için gc!yardım", {type: "LISTENING"} );
	// added activity caller every 5 minutes for keeping awake
	setInterval( () => {
		client.user.setActivity( "Yardım için gc!yardım", {type: "LISTENING"} )
	}, 300000 );
} );