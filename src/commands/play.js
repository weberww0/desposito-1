const DespositoPlayer = require("../utils/player/DespositoPlayer")
const request = require("request")
const duration = require('youtube-duration')

module.exports = {
    aliase: "p",
    async runHelp (data, desposito) {
        const voiceChannel = data.message.member.voice.channel
        let player = desposito.players.get(data.message.guild.id)

        if(!player) {
            const connect = await voiceChannel.join()
            player = new DespositoPlayer(desposito, {
                guild: data.message.guild,
                textChannel: data.message.channel,
                voiceChannel: voiceChannel,
                connection: connect,
                firstRequester: data.message.author
            })

            desposito.players.set(data.message.guild.id, player)
        }

        if(!voiceChannel) return data.message.reply("você não está conectado em nenhuma chamada.")
        if(!voiceChannel.permissionsFor(data.message.guild.me).has(["CONNECT", "SPEAK"])) return data.message.reply("eu não posso conectar ou falar nesse canal.")
        if(player && player.manager.voiceChannel && data.message.member.voice.channel !== player.manager.voiceChannel) return data.message.reply("você não está conectado na mesma chamada que eu.")
        if(!data.message.arguments[0]) return message.reply("insira a pesquisa ou o URL do vídeo no youtube.")

        const query = data.message.arguments.join(" ")
        this.execute(desposito, data.message, query, player)
    },

    async execute (desposito, message, query, player) {
        const video = await player.search(query, message.author)
        if(video === "not results") return message.reply("não encontrei nenhum vídeo com esse título ou URL.")
      
        request("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+ video.videoID +"&key=" + process.env.YOUTUBE_KEY, async (err, res, body) => {
            const time = JSON.parse(body).items[0].contentDetails.duration
            video.videoDuration = duration.format(time)
            if(parseInt(video.videoDuration.substring(video.videoDuration.length, video.videoDuration.length - 5).substring(0, 2)) > 10) return message.reply("o vídeo é muito grande.")
      
            message.guild.player = player
            if (!player.queue.songs[0]) {
                player.queue.songs.push(video)
                player.play(player, player.queue.songs[0])
            } else {
                player.queue.songs.push(video)
                message.channel.send("`" + video.title + "` por **" + video.authorName + "** adicionado a fila.")
            }
        })
    }
}