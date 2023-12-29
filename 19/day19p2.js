const fs = require('fs')

const input = fs.readFileSync('input2.txt')
.toString()
.split('\n')

const scanners = []
for(let line of input) {
    if(line.startsWith('--')) {
        scanners.push([])
        continue
    }
    if(line == '') {
        continue
    }
    const cords = line.split(',').map(x => parseInt(x, 10))
    scanners[scanners.length - 1].push(cords)
}

function get_all_rotations(scanner) {
    const result = []
    const transformations = []
    // https://www.euclideanspace.com/maths/algebra/matrix/transforms/examples/index.htm
    transformations.push([x => [x[0], x[1], x[2]], x => [x[0], -x[2], x[1]]])
    transformations.push([x => [-x[1], x[0], x[2]], x => [x[2], x[1], -x[0]]])
    transformations.push([x => [-x[0], -x[1], x[2]], x => [x[0], -x[2], x[1]]])
    transformations.push([x => [x[1], -x[0], x[2]], x => [x[2], x[1], -x[0]]])
    transformations.push([x => [-x[2], x[1], x[0]], x => [x[1], -x[0], x[2]]])
    transformations.push([x => [-x[2], -x[1], -x[0]], x => [x[1], -x[0], x[2]]])
    let current_rotations = []
    for(const cords of scanner) {
        current_rotations.push([...cords])
    }
    for(const transformation of transformations) {
        let current_rotation = []
        let previous_rotation = []
        for(const cords of scanner) {
            let transformed_value = transformation[0](cords)
            current_rotation.push(transformed_value)
            previous_rotation.push([...transformed_value])
        }
        result.push(current_rotation)
        for(let i = 0; i < 3; ++i) {
            current_rotation = []
            for(let j = 0; j < scanner.length; ++j) {
                const new_cords = transformation[1](previous_rotation[j])
                current_rotation.push(new_cords)
                previous_rotation[j] = [...new_cords]
            }
            result.push(current_rotation)
        }
    }
    return result
}

function get_cords_from_string(str) {
    return str.split(',').map(x => parseInt(x, 10))
}

function get_correct_points(current_points, scanner) {
    const all_rotations = get_all_rotations(scanner)

    for(const points of all_rotations) {
        for(const point_str of current_points) {
            const point_nums = get_cords_from_string(point_str)
            for(const target_point of points) {
                const difference = [target_point[0] - point_nums[0], target_point[1] - point_nums[1], target_point[2] - point_nums[2]]
                let matched_points = 0
                const moved_points = []
                for(const point_to_move of points) {
                    const moved_point = [point_to_move[0] - difference[0], point_to_move[1] - difference[1], point_to_move[2] - difference[2]]
                    moved_points.push(moved_point)
                    if(current_points.has(moved_point.toString())) {
                        ++matched_points
                    }
                }
                if(matched_points >= 12) {
                    return [moved_points, difference]
                }
            }
        }
    }
    return []
}

const current_points = new Set()
for(const point of scanners[0]) {
    current_points.add(point.toString())
}

const not_added_scanners = []
for(let i = 1; i < scanners.length; ++i) {
    not_added_scanners.push(i)
}

const scanners_cords = [[0, 0, 0]]
while(not_added_scanners.length > 0) {
    const idx = not_added_scanners.shift()
    const points = get_correct_points(current_points, scanners[idx])
    if(points.length > 0) {
        scanners_cords.push(points[1])
        for(const point of points[0]) {
            current_points.add(point.toString())
        }
    } else {
        not_added_scanners.push(idx)
    }
}

let result = 0
for(let i = 0; i < scanners_cords.length - 1; ++i) {
    for(let j = i + 1; j < scanners_cords.length; ++j) {
        const A = scanners_cords[i]
        const B = scanners_cords[j]
        const distance = Math.abs(A[2] - B[2]) + Math.abs(A[1] - B[1]) + Math.abs(A[0] - B[0])
        result = Math.max(result, distance)
    }
}
console.log(result)