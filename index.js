const express = require('express')
const nunjucks = require('nunjucks')
// Import JSON dataset
const data = require("./data.json")
const app = express()
const port = 3000

// Tell nunjucks where your template files are located (e.g., 'views' directory)
nunjucks.configure('views', {
    autoescape: true,
    noCache: true, // <-- Should only be true when developing
    express: app
});

app.use(express.static('static'));

// Endpoint for /characters shows all characters
app.get('/characters', function (req, res) {
    res.render('zanny-characters.njk', { 
        title: "Rick and Morty", 
        characters: data.results
    });
});

// Endpoint for /characters/:id shows details for ONE characer
app.get('/character/:id', function (req, res) {
    const character = data.results.find(c => c.id == req.params.id);
    if (character) {
        res.render('character-temp.njk', { character: character });
    } else {
        res.status(404).send('Character not found');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})