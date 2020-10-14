const Play = require("../../strc/music/play")
const Stop = require("../../strc/music/util/stop")
const Dispatcher = require("./DespositoDispatcher")
const Manager = require("./DespositoManager")

class DespositoPlayer {
    constructor(desposito, obj, song) {
        this.desposito = desposito
        this.guild = obj.guild

        this.manager = new Manager()
        this.manager.voiceChannel = obj.voiceChannel
        this.manager.connection = obj.connection
        this.manager._firstRequest.user = obj.firstRequester
        this.manager._firstRequest.textChannel = obj.textChannel
        this.manager.volume = 0.4

        this.dispatcher = new Dispatcher(this)

        this.queue = {}
        this.queue.songs = []
        this.queue.songs.push(song)

        this.manager.timer = null
    }

    play(player, song) {
        Play(player, song)
    }

    stop() {
        Stop(this, this.desposito)
    }

    skip() {
        this.stopTimer()
        this.queue.songs.shift()
        this.play(this, this.queue.songs[0])
    }

    setDispatcher(dispatcher) {
        this.dispatcher = dispatcher
    }

    startTimer() {
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

    stopTimer() {
        clearInterval(this.timer)
        this.manager.timer = null
    }
}

module.exports = DespositoPlayer