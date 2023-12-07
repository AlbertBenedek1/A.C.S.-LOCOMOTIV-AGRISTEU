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
            return Promise.reject("login error")
        }
        return response.json(); 
    })
    .then(function(response){ //itt kapjuk a tokent
        return fetch('https://reqres.in/api/users') //mást nem kell írni, mert a fetch function úgy van megírva, hogy a Get metod a default
    })
    .then(function(response){
        if (!response.ok){
            return Promise.reject("users error")
        }
        return response.json()
    })
    .then(function(userPage){
        console.log(userPage);
    })
    .catch(function(error){
        console.log(error);
    });
};



