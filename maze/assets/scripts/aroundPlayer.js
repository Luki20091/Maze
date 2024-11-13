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
    drawMaze();
    drawCell(x, y); // Redraw the old position
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
    drawMaze();
    drawCell(x, y); // Redraw the old position
}
