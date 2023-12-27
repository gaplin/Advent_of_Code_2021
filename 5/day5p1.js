const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const segments = []
for(let line of input) {
    let points = line.split(' -> ')
    let segment = points.map(x => x.split(',').map(x => parseInt(x, 10)))
    if(segment[0][0] == segment[1][0] || segment[0][1] == segment[1][1]) {
        segments.push(segment)   
    }
}

const n = 1000 
const board = new Array(n).fill(0).map(() => new Array(n).fill(0))

function place_segment(board, segment) {
    let direction = [0, 0]

    let x_diff = segment[1][0] - segment[0][0]
    let y_diff = segment[1][1] - segment[0][1]
    let distance = Math.abs(x_diff) + Math.abs(y_diff)
    if(x_diff > 0) {
        direction[1] = 1
    } else if(x_diff < 0) {
        direction[1] = -1
    }
    if(y_diff > 0) {
        direction[0] = 1
    } else if(y_diff < 0) {
        direction[0] = -1
    }
    for(let i = 0; i <= distance; ++i) {
        board[segment[0][1] + i * direction[0]][segment[0][0] + i * direction[1]] += 1
    }
}

function count_crossings(board) {
    return board.reduce((acc, currValue) => acc + currValue.filter(x => x > 1).length, 0)
}

for(let segment of segments) {
    place_segment(board, segment)
}
console.log(count_crossings(board))
