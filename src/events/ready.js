module.exports = async (desposito) => {
    console.log("Estou online!")
    desposito.user.setStatus("idle")
    desposito.user.setActivity("dp play")
}