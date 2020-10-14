module.exports = function runLoaders(object, desposito) {
    const Heroku = require("../../strc/loaders/heroku")
    const heroku = new Heroku(object.heroku.port)
    heroku.connect()
}

