const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

function cords_from_string(str) {
    return str.split(',').map(x => parseInt(x, 10))
}

const img_algorithm = input[0]
const input_image = input.slice(2)
const n = input_image.length
const addition = 100
const new_n = n + 2 * addition
let new_image = new Array(new_n).fill(0).map(x => new Array(new_n).fill('.'))

for(let i = 0; i < n; ++i) {
    for(let j = 0; j < n; ++j) {
        new_image[i + addition][j + addition] = input_image[i][j]
    }
}

function get_number(grid, i, j, background, n) {
    let num_as_pixels = ''
    for(let y = i - 1; y <= i + 1; ++y) {
        if(y < 0 || y >= n) {
            num_as_pixels += background + background + background
            continue
        }
        let row = ''
        for(let x = j - 1; x <= j + 1; ++x) {
            if(x < 0 || x >= n) {
                row += background
            } else {
                row += grid[y][x]
            }
        }
        num_as_pixels += row
    }
    const num_as_binary = num_as_pixels.split('').map(
        x => {
        if(x == '#') {
            return '1'
        }
        return '0'
    }
    ).join('')
    return parseInt(num_as_binary, 2)
}

const first_value = img_algorithm[0]
const last_value = img_algorithm[img_algorithm.length - 1]
let current_background = '.'
for(let step = 0; step < 50; ++step) {
    const image_after_step = new Array(new_n).fill(0).map(x => new Array(new_n).fill('.'))
    for(let i = 0; i < new_n; ++i) {
        for(let j = 0; j < new_n; ++j) {
            image_after_step[i][j] = img_algorithm[get_number(new_image, i, j, current_background, new_n)]
        }
    }
    new_image = image_after_step
    if(current_background == '.') {
        current_background = first_value
    } else {
        current_background = last_value
    }
}

let result = 0
for(let i = 0; i < new_n; ++i) {
    for(let j = 0; j < new_n; ++j) {
        if(new_image[i][j] == '#') {
            ++result
        }
    }
}

console.log(result)