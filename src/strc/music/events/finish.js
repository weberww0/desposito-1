module.exports = (player, message, desposito) => {
    if(player.voiceChannel.members.filter(m => !m.user.bot).size === 0) {
        player.stop(desposito)
        return message.channel.send("<:aviso2:643592353264828416> Como ninguém estava conectado na chamada, eu finalizei a reprodução.")
    }

    player.queue.songs.shift()
    console.log(player.queue.songs)
    player.play(message, player.queue.songs[0], desposito)
}