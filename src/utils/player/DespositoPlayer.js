const Play = require("../../strc/music/play")
const Stop = require("../../strc/music/util/stop")
const Dispatcher = require("./DespositoDispatcher")
const Manager = require("./DespositoManager")

class DespositoPlayer {
    constructor(desposito, message, conn) {
        this.dispatcher = new Dispatcher(this)
        this.manager = new Manager()

        this.desposito = desposito
        this.guild = message.guild
        this.guild.player = this
        this.queue = {}
        this.queue.songs = []
        
        this.manager.connection = conn
        this.manager.voiceChannel = message.member.voice.channel
        this.manager._firstRequest.user = message.author
        this.manager._firstRequest.textChannel = message.channel
        this.manager.volume = 0.4
        this.manager.timer = null

        this.desposito.players.set(this.guild.id, this)
    }

    static find (dp, id) {
        return dp.players.get(id)
    }

    play () {
        Play(this, this.queue.songs[0])
    }

    stop () {
        Stop(this, this.desposito)
    }

    skip () {
        this.stopTimer()
        this.queue.songs.shift()
        this.play()
    }

    startTimer () {
        const number = [0, 0]
        this.timer = setInterval(() => {
            number[1]++
            if(number[1] === 60) {
                number[0]++
                number[1] = 0
            }
      
            this.manager.timer = number
        }, 1000)
    }

    stopTimer () {
        clearInterval(this.timer)
        this.manager.timer = null
    }

    async search (argument, user) {
        const search = require("../../strc/music/search")
        const result =  await search(argument, user)

        return result
    }

    simplePermissionsVerify (message) {
        if(!message.member.voice.channel) return message.reply("você não está conectado em nenhuma chamada.")
        if(!message.member.voice.channel.permissionsFor(message.guild.me).has(["CONNECT", "SPEAK"])) return message.reply("eu não posso conectar ou falar nesse canal.")
        if(message.guild.player && message.guild.player.manager.voiceChannel && message.member.voice.channel !== message.guild.player.manager.voiceChannel) return message.reply("você não está conectado na mesma chamada que eu.")
    }
}

module.exports = DespositoPlayer