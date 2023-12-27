const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')
    .map(x => parseInt(x, 10))

const n = input.length
result = 0
for(let i = 0; i < n - 3; ++i) {
    sum1 = input[i]
    sum2 = input[i + 3]
    for(let j = 1; j < 3; ++j) {
        sum1 += input[i + j]
        sum2 += input[i + j]
    }
    if(sum2 > sum1) {
        ++result
    }
}
console.log(result)