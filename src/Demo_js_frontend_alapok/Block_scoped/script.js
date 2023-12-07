/*
* Változó deklarálása
* var, let, const
* ES6
* transpiler: régi JS -> ES6 (Babel)
*/

//block scoped változók: const, let
if (true){
    let valtozo = "teszt";
    console.log(valtozo);
}
for(let person of ["Dani", "Peti", "Julia"]){
    console.log(person);
}

//console.log(person) -> hiba

const person = "Tilla";
//person = "Orsi" -> hiba

const people = ["Dani", "Peti", "Julia"];
people.push("Marcell"); //pusholás itt nem számít felülírásnak
console.log(people);

const person2 = {
    name:"Gipsz Jakab"
};

person2.age= 20;
//person2=5;
console.log(person2);


 