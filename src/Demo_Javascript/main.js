alert('hello');

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






