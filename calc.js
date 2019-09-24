var input = "( ( ( ( ( 1 * 2 + 1 ) * 2 ) + 1 * 4 ) + ( 4 - 2 * 2 ) ) * ( ( 2 - 1 ) * 3 ) ) + 5";
var symbols = input.split(" ");
var numbers = '0123456789';

symbols.forEach (function toNumber (symbol, index) {
    if (numbers.includes(symbol)) {
        var number = parseInt(symbol);
        symbols.splice(index, 1, number);
    } 
});

function calcWithBrackets (symbols, index) {
    for (let i = index; i < symbols.length; i++) {
        if (symbols[i] === '(') {
            calcWithBrackets (symbols, i + 1);
        } else {
            if (symbols[i] === ')') {
                break;
            }
        }
    }
    for (let i = index; i < symbols.length; i++){
        if (symbols[i] === '*') {
            let multiplied = symbols[i - 1] * symbols [i + 1];
            symbols.splice(i - 1, 3, multiplied);
            i--;
        } else if (symbols[i] === ')') {
                break;
            }
    }
    for (let i = index; i < symbols.length; i++) {
        if (symbols[i] === '+') {
            let summed = symbols[i - 1] + symbols [i + 1];
            symbols.splice(i - 1, 3, summed);
            i--;
        } else if (symbols[i] === '-') {
            let minused = symbols[i - 1] - symbols [i + 1];
            symbols.splice(i - 1, 3, minused);
            i--;
        } else if (symbols[i] === ')') {
            let result = symbols[i - 1]
            symbols.splice(i - 2, 3, result);
            break;
        }
    }
}
calcWithBrackets (symbols,0);
console.log(symbols[0]);

// function calculate (symbols) { 
//     for (let i = 0; i < symbols.length; i++) {
//         let symbol = symbols[i];
//         if (symbol === '*') {
//             let multiplied = symbols[i - 1] * symbols [i + 1];
//             symbols.splice(i - 1, 3, multiplied);
//             i--;
//         }
//         if (symbol === ')') {
//             break;
//         }
//     }
//     for (let i = 0; i < symbols.length; i++) {
//         let symbol = symbols[i];
//         if (symbol === '+') {
//             let summed = symbols[i - 1] + symbols [i + 1];
//             symbols.splice(i - 1, 3, summed);
//             i--;
//         }
//         if (symbol === '-') {
//             let minused = symbols[i - 1] - symbols [i + 1];
//             symbols.splice(i - 1, 3, minused);
//             i--;
//         }
//         if (symbol === ')') {
//             break;
//         }
//     }
//     return symbols
// }