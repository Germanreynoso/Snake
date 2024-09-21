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

if (!playBoard) {
    console.error('No se encontró el elemento .play-board');
}

if (!scoreElement) {
    console.error('No se encontró el elemento #score');
}

if (!restartButton) {
    console.error('No se encontró el botón #restart-button');
}

// Configuración inicial del juego
let snake = [{ x: 5, y: 5 }];
let velocityX = 1;
let velocityY = 0;
let food = { x: 10, y: 10 };
let score = 0;
const boardSize = 30; // Tamaño del tablero (30x30)
let gameInterval = null;
let gameSpeed = 125; // Velocidad inicial en ms
const speedIncrement = 5; // Cantidad de ms para disminuir el intervalo
const minSpeed = 50; // Velocidad mínima en ms

// Función para cambiar la velocidad del juego
const changeGameSpeed = (newSpeed) => {
    clearInterval(gameInterval);
    gameSpeed = newSpeed;
    gameInterval = setInterval(initGame, gameSpeed);
    console.log(`Velocidad cambiada a: ${gameSpeed} ms`);
};

// Función para iniciar o reiniciar el juego
const startGame = () => {
    console.log('Iniciando Juego');
    // Resetear variables
    snake = [{ x: 5, y: 5 }];
    velocityX = 1;
    velocityY = 0;
    score = 0;
    gameSpeed = 50; // Reiniciar la velocidad inicial
    scoreElement.textContent = score;
    generateFood();
    playBoard.focus();

    // Limpiar el tablero
    playBoard.innerHTML = "";
    drawBoard();

    // Limpiar el intervalo si ya existe
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Iniciar el bucle del juego con la velocidad actual
    gameInterval = setInterval(initGame, gameSpeed);

    // Ocultar el botón de reinicio si está visible
    restartButton.style.display = "none";
};

// Función principal del juego
const initGame = () => {
    console.log('Actualizando Juego');
    updateSnakePosition();
    drawBoard();
};

// Actualizar la posición de la serpiente
const updateSnakePosition = () => {
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    console.log(`Nueva Cabeza: (${head.x}, ${head.y})`);

    // Detectar colisión con paredes
    if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize) {
        console.log('Colisión con pared detectada');
        endGame();
        return;
    }

    // Detectar colisión consigo misma
    if (isCollision(head, snake)) {
        console.log('Colisión con la serpiente detectada');
        endGame();
        return;
    }

    // Añadir la nueva cabeza a la serpiente
    snake.unshift(head);
    console.log(`Serpiente actual: ${JSON.stringify(snake)}`);

    // Verificar si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        console.log('Comida Comida');
        // Incrementar la puntuación
        score += 10;
        scoreElement.textContent = score;
        generateFood();

        // Aumentar la velocidad: disminuir el intervalo
        if (gameSpeed > minSpeed) { // Asegurarse de no exceder la velocidad mínima
            changeGameSpeed(gameSpeed - speedIncrement); // Decrementa el intervalo en 'speedIncrement' ms
        }
    } else {
        // Remover la última parte de la serpiente si no ha comido
        snake.pop();
    }
};

// Dibujar el tablero, la serpiente y la comida
const drawBoard = () => {
    playBoard.innerHTML = "";

    // Dibujar la serpiente
    snake.forEach(segment => drawCell(segment.x, segment.y, "cell"));

    // Dibujar la comida
    drawCell(food.x, food.y, "food");
};

// Función para dibujar una celda específica
const drawCell = (x, y, className) => {
    console.log(`Dibujando celda en (${x}, ${y}) con clase ${className}`);
    const cell = document.createElement("div");
    cell.className = className;
    cell.style.gridColumn = x;
    cell.style.gridRow = y;
    playBoard.appendChild(cell);
};

// Generar una nueva posición para la comida
const generateFood = () => {
    const newFood = {
        x: Math.floor(Math.random() * boardSize) + 1,
        y: Math.floor(Math.random() * boardSize) + 1
    };
    console.log(`Generando comida en (${newFood.x}, ${newFood.y})`);

    // Asegurarse de que la nueva comida no esté sobre la serpiente
    if (isCollision(newFood, snake)) {
        console.log('Colisión detectada al generar comida, generando nuevamente');
        generateFood(); // Generar nuevamente si hay colisión
    } else {
        food = newFood;
    }
};

// Verificar si hay una colisión entre una posición y una lista de obstáculos
const isCollision = (position, obstacles) => {
    return obstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);
};

// Cambiar la dirección de la serpiente según la tecla presionada
const changeDirection = (e) => {
    console.log(`Tecla Presionada: ${e.key}`);
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

// Finalizar el juego
const endGame = () => {
    console.log('Finalizando Juego');
    clearInterval(gameInterval);
    alert(`¡Juego Terminado! Tu puntuación: ${score}`);

    // Mostrar el botón de reinicio
    restartButton.style.display = "block";
};

// Reiniciar el juego cuando se haga clic en el botón de reinicio
restartButton.addEventListener("click", startGame);

// Asignar el evento de teclado al tablero de juego
playBoard.addEventListener("keydown", changeDirection);

// Botones de control para dispositivos móviles
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

// Iniciar el juego por primera vez
startGame();
