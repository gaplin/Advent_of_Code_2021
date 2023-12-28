const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()

let bits = ''
for(const hex of input) {
    const num = parseInt(hex, 16)
    bits += num.toString(2).padStart(4, '0')
}

function fill_all_versions(bits, idx, versions) {
    if(idx < 0 || idx >= bits.length) {
        return idx
    }
    const version = parseInt(bits[idx] + bits[idx + 1] + bits[idx + 2], 2)
    idx += 3
    versions.push(version)
    const type_id = parseInt(bits[idx] + bits[idx + 1] + bits[idx + 2], 2)
    idx += 3
    if(type_id == 4) { // literal value
        let group_start = idx
        while(bits[group_start] != '0') {
            group_start += 5
        }
        idx = group_start + 5
        return idx
    }
    // operator
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
            idx = fill_all_versions(bits, idx, versions)
        }
        return idx
    }

    // number of sub-packets
    let sub_packets_in_bits = ''
    for(let i = 0; i < 11; ++i) {
        sub_packets_in_bits += bits[idx]
        ++idx
    }
    const sub_packets_num = parseInt(sub_packets_in_bits, 2)
    for(let i = 0; i < sub_packets_num; ++i) {
        idx = fill_all_versions(bits, idx, versions)
    }
    return idx
}

const versions = []
fill_all_versions(bits, 0, versions)
const sum = versions.reduce((acc, x) => acc + x)

console.log(sum)