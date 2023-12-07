/*
 * Call stack
 */

function susdMegARantottat() {
    console.log("Önts olajat a serpenyőbe");
    console.log("Adj hozzá 3 tojást");
    adjHozzaFuszereket();
    console.log("Süsd 4 percig");
    console.log("Kész");
  }

 /* function adjHozzaFuszereket() {
    console.log("Adj hozzá sót");
    console.log("Adj hozzá borsot");
    setTimeout(function () {
      console.log('Később hajtódik végre');
    }, 1000);
    console.log("Adj hozzá paprikát");
  }*/
  
  function adjHozzaFuszereket() {
    console.log("Adj hozzá sót");
    console.log("Adj hozzá borsot");
    setTimeout(function () {
      console.log('Később hajtódik végre');
    }, 0);
    console.log("Adj hozzá paprikát");         
  }
  //lehet, hogy 0 ms alatt hajtódik végre, de akkor is ez a setTimeout lessz itt az utolsó művelet, mert nem zavarhatja meg a szinkron futást a call stack-be
  //kikerűl a WebAPIs ba ott 0 ms alatt végrehajtódik, bekerűl a callback queue-be onnan egy event loop próbálja visszarakni a call stack-be amikor tudja, (le kell fusson a mainnek az összes kódja és csak utána)
  
  console.log("Első sor kód ami végrehajtódik");
  susdMegARantottat();
  console.log("script lefutott");