module.exports = (player, desposito) => {
    player.dispatcher.dispatcher.destroy()
    player.manager.voiceChannel.leave()
    desposito.players.delete(player.guild.id)

    return true
}