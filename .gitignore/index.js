const Discord = require("discord.js");
const { fstat } = require("fs");
const { send, listeners } = require("process");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const Token = require("./Token.json")
client.login(Token.token);
const prefix = "b.";


client.on('ready', () => {
    console.log("[+] Connecté avec succès")
    client.user.setStatus("online");
    client.user.setActivity("b.help", {type: 1});
})


client.on('message', message => {
    if(!message.guild || message.author.bot) return;
    if(message.content.toLowerCase() == "b.bvn"){
        message.channel.send('https://tenor.com/view/welcome-confetti-celebrate-gif-9322070');
        console.log("[cmd] b.bvn");
    }
})

client.on('message', message => {
            if(message.content.toLowerCase() == "b.invite"){
                message.channel.send("https://discord.com/oauth2/authorize?client_id=624953758543118346&scope=bot&permissions=8");
                console.log("[cmd] b.invite");
    }
})

client.on("message", async message => {
    if(message.content.startsWith(prefix + "play")){
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            let args = message.content.split(" ");
            let lien = args[1];
            message.delete();
            console.log("[cmd] b.play " + (lien));
            if(!lien.startsWith("https://www.youtube.com/watch?v=")) return message.channel.send('Lien invalide !!!');
            dispatcher = connection.play(ytdl(lien, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 }));
            dispatcher.setVolume(1);
            conn = connection;
            const ori = {
                color: 0x47b2f8,
                thumbnail: {
                url: client.user.displayAvatarURL(),
                },
                description: `ON ECOUTE une musique de Youtube.\n${lien}`,
                footer: {
                text: "Volume réglé à  : 100%",
                icon_url: client.user.displayAvatarURL(),
                },
                timestamp: new Date(),
            };
            message.channel.send({embed: ori});
        
            dispatcher.on('finish', () => {
                dispatcher.destroy();
                connection.disconnect();
            });
        };
    }
    else if(message.content === prefix + "stop"){
        message.delete();
        const stop = {
        color: 0x47b2f8,
        description: `Musique\nArrêter`
        };
        message.channel.send({embed: stop});
            dispatcher.destroy();
            conn.disconnect();
            console.log("[cmd] b.stop")
    }
    else if(message.content === prefix + "v100"){
        message.delete();
        volume = 1; 
        console.log('Volume de sortie : 100%');
        dispatcher.setVolume(1);
        const avol = {
          color: 0x47b2f8,
          description: `volume à 100% appliqué !`,
        };
        message.channel.send({embed: avol});
        console.log("[cmd] b.v100");
    }

});


client.on('message', message => {
    if(message.content.toLowerCase() == "b.help"){
        message.channel.send("**Voici Les Commandes**\nb.bvn : dire Bienvenue\nb.invite : inviter le Bot sur un Serveur (Fonctionne aussi en MP)\n\n**Musique**\nb.play : Lire une musique (il faut mettre un lien youtube\nb.stop : Araiter la Musique");
        console.log("[cmd] b.help")
    }
});
