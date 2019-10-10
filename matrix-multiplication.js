//Implemintation of Strassen's Subcubic Matrix Multiplication Algorithm
//Input: n*n integer matrices X and Y. 
//Output: Z = X*Y.
//Assumption: n is a power of 2. Matrix size is 2^n * 2^n.

//P1 = A·(F - H) 
//P2 =(A + B)·H 
//P3 =(C + D)·E 
//P4 = D·(G - E) 
//P5 =(A + D)·(E + H) 
//P6 =(B - D)·(G + H) 
//P7 =(A - C)·(E + F)
//Result of multiplication:
// |P5 + P4 - P2 + P6   P1 + P2          |
// |P3 + P4             P1 + P5 - P3 - P7|

var matrix1 = [
    [1, 2, 3, 5],
    [1, 2, 3, 1],
    [1, 2, 0, 5],
    [1, -1, 3, 5]];
var matrix2 = [
    [1, 1, 0, 0],
    [-1, 0, 1, 0],
    [0, -1, 0, 1],
    [0, 0, -1, -1]];
// var matrix1 = [
// [1, 1],
// [0, 1]]

// var matrix2 = [
//     [0, -1],
//     [1,0]
// ]

function divideMatrix (matrix){
    var n = matrix.length;
    var half = n / 2;
    var a = [];
    var b = [];
    var c = [];
    var d = [];
    var halfed = [];
    for (let i = 0; i < n; i++) {
        halfed.push(matrix[i].slice(0,half));
        halfed.push(matrix[i].slice(half));
    }
    for (let i = 0; i < n * 2; i++) {
        if (i < n) { //n and not n/2 because we have double amount of elements in halfed list, so its center now is n
            if (i % 2 === 0) {
                a.push(halfed[i]);
            } else {
                b.push(halfed[i]);
            }
        } else { //if (i >= n) 
            if (i % 2 === 0) {
                c.push(halfed[i]);
            } else {
                d.push(halfed[i]);
            }
        }
    }
    return [a, b, c ,d];
}

function toOneMatrix (a, b, c, d) {
    result = [];
    for (let i = 0; i <a.length; i++) {
        result.push(a[i].concat(b[i]));

    }
    for (let i = 0; i <c.length; i++) {
        result.push(c[i].concat(d[i]));
    }
    return result;
}

function sumMatrices (matrix1, matrix2) {
    var result = [];
    for (i = 0; i < matrix1.length; i++) {
        var intermidiate = [];
        for (j = 0; j < matrix1.length; j++) {
            intermidiate.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(intermidiate);
    }
    return result;
}

function subtractMatrices (matrix1, matrix2) {
    var result = [];
    for (i = 0; i < matrix1.length; i++) {
        var intermidiate = [];
        for (j = 0; j < matrix1.length; j++) {
            intermidiate.push(matrix1[i][j] - matrix2[i][j]);
        }
        result.push(intermidiate);
    }
    return result;
}

function strassenMultiply(matrix1, matrix2) {
    if (matrix1.length === 1) {
        return [[matrix1[0][0] * matrix2[0][0]]];
    } else {
        var abcd = divideMatrix(matrix1);
        var efgh = divideMatrix(matrix2);
        var a = abcd[0];
        var b = abcd[1];
        var c = abcd[2];
        var d = abcd[3];
        var e = efgh[0];
        var f = efgh[1];
        var g = efgh[2];
        var h = efgh[3];
        
        var p1 = strassenMultiply(a, subtractMatrices(f, h));
        var p2 = strassenMultiply(sumMatrices(a,b), h);
        var p3 = strassenMultiply(sumMatrices(c, d), e);
        var p4 = strassenMultiply(d, subtractMatrices(g, e));
        var p5 = strassenMultiply(sumMatrices(a, d), sumMatrices(e, h));
        var p6 = strassenMultiply(subtractMatrices(b, d), sumMatrices(g, h));
        var p7 = strassenMultiply(subtractMatrices(a, c), sumMatrices(e, f))

        var aNew = sumMatrices(subtractMatrices(sumMatrices(p5, p4), p2), p6);
        var bNew = sumMatrices(p1, p2);
        var cNew = sumMatrices(p3, p4);
        var dNew = subtractMatrices(sumMatrices(p1, p5), sumMatrices(p3, p7));

        var result = toOneMatrix(aNew, bNew, cNew, dNew);
        return result;
    }
}

console.log(strassenMultiply(matrix1, matrix2));
console.log(sumMatrices(matrix1, matrix2));
console.log(subtractMatrices(matrix1, matrix2));
console.log(divideMatrix(matrix2));