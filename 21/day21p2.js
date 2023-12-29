const fs = require('fs')

const starting_positions = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(x => parseInt(x.split(': ')[1]) - 1)

function simulate(P1, P2, target, cache) {
    const key = [P1, P2].toString()
    if(key in cache) {
        return cache[key]
    }
    if(P1[1] >= target) {
        let result = [1, 0]
        cache[key] = result
        return result
    } else if(P2[1] >= target) {
        let result = [0, 1]
        cache[key] = result
        return result
    }

    let result = [0, 0]
    
    for(let i = 1; i <= 3; ++i) {
        for(let j = 1; j <= 3; ++j) {
            for(let k = 1; k <= 3; ++k) {
                const roll = i + j + k;
                let new_position = (P1[0] + roll) % 10
                let new_score = P1[1] + new_position + 1
                let new_P1 = [new_position, new_score]
                const [score1, score2] = simulate(P2, new_P1, target, cache)
                result[0] += score2
                result[1] += score1
            }
        }
    }

    cache[key] = result
    return result
}

const Players = [[starting_positions[0], 0], [starting_positions[1], 0]]
const target = 21
const cache = {}

console.log(simulate(Players[0], Players[1], target, cache).reduce((acc, x) => Math.max(acc, x)))