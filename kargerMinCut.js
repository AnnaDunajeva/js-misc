//Implimentation of Karger Minimum Cut Algorithm. 
//Input: simple undirected graph represented as adjecency list
//Output: number of minimum crossing enges

//Runs super slow (should be n^4*log(n), but have to check it), but can be improved with some tweaking to n^2*lon(n).
//Future plans: make it faster; calculate exact running time; make visualisation;

// let array = [
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

function kargerMinCut(graph) { //assumes that graph is an object
    let graphSize = Object.keys(graph).length;
    let groups = [];
    while (graphSize > 2) {
        let vertices = Object.keys(graph);
        let vertexIndex = Math.floor(Math.random() * vertices.length);
        let endpoint1 = parseInt(vertices[vertexIndex]); //random vertex label
        let vertexConntections = graph[endpoint1];//endpoints to which vertex is connected
        let endpointIndex = Math.floor(Math.random() * vertexConntections.length); //choosing random indext for endpoint
        let endpoint2 = vertexConntections[endpointIndex]; //random endpoint value
        groups = contraction(graph, endpoint1, endpoint2, groups); 
        graphSize--;
    }
    // console.log(graph);
    let firstKey = Object.keys(graph)[0];
    let minCut = graph[firstKey].length;
    return {
        minCut: minCut,
        groups: groups
    };
}

function trackGroups (vertexToDelete, mergedVertex, groups) {
    let vertexToDeleteStr = vertexToDelete.toString()
    let mergedVertexStr = mergedVertex.toString()

    let vertecesToMergeWith = '';
    let vertecesToBeMerged = '';
    for (let i = 0; i < groups.length; i++) {
        let groupToCheck = groups[i].split(',')
        if (groupToCheck[0] === mergedVertexStr) {
            vertecesToMergeWith = groups[i];
            groups.splice(i, 1);
            i--;
        } else if (groupToCheck[0] === vertexToDeleteStr) {
            vertecesToBeMerged = groups[i];
            groups.splice(i, 1);
            i--;
        }
    }
    let merged = '';
    if (vertecesToMergeWith === '' && vertecesToBeMerged !== '') {
        merged = mergedVertexStr + ',' + vertecesToBeMerged;
    } else if (vertecesToMergeWith !== '' && vertecesToBeMerged === '') {
        merged = vertecesToMergeWith + ',' + vertexToDeleteStr;
    } else if (vertecesToMergeWith !== '' && vertecesToBeMerged !== ''){
        merged = vertecesToMergeWith + ',' + vertecesToBeMerged;
    } else {
        merged = mergedVertexStr + ',' + vertexToDeleteStr;
    }
    groups.push(merged);
    return groups;
}

function contraction(graph, vertexToDelete, mergedVertex, groups) {
    // console.log('graph: ',graph)
    // console.log('vertexToDelete: ', vertexToDelete);
    // console.log('mergedVertex: ',mergedVertex);
    let endpointsToMerge = graph[vertexToDelete];
    // console.log('endpointsToMerge: ',endpointsToMerge);
    let mergedGroups = trackGroups(vertexToDelete, mergedVertex, groups);

    for (let nodeIndex = 0; nodeIndex < endpointsToMerge.length; nodeIndex++) {
        let node = endpointsToMerge[nodeIndex];
        // console.log('node: ',node)
        if (node !== mergedVertex) {
            graph[mergedVertex].push(node); //add endpoint from vertexToDelete to mergedVertex
                                                            //dont add same endpoint value as mergedVertex, as it will create self-loops
            graph[node].push(mergedVertex); //add endpoint 'mergedVertex' to vertex with nodeIndex value
        }
        for (let endpoint = 0; endpoint < graph[node].length; endpoint++) {
            if (graph[node][endpoint] === vertexToDelete) {
                graph[node].splice(endpoint, 1);
            }
        }
    }
    delete graph[vertexToDelete];
    return mergedGroups;
}

function repeatKarger(graph) {//assumes graph ia an object
    let minCut = Infinity;
    let groups = [];
    let N = Object.keys(graph).length;
    // let timesToRepeat = (Math.trunc(N / 2));
    timesToRepeat = N;
    while (timesToRepeat > 0) {
        let graphCopy = JSON.parse(JSON.stringify(graph));     //need to copy object before mutating it
        let newCut = kargerMinCut(graphCopy);
        if (newCut.minCut < minCut) {
            minCut = newCut.minCut;
            groups = newCut.groups;
        }
        timesToRepeat--;
    }
    return {
        minCut: minCut,
        groups: groups
    };
}

function findEdges (graph, groups) {
    let index = 0;
    if (groups.length === 2) {
        let firstHalf = groups.length[0];
        let secondHalf = groups.length[1];
        if (secondHalf < firstHalf) {
            index = 1;
        }
    }
    let edges = [];
    let groupToCheck = groups[index].split(',');
    let keysObject = {};
    for (let i = 0; i < groupToCheck.length; i++) {
        let key = groupToCheck[i];
        let value = groupToCheck[i];
        keysObject[key] = value;
    }
    for (let i = 0; i < groupToCheck.length; i++) {
        let vertexToCheck = graph[groupToCheck[i]];
        for (let j = 0; j < vertexToCheck.length; j++) {
            if (!(keysObject.hasOwnProperty(vertexToCheck[j].toString()))) {
                let edge = [parseInt(groupToCheck[i]), vertexToCheck[j]];
                edges.push(edge);
            }
        }
    
    }
    return edges;
}

let graph = toGraphObject(array);
let cut = repeatKarger(graph);
let edges = findEdges(graph, cut.groups);

console.log('minCut: ', cut.minCut );
console.log('groups: ', cut.groups);
console.log('edges: ', edges, edges.length);