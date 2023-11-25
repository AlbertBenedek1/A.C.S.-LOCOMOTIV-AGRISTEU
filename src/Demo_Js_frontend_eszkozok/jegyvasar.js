alert("Udvozoljuk a Marton Aron Film jegyvasarlo oldalan")
/*var db = prompt("hány jegyet kér?");
var felnott = prompt("ebből a felnőtt jegyek száma: ");
var gyerek=db-felnott;
var osszeg = felnott*350+gyerek*300;
alert(osszeg);*/

var db = prompt("hány jegyet kér?");

var tipus = prompt("add meg a tipus");

var tipusok = {
    felnott: 350,
    gyerek: 300,
    nyugdijas: 280
};

// var kulcsszo = 'felnott';
// console.log(tipusok[kulcs]); //vagy:
// console.log(tipusok.gyerek);

var price = tipusok[tipus]; //tehát nem index szerint kell keresni, hanem kulcs szerint
var discount = db > 10 ? 0.9 : 1;
price = price*db*discount;
alert(price);




