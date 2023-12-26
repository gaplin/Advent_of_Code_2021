const fs = require('fs');

function cross_number(board, number) {
    for(let i = 0; i < 5; ++i) {
        for(let j = 0; j < 5; ++j) {
            if(board[i][j] == number) {
                board[i][j] = 'x'
            }
        }
    }
}

function is_winning(board) {
    for(let i = 0; i < 5; ++i) {
        let win = true
        for(let j = 0; j < 5; ++j) {
            if(board[i][j] != 'x') {
                win = false
                break
            }
        }
        if(win) {
            return true
        }

        win = true
        for(let j = 0; j < 5; ++j) {
            if(board[j][i] != 'x') {
                win = false
                break
            }
        }
        if(win) {
            return true
        }
    }
    return false
}

function get_score(board, number) {
    unmarked_nums = 0
    for(let i = 0; i < 5; ++i) {
        for(let j = 0; j < 5; ++j) {
            if(board[i][j] != 'x') {
                unmarked_nums += board[i][j]
            }
        }
    }
    return unmarked_nums * number
}

const input = fs.readFileSync('input2.txt')
    .toString()
    .trim()
    .split('\n')

let numbers_to_mark = input[0].split(',').map(x => parseInt(x, 10))
const boards = []

let board = []
for(let i = 1; i < input.length; ++i) {
    if(input[i] != '') {
        nums = input[i].split(' ').filter(x => x.length > 0).map(x => parseInt(x, 10))
        board.push(nums)
        if(board.length == 5) {
            boards.push(board)
            board = []
        }
    }
}

for(num of numbers_to_mark) {
    for(let i = boards.length - 1; i >= 0; --i) {
        board = boards[i]
        cross_number(board, num)
        if(is_winning(board)) {
            if(boards.length == 1) {
                console.log(get_score(board, num))
                return
            }
            boards.splice(i, 1)
        }
    }
}