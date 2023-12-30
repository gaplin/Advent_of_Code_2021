function valid_input(rules, increments, n, input) {
    let z = 0
    for(let i = 0; i < n; ++i) {
        if(increments[i]) {
            z = 26 * z + input[i] + rules[i]
        } else {
            const valid_digit = z % 26 - rules[i]
            if(valid_digit <= 0 || valid_digit > 9) {
                return false
            }
            input[i] = valid_digit
            z = Math.floor(z / 26)
        }
    }
    return z == 0
}

function get_highest_value(rules, increments, n) {
    for(let i = 9999999; i >= 1111111; --i) {
        const digits = []
        let any_zeros = false
        const input = []
        let k = i
        while(k > 0) {
            const num = k % 10
            if(num == 0) {
                any_zeros = true
                break
            }
            digits.push(num)
            k = Math.floor(k / 10)
        }
        if(any_zeros) {
            continue
        }
        for(let j = 0; j < n; ++j) {
            if(increments[j]) {
                input.push(digits.shift())
            } else {
                input.push(null)
            }
        }
        if(valid_input(rules, increments, n, input)) {
            return input
        }
    }
}

const n = 14
const rules = [4, 16, 14, 13, 11, 13, 7, 7, 12, 15, 16, 9, 8, 8]
const increments = [true, true, true, false, true, true, false, true, false, true, false, false, false, false]

const result_arr = get_highest_value(rules, increments, n)

console.log(result_arr.join(''))