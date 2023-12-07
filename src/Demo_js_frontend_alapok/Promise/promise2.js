document.getElementById('login').onclick = function (){
    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({      //JSON.stringify - egy JSON adat fog a bodyban utazni
        email:'eve.holt@reqres.in',
        password: 'cityslicka'
    })

  sendRequest2(url,'POST',body)  //ha szolgáltattam neki ezeket a megfelelő paramétereket, akkor ami visszatér Promis object, annak van egy .then kulcsa, amibe egy function van és ebbe a functionbe van lehetőségem megadni azt, hogy az aszinkron művelet révén kezembe került értékkel mi történjen 
  .then (function(response) {    //tehát az ide bedobott functionbe elérhető lessz a kérésből kapott válasz
        console.log(response);
        return sendRequest2('https://reqres.in/api/users','GET',null);  
  })   //azt gondollnánk, hogy a következő .then function, kap egy ilyent: Promise<Promise<any>>, de nem mert megszabadul és csak a belső promise<> réteget kapja
  .then(function(jovobeliErtek){
    console.log(jovobeliErtek);
  }) // igy egy teljes promise lancolatot epithetek
  //hibakezeles mehet egy adott .then blokkra, ugy hogy irunk: .function() ami a rejectet kezeli de inkább ezt használlják:
  .catch(function(error){ //megkapja a hiba erteket, amit a promis a rejecteles folytan kuld
        console.log("error");
  }) //ezt a catch blokkol is ahhoz a .then -hez tehetem ahova akarom
};




function sendRequest2(url,method,body){
    return new Promise(function(resolve,reject){  //ket fgg-t terit vissza, resolve, ha jól futott le, reject ha hibásan
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300){   //azt vizsgállja, hogy 2-vel kezdődik-e vagy sem
                    resolve(JSON.parse(xhr.responseText));  //helyes visszetérés esetén ez történik
                } else {
                    reject(xhr.responseText) // ha nem sikerult is kapjon valami informaciot a felhasználó
                }
            }
        };
        xhr.open(method,url);
        xhr.setRequestHeader('content-type','application/json');
        xhr.send(body);
    });
}

