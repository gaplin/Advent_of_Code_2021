const fs = require('fs')

const grid = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(
        x => x.split('').map(x => parseInt(x, 10))
    )

const n = grid.length
const target = [n - 1, n - 1]
const distances = new Array(n).fill(0).map(_ => new Array(n).fill(Infinity))

const Q = [[0, 0]]
distances[0][0] = 0
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

while(Q.length > 0) {
    const [i, j] = Q.shift()
    if(i == target[0] && j == target[1]) {
        continue
    }
    for(const [di, dj] of directions) {
        const new_i = i + di
        const new_j = j + dj
        if(new_i < 0 || new_i >= n || new_j < 0 || new_j >= n) {
            continue
        }
        const current_distance = distances[new_i][new_j]
        const new_distance = distances[i][j] + grid[new_i][new_j]
        if(new_distance < current_distance) {
            distances[new_i][new_j] = new_distance
            Q.push([new_i, new_j])
        }
    }
}

console.log(distances[target[0]][target[1]])