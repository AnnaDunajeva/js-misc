//Implementation of closest pair algorithm using divide-and-conquer method.
//Input: 2 copies Px and Py of n>= 2 points in the plane, sorted by x and y coordinate, respectively. Points should be distinct.
//Output: array [pi,pj] of distinct points with smallest Euclidean distance between them.

//var coordinates = [ [ 12, -8 ],[ 4, -12 ],[ 18, 3 ], [ -16, -2 ], [ 7, 5 ], [ 14, 9 ], [ 8, 8 ], [ 2, 17 ], 
//[ -12, 17 ], [ 15, 14 ], [ 8, -16 ], [ 9, -9 ], [ -3, -12 ], [ -13, -9 ]  [ -9, 18 ], [ 10, 11 ], 
//[ -16, 12 ], [ -10, 8 ], [ 5, -15 ], [ -18, -19 ] ] //interesting dataset, bruteforce and my algorithm return differnt pairs, but distance is surprisingly equal
// var coordinates = [[11,5], [10,5], [1,4], [1,1], [12,5], [1,0], [1,11], [13,12], [1,13], [14,5], [1,14], [15,15], [1,16], [15,5]];
// var coordinates = randomPointsGenerator(13, 5);  

// var sortedByX = mergeSortCoordinates(coordinates, 0);
// var sortedByY = mergeSortCoordinates(coordinates, 1);

function closestPair (sortedByX, sortedByY) {
    if (sortedByX.length <= 3) {
        let currentClosestPair = [];
        let closestDistance = Infinity;
        for (let i = 0; i < sortedByX.length - 1; i++) {
            //we dont need to take sqrt as in actual formula, because we dont care 
            //about absolute distance, we only want to compare distances, so sqrt
            //does not chenge the result of this comparison.
            for (let j = 1; j < sortedByX.length - i; j++) {
                let distance = calculateDistance(sortedByX[i], sortedByX[i + j]);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    currentClosestPair[0] = sortedByX[i];
                    currentClosestPair[1] = sortedByX[i + j];
                }
            }
        }
        return currentClosestPair;
    } else {
        let center = Math.trunc(sortedByX.length / 2);
        let centralX = sortedByX[center - 1][0];
        let centralY = sortedByX[center - 1][1]; //required to deal with equal x values on division line. 
                                                //Assumes that coordinates with one equal coordinate are 
                                                //sorted by the other coordinate.
        let leftX = sortedByX.slice(0, center);
        let rightX = sortedByX.slice(center);
        let leftY = [];
        let rightY = [];

        for (let i = 0; i < sortedByY.length; i++) {
            if (sortedByY[i][0] < centralX) {
                leftY.push(sortedByY[i]);
            } else if (sortedByY[i][0] === centralX) {
                if (sortedByY[i][1] < centralY) {
                    leftY.push(sortedByY[i]);
                } else if (sortedByY[i][1] === centralY && leftY.length < leftX.length) {
                    leftY.push(sortedByY[i]);
                } else {
                    rightY.push(sortedByY[i]);
                }
            } else {
                rightY.push(sortedByY[i]);
            }
        }

        let leftClosestPair = closestPair(leftX, leftY);
        let rightClosestPair = closestPair(rightX, rightY);

        //here we have to take sqrt because we need actual distance for setting boundry
        let dLeft = calculateDistance(leftClosestPair[0], leftClosestPair[1]);
        let dRight = calculateDistance(rightClosestPair[0], rightClosestPair[1]);
        
        let bestDistanceSoFar = Math.sqrt(Math.min(dLeft, dRight));
        
        let splitPair = closestSplitPair(sortedByX, sortedByY, bestDistanceSoFar);
        let dSplit = Infinity;

        if (splitPair.length > 1) {
            dSplit = calculateDistance(splitPair[0], splitPair[1]);
        }

        let dBest = Math.min(dLeft, dRight, dSplit);
        if (dBest === dLeft) {
            return leftClosestPair;
        } else if (dBest === dRight) {
            return rightClosestPair;
        } else {
            return splitPair;
        }
    }
}

function calculateDistance (point1, point2) {
    let distance = (point1[0] - point2[0])**2 + (point1[1] - point2[1])**2;
    return distance;
}

function closestSplitPair (sortedByX, sortedByY, border) {
    let center = Math.trunc(sortedByX.length / 2);
    let centralX = sortedByX[center-1][0];
    let range = [centralX - border, centralX + border];
    let selectedY = [];
    let closestDistance = border;
    let bestPair = [];
    for (let i = 0; i < sortedByX.length; i++) {
        if (sortedByY[i][0] >= range[0] && sortedByY[i][0] <= range[1]) {
            selectedY.push(sortedByY[i]);
        }
    }
    if (selectedY.length < 2) {
        return bestPair;
    }
    for (let i = 0; i < selectedY.length - 1; i++) {
        for (let j = 1; j < Math.min(7, selectedY.length - i); j++) {
            let distance = Math.sqrt(calculateDistance(selectedY[i], selectedY[i +j]));
            if (distance < closestDistance) {
                closestDistance = distance;
                bestPair[0] = selectedY[i];
                bestPair[1] = selectedY[i + j];
            }
        }
    }
    return bestPair;
}

//modified mergesort to sort coordinates by x or y coordinate. If one are equal, then sorts according the other coordinate.
//array is matrix containing coordinates of points.
//index 0 coresponds to x coordinate, index 1 coresponds to y coordinate.
function mergeSortCoordinates (array, index) {
    if (array.length < 2) {
        return array;
    } else {
        let center = Math.trunc(array.length / 2);
        let left = mergeSortCoordinates(array.slice(0, center), index);
        let right = mergeSortCoordinates(array.slice(center), index);
        var sorted = [];
        for (let i = 0, j = 0; i < left.length, j < right.length; i++, j++) {
            if (left[i][index] < right[j][index]) {
                sorted.push(left[i]);
                if (i === left.length - 1) {
                    sorted = sorted.concat(right.slice(j));
                    break;
                }
                j--;
            } else if (left[i][index] === right[j][index]) {
                if (left[i][1] < right[j][1] || left[i][0] < right[j][0]) {
                    sorted.push(left[i]);
                    if (i === left.length - 1) {
                        sorted = sorted.concat(right.slice(j));
                        break;
                    }
                    j--;
                } else {
                    sorted.push(right[j]);
                    if (j === right.length - 1) {
                        sorted = sorted.concat(left.slice(i));
                        break; 
                    }
                    i--;
                } 
            } else {
                sorted.push(right[j]);
                if (j === right.length - 1) {
                    sorted = sorted.concat(left.slice(i));
                    break; 
                }
                i--;
            }
        }
    }
    return sorted;
}

//generates coordinates, numbers are integers. to make floats, remove first math.floor at coordinate generation.
function randomPointsGenerator(numberOfPoints, maxValue) {
    let coordinates = []
    for (let i = 0; i < numberOfPoints; i++) {
        if (Math.floor(Math.random() * 2) === 0) {
            var x = -1 * Math.floor(Math.random() * Math.floor(maxValue));
        } else {
            var x = Math.floor(Math.random() * Math.floor(maxValue));
        }
        if (Math.floor(Math.random() * 2) === 0) {
            var y = -1 * Math.floor(Math.random() * Math.floor(maxValue));
        } else {
            var y = Math.floor(Math.random() * Math.floor(maxValue));
        }
        coordinates.push([x, y])
    }
    return coordinates;
}

function bruteForceClosestPair (coordinates) {
    let bestDistance = Infinity;
    let bestPair = []
    for (i = 0; i < coordinates.length - 1; i++) {
        for (j = 1; j < coordinates.length - i; j++) {
            var distance = calculateDistance(coordinates[i], coordinates[i + j]);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestPair[0] = coordinates[i];
                bestPair[1] = coordinates[i + j];
            }
        }
    }
    return bestPair;
}

export {closestPair, mergeSortCoordinates, calculateDistance, randomPointsGenerator}


// console.log(sortedByX, sortedByY);
// var result1 = closestPair (sortedByX, sortedByY);
// console.log("algorithm: ", result1);
// console.log("distance1: ", Math.sqrt(calculateDistance(result1[0], result1[1])));
// var result2 = bruteForceClosestPair(coordinates);
// console.log("bruteforce: ", result2);
// console.log("distance2: ", Math.sqrt(calculateDistance(result2[0], result2[1])));