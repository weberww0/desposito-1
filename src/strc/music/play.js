const ytdl = require("ytdl-core")
const DespositoEmbed = require("../../utils/discord/DespositoEmbed")

module.exports = async function play(player, song) {
    if (!song) return player.stop()
    player.startTimer()

    const dispatcher = await player.manager.connection.play(ytdl(song.url, {filter: "audio"}))
    dispatcher.setVolume(player.manager.volume)
    player.dispatcher.load(dispatcher)

    const embed = new DespositoEmbed()
    .selectPreset("music_play", {song: song})

    player.manager._firstRequest.textChannel.send("Iniciando a reprodução do vídeo:", embed)
  }