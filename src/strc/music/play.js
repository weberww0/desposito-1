const ytdl = require("ytdl-core")
const DespositoEmbed = require("../../utils/discord/DespositoEmbed")

module.exports = async function play(player, song) {
    if (!song) return player.stop()
    player.startTimer()

    const dispatcher = await player.manager.connection.play(ytdl(song.url, {filter: "audio"}))
    .on("finish", () => {
        require("../music/events/finish")(player)
    })

    dispatcher.setVolume(player.manager.volume)
    player.dispatcher.run(dispatcher)

    const embed = new DespositoEmbed()
    .selectPreset("music_play", {song: song})

    player.manager._firstRequest.textChannel.send("<a:carregando:702932052160282644> Iniciando a reprodução do vídeo:", embed)
  }