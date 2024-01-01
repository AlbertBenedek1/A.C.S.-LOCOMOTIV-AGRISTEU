const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'home.html'));
});


const ObjectId = require("mongodb").ObjectId;

function getClient(){
  const { MongoClient, ServerApiVersion } = require('mongodb'); // mongoDB könyvtár lehívása 
  const uri = "mongodb+srv://benedek:Ulp6V0eRb8wTiL5N@cluster0.zwdawud.mongodb.net/?retryWrites=true&w=majority"; //be van égetve ide a jelszó (nagy biztonsági kockázat)
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  return client;
}

app.get('/players', function (req, res) {
    const client = getClient();
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const collection = client.db("Locomotiv").collection("Players");
        const players = await collection.find().toArray();
        
        res.send(players)
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
});


//szerveroldal küldi a csapat és webshop html fájlokat is
app.use(express.static(path.join(__dirname, 'public'))); //kiterjesztim ide is az express látókörét

/*app.get('/csapat', function (req, res) {  //ez a /csapat egy interfésznek is felfogható, letakarja az elérési útvonalat vagy azt, hogy pl html fájl van koszolgálva
  res.sendFile(path.join(__dirname, 'public', 'html', 'csapat.html')); // ha a http://localhost:3000/csapat linkre lépnek (most a navbarba a href ezekre a linkekre irányít) akkor ez html tartalom töltődik be, de a link nem kell ez legyen, azt én mondom meg, fel lehet fogni egy interfészként is
});*/

app.get('/csapat', function (req, res) {     
  const filePath = path.join(__dirname, "public", "html", "csapat.ejs"); //tartalmazza az utat a speciális html fájlhoz
  const client = getClient(); //tartalmazza a kapcsolatomat a MongoDB-vel
  async function run() {
    try {
      await client.connect();                                               //csatlakozok a MongoDB-hez
      const collection = client.db("Locomotiv").collection("Players");      //tartalmazza a collectionomet a MongoDB-ben
      const players = await collection.find().toArray();                    //kihalássza a tartalmat a collectionbol
      res.render(filePath, {players});                                      //megküldi az utat és a MongoDB-ben lévő collection tartalmat
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

app.get('/webshop', function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "webshop.ejs"); 
  const client = getClient(); 
  async function run() {
    try {
      await client.connect();                                              
      const collection = client.db("Locomotiv").collection("Shop");      
      const products = await collection.find().toArray();                    
      res.render(filePath, {products});                                      
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});


//let fs = require("fs");
//app.set("view engine", "ejs");
app.listen(3000);