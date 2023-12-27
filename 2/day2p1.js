const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')


let horizontal = 0
let depth = 0

for(const line of input) {
    let steps = parseInt(line.split(' ')[1], 10)
    if(line[0] == 'f') {
        horizontal += steps
    } else if(line[0] == 'd') {
        depth += steps
    } else {
        depth -= steps
    }
}

console.log(horizontal * depth)