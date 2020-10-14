module.exports = (player) => {
    if(player.manager.voiceChannel.members.filter(m => !m.user.bot).size === 0) {
        player.stop()
        return player.manager._firstRequest.textChannel.send("Como ninguém estava conectado na chamada, eu finalizei a reprodução.")
    }

    player.skip()
}