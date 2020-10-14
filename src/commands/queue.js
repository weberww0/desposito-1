const DespositoEmbed = require("../utils/discord/DespositoEmbed")

module.exports = {
    aliase: "fila",
    async runHelp(data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        this.execute(player, data.message)
    },

    async execute (player, message) {     
        let description = ""
        let number = 1

        for (let song of player.queue.songs) {
            description += "**" + String(number) + ".** " + song.title + " por `" + song.authorName + "`\n"
            number++
        }

        const embed = new DespositoEmbed(message)
        .selectPreset("queue")
        .setDescription(description)

        message.channel.send(embed)
    }
}