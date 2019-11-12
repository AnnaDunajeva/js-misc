//Implementation of Topologil Sort Algorithm
//Input: directed acyclic graph
//Output: A topological ordering of the vertices of G.

// const array = [
//     [1,2,3],
//     [2,3,4],
//     [3,4],
//     [4,5,6],
//     [5],
//     [6,5,8],
//     [7,8,9],
//     [8,9],
//     [9]
// ];

const array = [
    [1,3],
    [2,10,4],
    [3,5,11],
    [4,7],
    [5,1,9,7],
    [6,10],
    [7,9],
    [8,6],
    [9,2,4,8],
    [10,8],
    [11,6,8]
];

// const fs = require('fs');
// const data = fs.readFileSync('kargerMinCutExercise.txt', 'utf8');
// let array = data.split(/\r\n|\n/);
// array.pop()//removes some weird empty string, dont know where does it came from..
// for (let i = 0; i < array.length; i++) {
//     array[i] = array[i].split(/\t/)
//     for (let j = 0; j < array[i].length; j++) {
//         array[i][j] = parseInt(array[i][j]);
//     }
//     array[i].pop();
// }

function toGraphObject (input) {
    const graphObject = {}
    for (let i = 0; i < input.length; i++) {
        let vertex = input[i][0];
        let endpoints = input[i].slice(1);
        graphObject[vertex] = {
            endpoints: endpoints,
            explored: false,
            topoLabel: 0
        }
    }
    return graphObject;
}

//Implementation of DFS without recursion, only explores verteces, no additional functionality
function depthFirstSearch(graph, startVertex) {
    const stack = [];
    stack.push(startVertex);
    while (stack.length > 0) {
        const vertex = stack.pop();
        const endpoints = graph[vertex].endpoints;
        if (!graph[vertex].explored) {
            graph[vertex].explored = true;
            for (let i = 0; i <endpoints.length; i++) {
                const vertexToExplore = endpoints[i];
                stack.push(vertexToExplore);
            }
        }
    }
}

function recursiveTopologicalDFS(graph, vertex) {
    graph[vertex].explored = true;
    const endpoints = graph[vertex].endpoints;
    for (let i = 0; i < endpoints.length; i++) {
        const vertexToExplore = endpoints[i];
        if (!graph[vertexToExplore].explored) {
            recursiveTopologicalDFS(graph, vertexToExplore);
        }
    }
    graph[vertex].topoLabel = label;
    label--;
}

function topologicalSort (graph) {
    for (let vertex in graph) {
        if (graph.hasOwnProperty(vertex)) {
            if (!graph[vertex].explored) {
                recursiveTopologicalDFS(graph, vertex);
            }
        }
    }
}

let graphObject = toGraphObject(array);
let graphCopy = JSON.parse(JSON.stringify(graphObject));
let label = Object.keys(graphCopy).length;
let graphSearch = topologicalSort(graphCopy);
console.log(graphCopy);

