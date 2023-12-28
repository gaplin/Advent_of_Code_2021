const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split(',')
    .map(
        x => x.split('=')[1].split('..').map(x => parseInt(x, 10))
    )
    
let steps = 0
const min_x = input[0][0]
const max_x = input[0][1]
const min_y = input[1][0]
const max_y = input[1][1]
for(let i = 0; i < 99999; ++i) {
    const righmost_point = i * (i + 1) / 2
    if(righmost_point > max_x) {
        break
    }
    if(righmost_point >= min_x) {
        steps = i
    }
}

function simulate(min_y, max_y, velocity, steps) {
    let position = 0
    let result = 0
    let correct_position = false

    for(let i = 0; i < steps; ++i) {
        position += velocity
        result = Math.max(result, position)
        --velocity
    }

    while(true) {
        if(position < min_y && velocity < 0) {
            break
        }
        if(min_y <= position && position <= max_y) {
            correct_position = true
            break
        }
        position += velocity
        result = Math.max(result, position)
        --velocity
    }
    return [correct_position, result]
}

let result = 0
for(let i = 0; i < 10000; ++i) {
    const [success, y] = simulate(min_y, max_y, i, steps)
    if(success) {
        result = Math.max(result, y)
    }
}

console.log(result)