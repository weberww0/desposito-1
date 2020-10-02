const dc = require("discord.js")

module.exports = class DespositoEmbed extends dc.MessageEmbed {
    constructor(message) {
        super()
        this.messageReference = message
        this.setColor(process.env.NATIVE_COLOR)
    }

    selectPreset(p) {
        switch (p) {
            case 1:
                this.setFooter(this.messageReference.author.tag, this.messageReference.author.displayAvatarURL())
                this.setTimestamp()
                return this
            break

            case 2:
                this.setThumbnail(this.messageReference.author.displayAvatarURL())
                return this
            break

            case "sugestion":
                this.setThumbnail("https://imgur.com/95Ltqwf.png")
                return this
        }
    }
}
