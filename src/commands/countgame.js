module.exports = {
    open(data, desposito) {

const filter = m => !m.author.bot
const coletor = data.message.channel.createMessageCollector(filter, {time: 60000})
let n = 1

coletor.on("collect", (col) => {
    if(col.content == n) { n += 1 
        col.react("👍")
    } else { coletor.stop()
        col.channel.send("Woops!")
    }
})
coletor.on("end", e => data.message.channel.send("Acabou!"))
}
}
