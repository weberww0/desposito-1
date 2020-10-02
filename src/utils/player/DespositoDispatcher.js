module.exports = class DespositoDispatcher {
    constructor() {
    }

    run(dispatcher, player, message, desposito) {
        this.dispatcher = dispatcher

        this.dispatcher.on("error", error => {
          console.error(error)
          player.stop(desposito)
          return message.channel.send("Ocorreu algum erro ao tentar reproduzir. Peço desculpas pela incoveniência, se o erro persistir entre em contato com o weslinho.")
        })
    }
}