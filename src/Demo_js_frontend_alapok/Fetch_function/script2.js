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
        // a response bol visszajön egy body (ez tartalmazná a tokent) de nem kérhető csak úgy ki, hanem egy readableStream-ként, azért mert ez a body nagy lehet akár, ezt kell kiolvasni a következő képpen:
        return response.json(); // tehát ez visszatér egy következő promise-val, amit a következő .then blokkban tudok használlni
    })
    .then(function(response){
        console.log(response);
    })  // ez a fetch lekezeli a hibát is, de bele tudjuk mi is futtatni a catch blokkba, ezt mutassa a script2.js
    
    
}

