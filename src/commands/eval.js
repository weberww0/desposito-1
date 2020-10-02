const { inspect } = require('util');
module.exports = {
    aliase: "e ev",
    async runHelp(data, desposito) {
        let v = -1
        if (data.message.mentions.users.first()) {
            data.message.arguments.forEach((value, index) => {
                const r = /<@!?(\d{16,18})>/g
                if(r.test(data.message.arguments[index])) {
                    v++
                }
                data.message.arguments[index] = data.message.arguments[index].replace(/<@!?(\d{16,18})>/g, "message.mentions.users.map(u => u)["+v+"]") 
            })
        }

        let code = data.message.arguments.join(" ")
        this.execute(desposito, data.message, data.message.arguments, code)
    },

    async execute (desposito, message, args, code) {
        let result
        try {
            const evaled = await eval(code)
            result = inspect(evaled, { compact: true, depth: 0 });
        } catch(error) {
            result = error.toString()
        }

        message.channel.send(result, {code: 'js'})
    }
}