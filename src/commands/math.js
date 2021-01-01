module.exports = {
    await runHelp(data, desposito) {

    const defaultMessage = "> 🥸 Tabuada!\n> Acerte o máximo possível e ganhe absolutamente nada.\n\n"
    let result
    let finishedtime = true
    let correct = 0

    let maths
    async function regenerate() {
        maths = {"one": Math.floor(Math.random() * (10-2) + 2), "two": Math.floor(Math.random() * (10-2) + 2)}

        return maths.one * maths.two
    }

    const filter = u => u.author.id === data.message.author.id
    async function runCollector () {
        const collector = data.message.channel.createMessageCollector(filter, {max: 1, time: 10000})
        collector.on("collect", async (colected) => {
            console.log(result)
            if(colected.content == result) {
                finishedtime = false
                setTimeout(() => {
                    finishedtime = true
                }, 1000)
                correct += 1
                result = await regenerate()
                colected.delete()
                message.edit(defaultMessage + "Parabéns você acertou! Mas quanto é **" + maths.one + "x" + maths.two + "**?")
                await runCollector()
            } else {
                finishedtime = false
                message.edit(":exploding_head: Woops! Você acertou **" + correct + "** vezes, boa sorte na próxima.")
                colected.delete()
            }
         })
         collector.on("end", col => {
             if(finishedtime) {
                 data.message.channel.send(":clock1230: O tempo acabou! Você acertou **" + correct + "** vezes, boa sorte na próxima.")
             }
         })
    }

    result = await regenerate()
    const message = await data.message.channel.send(defaultMessage + "Quanto é: **" + maths.one + "x" + maths.two + "**?")

    await runCollector()
    }
}
