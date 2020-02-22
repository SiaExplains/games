var canvasBg = document.getElementById('canvasBg'),
    ctxBg = canvasBg.getContext('2d'),
    canvasEntities = document.getElementById('canvasEntities'),
    ctxEntities = canvasEntities.getContext('2d'),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    // player1 = new Player(),
    // enimies = []
    // numEnimies = 5,
    // obstacles = [],
    isPlaying = false,
    requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        },
    imgSprite = new Image();
imgSprite.src = 'images/sprite.png';

imgSprite.addEventListener('load', init, false);

function init() {
    //document.addEventListener("keydown",checkKeyDown,false);
    //document.addEventListener("keyup",checkKeyUp,false);
    //defineObstacle();
    //initEnemies();
    begin();
}

begin = () => {
    ctxBg.drawImage(
        imgSprite,
        0,
        0,
        canvasWidth,
        canvasHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
    );
    isPlaying = true;
    requestAnimFrame(loop);
};

loop = () => {
    console.log('in game loop');
};
