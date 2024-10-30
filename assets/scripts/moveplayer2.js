function moveplayer2(e) {
    const { x, y } = player2;
    if (e.key === 'i' && y > 0 && ((maze[y - 1][x] !== 1) && (maze[y - 1][x] !== 3))) {
        maze[y][x] = 5;
        player2.y--;
        drawCell(x, y);
        drawMaze(); 
    }
    if (e.key === 'k' && y < rows - 1 && ((maze[y + 1][x] !== 1) && (maze[y + 1][x] !== 3))) {
        maze[y][x] = 5;
        player2.y++;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    if (e.key === 'j' && x > 0 && ((maze[y][x - 1] !== 1) && (maze[y][x - 1] !== 3))) {
        maze[y][x] = 5;
        player2.x--;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    if (e.key === 'l' && x < cols - 1 && ((maze[y][x + 1] !== 1) && (maze[y][x + 1] !== 3))) {
        maze[y][x] = 5;
        player2.x++;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    drawCell(player2.x, player2.y); // Redraw the new position
    if (maze[player2.y][player2.x] === 2) {
        maze[player2.y][player2.x] = 5;
        saveScore(2);
        aroundPlayer2();
    }
    if (maze[player2.y][player2.x] === 0) {
        maze[player2.y][player2.x] = 5;
        saveScore(2);
    }
}
