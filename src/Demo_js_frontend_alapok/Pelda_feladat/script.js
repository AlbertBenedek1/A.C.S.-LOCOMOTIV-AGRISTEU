/*
1. doboz:
Kattintásra adjunk hozzá egy "blur" nevű class attribútumot, (class jegyei, mint Szent Péternek a kulcsok vagy Zeusnak a villám, olyan attributumai itt a classnak a shape vagy a blur) majd újabb kattintásra vegyük
le róla azt.
*/

// element JS reprezentacioja pl: document.querySelectorAll('div')
// esemeny kivalasztasa pl: onmousover
// funkcionalitas leirasa pl:myDivs[2].addEventListener('dblclick', function() { ... });

document.getElementById("element-one"); //getElementById: ez egy document object alatt levo kulcs, ami alatt az érték egy function, amit meg tudunk hivni
console.log(document.getElementById("element-one"));           //ha létezik element a megadott id-val akkor azzal tér vissza különben 0val
//console.dir(document.getElementById("element-one")) // ez kidobja a hozzá tartozó értékeket, innen lehet válogatni pl az onclicket is

/// !!! Itt látható egy három komponensből álló struktura ami felhasználható még sok kliens oldali alkalmazásnál

// I.belső állapot (state)
var isBlurred = false;

// II.esemény (action)
document.getElementById("element-one").onclick = function(){

    //III.state change 
    isBlurred=!isBlurred; //memóriában élni fog ez az isBlurred változó és minden egyes kattintásra értéket vált
    if (isBlurred){
        document.getElementById("element-one").classList.add('blur');
    }else
    {
        document.getElementById("element-one").classList.remove('blur');
    }
}

/*
2. doboz:
Ha az egérrel fölé megyünk változzon meg a háttérszíne kékre, ha levesszük róla az egeret
változzon vissza az eredeti színére.
*/
/* saját megoldásom: */
// var bgColorChange = false;
// document.getElementById("element-two").onmouseover= function(){
//         document.getElementById("element-two").style.backgroundColor = 'blue';
//     }
//     document.getElementById("element-two").onmouseout= function(){
//         document.getElementById("element-two").style.backgroundColor = 'red';
//     }

/* video megoldás (ez a jobb) */
//state
var isHoveredOver = false

//II action
document.getElementById('element-two').onmouseover = function(){
    //III state change
    isHoveredOver = true;
    // render
    renderSecondBox();
}
//II action
document.getElementById('element-two').onmouseout = function(){
    //III state change
    isHoveredOver = false;
    // render
    renderSecondBox();
}

function renderSecondBox(){
    if(isHoveredOver){
        document.getElementById('element-two').style.backgroundColor = 'red';
    }else {
        document.getElementById('element-two').style.backgroundColor = ''; //marad az eredeti
    }
}


/*
3. doboz:
Dupla kattintással sorsoljon egy számot 1 és 20 között és módosítsa a kapott számmal a doboz tartalmát. 
*/
/* saját megoldás, csak egyszer lehet elvégezni*/
 //floor az lefele kerekit, ezért irhatok 20 at és nem csak 19 et(mert a 20.9 et is 20-nak veszi)
 /*var randNum=Math.floor(Math.random()*20+1);
console.log(randNum);
var mySpans = document.querySelectorAll('span');
mySpans[2].addEventListener('dblclick', function(){
    mySpans[2].textContent=randNum;
});*/

/*video megoldás*/
function getRandomArbitary(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
console.dir(document.getElementById('element-three'));
document.getElementById('element-three').ondblclick = function () {
    document.getElementById('element-three').firstElementChild.innerHTML = getRandomArbitary(1,20);
}

/*
4. doboz:
Kattintásra tűnjön el, majd egy 1 másodperces várakozás után ismét jelenjen meg.
*/
document.getElementById('element-four').onclick = function(){
    document.getElementById('element-four').classList.add('hidden');
    setTimeout(function( ){
        document.getElementById('element-four').classList.remove('hidden');
    },2000);
}

/*
5. doboz:
Kattintásra alakítsa kör alakúra az összes dobozt.
*/

console.log(document.querySelector('.container'));
document.getElementById('element-five').onclick = function(){
    var boxes = document.querySelectorAll('.shape');
    for (var box of boxes){
        box.style.borderRadius = '50%';
    }
    /*setTimeout(function( ){
        for (var box of boxes){
            box.style.borderRadius = '0%';
        }    },2000);*/
}

/*
6. doboz:
Form submit eseményre módosítsuk a doboz tartalmát az input mezőbe írt értékkel
*/


/*
7. doboz:
Keypress eseményre írjuk be a dobozba az adott karaktert, amit leütöttek
*/


/*
8. doboz:
Egérmozdítás eseményre írjuk be az egér pozíciójának x és y koordinátáját, 
a következő séma szerint: "X: {x-koordináta}, Y: {y-koordináta}"
*/


/*
9. doboz:
Submit eseményre módosítsuk a doboz tartalmát azzal az értékkel ami úgy áll elő, 
hogy végrehajtjuk a select inputban kiválasztott operációt,
a state-en és number inputba beírt értéken.

Az előállt végeredményt tároljuk el új state-ként!

Pl:
  Number input mezőbe írt érték: 5
  Select inputban kiválasztott érték: "mult"
  Aktuális state: 9

  Operáció: 9 * 5
  
  Dobozba és state-be beírandó érték: 45
*/