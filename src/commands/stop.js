module.exports = {
    aliase: "parar", 
    async runHelp (data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        const authorVoiceChannel = data.message.member.voice.channel
        if (authorVoiceChannel !== player.manager.voiceChannel) return data.message.reply("você não está conectado à chamada.")

        this.execute(data.message, data.message.author, player)
    },

    async execute (message, author, player) {  
        player.stop()
        message.channel.send("A reprodução foi finalizada por **" + author.tag + "**.")
    }
}