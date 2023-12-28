const fs = require('fs')

class Node {
    constructor() {
        this.left = null
        this.right = null
        this.value = null
    }
    // left -> [] / null
    // right -> [] / null
    // value -> number / null
}

const trees = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

function generate_tree(text, idx) {
    if(idx >= text.length) {
        throw new Error('idx out of range')
    }
    const node = new Node()
    if(text[idx] != '[') {
        const num = parseInt(text[idx], 10)
        ++idx
        node.value = num
        return [node, idx]
    }
    ++idx
    const left = generate_tree(text, idx)
    idx = left[1] + 1
    const right = generate_tree(text, idx)
    idx = right[1] + 1
    node.left = left[0]
    node.right = right[0]

    return [node, idx]
}

function traverse(node) {
    if(node.value != null) {
        return node.value.toString()
    }
    const left_part = traverse(node.left)
    const right_part = traverse(node.right)
    return '[' + left_part + ',' + right_part + ']'
}

function explode(node, depth, to_do = [], exploded = []) {
    if(depth == 4 && node.value == null && exploded.length == 0) {
        const left_value = node.left.value
        const right_value = node.right.value
        node.left = null
        node.right = null
        node.value = 0
        exploded.push(0)
        return [['L', left_value], ['R', right_value]]
    }
    if(node.value != null) {
        if(to_do.length > 1) {
            throw new Error('to_do length > 1')
        } else if(to_do.length == 1) {
            node.value += to_do[0][1]
        }
        return []
    }

    if(to_do.length > 1) {
        throw new Error('to do > 1')
    }
    if(to_do.length == 1) {
        if(to_do[0][0] == 'L') {
            explode(node.left, depth + 1, to_do, exploded)
        } else {
            explode(node.right, depth + 1, to_do, exploded)
        }
        return []
    }

    let new_to_do = explode(node.left, depth + 1, to_do, exploded)
    if(new_to_do.length > 0) {
        let parent_to_do = []
        let child_to_do = []
        for(const [direction, value] of new_to_do) {
            if(direction == 'L') {
                parent_to_do.push([direction, value])
            } else {
                child_to_do.push(['L', value])
            }
        }
        if(child_to_do.length > 0) {
            explode(node.right, depth + 1, child_to_do, exploded)
        }
        return parent_to_do
    }

    new_to_do = explode(node.right, depth + 1, to_do, exploded)
    if(new_to_do.length > 0) {
        let parent_to_do = []
        let child_to_do = []
        for(const [direction, value] of new_to_do) {
            if(direction == 'R') {
                parent_to_do.push([direction, value])
            } else {
                child_to_do.push(['R', value])
            }
        }
        if(child_to_do.length > 0) {
            explode(node.left, depth + 1, child_to_do, exploded)
        }
        return parent_to_do
    }
    return []
}

function split(node) {
    if(node.value != null) {
        if(node.value >= 10) {
            const left_value = Math.floor(node.value / 2)
            const right_value = Math.ceil(node.value / 2)
            const left = new Node()
            const right = new Node()
            left.value = left_value
            right.value = right_value
            node.value = null
            node.left = left
            node.right = right
            return true
        }
        return false
    }

    if(split(node.left)) {
        return true
    }
    if(split(node.right)) {
        return true
    }

    return false
}

function process_tree(root) {
    while(true) {
        const explode_num = []
        explode(root, 0, [], explode_num)
        if(explode_num.length > 0) {
            continue
        }

        if(split(root)) {
            continue
        }
        break
    }
}

function add_trees(root_A, root_B) {
    new_root = new Node()
    new_root.left = root_A
    new_root.right = root_B
    process_tree(new_root)
    return new_root
}

function get_magnitude(node) {
    if(node.value != null) {
        return node.value
    }
    return 3 * get_magnitude(node.left) + 2 * get_magnitude(node.right)
}

let result = 0
for(let i = 0; i < trees.length; ++i) {
    for(let j = 0; j < trees.length; ++j) {
        if(i != j) {
            const sum = add_trees(generate_tree(trees[i], 0)[0], generate_tree(trees[j], 0)[0])
            result = Math.max(result, get_magnitude(sum))
        }
    }
}

console.log(result)