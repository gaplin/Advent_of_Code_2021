const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()

let fish = input.split(',').map(x => parseInt(x, 10))
for(let i = 1; i <= 80; ++i) {
    let limit = fish.length
    for(let j = 0; j < limit; ++j) {
        fish[j] -= 1
        if(fish[j] < 0) {
            fish[j] = 6
            fish.push(8)
        }
    }
}

console.log(fish.length)