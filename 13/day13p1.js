const fs = require('fs')
    
function cords_from_string(str) {
    return str.split(',').map(x => parseInt(x, 10))
}

function process_y_fold(points, y) {
    for(const point of points) {
        const cords = cords_from_string(point)
        if(cords[1] > y) {
            points.delete(point)
            cords[1] = y - (cords[1] - y)
            points.add(cords.toString())
        }
    }
}

function process_x_fold(points, x) {
    for(const point of points) {
        const cords = cords_from_string(point)
        if(cords[0] > x) {
            points.delete(point)
            cords[0] = x - (cords[0] - x)
            points.add(cords.toString())
        }
    }
}
    
const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const points = new Set()
const folds = []
let cords = true
for(const line of input) {
    if(line == '') {
        cords = false
        continue
    }
    if(cords) {
        points.add(line)
    } else {
        let fold = line.split('=')
        fold[1] = parseInt(fold[1], 10)
        fold[0] = fold[0][fold[0].length - 1]
        folds.push(fold)
    }
}

for(let i = 0; i < 1; ++i) {
    const fold = folds[i]
    if(fold[0] == 'x') {
        process_x_fold(points, fold[1])
    } else {
        process_y_fold(points, fold[0])
    }
}

console.log(points.size)