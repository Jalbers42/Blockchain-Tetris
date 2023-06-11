export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
    // console.log("y");
    // console.log(player.tetromino.length);
    // console.log("x");
    // console.log(player.tetromino[0].length);
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[0].length; x += 1) {
            // 1. Check that we are on an tetromino cell
            if (player.tetromino[y][x] !== 0) {
                // return false;
                if (
                    // 2. Return true if move would go below bottom limit
                    !stage[y + player.pos.y + moveY] ||
                    // 3. Check that move is inside game area width
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. Check that were are not moving into another cell
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
};