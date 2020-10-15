module.exports = (player, desposito) => {
    player.dispatcher.dispatcher.destroy()
    player.manager.voiceChannel.leave()
    player.guild.player = null
    desposito.players.delete(player.guild.id)

    return true
}