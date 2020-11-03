module.exports = {
    aliase: "parar", 
    runHelp (data, desposito) {
        const player = data.message.guild.player

        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")
        if (data.message.member.voice.channel !== player.manager.voiceChannel) return data.message.reply("você não está conectado à chamada.")

        this.execute(data.message, data.message.author, player)
    },

    execute (message, author, player) {  
        player.stop()
        message.channel.send("A reprodução foi finalizada por **" + author.tag + "**.")
    }
}