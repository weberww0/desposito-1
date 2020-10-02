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
        if(player && player.voiceChannel && data.message.member.voice.channel !== player.voiceChannel) return data.message.reply("você não está conectado na mesma chamada que eu.")
        if(!data.message.arguments[0]) return message.reply("insira a pesquisa ou o URL do vídeo no youtube.")

        const query = data.message.arguments.join(" ")
        this.execute(desposito, data.message, query, player, voiceChannel)
    },

    async execute (desposito, message, query, player, voiceChannel) {
        const video = await VideoSearch(query, message.author)
        console.log(video)
        if(video === "not results") return message.reply("não encontrei nenhum vídeo com esse título ou URL.")
        request("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+ video.videoID +"&key=AIzaSyC5NWUTqGTdCNl7yPvoAWrOomhr0FdsO40", async (err, res, body) => {
            const time = JSON.parse(body).items[0].contentDetails.duration
            video.videoDuration = duration.format(time)
            if(parseInt(video.videoDuration.substring(video.videoDuration.length, video.videoDuration.length - 5).substring(0, 2)) > 10) return message.reply("o vídeo é muito grande.")
        
            if(video === "more 10 minutes") return message.reply("o vídeo tem mais de 10 minutos, sendo assim, não é possível reproduzir.")
      
            if (!player) {
                const connect = await voiceChannel.join()
                const Player = new DespositoPlayer({
                    guild: message.guild,
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: connect,
                    queue: {},
                    firstRequester: message.author
                }, video)
      
                desposito.players.set(message.guild.id, Player)
                Player.play(message, Player.queue.songs[0], desposito, 0.4)
            } else {
                player.queue.songs.push(video)
                message.channel.send("`" + video.title + "` por **" + video.authorName + "** adicionado a fila.")
            }
        })
    }
}