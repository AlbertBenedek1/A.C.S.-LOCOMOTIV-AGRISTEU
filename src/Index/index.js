import express from 'express';
import path from 'path';

const app = express();

// Statikus fájlok szolgáltatása a public mappából
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000);

/*app.get("/img/back.jpeg",(req, res) => {
  res.sendFile(__dirname + "/public/img/back.jpeg");
});

app.get("/img/ikon.png",(req, res) => {
  res.sendFile(__dirname + "/public/img/ikon.png");
});

app.get("../img/logo.jpg",(req, res) => {
  res.sendFile(__dirname + "/public/img/logo.jpg");
});*/


