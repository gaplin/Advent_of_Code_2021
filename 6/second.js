const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()

function get_fish_count(time_left, time_to_new_fish, cache) {
    let key = [time_left, time_to_new_fish]
    if(key in cache) {
        return cache[key]
    }
    let result = 1;

    time_left -= time_to_new_fish + 1
    while(time_left >= 0) {
        result += get_fish_count(time_left, 8, cache)
        time_left -= 7
    }

    cache[key] = result
    return result
}

let fish = input.split(',').map(x => parseInt(x, 10))
result = 0
time = 256
cache = {}
for(let i = 0; i < fish.length; ++i) {
    result += get_fish_count(time, fish[i], cache)
}

console.log(result)