//10(**n)*a*c + 10(**n/2)*(a*d-b*c) + b*d
//1234 == 12=a, 34=b; 
//5678 == 56=c, 78=d;
//ad+bc = (a+b)(c+d)-ac-bd
var number1 = 12686;
var number2 = 5647467467478;
function karatsuba (number1, number2) {
    // var integers2 = number2.toString().length;
    if (number1 < 10 && number2 < 10) {
        return number1 * number2;
    } else {
    var num1Stringified = number1.toString();
    var num2Stringified = number2.toString();
    var integers1 = num1Stringified.length;
    var integers2 = num2Stringified.length;
    if (integers1 < integers2 !== 0) {
        num1Stringified = "0".repeat(Math.abs(integers1 - integers2)) + num1Stringified;
        integers1 = num1Stringified.length;
    } else if (integers2 < integers1) {
        num2Stringified = "0".repeat(Math.abs(integers1 - integers2)) + num2Stringified;
        integers2 = num2Stringified.length;
    }
    var center = Math.floor(Math.min(integers1, integers2) / 2); //dont really need this because addition of 0 ensues that numbers are always the same length
    var a = parseInt(num1Stringified.slice(0,-center));
    var b = parseInt(num1Stringified.slice(-center));
    var c = parseInt(num2Stringified.slice(0,-center));
    var d = parseInt(num2Stringified.slice(-center));
    var ac = karatsuba(a, c);
    var bd = karatsuba(b, d);
    var summed = karatsuba(a+b, c+d);
    result = 10 ** (center * 2) * ac + 10 ** center * (summed - ac - bd) + bd;
    return result;
    }
}
console.log(karatsuba(number1, number2));
console.log(number1*number2);
