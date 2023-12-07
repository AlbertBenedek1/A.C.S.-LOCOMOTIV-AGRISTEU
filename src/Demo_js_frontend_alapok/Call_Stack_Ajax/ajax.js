// Ajax kérések
// 

document.getElementById("fetch-post").onclick = function(){
    //console.log("klikk");
    // tehát kérést akarunk küldeni arra a weboldalra
    // létrehozunk egy objectet ami reprezentál egy szerveroldali kérést
    var xhr = new XMLHttpRequest; //ez arra jó, hogy szerverekkel interakcióba lépjünk
                                  //ennek a kulcs-érték párjait használhatom arra, hogy ezeket a kéréseket megküldjem
    //ez akkor fut le amikor a kérésem életciklusában valami változás történik, 4 életciklus a 4. jelenti amikor a kérésből a válasz készen van
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){ //az objektumban a statusz 200, tehat sikeres kell legyen a keresunk
            var posts = JSON.parse(xhr.responseText); //a response text egy masik kulcs alatt levő érték, ami szintén egy olyan kulcs ami alatt az érték módosul, ahogy az objektum áthalad azon a 4 életcikluson
            //tehát ezt az egész json stringet beletesszük egy posts változóba
            //ha megkaptuk a választ egy JSON stringbe kaptuk
            //ezt át kell alakitjuk js adatstrukturába, ez a json.parse

            var postListHTML = ''; // összeollózom a tartalmat úgy, hogy meg akarom jeleníteni a title-t és a body-t
            for(var post of posts){
                postListHTML += '<p>' + post.title + '</p><small>' + post.body + '</small>';
            }
            document.getElementById('post-list-container').innerHTML = postListHTML;
        }
    }
   //megadjuk, hogy hova menjen ki a kérés
    xhr.open('GET','http://jsonplaceholder.typicode.com/posts');
    xhr.send();
    
}
// a gomb megnyomásával nem kellet az oldalt ujratölteni, ahhoz hogy megjelenítse a tartalmat, a modern webaplikációknak ez egy alapvető működésbeli sajátossága