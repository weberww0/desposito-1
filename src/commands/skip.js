const { MessageEmbed } = require("discord.js");

module.exports = {

    aliase: "pular",
    async runHelp (data, desposito) {
        const player = desposito.players.get(data.message.guild.id)
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        const authorVoiceChannel = data.message.member.voice.channel
        if (authorVoiceChannel != player.voiceChannel) return data.message.reply("você não está conectado à chamada.")

        this.execute(desposito, data.message, player)
    },

    async execute (desposito, message, player) {
        if(player.queue.songs[0].author.id === message.author.id) {
            message.channel.send("O video `" + player.queue.songs[0].title + "` foi pulado por quem requisitou a reprodução do mesmo.")
            player.queue.songs.shift()
            return player.play(message, player.queue.songs[0], desposito)
        }
        
        const totalmembers = authorVoiceChannel.members.filter(m => !m.user.bot)
        const msg = await message.channel.send("Todos estão de acordo? Pelo menos metade dos membros conectados ao canal de voz devem reagir. Vocês devem reagir em **30 segundos**.")
        
        msg.react("643607673517899797")
        const filter = (r, u) => r.emoji.id === "643607673517899797"
        const collector = msg.createReactionCollector(filter, {time: 30000})

        collector.on("collect", (r, u) => {

            if(!totalmembers.map(m => m.id).includes(u.id)) {
                if(u.id === desposito.user.id) return
                r.users.remove(u.id)
            }

            if(r.count - 1 > Math.floor(totalmembers.size / 2)) {
                const tojumpembed = new MessageEmbed()
                .setColor("#32CD32")
                .setDescription("Usuários que reagiram a favor de pular:\n" + totalmembers.map(m => m.user).join("\n"))
                message.channel.send("<:aceito:643607673517899797> O video `" + player.queue.songs[0].title + "` foi pulado!", tojumpembed)
                
                player.queue.songs.shift()
                player.play(message, player.queue.songs[0], desposito)
                collector.stop()
            }
        })

        collector.on("end", collected => {
            msg.delete()
            message.delete()
        })
    }
    
}