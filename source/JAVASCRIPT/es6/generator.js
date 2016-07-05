var r = 3;

function* infinite_ap(a) {
    for( var i = 0; i < 3 ; i++) {
        a = a + r ;
        yield a;
    }
}

var sum = infinite_ap(5);

console.log(sum.next()); // returns { value : 8, done : false }
console.log(sum.next()); // returns { value : 11, done: false }
console.log(sum.next()); // returns { value : 14, done: false }
console.log(sum.next()); //return { value: undefined, done: true }