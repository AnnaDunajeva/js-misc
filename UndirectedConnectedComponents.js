//Implementation of breadth first search to find common components in undirected graph.
//Input: undirected graph, starting vertex, end vertex,
//Output: common components {vertex: group label}.

//for future: implement queue smarter (shift should run in O(n), but we need constant)

// const array = [
//     [1,2,3],
//     [2,1,3,4],
//     [3,1,2,4],
//     [4,2,3,5,6],
//     [5,4,6],
//     [6,4,5,8],
//     [7,8,9],
//     [8,7,9, 6],
//     [9,7,8]
// ];

//data from stanford course:
const fs = require('fs');
const data = fs.readFileSync('kargerMinCutExercise.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..
for (let i = 0; i < array.length; i++) {
    array[i] = array[i].split(/\t/)
    for (let j = 0; j < array[i].length; j++) {
        array[i][j] = parseInt(array[i][j]);
    }
    array[i].pop();
}

function toGraphObject (array) {
    let graphObject = {};
    for (let i = 0; i < array.length; i++) {
        let key = array[i][0];
        let value = array[i].slice(1);
        graphObject[key] = value;
    }
    return graphObject;
}

function Queue(){
    let queue = [];
    let offset = 0;
    this.enqueu = function enqueu(item) {
        queue.push(item);
    }
    this.dequeu = function dequeu() {
        if (queue.length === 0) {
            return undefined;
        }
        const item = queue[offset];
        offset++;
        if (offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }
        return item;
    }
    this.getLength = function getLength() {
        return queue.length - offset;
    }
}

function breadthFirstSearch(graph) {
    let groups = {};
    let numCC = 0;
    for (let vertex in graph) {
        if (graph.hasOwnProperty(vertex)) {
            let currentVertex = graph[vertex];
            if (currentVertex[currentVertex.length - 1] !== 'explored') {
                numCC += 1;
                let queue = new Queue();
                queue.enqueu(vertex);
                currentVertex.push('explored');
                while (queue.getLength() > 0) {
                    // console.log('graph', graph);
                    // console.log('queue', queue)
                    let vertex = queue.dequeu();
                    groups[vertex] = numCC;
                    // console.log('vertex',vertex);
                    let endpoints = graph[vertex];
                    for (let i = 0; i < endpoints.length - 1; i++) { //-1 is required to exclude last element from iteration as it is explored marker
                        let vertexToExplore = graph[endpoints[i]];
                        if (vertexToExplore[vertexToExplore.length - 1] !== 'explored') {
                            queue.enqueu(endpoints[i]);
                            vertexToExplore.push('explored');
                        }
                    }
                }
            }
        }
    }
    return {
        groups: groups
    }
}

let graphObject = toGraphObject(array);
let graph = JSON.parse(JSON.stringify(graphObject));
let graphSearch = breadthFirstSearch(graph);
console.log(graphSearch.groups);




