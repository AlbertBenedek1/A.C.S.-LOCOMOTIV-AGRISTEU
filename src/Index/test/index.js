 type="module"
alert('Hello');

        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
        import { getDatabase,ref,set,get,child} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
       
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyC-iduTthDx4yBqsP4HicyE8B-f3vAsCDk",
          authDomain: "locomotiv-63434.firebaseapp.com",
          databaseURL: "https://locomotiv-63434-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "locomotiv-63434",
          storageBucket: "locomotiv-63434.appspot.com",
          messagingSenderId: "464761573563",
          appId: "1:464761573563:web:9486bb367bfc283c1d599e",
          measurementId: "G-PJBMX5FYB7"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        const db = getDatabase(app);
        document.getElementById("submit").addEventListener('click',function(e){
            set(ref(db, 'email/' + document.getElementById("email").value ),
            {
                email:document.getElementById("email").value,
            });

        })

        
        alert("succes");
