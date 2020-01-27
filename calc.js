//const input = "( ( ( ( ( 1 * 2 + 1 ) * 2 ) + 1 * 4 ) + ( 4 - 2 * 2 ) ) * ( ( 2 - 1 ) * 3 ) ) + 5";
const input = "-21*11 + 2*(-10 +3) /2"

let symbols = input.split(" ").join("").split("");
const numbers = '0123456789';
debugger
const modifiedInput = []
let i = 0
while (i < symbols.length) {
    if (numbers.includes(symbols[i])) { 
        let num = symbols[i]
        if (i > 0 && symbols[i - 1] === "-" && (i === 1 || symbols[i - 2] === "(")) {
            modifiedInput.pop()
            num = '-' + num
        }
        i++
        while (numbers.includes(symbols[i])) {
            num = num + symbols[i]
            i++
        }
        modifiedInput.push(parseInt(num))
    } else {
        modifiedInput.push(symbols[i])
        i++
    }
}
symbols = modifiedInput
// for (let i = 0; i < symbols.length; i++) {
//     let num = ''
//     if (numbers.includes(symbols[i])) { 
//         if (i > 0 && symbols[i - 1] === "-" && (i === 1 || symbols[i - 2] === "(")) {
//             //let number = parseInt("-" + symbols[i]);
//             //symbols.splice(i - 1, 2, number);
//             num = '-' + num
//         } else {
//             symbols[i] = parseInt(symbols[i]);
//             //let number = parseInt(symbols[i]);
//             //symbols.splice(i, 1, number);
//         }
//     }
// }

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
        } else if (symbols[i] === '/') { 
            if (symbols [i + 1] === 0) {
                throw new Error('Division by 0 is not allowed!')
            }
            let multiplied = symbols[i - 1] / symbols [i + 1];
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