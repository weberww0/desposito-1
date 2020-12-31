const { Client } = require("discord.js")
module.exports = class DespositoClient extends Client {
	constructor(token) {
		super()

		super.login(token)
		console.log("DespositoClient", "Conectado a aplicação\n")
		this.commands = new Map()
                this.aliases = new Map()
	}

	get ms () {
		return super.ws.ping
	}

	get rssUsage () {
		return Math.round(process.memoryUsage().rss / 1024 / 1024)
	}
}
