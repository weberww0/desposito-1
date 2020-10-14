const dc = require("discord.js")

module.exports = class DespositoEmbed extends dc.MessageEmbed {
    constructor(message = null) {
        super()
        this.messageReference = message
        this.setColor(process.env.NATIVE_COLOR)
    }

    selectPreset(p, options = {}) {
        switch (p) {
            case "music_play":
                this
                .setAuthor(options.song.authorName)
                .setColor("#00BFFF")
                .setTitle(options.song.title)
                .setURL(options.song.url)
                .setDescription(options.song.desc)
                .setImage(options.song.image)
                .setFooter("Duração: " + options.song.videoDuration)
                return this
            break

            case "music_np":
                this
                .setAuthor(options.song.authorName)
                .setColor("#FFFF00")
                .setTitle(options.song.title)
                .setURL(options.song.url)
                .setDescription(options.song.desc)
                .setImage(options.song.image)
                return this
            break

            case "queue":
                this
                .setAuthor(this.messageReference.guild.name, this.messageReference.guild.iconURL())
                .setColor("#00BFFF")
                return this
            break
        }
    }
}
