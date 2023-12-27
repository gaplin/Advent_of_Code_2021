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
const endings = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>'
}

const scoring = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

for(let i = input.length - 1; i >= 0; --i) {
    const S = []
    for(const char of input[i]) {
        const opening = openings[char]
        if(opening == null) {
            S.push(char)
            continue
        }
        const last_char = S.pop()
        if(last_char == opening || last_char == undefined) {
            continue
        }
        input.splice(i, 1)
        break
    }
}

const scores = []
for(let i = input.length - 1; i >= 0; --i) {
    const S = []
    for(const char of input[i]) {
        const opening = openings[char]
        if(opening == null) {
            S.push(char)
            continue
        }
        S.pop()
    }
    let score = 0
    while(S.length > 0) {
        const ending = endings[S.pop()]
        score = score * 5 + scoring[ending]
    }
    scores.push(score)
}

scores.sort((x, y) => x - y)
console.log(scores[Math.floor(scores.length / 2)])