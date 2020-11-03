const DespositoEmbed = require("../utils/discord/DespositoEmbed")

module.exports = {
    aliase: "np",
    async runHelp (data, desposito) {
        const player = data.message.guild.player
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        this.execute(data.message, player)
    },

    async execute (message, player) {
        const song = player.queue.songs[0]
        const time = player.manager.timer[0].toString().padStart(2, "0") + ":" + player.manager.timer[1].toString().padStart(2, "0")

        const embed = new DespositoEmbed(message)
        .selectPreset("music_np", {song: song})
        .setFooter("Duração: " + time + "/" + song.videoDuration)

        message.channel.send("Reproduzindo agora:", embed)
    }
}