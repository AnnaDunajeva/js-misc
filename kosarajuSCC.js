//Implementation of Kosaraju Strongly Connected Components algorithm.
//Input: directed graph in adjacency-list representation
//Postcondition: Computes five biggest strongly connected components. Each vertex marked by number of group it belongs to. 
//Also creates additional object {SCC group label: vertex}.

//test array:
// const array = [
//     [1,1,3],
//     [2,10,4],
//     [3,5,11],
//     [4,7],
//     [5,1,9,7],
//     [6,10],
//     [7,9],
//     [8,6],
//     [9,2,4,8],
//     [10,8],
//     [11,6,8]
// ];

//data from stanford course: big array with 875714 verteces:
const fs = require('fs');
const data = fs.readFileSync('SCC.txt', 'utf8');
let array = data.split(/\r\n|\n/);
array.pop()//removes some weird empty string, dont know where does it came from..
for (let i = 0; i < array.length; i++) {
    array[i] = array[i].split(' ');
    for (let j = 0; j < array[i].length; j++) {
        array[i][j] = parseInt(array[i][j]);
    }
    array[i].pop();
}

function toGraphObject (input) {
    const graphObject = {}
    for (let i = 0; i < input.length; i++) {
        let vertex = input[i][0];
        let endpoints = input[i].slice(1);
        if (!graphObject.hasOwnProperty(vertex)) {
            graphObject[vertex] = {
                endpoints: endpoints,
                reversed: [],
                firstPass: false,
                secondPass: false,
                finishingTime: 0,
                scc: 0
            }
        } else {
            graphObject[vertex].endpoints = graphObject[vertex].endpoints.concat(endpoints);
        }
        for (let j = 0; j <endpoints.length; j++) {
            if (!graphObject.hasOwnProperty(endpoints[j])) {
                graphObject[endpoints[j]] = {
                    endpoints: [],
                    reversed: [],
                    firstPass: false,
                    secondPass: false,
                    finishingTime: 0,
                    scc: 0
                }
            } 
            graphObject[endpoints[j]].reversed.push(vertex);
        }
    }
    return graphObject;
}

//======================================================================================================================================

//Implementation without recursion:

//Implementation with multiple small stacks:

// function firstPass (graph) {
//     // let firstPassCount = 0;
//     for (let vertex in graph) {
//         if (graph.hasOwnProperty(vertex)) {
//             if (!graph[vertex].firstPass) {
//                 // firstPassCount++;
//                 // console.log('firstPass', firstPassCount);
//                 topologicalDFSonReversed(graph, vertex);
//             }
//         }
//     }
// }

// function topologicalDFSonReversed(graph, vertex) {
//     let stacklimit = 50000;
//     let stack = [];
//     let stackCount = 1; //stackCount reduces after stack becomes empty (meaning all elements in stack have been dealt with aka explored) 
//     stack.push(vertex);//initialize stack
//     let stackCollector = {};
//     stackCollector[stackCount] = stack;//add stack to collector
//     while (stackCount > 0) { //loop that goes over all stack in stackCollector
//         let stack = stackCollector[stackCount];
//         while (stack.length > 0) {//loop that goes over all elements in stack
//             let vertexToExplore = stack[stack.length - 1];//we are just looking at element, and remove it from the stack only if it was already explored, eg we already put its edpoints to the stack as well
//             if (!graph[vertexToExplore].firstPass) {//add vertex to stack only if it was not explored jet
//                 graph[vertexToExplore].firstPass = true;
//                 const reversed = graph[vertexToExplore].reversed;
//                 for (let i = 0; i < reversed.length; i++) {//put all endpoints to stack if they where not explored jet
//                     if (!graph[reversed[i]].firstPass) {
//                         if (stack.length === stacklimit) {
//                             stackCount++;//if stack reached its max, then we initialize new stack and continue with it
//                             // console.log('plus', stackCount);
//                             stackCollector[stackCount] = [];
//                             stack = stackCollector[stackCount];
//                         }
//                         stack.push(reversed[i]);
//                     }
//                 }
//             } else {
//                 const finishedVertex = stack.pop(vertexToExplore); //if element was explored then we can safely remove it from the stack
//                 if (graph[finishedVertex].finishingTime === 0) {//change finishing time only if it was never set before
//                     finishingTime++;
//                     graph[finishedVertex].finishingTime = finishingTime;
//                     vertexInOrderOfFinishingTimes.unshift(finishedVertex); //to make a list of finishing times (FT) in ascending oreder
//                     //                                                     //main point is that we want to start seconds pass from where we ended first pass
//                     //                                                     //in case where we use FTs, it should be vertex with biggest FT down to 1
//                 }
//             }
//         }
//         stackCount--;//if we finnished with one stack then we move to the previous one up until we reach stack that we started with
//                     //and will exit outer while loop when we have finnished with it
//         // console.log('minus', stackCount);
//     }
// }

// function secondPassSCC(graph) {
//     // let secondPassCount = 0;
//     for (let i = 0; i < vertexInOrderOfFinishingTimes.length; i++) {
//         let vertex = vertexInOrderOfFinishingTimes[i];
//         if (!graph[vertex].secondPass) {
//             numSCC += 1;
//             SCCcount[vertex] = {};
//             SCCcount[vertex].numSCC = numSCC;
//                 // secondPassCount++;
//                 // console.log('secondPass', secondPassCount);
//                 depthFirstSearchSCC(graph, vertex);
//         }
//     }
// }

// function depthFirstSearchSCC(graph, vertex) {
//     let stacklimit = 50000;
//     let stack = [];
//     let stackCount = 1;
//     stack.push(vertex);
//     let stackCollector = {};
//     stackCollector[stackCount] = stack;
//     while (stackCount > 0) {
//         let stack = stackCollector[stackCount];
//         while (stack.length > 0) {
//             let vertexToExplore = stack[stack.length - 1];
//             if (!graph[vertexToExplore].secondPass) {
//                 graph[vertexToExplore].secondPass = true;
//                 graph[vertexToExplore].scc = numSCC;
//                 currentSize++;
//                 const endpoints = graph[vertexToExplore].endpoints;
//                 for (let i = 0; i < endpoints.length; i++) {
//                     if (!graph[endpoints[i]].secondPass) {
//                         if (stack.length === stacklimit) {
//                             stackCount++;
//                             // console.log('plus',stackCount);
//                             stackCollector[stackCount] = [];
//                             stack = stackCollector[stackCount];
//                         }
//                         stack.push(endpoints[i]);
//                     }
//                 }
//             } else {
//                 stack.pop(vertexToExplore);
//             }
//         }
//         stackCount--;
//         // console.log('minus',stackCount);
//     }
//     SCCcount[vertex].size = currentSize;
//     for (let i = 0; i < biggestFive.length; i++) {
//         if (currentSize > biggestFive[i]) {
//             let biggestFiveRight = biggestFive.slice(0, i);
//             let biggestFiveLeft = biggestFive.slice(i, biggestFive.length-1);
//             biggestFiveRight.push(currentSize);
//             biggestFive = biggestFiveRight.concat(biggestFiveLeft);
//             // console.log('biggestFive:', biggestFive);
//             break;
//         }
//     }
//     currentSize = 0;
// }

//====================================================================================================================================

//Implementation with one huge stack (faster than with multiple smaller ones)

function firstPass (graph) {
    // let firstPassCount = 0;
    for (let vertex in graph) {
        if (graph.hasOwnProperty(vertex)) {
            if (!graph[vertex].firstPass) {
                // firstPassCount++;
                // console.log('firstPass', firstPassCount);
                topologicalDFSonReversed(graph, vertex);
            }
        }
    }
}

function topologicalDFSonReversed(graph, vertex) {
    let stack = [];
    stack.push(vertex);//initialize stack
    while (stack.length > 0) {//loop that goes over all elements in stack
        let vertexToExplore = stack[stack.length - 1];//we are just looking at element, and remove it from the stack only if it was already explored, eg we already put its edpoints to the stack as well
        if (!graph[vertexToExplore].firstPass) {//add vertex to stack only if it was not explored jet
            graph[vertexToExplore].firstPass = true;
            const reversed = graph[vertexToExplore].reversed;
            for (let i = 0; i < reversed.length; i++) {//put all endpoints to stack if they where not explored jet
                if (!graph[reversed[i]].firstPass) {
                    stack.push(reversed[i]);
                }
            }
        } else {
            const finishedVertex = stack.pop(vertexToExplore); //if element was explored then we can safely remove it from the stack
            if (graph[finishedVertex].finishingTime === 0) {//change finishing time only if it was never set before
                finishingTime++;
                graph[finishedVertex].finishingTime = finishingTime;
                vertexInOrderOfFinishingTimes.unshift(finishedVertex); //to make a list of finishing times (FT) in ascending oreder
                //                                                     //main point is that we want to start seconds pass from where we ended first pass
                //                                                     //in case where we use FTs, it should be vertex with biggest FT down to 1
            }
        }
    }
}

function secondPassSCC(graph) {
    for (let i = 0; i < vertexInOrderOfFinishingTimes.length; i++) {
        let vertex = vertexInOrderOfFinishingTimes[i];
        if (!graph[vertex].secondPass) {
            numSCC += 1;
            SCCcount[vertex] = {};
            SCCcount[vertex].numSCC = numSCC;
                depthFirstSearchSCC(graph, vertex);
        }
    }
}

function depthFirstSearchSCC(graph, vertex) {
    let stack = [];
    stack.push(vertex);
    while (stack.length > 0) {
        let vertexToExplore = stack[stack.length - 1];
        if (!graph[vertexToExplore].secondPass) {
            graph[vertexToExplore].secondPass = true;
            graph[vertexToExplore].scc = numSCC;
            currentSize++;
            const endpoints = graph[vertexToExplore].endpoints;
            for (let i = 0; i < endpoints.length; i++) {
                if (!graph[endpoints[i]].secondPass) {
                    stack.push(endpoints[i]);
                }
            }
        } else {
            stack.pop(vertexToExplore);
        }
    }    
    SCCcount[vertex].size = currentSize;
    for (let i = 0; i < biggestFive.length; i++) {
        if (currentSize > biggestFive[i]) {
            let biggestFiveRight = biggestFive.slice(0, i);
            let biggestFiveLeft = biggestFive.slice(i, biggestFive.length-1);
            biggestFiveRight.push(currentSize);
            biggestFive = biggestFiveRight.concat(biggestFiveLeft);
            break;
        }
    }
    currentSize = 0;
}

//=====================================================================================================================================

let graphObject = toGraphObject(array);
let graphCopy = JSON.parse(JSON.stringify(graphObject));
let finishingTime = 0;
const vertexInOrderOfFinishingTimes = [];
let numSCC = 0;
let currentSize = 0;
let SCCcount = {};
let biggestFive = [0,0,0,0,0];

const start = process.hrtime.bigint();
firstPass(graphCopy);
secondPassSCC(graphCopy);
const end = process.hrtime.bigint();

const runningTime = (end-start)/BigInt(1000000);

console.log('running time in milisec: ', runningTime);
// console.log(vertexInOrderOfFinishingTimes.slice(0,10));
// console.log(graphCopy[1]);
// console.log(SCCcount[1]);
console.log(biggestFive);

//======================================================================================================================================
//Answer for the stanfor file is: five biggest SCC's are [ 434821, 968, 459, 313, 211 ]
//Running time with multiple small stacks: 174879 msec
//Running time with one huge stack: 168146 msec
//======================================================================================================================================

//Implementation with recursion:

// function firstPass (graph) {
//     let firstPassCount = 0;
//     for (let vertex in graph) {
//         if (graph.hasOwnProperty(vertex)) {
//             if (!graph[vertex].firstPass) {
//                 firstPassCount++;
//                 console.log('firstPass', firstPassCount);
//                 topologicalDFSonReversed(graph, vertex);
//             }
//         }
//     }
// }
// function topologicalDFSonReversed(graph, vertex) {
//     graph[vertex].firstPass = true;
//     const reversed = graph[vertex].reversed;
//     for (let i = 0; i < reversed.length; i++) {
//         const vertexToExplore = reversed[i];
//         if (!graph[vertexToExplore].firstPass) {
//             topologicalDFSonReversed(graph, vertexToExplore);
//         }
//     }
//     finishingTime++;
//     graph[vertex].finishingTime = finishingTime;
//     vertexInOrderOfFinishingTimes.unshift(vertex); //to make a list of finishing times (FT) in ascending oreder
//                                                     //main point is that we want to start seconds pass from where we ended first pass
//                                                     //in case where we use FTs, it should be vertex with biggest FT down to 1
// }
// function secondPassSCC(graph) {
//     for (let i = 0; i < vertexInOrderOfFinishingTimes.length; i++) {
//         let vertex = vertexInOrderOfFinishingTimes[i];
//         if (!graph[vertex].secondPass) {
//             numSCC += 1;
//                 depthFirstSearchSCC(graph, vertex);
//                 SCCcount[vertex] = {};
//                 SCCcount[vertex].numSCC = numSCC;
//                 console.log(numSCC);
//                 SCCcount[vertex].size = currentSize;
//                 currentSize = 0;
//         }
//     }
// }

// function depthFirstSearchSCC(graph, vertex) {
//     graph[vertex].secondPass = true;
//     graph[vertex].scc = numSCC;
//     currentSize++;
//     const endpoints = graph[vertex].endpoints;
//     for (let i = 0; i < endpoints.length; i++) {
//         const vertexToExplore = endpoints[i];
//         if (!graph[vertexToExplore].secondPass) {
//             depthFirstSearchSCC(graph, vertexToExplore);
//         }
//     }
// }