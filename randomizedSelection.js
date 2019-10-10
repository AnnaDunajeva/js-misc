//select i'th smallest element in O(n) running time using randomly selected pivot
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

function randomizedSelection(leftIndex, rightIndex, i) {
    if (leftIndex === rightIndex) {
        return array[leftIndex];
    } else {
        let pivotIndex = randomPivot(leftIndex, rightIndex);
        // console.log(array);
        // console.log(leftIndex, rightIndex);
        // console.log(pivotIndex);
        let pivot = array[pivotIndex];
        // console.log(pivot);
        array[pivotIndex] = array[leftIndex];
        array[leftIndex] = pivot;
        let partitioned = partition(leftIndex, rightIndex);
        //console.log(array, partitioned.pivotPosition);
        if (partitioned.pivotPosition <= i - 1 & partitioned.pivotPosition + partitioned.sameAsPivot >= i - 1) { // minus one is required to remove 0 from counting (so that i start from 1, not 0)
            return array[partitioned.pivotPosition];
        } else if (partitioned.pivotPosition > i - 1) {
            return randomizedSelection(leftIndex, partitioned.pivotPosition -1, i);
        } else {
            return randomizedSelection(partitioned.pivotPosition + partitioned.sameAsPivot + 1, rightIndex, i);
        }
    }
}

// let input = randomArray(20,50);
let input = [ 18, 43, 17, 48, 42, 13, 1, 11, 26, 25, 42, 26, 14, 8, 49, 42, 38, 19, 5, 25 ];
let array = input.slice(0);
let ithElement = randomizedSelection(0, array.length - 1, 10);
console.log(input, ithElement);