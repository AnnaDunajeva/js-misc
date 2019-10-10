//select i'th smallest element in O(n) running time using deterministically selected pivot
//Input: array of integers and an i
//Output: the i'th order statistic of A.

function randomArray(length, maxValues) {
    let randArr = [];
    for (let i = 0; i < length; i++) {
        let element = Math.floor(Math.random() * maxValues);
        randArr.push(element);
    }
    return randArr;
}

function mergeSort (array) {
    if (array.length < 2) {
        return array;
    } else {
        var center = Math.trunc(array.length / 2);
        var left = mergeSort(array.slice(0, center));
        var right = mergeSort(array.slice(center));
        var sorted = [];
        for (let i = 0, j = 0; i < left.length, j < right.length; i++, j++) {
            if (left[i] < right[j]) {
                sorted.push(left[i]);
                if (i === left.length - 1) {
                    sorted = sorted.concat(right.slice(j));
                    break;
                }
                j--;
            } else if (left[i] > right [j]) {
                sorted.push(right[j]);
                if (j === right.length - 1) {
                    sorted = sorted.concat(left.slice(i));
                    break; 
                }
                i--;
            }
            else if (left[i] === right [j]) {
                sorted.push(right[j], left [i]);
                if (j === right.length - 1 && i === left.length - 1) {
                    break; 
                } else if (j === right.length - 1) {
                    sorted = sorted.concat(left.slice(i + 1));
                    break; 
                } else if (i === left.length - 1) {
                    sorted = sorted.concat(right.slice(j + 1));
                    break;
                }   
            }     
        }
    }
    return sorted;
}

function partition(array) { //array with pivot at index 0
    let pivot = array[0];
    let j = 1;
    let sameAsPivot = 0;
    let duplicate = 0;
    for (let i = 1; i < array.length; i++) {
        let toCompare = array[i];
        if (pivot >= toCompare) {
            if (pivot === toCompare) {
                if (duplicate === 0) {
                    array.splice(i, 1);
                    duplicate++;
                    i--;
                } else {
                    array[i] = array[j];
                    sameAsPivot++;
                    array[j] = array[sameAsPivot];
                    array[sameAsPivot] = pivot;
                    j++;
                }
            } else {
                array[i] = array[j];
                array[j] = toCompare;
                j++;
            }
        } 
    }
    if (duplicate === 0) { 
        array.pop();
    } else {
        for (let i = 0; i < sameAsPivot + 1; i++) {
            array[i] = array[j - 1];
            array[j - 1] = pivot;
            j--;
        }
    }
    return {
        pivotPosition: j, 
        sameAsPivot: sameAsPivot 
    }
}

function deterministicSelection(array, i) {
    // console.log('I: ', i)
    recursionCount += 1;
    if (array.length === 1) {
        return array[0];
    } else {
        let medians = [];
        if (array.length < 5) {
            let sorted = mergeSort(array);
            let medianIndex = Math.trunc(array.length / 2);
            medians.push(sorted[medianIndex]);
        } else {
            let extra = array.length % 5;
            if (extra > 0) {
                let sorted = mergeSort(array.slice(array.length - extra));
                let medianIndex = Math.trunc(extra / 2);
                medians.push(sorted[medianIndex]);
            }
            for (let j = 0; j < array.length - extra; j += 5) {
                let sorted = mergeSort(array.slice(j, j + 5));
                medians.push(sorted[2]);
            }
            
        }
        // console.log('medians: ', medians)
        let pivot = deterministicSelection(medians, Math.trunc(array.length / 10 + 1)); //plus one because it should not be index, but number count
        // console.log('pivot: ', pivot);
        array.unshift(pivot);
        // console.log('array to partition: ', array);
        let partitioned = partition(array);
        // console.log('partitioned array, i and pivot position: ', array, i, partitioned.pivotPosition);
        if (partitioned.pivotPosition <= i - 1 && partitioned.pivotPosition + partitioned.sameAsPivot >= i - 1) { // minus one is required to comver i to index (otherwise its number count)
            return array[partitioned.pivotPosition];
        } else if (partitioned.pivotPosition > i - 1) {
            return deterministicSelection(array.slice(0, partitioned.pivotPosition), i);
        } else {
            return deterministicSelection(array.slice(partitioned.pivotPosition + partitioned.sameAsPivot + 1), i - (partitioned.pivotPosition + partitioned.sameAsPivot) - 1);
        }
    }
}
let recursionCount = 0;
let input = randomArray(100,150);
// console.log(input.slice(20, 31));
let array = input.slice(0);
let ithElement = deterministicSelection(array, 10);
let sortedInput = (mergeSort(input));
console.log(sortedInput.slice(0, 10));
console.log('ithelement: ', ithElement, 'recursionCount:', recursionCount);