const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is ready to go!`);
    client.user.setActivity("Yardım için gc!yardım", {type: "LISTENING"})
});