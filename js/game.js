const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "image/ground.png";

let image = Math.floor((Math.random() * 4 + 1));
let foodImg = new Image();
foodImg.src = "image/" + image + ".png";

let obstacle = Math.floor((Math.random() * 3 + 1));
let fastFoodImg = new Image();
fastFoodImg.src = "image/fast" + obstacle + ".png";

let box = 32;

let score = 0;

let record = localStorage.getItem("record") ?? ;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let fastFood = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);

            if (score > record)
                localStorage.setItem("record", score);

            ctx.fillStyle = "#3b2751";
            ctx.fillRect(0, 470, 608, 120);
            ctx.fillStyle = "white";
            ctx.font = "bold 45px Arial";
            ctx.fillText("Эй, смотри куда идешь", box * 2, 550);
            buttonReload.className = "";
        }
    }
}

function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function show(id1) {
    document.getElementById(id1).className = "hide";
    window.location.reload();
}

function drawGame() {

    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    ctx.drawImage(fastFoodImg, fastFood.x, fastFood.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "blue" : "#3953e9";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);
    ctx.fillStyle = "#f9b545";
    ctx.font = "25px Arial";
    ctx.fillText("Рекорд: " + record, box * 14, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == fastFood.x && snakeY == fastFood.y) {
        clearInterval(game);

        if (score > record)
            localStorage.setItem("record", score);

        ctx.fillStyle = "#3b2751";
        ctx.fillRect(0, 470, 608, 120);
        ctx.fillStyle = "white";
        ctx.font = "bold 40px Arial";
        ctx.fillText("Ты не знал, что я веган?", box * 2, 550);
        buttonReload.className = "";
    }

    if (snakeX == food.x && snakeY == food.y) {
        score++;

        image = Math.floor((Math.random() * 4 + 1));
        foodImg.src = "image/" + image + ".png";
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };

        obstacle = Math.floor((Math.random() * 3 + 1));
        fastFoodImg.src = "image/fast" + obstacle + ".png";
        fastFood = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);

        if (score > record)
            localStorage.setItem("record", score);

        ctx.fillStyle = "#3b2751";
        ctx.fillRect(0, 470, 608, 120);
        ctx.fillStyle = "white";
        ctx.font = "bold 60px Arial";
        ctx.fillText("Упсс... стена", box * 4, 550);
        buttonReload.className = "";
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);
