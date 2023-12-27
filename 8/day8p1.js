const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(x => x.split(' | ')
        .map(x => x.split(' '))
        )
 
let result = 0

for(let pattern of input) {
    for(let target of pattern[1]) {
        let length = target.length
        if(length == 2 || length == 3 || length == 4 || length == 7) {
            result += 1
        }
    }
}

console.log(result)