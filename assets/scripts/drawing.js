function drawCell(x, y) {
    if (maze[y][x] === 2) {
        if (bombImage) {
            ctx.drawImage(bombImage, x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function drawMaze() {
    co = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 0 || maze[y][x] === 2) {
                co++;
            }

            if (maze[y][x] === 1) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (maze[y][x] === 2) {
                drawCell(x, y); // Only draw cells with value 2
            } else if (maze[y][x] === 3) {
                ctx.fillStyle = '#bbf';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (maze[y][x] === 4) {
                ctx.fillStyle = '#0f0';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (maze[y][x] === 5) {
                ctx.fillStyle = '#fbb';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    if (co <= 0) {
        win();
    }

    ctx.fillStyle = '#66f';
    ctx.fillRect(player1.x * cellSize, player1.y * cellSize, cellSize, cellSize);
    ctx.fillStyle = '#f66';
    ctx.fillRect(player2.x * cellSize, player2.y * cellSize, cellSize, cellSize);
}
