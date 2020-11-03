module.exports = class DespositoMap extends Map {
    constructor() {
        super()
    }

    pfetch (argument) {
        const array = this.array()
        const item = array.find(item => item.guild.id === argument || item.guild.name.includes(argument))

        return item
    }

    array () {
        const thisMapOnArray = Array.from(this)
        const array = []
        
        thisMapOnArray.forEach(song => {
            song = song.pop()
            array.push(song)
        })

        return array
    }

    first () {
        return this.array()[0]
    }
}