function moveplayer1(e) {
    const { x, y } = player1;
    if (e.key === 'w' && y > 0 && ((maze[y - 1][x] !== 1) && (maze[y - 1][x] !== 5))) {
        maze[y][x] = 3;
        player1.y--;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    if (e.key === 's' && y < rows - 1 && ((maze[y + 1][x] !== 1) && (maze[y + 1][x] !== 5))) {
        maze[y][x] = 3;
        player1.y++;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    if (e.key === 'a' && x > 0 && ((maze[y][x - 1] !== 1) && (maze[y][x - 1] !== 5))) {
        maze[y][x] = 3;
        player1.x--;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    if (e.key === 'd' && x < cols - 1 && ((maze[y][x + 1] !== 1) && (maze[y][x + 1] !== 5))) {
        maze[y][x] = 3;
        player1.x++;
        drawCell(x, y); // Redraw the old position
        drawMaze();
    }
    drawCell(player1.x, player1.y); // Redraw the new position
    if (maze[player1.y][player1.x] === 2) {
        maze[player1.y][player1.x] = 3;
        saveScore(1);
        aroundPlayer1();
    }
    if (maze[player1.y][player1.x] === 0) {
        maze[player1.y][player1.x] = 3;
        saveScore(1);
    }
}
