const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')
    .map(x => parseInt(x, 10))

const n = input.length
result = 0
for(let i = 1; i < n; ++i) {
    if(input[i] > input[i - 1]) {
        ++result
    }
}
console.log(result)