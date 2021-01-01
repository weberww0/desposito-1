const { inspect } = require('util');
module.exports = {
    aliase: "e ev",

    async runHelp(data, desposito)  {
        if(!["748320609746026607", "451920956768649226"].includes(data.message.author.id)) return
        let content = data.message.content
        console.log(content)

        const reg = /<@!?(\d{16,18})>/g
        content = content.replace(reg, 'desposito.users.cache.get("$1")')

        console.log(content)
        this.execute(desposito, data, content.split(" ").slice(2).join(" "))
    },

    async execute (desposito, data, code)  {
        const { inspect } = require('util')
        let sendOutput = true

        if(/\-\-hide/g.test(code)) {
            code = code.replace(/\-\-hide/g, "")
            sendOutput = false
        }

        let result
        try {
            const evaled = await eval(code)
            result = inspect(evaled, { compact: true, depth: 0 });
        } catch (error) {
            sendOutput = true
            result = error.toString()
        }
        
        if(sendOutput) { data.message.channel.send(result, {code: 'js'}) }
    }
}
