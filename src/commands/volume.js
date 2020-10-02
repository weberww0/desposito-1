module.exports = {
    aliase: "vol",
    async runHelp (data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        const authorVoiceChannel = data.message.member.voice.channel
        if (authorVoiceChannel != player.voiceChannel) return data.message.reply("você não está conectado à chamada.")

        if(data.message.arguments[1] || !data.message.arguments[0]) return data.message.reply("utilize o comando corretamente.")
        if(isNaN(data.message.arguments[0] && data.message.arguments[0].toLowerCase() !== "bassbost")) return data.message.reply("utilize o comando corretamente.")

        this.execute(data.message, player, data.message.arguments[0])
    },

    async execute (message, player, volume) {
        let vol
        if(isNaN(volume)) {
            vol = 20
        } else {
            vol = Math.floor(parseInt(volume))
            if(vol < 1 || vol > 9) return message.reply("esse volume é inválido.")
        }

        if(player.queue.songs[0].author.id !== message.author.id) return message.reply("o vídeo que está sendo reproduzido agora não foi requisitado por você, então você não pode alterar o volume.")
        player.dispatcher.dispatcher.setVolume(vol/10)
        message.reply("volume alterado para **" + volume + "**.")
    }
}