module.exports = class HerokuConnect {
	constructor(port) {
        this.port = port
    }
  
    connect() {
        const express = require('express');
        const path = require('path');
        const PORT = this.port;

        express()
        .use(express.static(path.join(__dirname, 'public')))
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs')
        .get('/', (req, res) => res.render('pages/index'))
        .listen(PORT, () => console.log("Heroku", "Conectado na porta " + PORT + "\n"))
    }
}

