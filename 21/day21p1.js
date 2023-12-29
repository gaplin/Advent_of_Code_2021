const fs = require('fs')

const starting_positions = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')
    .map(x => parseInt(x.split(': ')[1]) - 1)

function roll_a_dice(current_value) {
    const result = current_value + (current_value + 1) % 100 + (current_value + 2) % 100 + 3
    const new_value = (current_value + 3) % 100
    const rolls = 3

    return [result, new_value, rolls]
}

const Players = [[starting_positions[0], 0], [starting_positions[1], 0]]
let dice_rolls = 0
let dice_value = 0
const n = 10
const target = 1000

while(true) {
    let end = false
    for(const Player of Players) {
        let roll_result = roll_a_dice(dice_value)
        dice_value = roll_result[1]
        dice_rolls += roll_result[2]
        Player[0] = (Player[0] + roll_result[0]) % n
        Player[1] += Player[0] + 1
        if(Player[1] >= target) {
            end = true
            break
        }
    }
    if(end) {
        break
    }
}

const losing_value = Players.map(x => x[1]).reduce((acc, x) => Math.min(acc, x))

console.log(dice_rolls * losing_value)