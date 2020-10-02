const ytdl = require("ytdl-core")
const DespositoEmbed = require("../../utils/discord/DespositoEmbed")

module.exports = async function play(message, song, desposito, volume) {
    const guild = message.guild
    const player =  desposito.players.get(guild.id)

    if (!song) return player.stop(desposito)


    let number = ["0", "00"]
    const timer = setInterval(() => {
        if(parseInt(number[1]) < 9) {
            number[1] = (parseInt(number[1]) + 1).toString()
            number[1] = "0" + number[1]
        } else {
            number[1] = (parseInt(number[1]) + 1).toString()
        }
        if(parseInt(number[1]) === 60) {
            number[0] = (parseInt(number[0]) + 1).toString()
            number[1] = "00"
        }
          song.timer = number
    }, 1000)

      const dispatcher = await player.connection.play(ytdl(song.url, {filter: "audio"}))
      .on("finish", () => {
        require("../music/events/finish")(player, message, desposito)
        clearInterval(timer)
       })

      dispatcher.setVolume(volume)
      player.dispatcher.run(dispatcher, player, message, desposito)

    const embed = new DespositoEmbed(message)
    .setAuthor(song.authorName)
    .setColor("#00BFFF")
    .setTitle(song.title)
    .setURL(song.url)
    .setDescription(song.desc)
    .setImage(song.image)
    .setFooter("Duração: " + song.videoDuration)

    player.textChannel.send("<a:carregando:702932052160282644> Iniciando a reprodução do vídeo:", embed)
  }
