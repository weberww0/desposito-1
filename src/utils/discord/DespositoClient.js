const { Client } = require("discord.js")
const messageLocales = require("../../../messages/messages.js")
module.exports = class DespositoClient extends Client {
	constructor(token) {
		super()
		super.login(token)
                
		this.acess = ["748320609746026607", "451920956768649226"]
		this.commands = new Map()
                this.aliases = new Map()
	}

        messages (ind, pam) {
            const msg = messageLocales(ind, pam)
console.log(msg)
            return msg
        }

	get rssUsage () {
		return Math.round(process.memoryUsage().rss / 1024 / 1024)
	}
}
