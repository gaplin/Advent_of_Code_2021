const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(
        x => x.split('').map(x => parseInt(x, 10))
    )

const n = input.length
const m = input[0].length
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let result = 0
for(let i = 0; i < n; ++i) {
    for(let j = 0; j < m; ++j) {
        let all_higher = true
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
            result += input[i][j] + 1
        }
    }
}
console.log(result)