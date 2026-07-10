const canvas = document.querySelector("gameCanva");
const ctx = canvas.getContext("2d");
const startMenu = document.querySelector("menuGame");
const startBtn = document.querySelector("btn-satart");

// configurações gerais
const boxSize = 30;
const canvaSize = 600;
let snake = [];
let apple = {};

let direction = ""; // esquerda, direia, cima, baixo
let getInterval; // flag

function initGame(){
    // faz o menu sumir
    startMenu.computedStyleMap.display = "none";
    // coloca a tela de jogo
    canvas.computedStyleMap.display = "block";
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
            Math.random() * (canvaSize / boxSize) * boxSize),
            // math.random "cospe um valor aleatório de 0 a 1"
        y: Math.floor(
            Math.random() * (canvaSize / boxSize) * boxSize)
        
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

    }
)