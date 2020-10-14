module.exports = {
    runHelp(data, desposito) {
        if(!data.message.arguments[1]) return data.message.reply("insira os ids.")

        const voiceChannel1 = desposito.channels.cache.get(data.message.arguments[0])
        const voiceChannel2 = desposito.channels.cache.get(data.message.arguments[1])
        if(!voiceChannel1 || !voiceChannel2) return data.message.reply("canais inválidos.")

        this.execute(voiceChannel1, voiceChannel2, data.message)
            
    },

    async execute(vc1, vc2, msg) {
        const connection1 = await vc1.join()
        const connection2 = await vc2.join()

        const message = await msg.channel.send(vc1.name + " & " + vc2.name + " conectados.\n")
        
        connection1.on('speaking', (user, speaking) => {
            const receiver = connection1.receiver.createStream(user.id)
            connection2.play(receiver, { type: 'opus' })

            message.edit(message.content + "\n" + user.tag + " está falando.")
            receiver.on('end', () => {
                message.edit(message.replace("\n" + user.tag + " está falando.", ""))
            })
        })
    }
}