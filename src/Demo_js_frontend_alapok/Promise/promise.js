document.getElementById('login').onclick = function (){
    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({      //JSON.stringify - egy JSON adat fog a bodyban utazni
        email:'eve.holt@reqres.in',
        password: 'cityslicka'
    })

      /*
  // callback hell / pyramid of doom
  sendRequest(url, 'POST', body, function (token) {
    if(token) {
        sendRequest('https://reqres.in/api/users', 'GET', null, function (users) {
            if(users) {
              sendRequest('https://reqres.in/api/tovabbiEroforras1', 'GET', null, function (eroforras1) {
                  if(eroforras1) {
                    sendRequest('https://reqres.in/api/tovabbiEroforras2', 'GET', null, function (eroforras2) {
                        if(eroforras2) {
                          console.log(eroforras2);
                        } else {
                          alert('Error');      
                        }
                    });
                  } else {
                    alert('Error');
                  }
              })
            } else {
              alert('Error');
            }
        })
      } else {
        alert('Error');
      }
  })
  */

  //megirjuk a promise-os ekvivalenset:
  sendRequest2(url,'POST',body)  //ha szolgáltattam neki ezeket a megfelelő paramétereket, akkor ami visszatér Promis object, annak van egy .then kulcsa, amibe egy function van és ebbe a functionbe van lehetőségem megadni azt, hogy az aszinkron művelet révén kezembe került értékkel mi történjen 
  .then (function(response) {    //tehát az ide bedobott functionbe elérhető lessz a kérésből kapott válasz
        console.log(response);
        return "teszt";   //bármivel térek vissza, ő abbol mindenképp promiset csinál, itt most nekem egy promise of stringet ("teszt")
  })                      //tehát ő ezt becsomagolja egy promise objectbe, és ebből adódoan, hogy a következő .then functionből ehhez az értékhez jutok hozzá
  .then (function(response2){
        console.log(response2);
        return "teszt_ujra";
  })
  .then(function(response3){
        console.log(response3);
  }) //és így mehet tovább, úgy, hogy közben nem jön létre a callback hell
  

  
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

