console.log('Script JS Cargado');

// Selección de elementos del DOM
const playBoard = document.querySelector(".play-board");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// Botones de control
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Configuración inicial del juego
let snake = [{ x: 5, y: 5 }];
let velocityX = 1;
let velocityY = 0;
let food = { x: 10, y: 10 };
let score = 0;
const boardSize = 30;
let gameInterval = null;
let gameSpeed = 125;
const speedIncrement = 5;
const minSpeed = 50;

// Función para cambiar la velocidad del juego
const changeGameSpeed = (newSpeed) => {
    clearInterval(gameInterval);
    gameSpeed = newSpeed;
    gameInterval = setInterval(initGame, gameSpeed);
    console.log(`Velocidad cambiada a: ${gameSpeed} ms`);
};

// Función para iniciar o reiniciar el juego
const startGame = () => {
    snake = [{ x: 5, y: 5 }];
    velocityX = 1;
    velocityY = 0;
    score = 0;
    gameSpeed = 125; // Reiniciar la velocidad inicial
    scoreElement.textContent = score;
    generateFood();
    playBoard.focus();

    playBoard.innerHTML = "";
    drawBoard();

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(initGame, gameSpeed);
    restartButton.style.display = "none";
};

// Función principal del juego
const initGame = () => {
    updateSnakePosition();
    drawBoard();
};

// Actualizar la posición de la serpiente
const updateSnakePosition = () => {
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

    if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize || isCollision(head, snake)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        if (gameSpeed > minSpeed) changeGameSpeed(gameSpeed - speedIncrement);
    } else {
        snake.pop();
    }
};

// Dibujar el tablero
const drawBoard = () => {
    playBoard.innerHTML = "";
    snake.forEach(segment => drawCell(segment.x, segment.y, "cell"));
    drawCell(food.x, food.y, "food");
};

const drawCell = (x, y, className) => {
    const cell = document.createElement("div");
    cell.className = className;
    cell.style.gridColumn = x;
    cell.style.gridRow = y;
    playBoard.appendChild(cell);
};

// Generar comida aleatoria
const generateFood = () => {
    food = {
        x: Math.floor(Math.random() * boardSize) + 1,
        y: Math.floor(Math.random() * boardSize) + 1
    };
    if (isCollision(food, snake)) generateFood();
};

// Detectar colisiones
const isCollision = (position, obstacles) => {
    return obstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);
};

// Cambiar dirección
const changeDirection = (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
};

// Finalizar juego
const endGame = () => {
    clearInterval(gameInterval);
    alert(`¡Juego Terminado! Tu puntuación: ${score}`);
    restartButton.style.display = "block";
};

restartButton.addEventListener("click", startGame);
playBoard.addEventListener("keydown", changeDirection);

// Controles móviles
upButton.addEventListener("click", () => {
    if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
});

downButton.addEventListener("click", () => {
    if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
});

leftButton.addEventListener("click", () => {
    if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
});

rightButton.addEventListener("click", () => {
    if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
});

startGame();
