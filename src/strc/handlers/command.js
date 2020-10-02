const fs = require("fs")
module.exports = async function command_loader(desposito) {
    desposito.commands = new Map()
    desposito.aliases = new Map()
    
    fs.readdirSync('src/commands').forEach(f => {
        const command = require(`../../commands/${f}`)
    
        if(command.aliase) {
            const aliases = command.aliase.split(" ")
            aliases.forEach(aliase => {
                desposito.aliases.set(aliase, command)
            })
        }
    
        desposito.commands.set(f.replace(/.js/g, ""), command)
    })
}