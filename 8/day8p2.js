const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(x => x.split(' | ')
        .map(x => x.split(' ')
            .map(x => x.split('').sort().join('')))
        )

function get_missing_char(text, cmp) {
    for(let i = 0; i < cmp.length; ++i) {
        let match = false
        for(let j = 0; j < text.length; ++j) {
            if(cmp[i] == text[j]) {
                match = true
                break
            }
        }
        if(!match) {
            return cmp[i]
        }
    }
    return ''
}

function get_number(numbers, pattern) {
    for(let i = 0; i < 10; ++i) {
        if(pattern == numbers[i]) {
            return i
        }
    }
    return null
}

function get_map(patterns) {
    const result = new Array(10)
    const length_patterns = new Array(8).fill(0).map(_ => [])
    for(let pattern of patterns) {
        length_patterns[pattern.length].push(pattern)
    }
    result[1] = length_patterns[2][0]
    result[7] = length_patterns[3][0]
    result[4] = length_patterns[4][0]
    result[8] = length_patterns[7][0]

    // 6:
    let one = result[1]
    let a = get_missing_char(result[1], result[7])
    let b = ''
    let c = ''
    for(let i = 0; i < length_patterns[6].length; ++i) {
        const pattern = length_patterns[6][i]
        const missing_char = get_missing_char(pattern, one)
        if(missing_char != '') {
            result[6] = pattern
            b = missing_char
            length_patterns[6].splice(i, 1)
            break
        }
    }

    // 3:
    for(let i = 0; i < length_patterns[5].length; ++i) {
        const pattern = length_patterns[5][i]
        if(get_missing_char(pattern, result[7]) == '') {
            result[3] = pattern
            length_patterns[5].splice(i, 1)
            break
        }
    }

    // 5:
    for(let i = 0; i < length_patterns[5].length; ++i) {
        const pattern = length_patterns[5][i]
        if(get_missing_char(pattern, b) != '') {
            result[5] = pattern
            length_patterns[5].splice(i, 1)
            break
        }
    }
    result[2] = length_patterns[5][0]
    result[9] = (result[5] + b).split('').sort().join('')
    // 0:
    for(let i = 0; i < length_patterns[6].length; ++i) {
        const pattern = length_patterns[6][i]
        const missing_char = get_missing_char(pattern, result[9])
        if(missing_char != '') {
            result[0] = pattern
            length_patterns[6].splice(i, 1)
            break
        }
    }

    c = get_missing_char(b, result[1])    
    return result
}

let result = 0
for(let pattern of input) {
    const map = get_map(pattern[0])
    let code = 0
    for(let target of pattern[1]) {
        const num = get_number(map, target)
        code = code * 10 + num
    }
    result += code
}

console.log(result)