const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split(',')
    .map(
        x => x.split('=')[1].split('..').map(x => parseInt(x, 10))
    )
    
const min_x = input[0][0]
const max_x = input[0][1]
const min_y = input[1][0]
const max_y = input[1][1]

function simulate(min_x, max_x, min_y, max_y, x_velocity, y_velocity) {
    let position = [0, 0]
    let last_position = [0, 0]
    while(true) {
        position[0] += x_velocity
        position[1] += y_velocity
        if(min_x <= position[0] && position[0] <= max_x && min_y <= position[1] && position[1] <= max_y) {
            return true
        }
        if(position[0] > max_x || position[1] < min_y) {
            return false
        }
        if(last_position[0] == position[0] && position[0] < min_x) {
            return false
        }
        last_position[0] = position[0]
        last_position[1] = position[1]
        x_velocity = Math.max(0, x_velocity - 1)
        --y_velocity
    }
}

const velocities = new Set()
for(let i = 0; i <= max_x; ++i) {
    for(let j = min_y; j < 1000; ++j) {
        const success = simulate(min_x, max_x, min_y, max_y, i, j)
        if(success) {
            velocities.add([i, j].toString())
        }
    }
}

console.log(velocities.size)