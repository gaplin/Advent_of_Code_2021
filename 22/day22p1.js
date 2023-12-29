const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const steps = []
for(let line of input) {
    const step = []
    line = line.split(' ')
    step.push(line[0])
    const cords = line[1].split(',').map(x => x.split('=')[1]).map(x => x.split('..').map(x => parseInt(x, 10)))
    step.push(...cords)

    steps.push(step)
}

function get_interesction(segment_A, segment_B) {
    const low = Math.max(segment_A[0], segment_B[0])
    const high = Math.min(segment_A[1], segment_B[1])

    return [low, high]
}

function turn_on(X, Y, Z, cubes_on) {
    for(let x = X[0]; x <= X[1]; ++x) {
        for(let y = Y[0]; y <= Y[1]; ++y) {
            for(let z = Z[0]; z <= Z[1]; ++z) {
                cubes_on.add([x, y, z].toString())
            }
        }
    }
}

function turn_off(X, Y, Z, cubes_on) {
    for(let x = X[0]; x <= X[1]; ++x) {
        for(let y = Y[0]; y <= Y[1]; ++y) {
            for(let z = Z[0]; z <= Z[1]; ++z) {
                cubes_on.delete([x, y, z].toString())
            }
        }
    }
}

const min_x = -50
const max_x = 50
const min_y = -50
const max_y = 50
const min_z = -50
const max_z = 50

const X = [min_x, max_x]
const Y = [min_y, max_y]
const Z = [min_z, max_z]

const cubes_on = new Set()
for(const step of steps) {
    const X_intersection = get_interesction(step[1], X)
    if(X_intersection[0] > X_intersection[1]) {
        continue
    }
    const Y_intersection = get_interesction(step[2], Y)
    if(Y_intersection[0] > Y_intersection[1]) {
        continue
    }
    const Z_intersection = get_interesction(step[3], Z)
    if(Z_intersection[0] > Z_intersection[1]) {
        continue
    }
    if(step[0] == 'on') {
        turn_on(X_intersection, Y_intersection, Z_intersection, cubes_on)
    } else {
        turn_off(X_intersection, Y_intersection, Z_intersection, cubes_on)
    }
}

console.log(cubes_on.size)