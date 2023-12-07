/*
* Programozási paradigmák
*/

// Procedurális
// pl: C, PHP, JavaScript

var product = {
    name: 'Fűnyíró',
    price: 75000,
    isInStock: true,
  };
  
  product.price *= 0.9;
  
  var message = `A termék neve: ${product.name}, ára: ${product.price} és 
  ${product.isInStock ? 'van készleten' : 'nincs készleten'}`;
  //ez azért procedurális mert a memoriában közvetlenűl változtattam a price értékét és a kódom mentes mindenféle absztrakciótól, ezáltal a kód sorrendiségének nagyon nagy szerepe van
  console.log(message);

/*
* Funkcionális
*/
// Lisp, Haskell, Clojure, F#, (JavaScript)

// pure function
// side effect nélkül
// _ -> _

// pipeline-ok


// (Product, number) -> Product
function withDiscount(product, discount) {
    return {
      name: product.name, 
      price: product.price * discount, 
      isInStock: product.isInStock, 
    }
  }
  
  // (Product) -> string
  function toMessage(product) {
    return `A termék neve: ${product.name}, ára: ${product.price} és 
    ${product.isInStock ? 'van készleten' : 'nincs készleten'}`;
  }
  
  // immutable value - nem modosulnak a memóriában az értékek
  var product2 = {
    name: 'Fűnyíró',
    price: 75000,
    isInStock: true,
  };
    //feketedobozok, építőkockák, amikből felépülhet egy épitmény

  console.log(toMessage(withDiscount(product2, 0.9)));
  //Itt a futási időnek nincs nagy szerepe
  //Nem a memóriában változnak az értékek, ahogy fut a kód, inkább az a koncepció, hogy kissebb darabokból összeépítessz egy nagyobb egységet, a kapcsolatot a tipus annotációk adják pl ha az egyik Productot vár bemenetként a másiknak Product kell legyen a kimenete
  //a funkcionális programoknál nem írhatsz felül értéket, csak létrehozhatsz újat a régiből
  //egy gyártosórhoz szokás hasonlítani, ahol az egyik végében bemegy a nyersanyag, a végén kijön a kész érték


  /*
  *Objektum orientált
  */
  //Java, C#, PHP, JavaScript

// a megközelítés lényege: míg a procedurális programozásban közvetlenül változtattuk az értéket a memóriában, az adat és a művelet ketté volt választva egymástól
//funkcionáliks esetben is így, az adat és a művelet külön volt választva (az adat a product, a műveletek a különböző functionok)
//az objektum orientált az adatokat és a műveleteket összezárja egyetlen egy kontextusba, az adatot ruházza fel különféle operációval, így a kettő nincs külön választva
//Ki tudnak számolni az adatból értékeket és tudják szoláltatni mindenkinek akinek szügsége van rá
var Product = {
    //property / field
    name: 'Fűnyíró',
    price: 75000,
    isInStock: true,

    //method
    //(number) -> void   //nem térít vissza semmit
    applyDiscount: function(discount){
        this.price = this.price * discount //olyan mintha az objektumot megböknéd, hogy változz meg, de te nem kapsz ebből semmi értéket
    },
    // () -> string   //nem vár semmi értéket, visszaad egy stringet
    getMessage: function (){
        return `A termék neve: ${this.name}, ára: ${this.price} és 
    ${this.isInStock ? 'van készleten' : 'nincs készleten'}`;
    }
}
Product.applyDiscount(0.9);
console.log(Product.getMessage())

//.this - el lehet az objektumon belül utallni valamelyik elemre,(akár functionra is)
//az objektumnak van egy ilyen én tudata, tudja magán belül, hogy mi az adat és mi az operáció, (olyan mint egy sejt - sok kis objektum belső állapotokkal)
//az újrafelhasználhatóságért létrehozhatok egy tervrajzot az újrafelhaszálhatóság érdekében, a tervrajz alapján hozom létre az objektumokat (nincsenek beírva a property nevei)

/*
Funkcionális: függvény(adat, paraméter)
Objektum orientált: adat.függvény(paraméter)
*/

//továbbiakban megvalósitsuk hogyan tudunk a javascriptben ilyen tervrajzokat létrehozni

