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
    ],
    editedId:'' 
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
      <button class="btn btn-warning float-right edit-usr" data-userid="${usr.id}">
      Szerkesztes
      </button>
    </div>
    `;
  }
  
  document.getElementById("lista").innerHTML= usersHTML;

  for (var editBtn of document.querySelectorAll('.edit-usr')){
    editBtn.onclick = function(event){
      var id = event.target.dataset.userid;
      state.editedId = id;  //mindig azt a user-t teszi a state-be, amelyiknek a szerkesztés buttonjára rányomtam
      renderEditUser();
    }
  }

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

  function renderEditUser(){
    if (state.editedId === ""){
      document.getElementById("edit-user").innerHTML = '';
      return ;
    }

    var foundUser;
    for (var user of state.usrs){
      if(user.id === state.editedId){
        foundUser = user;
        break;
      }
    }
    //console.log(foundUser);   megj: `` -> template literal szintaxis
    var editFormHTML = `
    <h3>Felhasználó szerkesztese</h3>
    <form id="update-user">
          <h1 name='cimsor'>Regisztráció</h1>
          
          <div class="message"></div>

          <div>
            <label for="email">Email:</label>
            <input type="text" id="email" name="n_email value="${foundUser.email}">
          </div>

          <div>
            <label for="password">Jelszó:</label>
            <input type="password" id="password" name="n_password" value="${foundUser.password}">
        </div>
        <button class="btn btn-danger float-right delete-usr">
        Törlés
        </button>
        <button class="btn btn-warning float-right edit-usr">
        Szerkesztes
        </button>
      </div>

      </form>
    `;

    document.getElementById("edit-user").innerHTML = editFormHTML;
    /*var existingForm = document.getElementById("user-form");
    existingForm.insertAdjacentHTML('afterend', editFormHTML);*/

    document.getElementById("update-user").onsubmit = function(event){
      event.preventDefault();
        var emailInput = event.target.elements.email.value;
        var passwordInput = event.target.elements.password.value;

        var foundIndex;
        for (var index = 0; index < state.usrs.length; index++){ //végigmegyünk az összes state-n
          if (state.usrs[index].id === state.editedId){  
            foundIndex = index;
          break; // ha megkaptuk ne fusson tovabb a ciklus
        }
      }

      state.usrs[foundIndex] = {
        id: state.editedId,
        email: emailInput,
        password: passwordInput
      };
      state.editedId = '';
      renderUsrs();
      renderEditUser();
    }
  }

