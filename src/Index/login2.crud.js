/*
  Product

  Create
  Read
  Update
  Delete

  CRUD

*/

var state = {
    usrs: [  //users
      {
        id: uuidv4(),
        email: "Krisz@gmail.com",
        password: "sapka123"
      },
      {
        id: uuidv4(),
        email: "BKrisz@gmail.com",
        password: "sapka234"
      },
      {
        id: uuidv4(),
        email: "Jozsi@gmail.com",
        password: "kalap7"
      }
    ]
  };

  function renderUsrs(){
  var usersHTML = '';

  for (var usr of state.usrs){
    usersHTML += `
    <div class="card">
    <p>${usr.email}</p>
    <p>${usr.password}</p>
      <button class="btn btn-danger float-right delete-usr" data-userid="${usr.id}">
      Törlés
      </button>
    </div>
    `;
  }
  
  document.getElementById("lista").innerHTML= usersHTML;

  for (var deleteBtn of document.querySelectorAll('.delete-usr')){      // ez a delete rész is a render függvénybe kell legyen
    deleteBtn.onclick = function(event){
      var id = event.target.dataset.userid; //az id megkapja a rákattintott gombhoz tartozó user id-t
      var foundIndex;
      for (var index = 0; index < state.usrs.length; index++){ //végigmegyünk az összes state-n
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

  window.onload = renderUsrs;
  //action
  document.getElementById("user-form").onsubmit = function (event){  //elem hozzáadása az inputba írt értékek alapján
        event.preventDefault();
        var emailInput = event.target.elements.n_email.value;
        var passwordInput = event.target.elements.n_password.value;
        /*console.log(emailInput);
        console.log(passwordInput);*/

        //state change
        state.usrs.push({
          id: uuidv4(),
          email: emailInput,
          password: passwordInput
        });
        //render
        renderUsrs(); //ez oldal letöltésre fog akiválódni  window.onload = renderUsrs (a küldés,submit, gomb aktivállja)
  }

  // a delete-hez szükség van arra, hogy a egyetlen egy user sajátosan beazonosítható legyen, hogy az szerint töröljük
  // ezert id-kat hozok létre egy sabol függvény segitségével
  function uuidv4(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
      var r = Math.random()*16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

