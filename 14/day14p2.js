const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const template = input[0]
const rules = {}

for(let i = 2; i < input.length; ++i) {
    const rule = input[i].split(' -> ')
    rules[rule[0]] = rule[1]
}

const occurs = {}
for(const char of template) {
    if(!(char in occurs)) {
        occurs[char] = 0
    }
    ++occurs[char]
}

let pairs = {}
for(let i = 1; i < template.length; ++i) {
    const pair = template[i - 1] + template[i]
    if(!(pair in pairs)) {
        pairs[pair] = 0
    }
    ++pairs[pair]
}

for(let i = 0; i < 40; ++i) {
    let new_pairs = {}
    for(const [pair, count] of Object.entries(pairs)) {
        const middle = rules[pair]
        if(!(middle in occurs)) {
            occurs[middle] = 0
        }
        occurs[middle] += count
        const left = pair[0] + middle
        const right = middle + pair[1]
        if(!(left in new_pairs)) {
            new_pairs[left] = 0
        }
        if(!(right in new_pairs)) {
            new_pairs[right] = 0
        }
        new_pairs[left] += count
        new_pairs[right] += count
    }
    pairs = new_pairs
}

let max = Object.values(occurs).reduce((acc, x) => Math.max(acc, x))
let min = Object.values(occurs).reduce((acc, x) => Math.min(acc, x))

console.log(max - min)