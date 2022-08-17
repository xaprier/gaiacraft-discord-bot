const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is ready to go!`);
    client.user.setActivity("Yardım için gc!yardım", {type: "LISTENING"});
    // added activity caller every 5 minutes for not closing
    setInterval(() => {
        client.user.setActivity("Yardım için gc!yardım", {type: "LISTENING"})
    }, 300000);
});