var state = {
    usrs: [
        {
            id: uuidv4(),
            name: "Ferenc",
            email: "feri@gmail.com",
            password: "12345",
            address: "nr399",
            phone: "07345678"
        },
        {
            id: uuidv4(),
            name: "Jozska",
            email: "jozsi@gmail.com",
            password: "56789",
            address: "nr379",
            phone: "0788677"
        },
        {
            id: uuidv4(),
            name: "Almos",
            email: "vezer@gmail.com",
            password: "7vezer",
            address: "nr77",
            phone: "0777767"
        },
    ]
}

function uuidv4(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
      var r = Math.random()*16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

 function renderUsrs(){
    var usersHTML = '';
  
    for (var usr of state.usrs){     //összeollózom az adatokat
      usersHTML += `
      <div class="card">
      <p>${usr.name} , ${usr.email}, ${usr.password}</p>
      <button class="btn btn-danger float-right delete-usr" data-userid="${usr.id}">
        Törlés
      </button>
      </div>
      `;
    }
    document.getElementById("lista").innerHTML = usersHTML;

    //torles
    for (var deleteBtn of document.querySelectorAll('.delete-usr')){      
        deleteBtn.onclick = function(event){
          var id = event.target.dataset.userid; 
          var foundIndex;
          for (var index = 0; index < state.usrs.length; index++){ 
            if (state.usrs[index].id === id){  
              foundIndex = index;
              break; // ha megkaptuk ne fusson tovabb a ciklus
            }
          }
          //console.log(foundIndex);
          state.usrs.splice(foundIndex,1);
          renderUsrs();
        }
      }
}

window.onload = renderUsrs();

document.getElementById("user-form").onsubmit = function (event){  //elem hozzáadása az inputba írt értékek alapján
    event.preventDefault();
    var nameInput = event.target.elements.n_name.value;
    var emailInput = event.target.elements.n_email.value;
    var passwordInput = event.target.elements.n_password.value;
    
    /*console.log(emailInput);
    console.log(passwordInput);*/

    //state change
    state.usrs.push({
      id: uuidv4(),
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });
    //render
    renderUsrs(); //ez oldal letöltésre fog akiválódni  window.onload = renderUsrs (a küldés,submit, gomb aktivállja)
}
