const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(
        x => x.split('').map(x => parseInt(x, 10))
    )

function bfs_flow(i, j, map, visited, directions, n, m) {
    let q = []
    q.push([i, j])
    visited[i][j] = true

    let visited_nodes = 0
    while(q.length > 0) {
        const element = q.shift()
        visited_nodes += 1

        for(const direction of directions) {
            const new_i = element[0] + direction[0]
            const new_j = element[1] + direction[1]
            if(new_i < 0 || new_i >= n || new_j < 0 || new_j >= m || visited[new_i][new_j] || map[new_i][new_j] == 9) {
                continue
                
            } 
            visited[new_i][new_j] = true
            q.push([new_i, new_j])
        }
    }

    return visited_nodes
}

const n = input.length
const m = input[0].length
const visited = new Array(n).fill(0).map(x => new Array(m).fill(false))
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const basins = []
for(let i = 0; i < n; ++i) {
    for(let j = 0; j < m; ++j) {
        let all_higher = true
        if(visited[i][j]) {
            continue
        }
        for(const direction of directions) {
            const new_i = i + direction[0]
            const new_j = j + direction[1]
            if(new_i < 0 || new_i >= n || new_j < 0 || new_j >= m) {
                continue
            }
            if(input[new_i][new_j] <= input[i][j]) {
                all_higher = false
                break
            }
        }
        if(all_higher) {
            const area = bfs_flow(i, j, input, visited, directions, n, m)
            basins.push(area)
        }
    }
}
basins.sort((x, y) => (y - x))
console.log(basins[0] * basins[1] * basins[2])