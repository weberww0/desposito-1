require('dotenv').config()
const fs = require("fs")

const DespositoClient = require("./utils/discord/DespositoClient")
const desposito = new DespositoClient()

require("./strc/handlers/command")(desposito)
require("./strc/handlers/event")(desposito)

desposito.players = new Map()
require("./utils/connection/loader")({heroku: {port: 5000}}, desposito)