const fs = require('fs')
const Queue = require('queue-fifo');

const G = []
const rooms = {'A': [7, 11], 'B': [8, 12], 'C': [9, 13], 'D': [10, 14]}
const types = ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']
const costs = {'A': 1, 'B': 10, 'C': 100, 'D': 1000}

for(let i = 0; i <= 14; ++i) {
    G.push([])
}

G[0] = [[1, 1]]
G[1] = [[0, 1], [2, 2], [7, 2]]
G[2] = [[1, 2], [3, 2], [7, 2], [8, 2]]
G[3] = [[2, 2], [4, 2], [8, 2], [9, 2]]
G[4] = [[3, 2], [5, 2], [9, 2], [10, 2]]
G[5] = [[4, 2], [6, 1], [10, 2]]
G[6] = [[5, 1]]
G[7] = [[1, 2], [2, 2], [11, 1]]
G[8] = [[2, 2], [3, 2], [12, 1]]
G[9] = [[3, 2], [4, 2], [13, 1]]
G[10] = [[4, 2], [5, 2], [14, 1]]
G[11] = [[7, 1]]
G[12] = [[8, 1]]
G[13] = [[9, 1]]
G[14] = [[10, 1]]

function get_all_next_moves(G, status, rooms, from, types, n) {
    const visited = new Array(n).fill(false)
    visited[from] = true
    const Q = [[from, 0]]
    const reachable_nodes = []
    const type = status[from]
    const main_type = types[from]
    while(Q.length > 0) {
        const [u, distance] = Q.shift()
        for(const [v, dst] of G[u]) {
            if(visited[v] == false && status[v] == 'H') {
                reachable_nodes.push([v, distance + dst])
                visited[v] = true
                Q.push([v, distance + dst])
            }
        }
    }
    const reachable_non_target_nodes = reachable_nodes.filter(x => types[x[0]] == 'H')
    const reachable_target_nodes = reachable_nodes.filter(x => types[x[0]] == type).sort((x, y) => y[0] - x[0])
    const destinations = rooms[type]
    if(reachable_target_nodes.length > 0) {
        const last_node = reachable_target_nodes[0]
        let destination_idx = -1
        for(let i = 0; i < destinations.length; ++i) {
            if(destinations[i] == last_node[0]) {
                destination_idx = i
                break
            }
        }
        let good_position = true
        for(let i = destination_idx + 1; i < destinations.length; ++i) {
            if(status[destinations[i]] != type) {
                good_position = false
                break
            }
        }
        if(good_position) {
            return [last_node]
        }
    }
    
    if(main_type != 'H') {
        return reachable_non_target_nodes
    }
    
    return []
}

function create_game_tree(G, source, target_key, rooms, types, costs, output) {
    const Q = new Queue()
    Q.enqueue(source)
    output[source.toString()] = []
    const n = source.length
    while(!(Q.isEmpty())) {
        const node = Q.dequeue()
        const node_key = node.toString()
        if(node_key == target_key) {
            continue
        }
        
        for(let i = 0; i < n; ++i) {
            const type = node[i]
            if(type != 'H') {
                const final_rooms = rooms[type]
                let final_idx = -1;
                for(let j = 0; j < final_rooms.length; ++j) {
                    if(final_rooms[j] == i) {
                        final_idx = j
                        break
                    }
                }
                if(final_idx != -1) {
                    let good_position = true
                    for(let j = final_idx + 1; j < final_rooms.length; ++j) {
                        if(node[final_rooms[j]] != type) {
                            good_position = false
                            break
                        }
                    }
                    if(good_position) {
                        continue
                    }
                }
                const possible_moves = get_all_next_moves(G, node, rooms, i, types, n)
                for(const move of possible_moves) {
                    const new_node = [...node]
                    new_node[move[0]] = node[i]
                    new_node[i] = 'H'
                    const cost = move[1] * costs[node[i]]
                    const new_node_key = new_node.toString()
                    if(!(new_node_key in output)) {
                        output[new_node_key] = []
                        Q.enqueue(new_node)
                    }
                    output[node_key].push([new_node_key, cost])
                }
            }
        }
    }
}

function get_shortest_path(G, source, target) {
    const current_distance = {}
    current_distance[source] = 0
    const Q = new Queue()
    Q.enqueue(source)
    while(!(Q.isEmpty())) {
        const u = Q.dequeue()
        for(const [v, distance] of G[u]) {
            const new_distance = current_distance[u] + distance
            if(!(v in current_distance) || current_distance[v] > new_distance) {
                current_distance[v] = new_distance
                Q.enqueue(v)    
            }
        }
    }
    return current_distance[target]
}

const status = new Array(15).fill('H')
const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

let room_id = 7
for(const line of input) {
    for(const char of line) {
        if(char == 'A' || char == 'B' || char == 'C' || char == 'D') {
            status[room_id] = char
            room_id += 1
        }
    }
}

const game_tree = {}
const target_key = types.toString()
create_game_tree(G, status, target_key, rooms, types, costs, game_tree)
console.log(get_shortest_path(game_tree, status.toString(), target_key))