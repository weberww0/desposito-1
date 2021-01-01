const messageEvent = require("../events/message")

module.exports = async (oldMessage, newMessage, desposito) => {
    messageEvent(newMessage, desposito)
}
