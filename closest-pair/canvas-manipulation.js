import {closestPair, mergeSortCoordinates, calculateDistance, randomPointsGenerator} from './modules/closest-pair.js';
'use strict'
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var displayedCoordinates = document.getElementById('coordinates');
var closestPointsElement = document.getElementById('closestPair');
var closestDistanceElement = document.getElementById('closestDistance');
var undoButton = document.getElementById('undoButton');
var clearAllButton = document.getElementById('clearAllButton');
var generateCoordinates = document.getElementById('generateCoordinates');

// var input = document.getElementById('input');
var coordinates = [];

// if (input.length > 0) {
//     //check that input is in correct format and if it is, then it becomes coordinates
//     input = '[' + input + ']';
//     coordinates = JSON.parse(input);
// } 

function cartesianToCanvas (x, y) { //convert cartesian coordinates to canvas coordinates
    let midWidth = canvas.width / 2;
    let midHeight = canvas.height / 2;
    let canvasX = midWidth + x;
    let canvasY = midHeight - y;
    
    return {
        x: canvasX, 
        y: canvasY};
  }
  
function canvasToCartesian(x, y) { //convert canvas coordinates to cartesian
    let midWidth = canvas.width / 2;
    let midHeight = canvas.height / 2;
    let cartesianX = x - midWidth;
    let cartesianY = midHeight - y;
    return {
        x: cartesianX, 
        y: cartesianY};
  }
  
function formGrid (width, height) { //draw x and y axes
    if (canvas.getContext) { //to check for canvas support in given browser
    let arrowSize = 7; 
    context.lineWidth = 1;
    context.font = '15px serif';
    context.fillStyle = 'black';
    context.beginPath();
    context.moveTo(width / 2 + 0.5, 0);
    context.lineTo(width / 2 + 0.5 - arrowSize, arrowSize);
    context.moveTo(width / 2 + 0.5 + arrowSize, arrowSize);
    context.lineTo(width / 2 + 0.5, 0);
    context.lineTo(width / 2 + 0.5, height);
    context.moveTo(0, height / 2 - 0.5);
    context.lineTo(width, height / 2 - 0.5);
    context.lineTo(width - arrowSize, height / 2 - 0.5 - arrowSize);
    context.moveTo(width - arrowSize, height / 2 - 0.5 + arrowSize);
    context.lineTo(width, height / 2 - 0.5);
    context.stroke();
    context.fillText('[0, 0]', canvas.width / 2 + 7, canvas.height / 2 + 17);
    context.fillText('x', canvas.width / 2 + 10, 10);
    context.fillText('y', canvas.width - 10, canvas.height / 2 + 17);
    }
}

function getCursorPosition(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let x = Math.floor(event.clientX - rect.left); //not sure what to do with rounding...
    let y = Math.floor(event.clientY - rect.top);
    return {
        x: x, 
        y: y
    }
}

function drawPoint(x, y) {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
}

function drawLine(point1, point2) {
    let xy1 = cartesianToCanvas(point1[0], point1[1]);
    let xy2 = cartesianToCanvas(point2[0], point2[1]);
    context.beginPath();
    context.moveTo(xy1.x, xy1.y);
    context.lineTo(xy2.x, xy2.y);
    context.stroke();
}

function calculatePairDrawLine(coordinates) {
    let sortedByX = mergeSortCoordinates(coordinates, 0);
    let sortedByY = mergeSortCoordinates(coordinates, 1);
    let closestPoints = closestPair(sortedByX, sortedByY);
    let closestDistance = calculateDistance(closestPoints[0], closestPoints[1]);
    closestPointsElement.textContent = 'Closest pair: [[' + closestPoints[0][0].toString() + ', ' + closestPoints[0][1].toString() + '], [' + closestPoints[1][0].toString() + ', ' + closestPoints[1][1].toString() + ']]';
    closestDistanceElement.textContent = 'Closest distance: ' + closestDistance.toString();
    drawLine(closestPoints[0], closestPoints[1]);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    formGrid(canvas.width, canvas.height);
    canvasStateBeforeLine = context.getImageData(0, 0, canvas.width,canvas.height);
    coordinates = [];
    displayedCoordinates.textContent = 'Your coordinates: ';
    closestPointsElement.textContent = 'Closest pair: ';
    closestDistanceElement.textContent = 'Closest distance: ';
}

function displayCoordinates(coordinates) {
    displayedCoordinates.textContent = 'Your coordinates: ';
    for (let i=0; i < coordinates.length; i++) {
        displayedCoordinates.textContent += '[' + coordinates[i][0].toString() + ', ' + coordinates[i][1].toString() + ']';
        if (i !== coordinates.length - 1) {
            displayedCoordinates.textContent += ', ';
        }
    }
}

function drawAllPoints(coordinates) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    formGrid(canvas.width, canvas.height);
    for (let i = 0; i < coordinates.length; i++){
        let xy = cartesianToCanvas(coordinates[i][0], coordinates[i][1])
        drawPoint(xy.x, xy.y);
    }
    canvasStateBeforeLine = context.getImageData(0, 0, canvas.width,canvas.height);
}

//=========================================================================================//

formGrid(canvas.width, canvas.height);
var canvasStateBeforeLine = context.getImageData(0, 0, canvas.width,canvas.height);

canvas.addEventListener('click', function(e) {
    context.putImageData(canvasStateBeforeLine, 0, 0);
    var pointPosition = getCursorPosition(canvas, e);
    drawPoint(pointPosition.x, pointPosition.y);
    canvasStateBeforeLine = context.getImageData(0, 0, canvas.width,canvas.height);
    let point = canvasToCartesian (pointPosition.x, pointPosition.y);
    let x = point.x;
    let y = point.y;
    coordinates.push ([x, y]);
    displayCoordinates(coordinates);
    if (coordinates.length > 1) {
        calculatePairDrawLine(coordinates);
    } 
});

clearAllButton.addEventListener('click', clearCanvas);

undoButton.addEventListener('click', function() {
    if (coordinates.length > 0) {
        coordinates.pop();
        if (coordinates.length === 0) {
            clearCanvas();
        } else if (coordinates.length === 1) {
            displayCoordinates(coordinates);
            drawAllPoints(coordinates);
            closestPointsElement.textContent = 'Closest pair: ';
            closestDistanceElement.textContent = 'Closest distance: ';
        }
        else {
            displayCoordinates(coordinates);
            drawAllPoints(coordinates);
            calculatePairDrawLine(coordinates);
        }
    } else { //if (coordinates.length === 0)
        //redraw last saved canvas after clearAll button was pressed
    }
});

generateCoordinates.addEventListener('click', function(){
    clearCanvas();
    coordinates = randomPointsGenerator(10, Math.min(canvas.width/2, canvas.height/2));
    displayCoordinates(coordinates);
    drawAllPoints(coordinates);
    calculatePairDrawLine(coordinates);
})

