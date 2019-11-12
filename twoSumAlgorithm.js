//Implementation of two sum algorithm - finds if among given numbers there are two numbers which sum up to target sum
//Input: array of numbers
//Output: Amount of numbers in given range that can be formed by sum of two numbers in array

//Stanford exersice: find number of target sums in range -10000, 10000 that can be formed by sum of two DISTINCT numbers in array of 1000000 integers
//Running time super slow right now, about 3-4 hours

// const numbers = {
//     1:1,
//     2:2,
//     3:3,
//     4:4,
//     5:5,
//     6:6,
//     7:7,
//     7:7,
//     8:8,
//     9:9,
//     10:10,
//     11:11,
//     12:12,
//     13:13
// };
// const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

//Data from stanford course, 1000000 numbers
const fs = require('fs');
const data = fs.readFileSync('algo1-programming_prob-2sum.txt', 'utf8');
const array = data.split(/\r\n|\n/);
array.pop();
for (let i = 0; i<array.length;i++){
    array[i] = parseInt(array[i]);
}

numbers = new Set(array);

function twoSum(numbers, targetSum) {
    for (let number of numbers) {
        const secondNumber = targetSum - number;
        if (secondNumber !== number && numbers.has(secondNumber)) {
            // console.log(number, secondNumber, targetSum);
            return 1;
        }
    }
    return 0;
}

function countPairs(numbers, intervalStart, intervalEnd) {
    let targetCount = 0;//counts how many target sums you can get by summing two distinct numbers from numbersObject
    for (let i = intervalStart; i <= intervalEnd; i++) {
        // console.log(i);
        targetCount += twoSum(numbers, i);
        // console.log('target count ',targetCount);
    }
    return targetCount;
}

const start = process.hrtime.bigint();
console.log(countPairs(numbers, 8000, 10000));
const end = process.hrtime.bigint();

const runningTime = (end-start)/BigInt(60000000000);
console.log('running time in min: ', runningTime);

//Answer: 427
//It took 1 min to check 500 sums with Set implementation (and 7 min for 2000 sums) whereas it took 13 min with standard Object implementation and about 3-4 hours with paralelization for all 20000 sums