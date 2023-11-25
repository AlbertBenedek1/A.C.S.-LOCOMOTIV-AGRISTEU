console.log("Deli harangszo");
console.log(['tehen', 'lo','kutya']);
console.log([2,13,3]);
console.log([2,13,3][1]);
console.log([[2,4],[4,6],[11,43]]);
console.log([[2,4],[4,6],[11,43]][1][1]);

console.log(
    {
        firstName: 'József',
        lastName: 'Kovács',
        age: 30,
        phoneNumbers: ['067023456', '067023457'],
        address: {  
            street: 'Király u.',            //
            city: 'Budapest'                //objektumba obbjektum
        }                            
    }.address.city
    )

// Feladat : hogyan érem el az objektum tömbb harmadik elemének a country kulcs értékpárját (a provider kulcs alatt lévő country kulcs érétk párja)
    console.log(
        [ 
            {                                   //objektum tömb
                brand: 'Apple',
                name: 'iPhone X',
                price: 250000,
                provider: {
                    country: 'HU',
                    name: 'Vodafone'
                }
            },
            {
                brand: 'Huawei',
                name: '10',
                price: 180000,
                provider: {
                    country: 'DE',
                    name: 'T-Mobile'
                }
            },
            {
                brand: 'ZTE',
                name: 'Blade',
                price: 110000,
                provider: {
                    country: 'DE',
                    name: 'Vodafone'
                }
            }
        ][2].provider.country
    )
    
    console.log(2 != 2);

    console.log(2 == '2'); //igaz (equality)
    console.log(2 === '2'); //hamis (identify)

    
    