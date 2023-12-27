const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')


let horizontal = 0
let depth = 0
let aim = 0

for(const line of input) {
    let steps = parseInt(line.split(' ')[1], 10)
    if(line[0] == 'f') {
        horizontal += steps
        depth += aim * steps
    } else if(line[0] == 'd') {
        aim += steps
    } else {
        aim -= steps
    }
}

console.log(horizontal * depth)