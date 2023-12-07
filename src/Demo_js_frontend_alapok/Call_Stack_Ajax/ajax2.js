//az ajax.js -t kiszervezzük egy külön function-be, és felparaméterezzük, tehát általánositsuk, hogy más oldalra is használható legyen
// Ajax kérések
// 


document.getElementById("fetch-post").onclick = function(){
    var url = 'http://jsonplaceholder.typicode.com/posts';
    sendRequest(url,'GET',null,function(posts){  //a posts lessz a JSON fájlból jövő és a parse által átalakított string
            var postListHTML = '';
            for(var post of posts){
                postListHTML += '<p>' + post.title + '</p><small>' + post.body + '</small>';
            }
            document.getElementById('post-list-container').innerHTML = postListHTML;
    });
}

// általános oldal meghívó függvény
function sendRequest(url,method,body,callback){ //a callback egy function paraméter, ami meghívódik esetünkben akkor amikor visszajött a válasz és össze kell ollózni az adatokat
    var xhr = new XMLHttpRequest; 
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){ 
            callback(JSON.parse(xhr.responseText));
        }
    }
    //header informacio
    xhr.open(method,url);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(body);
}