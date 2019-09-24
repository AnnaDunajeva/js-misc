//Implemented mergesort algoritm with added functionality of finding number of inversions
// and closest pair.
var toSort = [1, 5, 8, 22, 90, 35, 2, 5, 9, 15];
var inversions = 0;
var difference = Infinity;
var closestPair = [];
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
                newDifference = right[j] - left[i];
                if (newDifference < difference) {
                    difference = newDifference;
                    closestPair = [left[i], right[j]];
                }
                if (i === left.length - 1) {
                    sorted = sorted.concat(right.slice(j));
                    break;
                }
                j--;
            } else if (left[i] > right [j]) {
                sorted.push(right[j]);
                inversions = inversions + right.length - i;
                newDifference = left[i] - right[j];
                if (newDifference < difference) {
                    difference = newDifference;
                    closestPair = [left[i], right[j]];
                }
                if (j === right.length - 1) {
                    sorted = sorted.concat(left.slice(i));
                    break; 
                }
                i--;
            }
            else if (left[i] === right [j]) {
                sorted.push(right[j], left [i]);
                newDifference = 0;
                if (newDifference < difference) {
                    difference = newDifference;
                    closestPair = [left[i], right[j]];
                }
                if (j === right.length - 1 && i === left.length - 1) {
                    break; 
                } else if (j === right.length - 1) {
                    sorted = sorted.concat(left.slice(i));
                    break; 
                } else if (i === left.length - 1) {
                    sorted = sorted.concat(right.slice(j));
                    break;
                }   
            }     
        }
    }
    return sorted;
}
console.log('Input:',toSort);
console.log('Sorted output:',mergeSort(toSort));
console.log('inversion: ',inversions, 'closestPair:',closestPair);