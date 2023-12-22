const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')

n = input.length
m = input[0].length
let half = Math.floor(n / 2)

let pow = 1
let gamma = 0
let epsilon = 0
for(let i = m - 1; i >= 0; --i) {
    let zeros = 0
    for(let j = 0; j < n; ++j) {
        if(input[j][i] == '0') {
            ++zeros
        }
    }
    if(zeros > half) {
        epsilon |= pow 
    } else {
        gamma |= pow
    }
    pow <<= 1
}

console.log(gamma * epsilon)