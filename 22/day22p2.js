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

function get_disjoint_parts(A, Except) {
    const X_i = get_interesction(A[0], Except[0])
    const Y_i = get_interesction(A[1], Except[1])
    const Z_i = get_interesction(A[2], Except[2])
    if(X_i[0] > X_i[1] || Y_i[0] > Y_i[1] || Z_i[0] > Z_i[1]) {
        return [A]
    }

    const result = []
    const right = [X_i[1] + 1, A[0][1]]
    if(right[0] <= right[1]) {
        result.push([right, A[1], A[2]])
    }

    const left = [A[0][0], X_i[0] - 1] 
    if(left[0] <= left[1]) {
        result.push([left, A[1], A[2]])
    }

    const back = [Y_i[1] + 1, A[1][1]]
    if(back[0] <= back[1]) {
        result.push([X_i, back, A[2]])
    }

    const front = [A[1][0], Y_i[0] - 1]
    if(front[0] <= front[1]) {
        result.push([X_i, front, A[2]])
    }

    const top = [Z_i[1] + 1, A[2][1]]
    if(top[0] <= top[1]) {
        result.push([X_i, Y_i, top])
    }

    const bottom = [A[2][0], Z_i[0] - 1]
    if(bottom[0] <= bottom[1]) {
        result.push([X_i, Y_i, bottom])
    }

    return result
}

function turn_on(X, Y, Z, turned_on_regions) {
    let Q = []
    let regions_to_add = [[[...X], [...Y], [...Z]]]

    for(const region of turned_on_regions) {
        if(regions_to_add.length == 0) {
            break
        }
        for(const area of regions_to_add) {
            const disjoint_parts = get_disjoint_parts(area, region)
            Q.push(...disjoint_parts)
        }

        regions_to_add = Q
        Q = []
    }

    turned_on_regions.push(...regions_to_add)
}

function turn_off(X, Y, Z, turned_on_regions) {
    const area = [X, Y, Z]
    for(let i = turned_on_regions.length -1; i >= 0; --i) {
        const region = turned_on_regions[i]
        turned_on_regions.splice(i, 1)
        const valid_parts = get_disjoint_parts(region, area)
        turned_on_regions.push(...valid_parts)
    }
}

const turned_on_regions = []
for(const step of steps) {
    if(step[0] == 'on') {
        turn_on(step[1], step[2], step[3], turned_on_regions)
    } else {
        turn_off(step[1], step[2], step[3], turned_on_regions)
    }
}

let result = 0
for(const region of turned_on_regions) {
    result += (region[0][1] - region[0][0] + 1) * (region[1][1] - region[1][0] + 1) * (region[2][1] - region[2][0] + 1)
}

console.log(result)