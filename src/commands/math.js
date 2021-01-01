module.exports = {
    async runHelp(data, desposito) {

    const defaultMessage = "> 🥸 Tabuada!\n> Acerte o máximo possível e ganhe absolutamente nada.\n\n"
    let result
    let correct = 0
    let maths

    async function regenerate() {
        maths = {"one": Math.floor(Math.random() * (10-2) + 2), "two": Math.floor(Math.random() * (10-2) + 2)}

        runCollector()
        return maths.one * maths.two
    }

    const filter = u => u.author.id === data.message.author.id
    async function runCollector() {
        const collector = data.message.channel.createMessageCollector(filter, {max: 1, time: 10000})
        collector.on("collect", async (colected) => {
            if(colected.content == result) {
                correct += 1
                result = await regenerate()
                colected.delete()
                message.edit(defaultMessage + "Parabéns você acertou! Mas quanto é **" + maths.one + "x" + maths.two + "**?")
            } else {
                message.edit(":exploding_head: Woops! Você acertou **" + correct + "** vezes, boa sorte na próxima.")
                colected.delete()
            }
         })
         collector.on("end", (col, reason) => {
             if(reason === "time") {
                 message.edit(":clock1230: O tempo acabou! Você acertou **" + correct + "** vezes, boa sorte na próxima.")
             }
         })
    }

    result = await regenerate()
    const message = await data.message.channel.send(defaultMessage + "Quanto é: **" + maths.one + "x" + maths.two + "**?")
    }
}
