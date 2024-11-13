function moveplayer2(e) {
    let { x, y } = player2;
    let xx, yy;

    if (e.key === 'i') {
        yy = (y - 1 + rows) % rows; // Move up and wrap around
        xx = x;
    } else if (e.key === 'k') {
        yy = (y + 1) % rows; // Move down and wrap around
        xx = x;
    } else if (e.key === 'j') {
        yy = y;
        xx = (x - 1 + cols) % cols; // Move left and wrap around
    } else if (e.key === 'l') {
        yy = y;
        xx = (x + 1) % cols; // Move right and wrap around
    } else {
        return; // Exit if the key press is not a valid move key
    }

    if (maze[yy][xx] !== 1 && maze[yy][xx] !== 3) {
        maze[y][x] = 5; // Set the current position to indicate the player has moved
        player2 = { x: xx, y: yy }; // Update the player's position
        drawCell(x, y); // Redraw the old position
        drawCell(xx, yy); // Draw the new position

        if (maze[yy][xx] === 2) {
            maze[yy][xx] = 5;
            saveScore(2);
            aroundPlayer2();
        } else if (maze[yy][xx] === 0) {
            maze[yy][xx] = 5;
            saveScore(2);
        }
    }

    drawMaze(); // Redraw the entire maze to reflect the changes
}
