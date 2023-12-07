// reqres.in web API-t használljuk, bodyban küldök neki adatokat és visszakapok egy tokent, amivel elérhetek más erőforrást is
//(ami védett), ha megvan ez a token akkor küldhetek újabb kérést, amivel megszólítom a list users erőforrást amiben felhasználó adatok vannak letárolva
//tehát előszor POST metóddal küldöm a bejelentkezési adatokat a szerver oldalra
//a szerver egy tokennel válaszol
//a tokent hozzácsatolhatjuk a header információkhoz (ezt itt most nem tegyük meg mert a reqres.in anéllül is válaszol)
//erre a users erőforrás fog a felhasználók listájával válaszolni


document.getElementById('login').onclick = function (){
    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({      //JSON.stringify JSON fájlba alakítás - egy JSON adat fog a bodyban utazni 
        email:'eve.holt@reqres.in',
        password: 'cityslicka'
    })
    sendRequest(url,'POST',body,function(token) {  //a callback hivasra parameterkent fog érkezni a token
        console.log(token); //kezünkbe került a token (csak itt abben a functionbe lehet ezzel dolgozni,(függőségi viszony, csak ebben a scope-ban tudunk dolgozni))
        
        //most a tokennel akarjuk megkapni a user eroforrast (az elobbi sendRequestol fugg ez a keres)
        sendRequest('https://reqres.in/api/users','GET',null, function(users) {   // a body részbe mi null-t teszünk mivel nem akarunk küldeni semmit
            // a callback fuggvény által a json stringet átalakítva kapom a users erőforrást
            console.log(users);  //megkaparintottam a users erőforrást is
        })
        // ! itt ha további kéréseink lennének, amihez kelle a users erőforrás (amihez kellett a token erőforrás) akkor létrejönne egy ilyen beágyazottság, ezt küszöbölljük ki a következő videóban (promis témakör, egy új nyelvi eszköz, amivel a beágyazottságot kikerülhetjük, és szebb formában leirhatjuk a dolgokat )
    });
}


function sendRequest(url,method,body,callback){ //a callback egy function paraméter, ami meghívódik esetünkben akkor amikor visszajött a válasz és össze kell ollózni az adatokat
    var xhr = new XMLHttpRequest; 
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){ 
            callback(JSON.parse(xhr.responseText));  //JSON.parse - JSON fájlból való alakítás js fájlba
        }
    }
    //header informacio
    xhr.open(method,url);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(body);
}

