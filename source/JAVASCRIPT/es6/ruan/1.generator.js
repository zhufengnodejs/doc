function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next());
// { value: 'hello', done: false }

console.log(hw.next());
// { value: 'world', done: false }

console.log(hw.next());
// { value: 'ending', done: true }

console.log(hw.next());
// { value: undefined, done: true }