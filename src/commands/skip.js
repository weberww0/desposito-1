const DespositoEmbed = require("../utils/discord/DespositoEmbed")

module.exports = {
    aliase: "pular",

    async runHelp (data, desposito) {
        const player = data.message.guild.player
        if(!player) return data.message.reply("não estou reproduzindo nenhum video.")

        if (data.message.member.voice.channel != player.manager.voiceChannel) return data.message.reply("você não está conectado à chamada.")

        this.execute(desposito, data.message, player)
    },

    async execute (desposito, message, player) {
        if(player.queue.songs[0].author.id === message.author.id) {
            message.channel.send("O video `" + player.queue.songs[0].title + "` foi pulado por quem requisitou a reprodução do mesmo.")
            return player.skip()
        }
        
        const totalmembers = message.member.voice.channel.members.filter(m => !m.user.bot)
        const msg = await message.channel.send("Todos estão de acordo? Pelo menos metade dos membros conectados ao canal de voz devem reagir. Vocês devem reagir em **30 segundos**.")
        
        msg.react("643607673517899797")
        const nowSong = player.queue.songs[0].url

        const filter = (r, u) => r.emoji.id === "643607673517899797"
        const collector = msg.createReactionCollector(filter, {time: 30000})

        collector.on("collect", (r, u) => {
            if(player.queue.songs[0].url !== nowSong) return collector.stop()
            
            if(!totalmembers.map(m => m.id).includes(u.id)) {
                if(u.id === desposito.user.id) return
                r.users.remove(u.id)
            }

            if(r.count - 1 > Math.floor(totalmembers.size / 2)) {
                collector.stop()
                const tojumpembed = new DespositoEmbed(message)
                .selectPreset("skip", {members: totalmembers})

                message.channel.send("O video `" + player.queue.songs[0].title + "` foi pulado! Esses foram os membros que reagiram a favor de pular:", tojumpembed)      
                player.skip()
            }
        })

        collector.on("end", collected => {
            msg.delete()
            message.delete()
        })
    }
}