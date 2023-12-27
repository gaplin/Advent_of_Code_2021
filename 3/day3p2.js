const fs = require('fs');

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')

function oxygen_rating(nums, idx) {
    if(nums.length == 1) {
        return nums[0]
    }
    let ones = []
    let zeros = []
    for(let num of nums) {
        if(num[idx] == '1') {
            ones.push(num)
        } else {
            zeros.push(num)
        }
    }
    if(ones.length >= zeros.length) {
        return oxygen_rating(ones, idx + 1)
    }
    else {
        return oxygen_rating(zeros, idx + 1)
    }
}

function co2_rating(nums, idx) {
    if(nums.length == 1) {
        return nums[0]
    }
    let ones = []
    let zeros = []
    for(let num of nums) {
        if(num[idx] == '1') {
            ones.push(num)
        } else {
            zeros.push(num)
        }
    }
    if(zeros.length <= ones.length) {
        return co2_rating(zeros, idx + 1)
    }
    else {
        return co2_rating(ones, idx + 1)
    }
}

console.log(parseInt(oxygen_rating(input, 0), 2) * parseInt(co2_rating(input, 0), 2))
