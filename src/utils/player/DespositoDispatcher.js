const { STORAGE_POST_POLICY_BASE_URL } = require("@google-cloud/storage/build/src/file")

module.exports = class DespositoDispatcher {
    constructor(player) {
      this.player = player
    }

    run(dispatcher) {
        this.dispatcher = dispatcher

        this.dispatcher.on("error", error => {
          console.log(error)
          this.player.stop()
          return this.player.manager._firstRequest.textChannel.send("Ocorreu algum erro ao tentar reproduzir. Peço desculpas pela incoveniência, se o erro persistir entre em contato com o weslinho.")
        })
    }
}