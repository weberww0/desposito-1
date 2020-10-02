const { Client } = require("discord.js")
module.exports = class DespositoClient extends Client {
	constructor() {
		super()
	}

	connect(token) {
		super.login(token)
	}
}