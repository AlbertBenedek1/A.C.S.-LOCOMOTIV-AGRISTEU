//itt most ki akarom loggolni a felhasználókat amiket a szerveroldaltól kaptam
/*

*/

var state = [];

console.log(document.getElementsByName('email'));
console.log(document.getElementsByName('password'));
document.getElementById('login').onsubmit = function(event){
    event.preventDefault();
    var emailInput = event.target.elements.email.value;
    var passwordInput = event.target.elements.password.value;
    console.log(emailInput);
    console.log(passwordInput);

    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({      //JSON.stringify - egy JSON adat fog a bodyban utazni
        email:emailInput,
        password: passwordInput
    })
    //a fetch functonnal szolitom meg az oldalt
    fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: {
            'Content-type' : 'application/json'
        }
    })  
    .then(function(response){
        if (!response.ok){
            return Promise.reject("Bejelentkezes sikertelen") //ahhoz hogy a usert is ertesitsuk, hogy hibas a beirt input
        }
        document.getElementById('login').remove(); // 
        document.querySelector('h1').remove(); //ha a bejelentkezés sikeres a akkor a cím és a form tűnjön el
        return response.json();

    })
    .then(function(response){ //itt kapjuk a tokent
        state.isLog
        return fetch('https://reqres.in/api/users') //mást nem kell írni, mert a fetch function úgy van megírva, hogy a Get metod a default
    })
    .then(function(response){
        if (!response.ok){
            return Promise.reject("users error")
        }
        return response.json()
    })
    .then(function(userPage){  //tehat itt kapom meg a user listat
        //action
        console.log(userPage);
        //state change - a state tartalmat felulirjuk
        state = userPage.data;
        //render
        renderUsers();

    })
    .catch(function(error){
        //console.log(error);
        alert(error);
    });
};


function renderUsers(){
    var usersHTML = '';
    for (var user of state){
        usersHTML += `<li class="list-group-item">${user.first_name } ${user.last_name}</li>`
    }
    document.getElementById('user-list-container').innerHTML = '<ul class="list-group">' + usersHTML + '</ul>';
}



