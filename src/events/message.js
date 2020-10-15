module.exports = async (message, desposito) => {
    if(message.author.bot || message.channel.type === "dm") return

    const prefix = message.content.trim().split(/ +/)[0]
    const data = {
        message: message,
        prefix: prefix
    }
    
    data.command = message.content.trim().split(/ +/).slice(1)[0]

    if(message.channel.name === "eval") {
        message.arguments = message.content.trim().split(/ +/)
        const evalfile = desposito.commands.get("eval")
        evalfile.runHelp(data, desposito)
    }
    
    if(["desposito", "despo", "dp"].includes(prefix)) {
        message.arguments = message.content.trim().split(/ +/).slice(2)
        const archive = desposito.commands.get(data.command) || desposito.aliases.get(data.command)
        
        if(archive) { 
            archive.runHelp(data, desposito)
            console.log('log', `${message.author.tag} (${message.author.id}) executou o comando: ${data.command}`) 
        }
    }
}