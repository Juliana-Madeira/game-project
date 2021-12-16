window.onload = () => {


    class LocalGame {
        constructor() {
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.obstacles = [];    //quero vários obstaculos
            this.premium = [];    //varios premios (socks)
            this.frames = 0;     //cada quadro criador dos obstaculos
            this.points = 0;   //começa com 0 pontos
            this.numberCrashed = 0;
            this.gameStarted = false;
            


        }
        start = () => {
            this.gameStarted = true;
            this.intervalId = setInterval(updateLocalGame, 60);
        }

        clear = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        audio = () => {
            let audio = new Audio('./audio/theme-songs.mp3')
            audio.play()
        }

        updateObstacles = () => {

            if (this.frames % 80 === 0) {

                const randomY = Math.floor(Math.random() * this.canvas.height)
                this.obstacles.push(new Obstacle(this.canvas.width, randomY))

            }
        }

        updatePremium = () => {

            if (this.frames % 60 === 0) {

                const randomPremium = Math.floor(Math.random() * this.canvas.height)
                this.premium.push(new Premium(this.canvas.width, randomPremium))
            }
        }

        stop = () => {
            console.log('entrei no stop')
            clearInterval(this.intervalId)
        }

        gameOver = () => {
            this.stop()
            this.clear()
            let img = new Image();
            img.onload = () => {
                this.context.drawImage(img, 0, 0, 800, 500)
            }
            img.src = './images/dumbledore-game-over.jpg'
            
            console.log('deu game over')

        }
        
        reset = () => {
            this.stop();
            this.obstacles = [];    //quero vários obstaculos
            this.premium = [];    //varios premios (socks)
            this.frames = 0;     //cada quadro criador dos obstaculos
            this.points = 0;   //começa com 0 pontos
            this.numberCrashed = 0;
        }

    };
    const localGame = new LocalGame();



    class BackgroundGame {
        constructor() {
            this.img = new Image()
            this.img.src = './images/hogwarts-background.jpg';     /*fundo do jogo, Hogwars aqui*/

        }
        draw = () => {
            localGame.context.drawImage(this.img, 0, 0, 800, 500);
        }
    };
    const background = new BackgroundGame();




    class Dobby {
        constructor(x, y, width, height) {         //onde o Dobby estará, posição
            this.posX = x;
            this.posY = y;
            this.resetX = x;
            this.resetY = y;
            this.width = width;
            this.height = height;
            this.img = new Image();
            this.img.src = './images/dobbyPNG.png';
            this.speed = 10;   //velocidade de movimentação do Dobby

        }
        draw = () => {
            localGame.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        }

        move = (command) => {
            switch (command) {
                case 'ArrowUp':
                    if (this.posY > 15) {
                        this.posY -= this.speed;
                    }
                    break;
                case 'ArrowDown':
                    if (this.posY < 500 - 15 - this.height) {
                        this.posY += this.speed;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.posX > 15) {
                        this.posX -= this.speed;
                    }
                    break;
                case 'ArrowRight':
                    if (this.posX < 800 - 15 - this.height) {
                        this.posX += this.speed;
                    }
                    break;
            }
        }

        top = () => {
            return this.posY
        }
        bottom = () => {
            return this.posY + this.height
        }
        left = () => {
            return this.posX
        }
        right = () => {
            return this.posX + this.width
        }


        crashWith(obstacles) {
            const freeLeft = this.left() > obstacles.right();
            const freeRight = this.right() < obstacles.left();
            const freeTop = this.top() > obstacles.bottom();
            const freeBottom = this.bottom() < obstacles.top();

            return (!(freeLeft || freeRight || freeTop || freeBottom))
        }
        
        reset = () => {
            this.posX = this.resetX;
            this.posY = this.resetY;
        }

    };

    const dobby = new Dobby(50, 200, 80, 80);



    class Obstacle {
        constructor(x, y) {
            this.posX = x;
            this.posY = y;
            this.width = 60;
            this.height = 60;
            this.speed = 5;
            this.img = new Image();
            this.img.src = './images/voldemort-obstacle.png'
        }

        draw = () => {
            localGame.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        }

        updatePosition = () => {             //alteração de posição do obstáculo, cada posX - cada speed, vai movimentando
            this.posX -= this.speed;
        }

        top = () => {
            return this.posY
        }
        bottom = () => {
            return this.posY + this.height
        }
        left = () => {
            return this.posX
        }
        right = () => {
            return this.posX + this.width
        }

    };

    const obst = new Obstacle(600, 300)


    class Premium {
        constructor(x, y) {
            this.posX = x;
            this.posY = y;
            this.width = 35;
            this.height = 35;
            this.speed = 6;
            this.img = new Image();
            this.img.src = './images/socks.png'
        }

        draw = () => {
            localGame.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        }


        updatePosition = () => {             //alteração de posição do premio, cada posX - cada speed, vai movimentando
            this.posX -= this.speed;
        }

        top = () => {
            return this.posY
        }
        bottom = () => {
            return this.posY + this.height
        }
        left = () => {
            return this.posX
        }
        right = () => {
            return this.posX + this.width
        }


    };

    const premium = new Premium(500, 500)




    function updateLocalGame() {     //atualização do local game, que é a área do meu game
        localGame.frames += 1
        localGame.clear()
        background.draw()
        dobby.draw()
        //localGame.audio()
        localGame.updatePremium()
        localGame.premium.forEach((socks) => {
            socks.updatePosition()
            socks.draw()
        })
        localGame.updateObstacles()
        localGame.obstacles.forEach((obst) => {
            obst.updatePosition()
            obst.draw()

        })
        checkGameOver()
        checkLive()
    };


    function checkLive() {
        const live = localGame.premium.some((socks) => {
            return dobby.crashWith(socks)
        });
        if (live) {
            localGame.premium.forEach((socks, index) => {
                localGame.premium.splice(index, 1);
                localGame.points += 1;

            })
        }
        document.querySelector('#scoreSpan').innerText = localGame.points;
    };


    function checkGameOver() {
        const crashed = localGame.obstacles.some((obst) => {
            return dobby.crashWith(obst)
        });
        if (crashed) {
            console.log('aqui bateu')
            localGame.obstacles.forEach((obst, index) => {
                localGame.obstacles.splice(index, 1);
                localGame.numberCrashed += 1;
            });
        }
         if (localGame.numberCrashed === 3) {
            console.log('aqui morre')

            localGame.gameOver()

        };
    };

    
    function resetGame() {
        localGame.reset()
        dobby.reset()
        
    }
    



    /*Event Listener todos aqui*/
    document.getElementById('start-button').onclick = () => {
        if(!localGame.gameStarted){
        localGame.start();
        }
        /*if(localGame.start){
            localGame.audio()
        }*/
    };
    document.getElementById('play-again').onclick = () => {
        resetGame();
        localGame.start();
    };
    document.addEventListener('keydown', (e) => {     //e => é o evento 
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        dobby.move(e.key)
    });




};

