const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 25;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let maze = [];
let player1 = { x: 0, y: 0 };
let player2 = { x: cols - 1, y: rows - 1 };
let canDestroyWall = true;
let p1score = 0;
let p2score = 0;
let p1score2 = 0;
let p2score2 = 0;
let fm1 = 1;
let fm2 = 1;
let el = 4;
let co = 0;
let bombImage; // Declare bombImage to cache the SVG
let boxImage; // Declare boxImage to cache the SVG

updateScore();

function menu() {
    const overlay = document.getElementById('overlay');
    const startButton = document.getElementById('startButton');
    overlay.style.visibility = 'visible';
    startButton.style.display = 'flex';
}

function generateMaze() {
    p1score = 0;
    p2score = 0;
    maze = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let y = 1; y < rows-1; y++) {
        for (let x = 1; x < cols-1; x++) {
            maze[y][x] = Math.random() > 0.95 ? 1 : (Math.random() > 0.98 ? 2 : 0); // 1 walls, 2 points

            // Ensure a cell with maze[y][x] === 0 is never fully surrounded by cells with maze[y][x] === 1
            if (maze[y][x] === 0) {
                ensureNotFullySurrounded(x, y);
            }
        }
    }

    maze[1][1] = 0;
    maze[0][1] = 0;
    maze[1][0] = 0;
    maze[0][0] = 3; // Start point1

    maze[rows - 2][cols - 2] = 0;
    maze[rows - 1][cols - 2] = 0;
    maze[rows - 2][cols - 1] = 0;
    maze[rows - 1][cols - 1] = 5; // Start point2

    player1 = { x: 0, y: 0 };
    player2 = { x: cols - 1, y: rows - 1 };

    updateScore();
    drawMaze();
}

function ensureNotFullySurrounded(x, y) {
    const neighbors = [
        { nx: x + 1, ny: y },
        { nx: x - 1, ny: y },
        { nx: x, ny: y + 1 },
        { nx: x, ny: y - 1 }
    ];

    let surroundedByWalls = neighbors.every(({ nx, ny }) =>
        nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 1
    );

    if (surroundedByWalls) {
        const openNeighbor = neighbors.find(({ nx, ny }) =>
            nx >= 0 && ny >= 0 && nx < cols && ny < rows
        );
        if (openNeighbor) {
            maze[openNeighbor.ny][openNeighbor.nx] = Math.random() > 0.93 ? 2 : 0; // Ensure at least one neighbor is not a wall
        }
    }
}

function updateScore() {
    document.getElementById('p1-score').innerText = p1score;
    document.getElementById('p2-score').innerText = p2score;
}

function updateScore2() {
    document.getElementById('p1-score2').innerText = p1score2;
    document.getElementById('p2-score2').innerText = p2score2;
}

function saveScore(p) {
    if (p === 1) {
        p1score++;
        localStorage.setItem("p1time", 20);
    }
    if (p === 2) { 
        p2score++;
        localStorage.setItem("p2time", 20);
    }
    updateScore();
}

function saveScore2(p) {
    if (p === 1) {
        p1score2++;
    }
    if (p === 2) { 
        p2score2++;
    }
    localStorage.setItem("p1time", 20);
    localStorage.setItem("p2time", 20);
    updateScore2();
}

function win() {
    isGameActive = false; // Make sure the game is not active after winning
    if (p1score > p2score) {
        alert("Wygrał gracz 1");
        saveScore2(1);
    } else if (p1score < p2score) {
        alert("Wygrał gracz 2");
        saveScore2(2);
    } else {
        alert("Remis");
    }
    generateMaze();
    menu();
}

function loadBombImage(callback) {
    fetch("./assets/images/bomb.svg")
        .then(response => response.text())
        .then(data => {
            const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            bombImage = new Image();
            bombImage.onload = function () {
                callback();
                URL.revokeObjectURL(url); // Free memory
            };
            bombImage.src = url;
        })
        .catch(error => console.error(error));
}

function loadBoxImage(callback) {
    fetch("./assets/images/box.svg")
        .then(response => response.text())
        .then(data => {
            const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            boxImage = new Image();
            boxImage.onload = function () {
                callback();
                URL.revokeObjectURL(url); // Free memory
            };
            boxImage.src = url;
        })
        .catch(error => console.error(error));
}

loadBombImage(generateMaze); // Load bomb image and then generate the maze
loadBoxImage(generateMaze); // Load box image and then generate the maze









