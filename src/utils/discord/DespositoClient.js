const { Client } = require("discord.js")
const messageLocales = require("../../../messages/messages.js")
module.exports = class DespositoClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
                this.messages = await messageLocales
		this.acess = ["748320609746026607", "451920956768649226"]
		this.commands = new Map()
                this.aliases = new Map()
	}

	get rssUsage () {
		return Math.round(process.memoryUsage().rss / 1024 / 1024)
	}
}
