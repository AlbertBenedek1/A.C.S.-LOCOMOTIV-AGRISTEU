//alert('hello');

console.log('Hello');
console.error('Hiba van');
console.warn("lehet hiba!");

//valtozok
//let,const,var 
//inkabb a let vagy a const ot hasznaljuk, egy blokkon belul csak egy fajtat

let kor = 20;
console.log(kor);  //letrehoztam a kor valtozot es kiirtam
kor = 21;
console.log(kor);

const kor2=30;
console.log(kor2);
/*kor2=31;
console.log(kor2);*/ //hibat dob mert, a const nem lehet valtoztatni, nem olyan mint a let

// -- adat tipusok
const nev = 'Zsolt';
console.log(nev); //string
const korr = 21; //number
const suly = 80.5; //number
const felnott = true; //logikai igaz hamisok, boolean
console.log(nev,korr,suly,felnott);

const date = new Date();
console.log(date);

const date2 = new Date('2020-10-10');
console.log(date2);

const x = null;
let y = undefined; //barmi lehet, nem tudja eldonteni

console.log(x);
console.log(y);

console.log(typeof nev); // kiirja, hogy milyen tipusrol van szo
console.log(typeof x);


// --muveletek
let szam1=10;
console.log(szam1);
console.log(szam1+10);

let eredmeny = szam1+10;
console.log(szam1);
console.log(eredmeny)

console.log("+=");
let eredmeny2 = szam1+=10;
console.log(szam1);
console.log(eredmeny);

let szam2 = 5;
szam2 += '1';
console.log(szam2);

let nev2 = 'Zsolt';
nev2 += 10;
console.log(nev2);
console.log(typeof nev2); //tehát átalakúl egy string müveletté

let szoveg = 'Hello vilag';
console.log(szoveg + '!'); //konkatenacio, szamoknal is mukodik (osszefuzes)
let szoveg2 = 'Hello' + ' vilag';
console.log(szoveg2);

console.log(szoveg.length);
console.log(szoveg.toLowerCase());//osszehasonlitasnal jol jon
console.log(szoveg.substring(0,3));
console.log(szoveg.split(''));

let lista = 'alma,korte,banan';
console.log(lista.split(','));
console.log(lista.split(',')[0]);
console.log(lista);

console.log(date2);
console.log(date2.getDay());
console.log(date2.getDate()); 
console.log(date2.getMonth()); //0 tol szamozza
date2.setHours(4);
console.log(date2);
date2.setFullYear(2021);
console.log(date.toISOString());


// -- Feltetelek
const x1=10;
if(x1== 10){
    console.log('Igaz');
}
else
{
    console.log('Nem igaz');
}

const color = x1 > 10 ? 'piros' : 'kek';
console.log(color);

// --Tombok
// javascriptben a tomb egy objektumnak szamit

// const allatok = []; // peldanyositas
// console.log(allatok);
// console.log(typeof allatok);
// console.log(Array.isArray(allatok));

const allatok2 = {};
console.log(allatok2);
console.log(typeof allatok2);
console.log(Array.isArray(allatok2));

const allatok = ['kutya', 'macska', 'lo'];
console.log(allatok);
console.log(allatok[3-1]);

const allatok3 = ['kutya', 'macska', 'lo',10,true];
console.log(allatok3);
allatok3.push('kacsa');
console.log(allatok3);
allatok3.pop();
console.log(allatok3);

console.log(allatok3.indexOf('lo'));


// -- OBJEKTUMOK
const man = {};
console.log(man);
console.log(typeof man);

const ember = {
    name: 'Zsolt',
    age: 20,
    hobbies: ['snowboard','squash'],
    address: {
        street: 'Jakab utca',
        city: 'Budapest'
    }
};
ember.email = 'zsolt@info.hu';
console.log(ember);
console.log(ember.name);
console.log(ember.hobbies.length>0); // tehat van hobbija
console.log(ember.hobbies[0]);

console.log(JSON.stringify(ember)); //beepitett objektum, levelbe kuldi az egeszet

const{name,age,address:{street}}=ember; //ES6
console.log(street);

const todo= [ //tombon belul objektum
{
    id:1,
    text: 'Ne felejts el'
},
{
    id: 2,
    text: 'Linkeld facebookra is'
}
];
console.log(todo);
console.log(todo[0].id);


//  CIKLUSOK
console.log('for ciklus');
for(let i=0;i<10;i++)
{
    console.log(i);
}

console.log("while ciklus:");
let index = 0;
while (index<10){
    console.log(index);
    index++;
}

const todoIDs = todo.map(function(todo){
    return todo.id;
});
console.log(todoIDs);


// --FÜGGVÉNYEK

 function osszeadas(szamx,szamy){
     console.log(szamx+szamy);
 }

osszeadas(10,20);

function osszeadas2(szamx2,szamy2){
    return szamx2+szamy2;
}

let eredmeny3=osszeadas2(20,30);
console.log(eredmeny3);

function osszeadas3 (szamm=1,szamm2=2){
    return szamm+szamm2;
}
eredmeny4=osszeadas3("kacsa");
console.log(eredmeny4);


// -- OSZTALYOK
function ember2(nev,kor,aktiv){
    this.nev=nev;
    this.kor=kor;
    this.aktiv2=aktiv;
    this.getNev = function (elotag){
        return `${elotag} ${nev}`;
    }
}

const emb1 = new ember2 ("zsolt",20,true);
console.log(emb1);

console.log(emb1.getNev('Mr, '));

// ember2.prototype.getSzulEv = () => new Date().getFullYear() - this.kor;
// console.log(emb1);  

class Allat {
    constructor(nev,kor){
        this.nev = nev;
        this.kor = kor;
    }
    getSzulEv(){
        return new Date().getFullYear()-this.kor;
    }
}
const allat1 = new Allat("kutya",5);
console.log(allat1.getSzulEv());

