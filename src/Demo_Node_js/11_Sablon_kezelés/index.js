/*
 * Template engine
 */
//express és ejs könyvtárak telepítése, ez a két könyvtár jól talál egymással
//ejs - embedded (beágyazott) js

let express = require("express");
let fs = require("fs");
let app = express();

app.set("view engine", "ejs");


//jelen esetben ez a programrész azt feltételezi, hogy ez e views mappa létezek és van benne egy ilyen index.ejs
app.get("/", (req, res) => {

   fs.readFile("./characters.json", (err, file) => {
    const characters = JSON.parse(file);
    // (specialisHTML, adat) -> HTML
    res.render("index", { 
        characters: characters,
        // ...
        // ...
        // ...
    });
  });
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));