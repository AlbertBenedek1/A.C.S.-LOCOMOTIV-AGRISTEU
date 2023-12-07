//hogyan tudok létrehozni az objektum kapcsán egy újra létrehozhatót tervrajzot
//objektum séma, hogy felpakolhassam adatokkal
//az első módszer: constructor function

function Termek(name, price, isInStock) {
    //annyit csinál, hogy a létrejövő objektumba ezeket az adatokat beállitja a this-el
    this.name = name;
    this.price = price;
    this.isInStock = isInStock;
  }
  
  Termek.prototype.applyDiscount = function(discount) {  //a metodokat futási időben csatolom hozzá, tehát amit ezen kulcs alá írok azokat a felső terv raj alá fűzi funkcionalitásként
    this.price = this.price * discount;
  };
  
  Termek.prototype.getMessage = function() {
    return `A termék neve: ${this.name}, ára: ${this.price} és 
    ${this.isInStock ? "van készleten" : "nincs készleten"}`;
  };
  
  // példányosítás, instantiation (a tervrajz alapján példányokat hoztam létre)
  // new Termek('Kasza', 23000, true),
  
  var termekek = [
    new Termek("Kasza", 23000, true),
    new Termek("Kasza1", 23000, true),
    new Termek("Kasza2", 23000, true),
    new Termek("Kasza3", 23000, true)
  ];
  

  for (var termek of termekek ){
    termek.applyDiscount(0.9);
    console.log(termek.getMessage());
  }
  

  /*másik módszer*/
  //szintaktikai könnyítés
  //class deklaráció
  class Termek_ {   
    quantity = 10;
    constructor(name, price, isInStock) {
      this.name = name;
      this.price = price;
      this.isInStock = isInStock;
    }
  
    applyDiscount(discount) {
      this.price = this.price * discount;
    }
  
    getMessage() {
      return `A termék neve: ${this.name}, ára: ${this.price} és 
      ${this.isInStock ? "van készleten" : "nincs készleten"}`;
    }
  }
  //ezek a tervrajzok reprezentálhatnak komplexebb egységeket is a szoftveremben
  //leírhatom pl, hogy az userInterfacem eggyes komponensei hogy nézzenek ki
  
  var termek2 = new Termek_("Ásó", 4300, false);
  termek2.applyDiscount(0.8);
  termek2.applyDiscount(0.8);
  termek2.applyDiscount(0.8);
  console.log(termek2.getMessage());
