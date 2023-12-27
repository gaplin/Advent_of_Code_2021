const fs = require('fs')

const input = fs.readFileSync('input2.txt')
    .toString()
    .split('\n')

const G = {}

for(const line of input) {
    const nodes = line.split('-')
    if(!(nodes[0] in G)) {
        G[nodes[0]] = []
    }
    if(!(nodes[1] in G)) {
        G[nodes[1]] = []
    }
    G[nodes[0]].push(nodes[1])
    G[nodes[1]].push(nodes[0])
}

function dfs(G, u, target, visited) {
    if(u == target) {
        return 1
    }

    if(u[0] == u[0].toLowerCase()) {
        visited.add(u)
    }
    let result = 0
    for(const v of G[u]) {
        if(visited.has(v)) {
            continue
        }
        result += dfs(G, v, target, visited)
    }
    visited.delete(u)
    return result
}

const visited = new Set()
const result = dfs(G, 'start', 'end', visited)

console.log(result)