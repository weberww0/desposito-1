const fs = require("fs")
const speech = require('@google-cloud/speech');
module.exports = async (desposito) => {
    console.log("Estou pronto como " + desposito.user.tag + "!")
    desposito.user.setStatus("idle")
}