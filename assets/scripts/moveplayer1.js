function moveplayer1(e) {
    let { x, y } = player1;
    let xx, yy;

    if (e.key === 'w') {
        yy = (y - 1 + rows) % rows; // Move up and wrap around
        xx = x;
    } else if (e.key === 's') {
        yy = (y + 1) % rows; // Move down and wrap around
        xx = x;
    } else if (e.key === 'a') {
        yy = y;
        xx = (x - 1 + cols) % cols; // Move left and wrap around
    } else if (e.key === 'd') {
        yy = y;
        xx = (x + 1) % cols; // Move right and wrap around
    } else {
        return; // Exit if the key press is not a valid move key
    }

    if (maze[yy][xx] !== 1 && maze[yy][xx] !== 5) {
        maze[y][x] = 3; // Set the current position to indicate the player has moved
        player1 = { x: xx, y: yy }; // Update the player's position
        drawCell(x, y); // Redraw the old position
        drawCell(xx, yy); // Draw the new position

        if (maze[yy][xx] === 2) {
            maze[yy][xx] = 3;
            saveScore(1);
            aroundPlayer1();
        } else if (maze[yy][xx] === 0) {
            maze[yy][xx] = 3;
            saveScore(1);
        }
    }

    drawMaze(); // Redraw the entire maze to reflect the changes
}
