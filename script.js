const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 100;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;
let maze = [];
let player = { x: 0, y: 0 };
let canDestroyWall = true;
let score = 0;
let fm1 = 1;
let fm2 = 1;
let el = 4;
co = 0;

document.getElementById('generateMaze').addEventListener('click', generateMaze);
document.addEventListener('keydown', movePlayer);

updateScore();

function generateMaze() {
    maze = Array.from({ length: rows }, () => Array(cols).fill(0));
    
    maze[1][1] = 0;
    maze[0][1] = 0;
    maze[1][0] = 0;
    
    maze[0][0] = 0; // Start point

    fm1 = (Math.floor(Math.random() * 5) + 1);
    fm2 = (Math.floor(Math.random() * 5) + 1);


    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            maze[y][x] = Math.random() > 0.9 ? 1 : 0; // 1 walls
        }
    }



    maze[rows - fm2][cols - fm1] = 0;

    player = { x: 0, y: 0 };
    updateScore();
    drawMaze();
}

function drawMaze() {
    el++;
    if (el > 3 ) {
        el = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (y != player.y && x != player.x) {
                    if (maze[y][x] === 0 || maze[y][x] === 2) {
                        maze[y][x] = Math.random() > 0.7 ? 2 : 0; //2 reds
                        co++;
                    }
                }
            }
        }
    }


    co = 0;

    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 0 || maze[y][x] === 2) {
                co++;
            }
        }
    }

    if (co <= 1) {
        maze[rows - fm2][cols - fm1] = 4;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            if (maze[y][x] === 2) {
                ctx.fillStyle = '#f00';
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
        }
    }
    ctx.fillStyle = '#66f';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
    
}

function movePlayer(e) {
    const { x, y } = player;
    if (e.key === 'w' && y > 0 && ((maze[y - 1][x] !== 1))){ maze[y][x] = 3; player.y--};
    if (e.key === 's' && y < rows - 1 && ((maze[y + 1][x] !== 1))){ maze[y][x] = 3; player.y++};
    if (e.key === 'a' && x > 0 && ((maze[y][x - 1] !== 1))){ maze[y][x] = 3; player.x--};
    if (e.key === 'd' && x < cols - 1 && ((maze[y][x + 1] !== 1))){ maze[y][x] = 3;  player.x++};
    if (e.key === ' ' && canDestroyWall) destroyWallsAroundPlayer();
    drawMaze();
    if (maze[player.y][player.x] === 4) {
        generateMaze();
    }
    if (maze[player.y][player.x] === 2) {
        saveScore();
    }
}

generateMaze();









function destroyWallsAroundPlayer() {
    const { x, y } = player;
    const directions = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
    ];

    directions.forEach(({ x: nx, y: ny }) => {
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 1) {
            maze[ny][nx] = 0; // Change wall to passable
        }
    });

    canDestroyWall = false;
    document.getElementById('time').innerText = 'Bomba: 5s';
   
    setTimeout(() => {
        document.getElementById('time').innerText = 'Bomba: [Spacja]';
        canDestroyWall = true;
    }, 5000);
}

function updateScore() {
    document.getElementById('score').innerText = `Wynik: ` + score;
}

function saveScore() {
    score++;
    updateScore();
}