const express = require('express');
const app = express();
const path = require('path');

//cookie-k:
const jwt = require('jsonwebtoken');
const { log } = require('console');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'home.html'));
});


const ObjectId = require("mongodb").ObjectId;

function getClient(){
  const { MongoClient, ServerApiVersion, LEGAL_TLS_SOCKET_OPTIONS } = require('mongodb'); // mongoDB könyvtár lehívása 
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
      
      // Itt adjuk hozzá a token-t a válasz headerjéhez. Itt Be nem jelentkezett felhasználó esetén a req.cookies.token értéke üres lesz, mert a felhasználó nincs bejelentkezve vagy a token nincs a cookie-ban és a válasz fejlécéhez nem kerül hozzáadásra token (csak fut tobább a kód)
      const token = req.cookies.token; // Itt feltételezzük, hogy a token a cookie-ban van
      console.log(token);
      if (token){      
        res.setHeader('Authorization', `Bearer ${token}`); //Bearer tipusu token használata
      }
      // Átadjuk az utat az ejs fájlhoz, átadjuk a token-t és a termékeket
      res.render(filePath, { products, token});  //ha nem bejelentkezett felhasználónál futott le eddig akkor a token egyszerüen üres marad   
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

app.get('/login', function (req, res) {
  res.render(path.join(__dirname, 'public', 'html', 'login.ejs'));
  //res.sendFile(path.join(__dirname, 'public', 'html', 'login.ejs'));
});

app.get('/login2', function (req, res) {
  res.render(path.join(__dirname, 'public', 'html', 'login2.ejs'));
  //res.sendFile(path.join(__dirname, 'public', 'html', 'login2.ejs'));
});

//login/register
const bodyParser = require('body-parser');
const users = [];
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/login', function (req, res) {
  const { n_name, n_email, n_password } = req.body;

  // Ellenőrizzük, hogy a kötelező mezők ki vannak-e töltve
  if (!n_name || !n_email || !n_password) {
    return res.status(400).send('Hiányzó adatok'); // Bad Request válasz, ha hiányoznak adatok
  }

  // Ellenőrizd, hogy az e-mail formátum megfelelő-e
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(n_email)) {
    return res.status(400).send('Érvénytelen e-mail cím');
  }

  // Most hozzáadhatod az új felhasználót a users tömbhöz vagy az adatbázisodhoz

  const newUser = {
    id: Date.now().toString(),
    name: n_name,
    email: n_email,
    password: n_password,
  };

  users.push(newUser);

  // Most már kiírhatod a felhasználókat a konzolra
  console.log(newUser);

  //írás mongoDB -be
  const client = getClient();
  async function run() {
    try {
      await client.connect();
      const collection = client.db("Locomotiv").collection("Users");
      const result = await collection.insertOne(newUser);
      console.log('Sikeresen hozzáadva:', result.insertedId);
      res.redirect('/login2'); //válaszként visszairányítom a bejelentkezés oldalra
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});


//BEJELENTKEZÉS:
app.post('/login2', function (req, res) {
  const {n_email, n_password } = req.body;

  // Ellenőrizzük, hogy a kötelező mezők ki vannak-e töltve
  if (!n_email || !n_password) {
    return res.status(400).send('Hiányzó adatok'); // Bad Request válasz, ha hiányoznak adatok
  }

  // Ellenőrizd, hogy az e-mail formátum megfelelő-e (nem a leghatékonyabb, de egyszerű példa)
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(n_email)) {
    return res.status(400).send('Érvénytelen e-mail cím');
  }

  // Bejelentkező felhasználó:
  const signIn = {
    email: n_email,
    password: n_password,
  };
  console.log(signIn);

  //A beírt adatokat megpróbálom összehasonlítani a findOne függvénnyel az adatbázisban lévő adatokkal. Ha talál akkor átirányítom a /webshop-ra különben hibaüzenet
  const client = getClient(); 
  async function run() {
    try {
      await client.connect();                                              
      const collection = client.db("Locomotiv").collection("Users");      
      const user = await collection.findOne({ email: n_email }); //itt a kezünkbe lessz a user (user.id, user.name, user.email, user.password)

      if (!user) {
        return res.status(401).send('Hibás e-mail cím vagy jelszó');
      }

     if(n_password !== user.password){
      return res.status(401).send('Hibás e-mail cím vagy jelszó');
     }

       // Ha eljuttunk idáig akkor a felhasználó azonosítása sikeres, itt generáljuk a tokent
      const token = jwt.sign({ userId: user.id, email: user.email }, 'titkosKulcs');
       //console.log(token); //(egy nagyon hosszu kod)
        // A token-t visszaküldjük a kliensnek
      res.cookie('token', token); // a token-t a cookie-ba helyezzük, de lehet más módszert is használni

      if (user.role === 'admin'){
        res.redirect('/admin')
      } else {
        res.redirect('/webshop');  //visszairányítom a weboldalra
      }
      } finally {
        await client.close();
      }
  }
  run().catch(console.dir);
});

// Kijelentkezés eseménykezelő
app.get('/logout', function (req, res) {
  res.clearCookie('token'); // Törljük a tokent a sütiből
  res.redirect('/webshop'); // Visszairányítjuk a felhasználót a webshop oldalra
});


app.get('/favourite', function (req, res) {
  res.render(path.join(__dirname, 'public', 'html', 'favourite.ejs'));
});

app.get('/shop', function (req, res) {
  res.render(path.join(__dirname, 'public', 'html', 'shop.ejs'));
});

app.get('/kosar', function (req, res) {
  res.render(path.join(__dirname, 'public', 'html', 'kosar.ejs'));
});

app.get('/admin', function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "admin.ejs"); //tartalmazza az utat a speciális html fájlhoz
  const client = getClient(); //tartalmazza a kapcsolatomat a MongoDB-vel
  async function run() {
    try {
      await client.connect();                                               //csatlakozok a MongoDB-hez
      const collection = client.db("Locomotiv").collection("Users");        //tartalmazza a collectionomet a MongoDB-ben
      const usrs = await collection.find().toArray();                    //kihalássza a tartalmat a collectionbol
      res.render(filePath, {usrs});                                      //megküldi az utat és a MongoDB-ben lévő collection tartalmat
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

app.post('/addToFavorites', function (req, res) {
  const { productName } = req.body;

  console.log(productName);

  res.status(200).json({ message: 'A kedvenc listához hozzáadva!' });
});

/*
app.post('/addToFavorites', function (req, res) {
  const { productId, token } = req.body;

  console.log('Received productId:', productId);
  console.log('Received token:', token);

  // Ellenőrizd, hogy a kötelező mezők ki vannak-e töltve
  if (!productId || !token) {
      return res.status(400).json({ error: 'Hiányzó adatok' }); // Bad Request válasz, ha hiányoznak adatok
  }

  // Ellenőrizd a tokent
  jwt.verify(token, 'titkosKulcs', function (err, decoded) {
      if (err) {
        console.error('Token verification error:', err);
          if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ error: 'A token lejárt, kérjük, jelentkezzen be újra.' });
          } else {
              return res.status(401).json({ error: 'Érvénytelen token, kérjük, jelentkezzen be újra.' });
          }
      }

      // Ha a token ellenőrzése sikeres, a felhasználó azonosítása megtörtént
      // Most hozzáadhatod az adatbázishoz a kedvenc terméket a kedvenc kollekcióban
      const userId = decoded.userId; // Az azonosító, amely alapján azonosítani tudod a felhasználót

      const client = getClient();
      async function run() {
          try {
              await client.connect();
              const collection = client.db("Locomotiv").collection("Favourite");
              const result = await collection.updateOne(
                  { userId: userId },
                  { $addToSet: { products: productId } },
                  { upsert: true }
              );
              console.log('Sikeresen hozzáadva a kedvenc listához:', result.upsertedId);
              res.status(200).json({ message: 'Sikeresen hozzáadva a kedvenc listához' });
          } finally {
              await client.close();
          }
      }
      run().catch(console.dir);
  });
});*/

//let fs = require("fs");
//app.set("view engine", "ejs");
app.listen(3000);