const DespositoPlayer = require("../utils/player/DespositoPlayer")

module.exports = {
    aliase: "p",
    async runHelp (data, desposito) {
        const voiceChannel = data.message.member.voice.channel
        let player = DespositoPlayer.find(desposito, data.message.guild.id)

        if(!voiceChannel) return data.message.reply("você não está conectado em nenhuma chamada.")
        if(!voiceChannel.permissionsFor(data.message.guild.me).has(["CONNECT", "SPEAK"])) return data.message.reply("eu não posso conectar ou falar nesse canal.")
        if(player && player.manager.voiceChannel && data.message.member.voice.channel !== player.manager.voiceChannel) return data.message.reply("você não está conectado na mesma chamada que eu.")
        if(!data.message.arguments[0]) return message.reply("insira a pesquisa ou o URL do vídeo no youtube.")

        if(!player) player = await new DespositoPlayer(desposito, data.message)

        const query = data.message.arguments.join(" ")
        this.execute(data.message, query, player)
    },

    async execute (message, query, player) {
        const video = await player.search(query, message)
        if(video.time === "max") return message.reply("O vídeo é demasiado grande.")

        console.log(player)
        player.queue.songs.push(video)
        !Boolean(player.queue.songs[1]) ? player.play() : message.channel.send("`" + video.title + "` por **" + video.authorName + "** adicionado a fila.")
    }
}