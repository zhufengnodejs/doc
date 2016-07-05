if(1 & 1){
    console.log('one');
}

while (1)
    console.log(1);
    console.log(1);

console.log(1 == 2);


Array.prototype.show = function(){
    console.log(this.toString());
}

function test() {
    if (true) {
        var x = 0;
    }

    x += 1; // Default: 'x' used out of scope.
    // No warning when funcscope:true
}