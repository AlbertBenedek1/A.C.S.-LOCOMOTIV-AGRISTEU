
//tehát az objektumnak nem csak elemei lehetnek így:
const person = {
    name: 'John',
    age: 30,
    address: '123 Main St'
}; // hanem lehetnek metódusai (amik ugyancsak elemek, de függvények)

const car = {
    brand: 'Toyota',
    model: 'Camry',
    start: function() {
        console.log('The car is starting...');          
    },
    drive: function() {
        console.log('The car is moving...');            
    }
};  //itt a car objektumnak a start és a drive azok metódusok(azért van sárgára kiszínezve)
// ahogy a document objectnek is vannak metódusai pl a querySelector metódus, ami lekérdezi az első divet vagy a querySelectorAll ami lekérdezi az összes divet egy tombbe

const myDiv = document.querySelector('div');
console.log(myDiv);

const divElements = document.querySelectorAll('div');
// Az index 1 azaz a második elem (mert az indexelés 0-tól kezdődik)
const secondDiv = divElements[1];
// Most a secondDiv változó a második div elemre hivatkozik
console.log(secondDiv);


// Hozzáadunk egy click eseménykezelőt az elemhez
myDiv.addEventListener('click', function() {
    // Módosítjuk az elem stílusát
    myDiv.style.backgroundColor = 'blue';
});

const myDiv2= document.querySelectorAll('div');
console.log(myDiv2[1]);
myDiv2[1].addEventListener('click',function(){
    myDiv2[1].style.backgroundColor = 'blue';
    console.log('ok');
});
