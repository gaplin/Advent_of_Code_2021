const fs = require('fs')

let nums = fs.readFileSync('input2.txt')
    .toString()
    .split(',')
    .map(x => parseInt(x, 10))

const n = nums.length
let result = 0
nums.sort((x, y) => x - y)

const target = nums[n / 2]
for(let i = 0; i < n; ++i) {
    result += Math.abs(target - nums[i])
}

console.log(result)