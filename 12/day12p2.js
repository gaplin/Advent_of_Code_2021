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

function dfs(G, u, start, target, visited, twice) {
    if(u == target) {
        return 1
    }

    if(u[0] == u[0].toLowerCase()) {
        visited.add(u)
    }
    let result = 0
    for(const v of G[u]) {
        if(!visited.has(v)) {
            result += dfs(G, v, start, target, visited, twice)
        } else if(twice == null && v != start && v != target) {
            result += dfs(G, v, start, target, visited, v)
        }
    }
    if(twice != u) {
        visited.delete(u)
    }
    return result
}

const visited = new Set()
const result = dfs(G, 'start', 'start', 'end', visited, null)

console.log(result)