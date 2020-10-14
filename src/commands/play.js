const DespositoPlayer = require("../utils/player/DespositoPlayer")
const VideoSearch = require("../strc/music/search")
const request = require("request")
const duration = require('youtube-duration')

module.exports = {
    aliase: "p",
    async runHelp (data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        const voiceChannel = data.message.member.voice.channel

        if(!voiceChannel) return data.message.reply("você não está conectado em nenhuma chamada.")
        if(!voiceChannel.permissionsFor(data.message.guild.me).has(["CONNECT", "SPEAK"])) return data.message.reply("eu não posso conectar ou falar nesse canal.")
        if(player && player.manager.voiceChannel && data.message.member.voice.channel !== player.manager.voiceChannel) return data.message.reply("você não está conectado na mesma chamada que eu.")
        if(!data.message.arguments[0]) return message.reply("insira a pesquisa ou o URL do vídeo no youtube.")

        const query = data.message.arguments.join(" ")
        this.execute(desposito, data.message, query, player, voiceChannel)
    },

    async execute (desposito, message, query, player, voiceChannel) {
        const video = await VideoSearch(query, message.author)
        if(video === "not results") return message.reply("não encontrei nenhum vídeo com esse título ou URL.")

        request("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+ video.videoID +"&key=" + process.env.YOUTUBE_KEY, async (err, res, body) => {
            const time = JSON.parse(body).items[0].contentDetails.duration
            video.videoDuration = duration.format(time)
            if(parseInt(video.videoDuration.substring(video.videoDuration.length, video.videoDuration.length - 5).substring(0, 2)) > 10) return message.reply("o vídeo é muito grande.")
      
            if (!player) {
                const connect = await voiceChannel.join()
                const Player = new DespositoPlayer(desposito, {
                    guild: message.guild,
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: connect,
                    firstRequester: message.author
                }, video)
      
                desposito.players.set(message.guild.id, Player)
                Player.play(Player, Player.queue.songs[0])
            } else {
                player.queue.songs.push(video)
                message.channel.send("`" + video.title + "` por **" + video.authorName + "** adicionado a fila.")
            }
        })
    }
}