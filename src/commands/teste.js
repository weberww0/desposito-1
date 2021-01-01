module.exports = {
    open (data, desposito) {
        data.message.channel.send(data.messages("math_first", {one: 1, two: 2}))
    }
}
