const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 50;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;
let maze = [];
let player1 = { x: 0, y: 0 };
let player2 = { x: cols, y: rows };
let canDestroyWall = true;
let p1score = 0;
let p2score = 0;
let fm1 = 1;
let fm2 = 1;
let el = 4;
co = 0;

document.addEventListener('keydown', moveplayer1);
document.addEventListener('keydown', moveplayer2);

updateScore();

function generateMaze() {
    maze = Array.from({ length: rows }, () => Array(cols).fill(0));
    

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            maze[y][x] = Math.random() > 0.9 ? 1 : ( Math.random() > 0.93 ? 2 : 0); // 1 walls, 2 points
        }
    }

    maze[1][1] = 0;
    maze[0][1] = 0;
    maze[1][0] = 0;
    maze[0][0] = 0; // Start point1
    
    maze[rows-2][cols-2] = 0;
    maze[rows-1][cols-2] = 0;
    maze[rows-2][cols-1] = 0;
    maze[rows-1][cols-1] = 0; // Start point2


    player1 = { x: 0, y: 0 };
    player2 = { x: cols-1, y: rows-1 };
    updateScore();
    drawMaze();
}

function drawMaze() {
    co = 0;

    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 0 || maze[y][x] === 2) {
                co++;
            }
        }
    }

    if (co <= 0) {
        alert("WON");
        generateMaze();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            if (maze[y][x] === 2) {
                ctx.fillStyle = '#0b0';
                ctx.beginPath();
                ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            if (maze[y][x] === 3) {
                ctx.fillStyle = '#bbf';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            if (maze[y][x] === 4) {
                ctx.fillStyle = '#0f0';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            if (maze[y][x] === 5) {
                ctx.fillStyle = '#fbb';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    ctx.fillStyle = '#66f';
    ctx.fillRect(player1.x * cellSize, player1.y * cellSize, cellSize, cellSize);

    ctx.fillStyle = '#f66';
    ctx.fillRect(player2.x * cellSize, player2.y * cellSize, cellSize, cellSize);
    
}

function moveplayer1(e) {
    const { x, y } = player1;
    if (e.key === 'w' && y > 0 && ((maze[y - 1][x] !== 1) && (maze[y - 1][x] !== 5))){ maze[y][x] = 3; player1.y--};
    if (e.key === 's' && y < rows - 1 && ((maze[y + 1][x] !== 1) && (maze[y + 1][x] !== 5))){ maze[y][x] = 3; player1.y++};
    if (e.key === 'a' && x > 0 && ((maze[y][x - 1] !== 1) && (maze[y][x - 1] !== 5))){ maze[y][x] = 3; player1.x--};
    if (e.key === 'd' && x < cols - 1 && ((maze[y][x + 1] !== 1) && (maze[y][x + 1] !== 5))){ maze[y][x] = 3;  player1.x++};
    if (maze[player1.y][player1.x] === 2) {
        maze[player1.y][player1.x] = 3;
        saveScore(1);
        aroundPlayer1();
    }
    if (maze[player1.y][player1.x] === 0) {
        maze[player1.y][player1.x] = 3;
        saveScore(1);
    }
    drawMaze();
}

function moveplayer2(e) {
    const { x, y } = player2;
    if (e.key === 'i' && y > 0 && ((maze[y - 1][x] !== 1) && (maze[y - 1][x] !== 3))){ player2.y--};
    if (e.key === 'k' && y < rows - 1 && ((maze[y + 1][x] !== 1) && (maze[y + 1][x] !== 3))){ player2.y++};
    if (e.key === 'j' && x > 0 && ((maze[y][x - 1] !== 1) && (maze[y][x - 1] !== 3))){ player2.x--};
    if (e.key === 'l' && x < cols - 1 && ((maze[y][x + 1] !== 1) && (maze[y][x + 1] !== 3))){ player2.x++};
    if (maze[player2.y][player2.x] === 2) {
        maze[player2.y][player2.x] = 5;
        saveScore(2);
        aroundPlayer2();
    }
    if (maze[player2.y][player2.x] === 0) {
        maze[player2.y][player2.x] = 5;
        saveScore(2);
    }
    drawMaze();
}


generateMaze();



function updateScore() {
    document.getElementById('p1-score').innerText = `Wynik: ` + p1score;
    document.getElementById('p2-score').innerText = `Wynik: ` + p2score;
}

function saveScore(p) {
    if (p === 1) p1score++;
    if (p === 2) p2score++;

    updateScore();
}











function aroundPlayer1() {
    const { x, y } = player1;
    const directions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
    ];

    directions.forEach(({ x: nx, y: ny }) => {
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
            maze[ny][nx] = 3; // Change like as boost
        }
    });
}





function aroundPlayer2() {
    const { x, y } = player2;
    const directions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
    ];

    directions.forEach(({ x: nx, y: ny }) => {
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
            maze[ny][nx] = 5; // Change like as boost
        }
    });
}