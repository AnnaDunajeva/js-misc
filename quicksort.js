'use strict'

// let array = [5,11,23,4,1,2,45,3,0];
const fs = require('fs');

const data = fs.readFileSync('QuickSort.txt', 'utf8');
let array = data.split(/\r\n|\n/);
for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i]);
}

let numberOfComparisons = 0;

function randomArray(length, maxValues) {
    let randArr = [];
    for (let i = 0; i < length; i++) {
        let element = Math.floor(Math.random() * maxValues);
        randArr.push(element);
    }
    return randArr;
}

function partition(leftIndex, rightIndex) { //array with pivot at index 0
    let pivot = array[leftIndex];
    let j = leftIndex + 1;
    let sameAsPivot = 0;
    for (let i = leftIndex + 1; i < rightIndex + 1; i++) {
        let toCompare = array[i];
        if (pivot >= toCompare) {
            array[i] = array[j];
            if (pivot === toCompare) {
                sameAsPivot++;
                array[j] = array[leftIndex + sameAsPivot];
                array[leftIndex + sameAsPivot] = pivot;
            } else {
                array[j] = toCompare;
            }
            j++;
        } 
    }
    for (let i = 0; i < sameAsPivot + 1; i++) {
        array[leftIndex + i] = array[j - 1];
        array[j - 1] = pivot;
        j--;
    }
    return {
        pivotPosition: j, 
        sameAsPivot: sameAsPivot
    }
}

function randomPivot (min, max) {
    let pivotIndex = Math.floor(Math.random() * (max - min + 1)) + min; //plus 1 to include max
    return pivotIndex;
}

function quickSort(leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
        return;
    } else {
        // let pivotIndex = randomPivot(leftIndex, rightIndex);
        let pivotIndex = leftIndex; //choose always first index
        let pivot = array[pivotIndex];
        array[pivotIndex] = array[leftIndex];
        array[leftIndex] = pivot;
        let partitioned = partition(leftIndex, rightIndex);
        numberOfComparisons += rightIndex - leftIndex;
        quickSort(leftIndex, partitioned.pivotPosition - 1);
        quickSort(partitioned.pivotPosition + partitioned.sameAsPivot + 1, rightIndex);
    }
}

console.log(`array length = ${array.length} (should be 10k)`)
console.log(`last element=${array[array.length-1]}`)
// let array = randomArray(20, 100);
console.log(array.slice(0, 10));
quickSort(0, array.length-1);
console.log(array.slice(0, 10));
console.log(numberOfComparisons);
