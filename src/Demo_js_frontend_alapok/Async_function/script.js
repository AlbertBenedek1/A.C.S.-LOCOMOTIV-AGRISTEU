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

    var body = JSON.stringify({      //JSON.stringify - egy JSON adat fog a bodyban utazni
        email: emailInput,
        password: passwordInput
    })
    loginAndFetchUsers(body); //ez a fgg megszólitja POST-al a szervert, küldi a bodyt, megkapja a választ, megszólitja GET el és megkapja a felhasználólistát is

};

async function loginAndFetchUsers(body) {
    // await: Promise<_> --> _
    var loginResponse = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body: body,
      headers: { "Content-type": "application/json" }
    });  //ez az await kap egy json-be csomagolt Promis objectet (ez lenne az első .then)
    
    if(!loginResponse.ok) {       //hibakezelés
      alert("Bejelentkezés sikertelen");
      return;
    }
  
    var token = await loginResponse.json();  //ez csomagollja ki a promise objectet (második .then)
    var usersResponse = await fetch("https://reqres.in/api/users"); //megszólitja GET metódussal (harmadik .then)

    if(!usersResponse.ok) {  //hibakezelés
      alert('Users error');
      return;
    }
  
    var userPage = await usersResponse.json()
    //console.log(userPage.data);

    // state change
    state = userPage.data;
    // render
    renderUsers();
  };
  
  function renderUsers(){
    var usersHTML = '';
    for (var user of state){
        usersHTML += `<li class="list-group-item">${user.first_name } ${user.last_name}</li>`
    }
    document.getElementById('user-list-container').innerHTML = '<ul class="list-group">' + usersHTML + '</ul>';  //táblázatos formát intézi
}
