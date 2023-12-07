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
    })  // ennek a fetch functionnak a visszatérítési értéke egy promise object, amit ugye a .then functionnel kezelhetünk, annyi különbséggel a sendRequest saját programunktól, hogy ez nemcsak a szervertől jövő választ küldi vissza, hanem minden más szerverrel kapcsolatos infót is 
    .then(function(response){
        console.log(response); // itt ha helyes emailt irunk be is elég, ha helytelent akkor is ad responseot, de az ok kulcs false lessz és a status 400, ami hibát jelent
    })
}
