const fs = require('fs')

let nums = fs.readFileSync('input2.txt')
    .toString()
    .split(',')
    .map(x => parseInt(x, 10))

function calculate_cost(source, target) {
    const distance = Math.abs(source - target)
    return (distance + 1) * distance / 2
}

const n = nums.length
const min_value = nums.reduce((acc, x) => Math.min(acc, x))
const max_value = nums.reduce((acc, x) => Math.max(acc, x))

let result = 999999999
for(let i = min_value; i <= max_value; ++i) {
    let current_result = 0
    for(let j = 0; j < n; ++j) {
        current_result += calculate_cost(nums[j], i)
    }
    result = Math.min(current_result, result)
}



console.log(result)