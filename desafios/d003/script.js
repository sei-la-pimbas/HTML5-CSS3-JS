const canvas = document.querySelector(".gameCanva");
const ctx = canvas.getContext("2d");
const startMenu = document.querySelector(".menuGame");
const startBtn = document.querySelector("#btn-start");

// configurações gerais
const boxSize = 30;
const canvaSize = 600;
const bgCanvas = "#1d9213a6"
const snakeHead = "#127c8a"
const SnakeBody = "#1ce2e9"
const appleColor = "#ec0a0aa6"

let snake = [];
let apple = {};

let direction = ""; // esquerda, direia, cima, baixo
let gameInterval; // flag

function initGame(){
    // faz o menu sumir
    startMenu.style.display = "none";
    // coloca a tela de jogo
    canvas.style.display = "block";
    // a cabeça inicia no centro da tela
    snake = [
        {
            x: 9* boxSize,
            y: 9* boxSize
        }
    ]
    direction = "RIGHT"
    drawApple();

    if(gameInterval){
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(drawGame, 130)
}

function drawApple(){
    apple = {
        // math.floor(1.5) = 1
        x: Math.floor(
            Math.random() * (canvaSize / boxSize)) * boxSize,
            // math.random "cospe um valor aleatório de 0 a 1"
        y: Math.floor(
            Math.random() * (canvaSize / boxSize)) * boxSize
        
    }
}


document.addEventListener("keydown",
    (event) => {
        let key = event.keyCode;
    
        const arrayKeys = [37, 38, 39, 40];
        
        if(arrayKeys.includes(key)){
            event.preventDefault();
        }

        if(key === 38 && direction != "DOWN"){
            direction = "UP";
        }else if(key === 37 && direction != "RIGHT"){
            direction = "LEFT";
        }else if(key === 39 && direction != "LEFT"){
            direction = "RIGHT";
        }else if(key === 40 && direction != "UP"){
            direction = "DOWN";
        }
});

function drawGame() {
    // limpa o frame anterior (fundo)
    ctx.fillStyle = bgCanvas;
    ctx.fillRect(0,0, canvaSize, canvaSize);

    // renderiza a cobra varrendo array
    let tamanho_cobra = snake.length;
    for (let i = 0; i < tamanho_cobra; i++) {
        // cabeça mais escura que o corpo
        ctx.fillStyle = (i === 0) ? snakeHead : SnakeBody;

        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

        ctx.strokeStyle = bgCanvas;
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    //desenha a maçã (formato circular)
    ctx.fillStyle = appleColor;
    // beingpath apaga da memória a última maçã
    ctx.beginPath();
    ctx.arc(apple.x + boxSize / 2, apple.y + boxSize / 2, boxSize/2.2, 0, Math.PI * 2);

    ctx.fill(); //manda desenhar o que foi definido no beingpath

    //lógica do array: posição da cabeça
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // calcula onde será a nova cabeça
    if (direction === "LEFT") snakeX -= boxSize;
    if (direction === "UP") snakeY -= boxSize;
    if (direction === "RIGHT") snakeX += boxSize;
    if (direction === "DOWN") snakeY += boxSize;

    // verificação de colisão
    if (snakeX < 0 || snakeX >= canvaSize || snakeY < 0 || snakeY >= canvaSize || checkCollision(snakeX, snakeY, snake)) {
        clearInterval(gameInterval);
        alert("fim de jogo! a cobra fumou" + (snake.length - 1) + " maçã.");
        startMenu.style.display = "block";
        canvas.style.display = "none";
        return;
    }

    // || = or

    //lógica do array: comer ou andar
    if (snakeX === apple.x && snakeY === apple.y) {
        drawApple();
    } else {
        // se n comeu, remover a cauda
        snake.pop();
    }
    // cria o objeto da nova cabeça e insere no indice 0 do array
    let newHead = {x:snakeX, y:snakeY};
    snake.unshift(newHead);
}

//verifica se a cabeça bater no próprio corpo
function checkCollision(headX, headY, array) {
    for (let i = 0; i < array.length; i++) {
        if (headX == array[i].x && headY == array[i].y) {
            return true;
        }
    }
}

// evento de clique para iniciar
startBtn.addEventListener("click", initGame);