//Implimentation og Dijkstra Algorithm for finding shortest distance(path) in graph
//Input: graph in adjacency list representation; starting vertex
//Postcondition: calculated distance graph[vertex].distanceFromStartingVertex from starting vertex. If no such distance exists, has value of Infinity

const Heap = require('collections/heap');

// const testArray = [
//     [1,[3,4]],
//     [2,[10,20],[4,11]],
//     [3,[5,8],[11,6]],
//     [4,[7,18]],
//     [5,[1,6],[9,12],[7,4]],
//     [6,[10,7]],
//     [7,[9,23]],
//     [8,[6,13]],
//     [9,[2,10],[4,25],[8,20]],
//     [10,[8,30]],
//     [11,[6,9],[8,18]]
// ];

//data from stanford course: 
const fs = require('fs');
const data = fs.readFileSync('dijkstraData.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..
for (let i = 0; i < array.length; i++) {
    array[i] = array[i].split(/\t/);
    for (let j = 1; j < array[i].length; j++) {
        array[i][j] = array[i][j].split(',');
        array[i][j][1] = parseInt(array[i][j][1]);
    }
    array[i].pop();
}

function toGraphObject(input) {
    const graphObject = {}
    for (let i = 0; i < input.length; i++) {
        let vertex = input[i][0];
        let endpoints = input[i].slice(1);
        const endpointObject = {};
        for (let j = 0; j < endpoints.length; j++) {
            const endpoint = endpoints[j][0];
            const edgeLength = endpoints[j][1];
            endpointObject[endpoint] = edgeLength;
        }
        graphObject[vertex] = {
            endpoints: endpointObject,
            distanceFromStartingVertex: Infinity,
            explored: false
        }
    }
    return graphObject;
}

function dijikstra (graph, startingVertex) {
    const heap = new Heap([[startingVertex, 0]], null, function(a, b) {
        return b[1] - a[1];
    });
    for (let vertex in graph) {
        if (graph.hasOwnProperty(vertex) && vertex != startingVertex) {
            heap.push([vertex, Infinity]);
        }
    }
  
    while (heap.length !== 0) {
        const vertexAndLength = heap.pop();
        const vertex = vertexAndLength[0];
        graph[vertex].explored = true;
        const shortestDistance = vertexAndLength[1];
        graph[vertex].distanceFromStartingVertex = shortestDistance;
        endpoints = graph[vertex].endpoints;
        for(let endpoint in endpoints) {
            if (endpoints.hasOwnProperty(endpoint)) {
                if (!graph[endpoint].explored) {
                    currentDistance = graph[endpoint].distanceFromStartingVertex;
                    heap.delete([endpoint,currentDistance]);
                    newDistance = Math.min(currentDistance, endpoints[endpoint] + shortestDistance);
                    graph[endpoint].distanceFromStartingVertex = newDistance;
                    heap.push([endpoint, newDistance]);
                }
            }
        }
    }
}

const graph = toGraphObject(array);
dijikstra(graph, '1');

//shortest distance from 1 to every vertex [7,37,59,82,99,115,133,165,188,197]:
const vertexToExplore = [7,37,59,82,99,115,133,165,188,197];
for (let i = 0; i < vertexToExplore.length; i++) {
    vertex = vertexToExplore[i];
    console.log(vertex, graph[vertex].distanceFromStartingVertex);
}
//Answer:
// 7 2599
// 37 2610
// 59 2947
// 82 2052
// 99 2367
// 115 2399
// 133 2029
// 165 2442
// 188 2505
// 197 3068