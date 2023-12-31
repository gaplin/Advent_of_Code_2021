const fs = require('fs')

function move_right(grid, n, m) {
    let moved = false
    for(let i = 0; i < n; ++i) {
        const first_empty = grid[i][0] == '.'
        let j = 0
        for(; j < m - 1; ++j) {
            if(grid[i][j] == '>' && grid[i][j + 1] == '.') {
                grid[i][j] = '.'
                grid[i][j + 1] = '>'
                ++j
                moved = true
            }
        }
        if(j == m) {
            continue
        }
        if(first_empty && grid[i][m - 1] == '>') {
            grid[i][m - 1] = '.'
            grid[i][0] = '>'
            moved = true
        }
    }
    return moved == true ? 1 : 0
}

function move_down(grid, n, m) {
    let moved = false
    for(let i = 0; i < m; ++i) {
        const first_empty = grid[0][i] == '.'
        let j = 0
        for(; j < n - 1; ++j) {
            if(grid[j][i] == 'v' && grid[j + 1][i] == '.') {
                grid[j][i] = '.'
                grid[j + 1][i] = 'v'
                ++j
                moved = true
            }
        }
        if(j == n) {
            continue
        }
        if(first_empty && grid[n - 1][i] == 'v') {
            grid[n - 1][i] = '.'
            grid[0][i] = 'v'
            moved = true
        }
    }
    return moved == true ? 1 : 0
}

const grid = fs.readFileSync('input2.txt')
.toString()
.split('\n')
.map(x => x.split(''))

const m = grid[0].length
const n = grid.length

let steps = 0
while(true) {
    let moves = 0
    moves += move_right(grid, n, m)
    moves += move_down(grid, n, m)
    ++steps
    if(moves == 0) {
        break
    }
}

console.log(steps)