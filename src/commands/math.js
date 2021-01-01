module.exports = {
    runHelp(data, desposito) {

const defaultMessage = "> 🥸 Tabuada!\n> Acerte o máximo possível e ganhe absolutamente nada.\n\n"
let result

let maths
async function regenerate() {
    maths = {"one": Math.floor(Math.random() * (10-2) + 2), "two": Math.floor(Math.random() * (10-2) + 2)}

    return maths.one * maths.two
}

const filter = u => u.id === data.message.author.id
async function runCollector {
    const collector = data.message.channel.createMessageCollector(filter, {max: 1, time: 5000})
    collector.on("collect", (colected) => {
        if(colected.content == result) {
            result = await regenerate()
            message.edit(defaultMessage + "Parabéns você acertou! Mas quanto é **" + maths.one + "x" + maths.two + "**?")
            await runCollector()
        }
    })
}

result = await regenerate()
const message = await data.message.channel.send(defaultMessage + "Quanto é: **" + maths.one + "x" + maths.two + "**?")

await runCollector()

}
}
