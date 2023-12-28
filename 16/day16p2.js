const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()

let bits = ''
for(const hex of input) {
    const num = parseInt(hex, 16)
    bits += num.toString(2).padStart(4, '0')
}

function calculate_value(bits, idx) {
    if(idx < 0 || idx >= bits.length) {
        console.log('error')
        return [idx, -1]
    }
    idx += 3
    const type_id = parseInt(bits[idx] + bits[idx + 1] + bits[idx + 2], 2)
    idx += 3
    if(type_id == 4) { // literal value
        let group_start = idx
        let num_bits = ''
        while(bits[group_start] != '0') {
            for(let i = 1; i <= 4; ++i) {
                num_bits += bits[group_start + i]
            }
            group_start += 5
        }
        for(let i = 1; i <= 4; ++i) {
            num_bits += bits[group_start + i]
        }
        const num = parseInt(num_bits, 2)
        idx = group_start + 5
        return [idx, num]
    }
    // operator
    const values = []
    const length_type_id = bits[idx]
    ++idx
    if(length_type_id == '0') { // total length
        let length_in_bits = ''
        for(let i = 0; i < 15; ++i) {
            length_in_bits += bits[idx]
            ++idx
        }
        const length_num = parseInt(length_in_bits, 2)
        let target_idx = idx + length_num
        while(idx != target_idx) {
            const [new_idx, value] = calculate_value(bits, idx)
            idx = new_idx
            values.push(value)
        }
    } else { // number of sub-packets
        let sub_packets_in_bits = ''
        for(let i = 0; i < 11; ++i) {
            sub_packets_in_bits += bits[idx]
            ++idx
        }
        const sub_packets_num = parseInt(sub_packets_in_bits, 2)
        for(let i = 0; i < sub_packets_num; ++i) {
            const [new_idx, value] = calculate_value(bits, idx)
            idx = new_idx
            values.push(value)
        }
    }

    let value = 0
    if(type_id == 0) { // sum
        value = values.reduce((acc, x) => acc + x)
    } else if(type_id == 1) {
        value = values.reduce((acc, x) => acc * x)
    } else if(type_id == 2) {
        value = values.reduce((acc, x) => Math.min(acc, x))
    } else if(type_id == 3) {
        value = values.reduce((acc, x) => Math.max(acc, x))
    } else if(type_id == 5) {
        if(values[0] > values[1]) {
            value = 1
        }
    } else if(type_id == 6) {
        if(values[0] < values[1]) {
            value = 1
        }
    } else if(type_id == 7) {
        if(values[0] == values[1]) {
            value = 1
        }
    } else {
        console.log('error')
    }
    return [idx, value]
}

const [_, value] = calculate_value(bits, 0)

console.log(value)