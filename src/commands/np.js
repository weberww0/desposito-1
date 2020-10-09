const { MessageEmbed } = require("discord.js");

module.exports = {
    aliase: "np",
    async runHelp (data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        this.execute(data.message, player)
    },

    async execute (message, player) {
        const song = player.queue.songs[0]
        const time = song.timer[0].toString().padStart(2, "0") + ":" + song.timer[1].toString().padStart(2, "0")

        const embed = new MessageEmbed()
        .setAuthor(song.authorName)
        .setColor("#FFFF00")
        .setTitle(song.title)
        .setURL(song.url)
        .setDescription(song.desc)
        .setImage(song.image)
        .setFooter("Duração: " + time + "/" + song.videoDuration)

        message.channel.send("Reproduzindo agora:", embed)
    }
}