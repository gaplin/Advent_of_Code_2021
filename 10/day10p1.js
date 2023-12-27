const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const openings = {
    '(': null,
    ')': '(',
    '[': null,
    ']': '[',
    '{': null,
    '}': '{',
    '<': null,
    '>': '<'
}
const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

let result = 0
for(const line of input) {
    const S = []
    for(const char of line) {
        const opening = openings[char]
        if(opening == null) {
            S.push(char)
            continue
        }
        const last_char = S.pop()
        if(last_char == opening || last_char == undefined) {
            continue
        }
        result += scores[char]
    }
}

console.log(result)