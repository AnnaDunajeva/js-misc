//Implementation of median maitanence algorithm using two heaps, one minHeeap and one maxHeap
//Input: array (interpreted as stream of numbers one by one to imitate dynamic data)
//Output: sum of medians

const heap = require('collections/heap');
// const testArray = [1,2,3,4,5,6,7,8,9,10,11,12,14,2,15,30,35,67,23,25,54,47,19,29];

//maxHeap   minHeap     * - median
//  3*          4
// / \         / \
//1   2       5   6

//Data from stanford exersice: 10000 integers
const fs = require('fs');
const data = fs.readFileSync('Median.txt', 'utf8');
const array = data.split(/\r\n|\n/);
array.pop();
for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i]);
}
console.log(array.slice(-1));
console.log(array.length);

function calculateMedianSum (array) {
    sumOfMedians = array[0];
    maxHeap = new heap();
    minHeap = new heap([array[0]], null, function(a,b) {
        return b - a;
    })
    for (let i = 1; i <array.length; i++) {
        //push number in one of heaps:
        const minValue = minHeap.pop();
        if (array[i] > minValue) {
            minHeap.push(array[i]);
        } else {
            maxHeap.push(array[i]);
        } 
        minHeap.push(minValue);
        //rebalance heaps:  
        if (maxHeap.length - minHeap.length > 1) {
            const max = maxHeap.pop();
            minHeap.push(max);
        }
        if (minHeap.length - maxHeap.length > 1) {
            const min = minHeap.pop();
            maxHeap.push(min);
        }
        //find new median and recalculate sum:
        if (minHeap.length === maxHeap.length || minHeap.length < maxHeap.length ) {
            const median = maxHeap.pop();
            sumOfMedians += median;
            maxHeap.push(median);
        } else if (minHeap.length > maxHeap.length){
            const median = minHeap.pop();
            sumOfMedians += median;
            minHeap.push(median);
        }
    }
    return sumOfMedians;
}
const mediansSum = calculateMedianSum(array);
console.log(mediansSum);
console.log(mediansSum%10000);

//Answer: sumOfMedians = 46831213, sumOfMedian mod 10000 = 1213;