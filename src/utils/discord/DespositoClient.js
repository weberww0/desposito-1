const { Client } = require("discord.js")
module.exports = class DespositoClient extends Client {
	constructor(token) {
		super()

		super.login(token)
		console.log("DespositoClient", "Conectado a aplicação\n")
		this.players = new Map()
		this.commands = new Map()
        this.aliases = new Map()
	}
}