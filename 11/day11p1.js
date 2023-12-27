const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(
        x => x.split('').map(x => parseInt(x, 10))
    )
const n = 10

function iterate(board, n) {
    const flashed = new Array(n).fill(0).map(_ => new Array(n).fill(false))
    const Q = []
    let flashes = 0
    for(let i = 0; i < n; ++i) {
        for(let j = 0; j < n; ++j) {
            ++board[i][j]
            if(board[i][j] > 9) {
                Q.push([i, j])
                flashed[i][j] = true
            }
        }
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    while(Q.length > 0) {
        ++flashes
        const cords = Q.shift()
        board[cords[0]][cords[1]] = 0
        for(const direction of directions) {
            const new_i = cords[0] + direction[0]
            const new_j = cords[1] + direction[1]

            if(new_i < 0 || new_i >= n || new_j < 0 || new_j >= n || flashed[new_i][new_j]) {
                continue
            }
            ++board[new_i][new_j]
            if(board[new_i][new_j] > 9) {
                Q.push([new_i, new_j])
                flashed[new_i][new_j] = true
            }
        }
    }

    return flashes
}

let result = 0
for(let i = 0; i < 100; ++i) {
    result += iterate(input, n)
}
console.log(result)