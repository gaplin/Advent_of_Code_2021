const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

let template = input[0]
const rules = {}

for(let i = 2; i < input.length; ++i) {
    const rule = input[i].split(' -> ')
    rules[rule[0]] = rule[1]
}

for(let i = 0; i < 10; ++i) {
    let new_template = ''
    for(let j = 1; j < template.length; ++j) {
        const pair = template[j - 1] + template[j]
        const between = rules[pair]
        new_template += pair[0] + between
        if(j == template.length - 1) {
            new_template += pair[1]
        }
    }
    template = new_template
}

const occurs = {}
for(let i = 0; i < template.length; ++i) {
    if(!(template[i] in occurs)) {
        occurs[template[i]] = 0
    }
    occurs[template[i]] += 1
}

let min_occ = 99999999
let max_occ = -9999999

for(const [_, value] of Object.entries(occurs)) {
    min_occ = Math.min(min_occ, value)
    max_occ = Math.max(max_occ, value)
}

console.log(max_occ - min_occ)