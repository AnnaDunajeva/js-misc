var Heap = require('heap');

var heap = new Heap();
heap.push(3);
heap.push(1);
heap.push(2);
console.log(heap.pop()); // 1

