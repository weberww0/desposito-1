const fs = require("fs")
module.exports = async function event_loader(desposito) {
    fs.readdirSync('src/events').forEach(f => {
        const event = require(`../../events/${f}`)
        desposito.on(f.replace(/.js/g, ""), (...args) => event(...args, desposito))
        console.log("Event", "Evento " + f + " listado.")
    })
}