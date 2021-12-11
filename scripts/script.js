window.onload = () => {
   

    //function startGame(){};

    class LocalGame{
        constructor(){
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.obstacles = [];    //quero vários obstaculos
            this.premium = [];    //varios premios (socks)
            this.frames = 0;     //cada quadro criador dos obstaculos
            
        }
        start = () => {
            this.intervalId = setInterval (updateLocalGame, 60);
        }

        clear = () => {
            this.context.clearRect (0, 0, this.canvas.width, this.canvas.height);
        }

        updateObstacles = () => {
    
            if (this.frames % 80 === 0){
                
                const randomY = Math.floor(Math.random() * this.canvas.height)
                this.obstacles.push(new Obstacle(this.canvas.width, randomY ))
                
            }
        }

        updatePremium = () => {

            if (this.frames % 60 === 0){

                const randomPremium = Math.floor(Math.random() * this.canvas.height)
                this.premium.push(new Premium(this.canvas.width, randomPremium))
            }

        }
    };
    const localGame = new LocalGame();



    class BackgroundGame {
        constructor () {
            this.img = new Image()
            this.img.src = './images/hogwarts-background.jpg';     /*fundo do jogo, Hogwars aqui*/
            
        }
        draw = () => { 
            localGame.context.drawImage(this.img, 0, 0, 800, 500);
        }
    };
     const background = new BackgroundGame();




    class Dobby {
        constructor(x, y, width, heigth){         //onde o Dobby estará, posição
            this.posX = x;
            this.posY = y;
            this.width = width;
            this.heigth = heigth; 
            this.img = new Image();
            this.img.src = './images/dobbyPNG.png';
            this.speed = 10;   //velocidade de movimentação do Dobby
            
        }
        draw = () => {
            localGame.context.drawImage(this.img,this.posX, this.posY, this.width, this.heigth);
        }

        move = (command) => {
            switch (command){
                case 'ArrowUp':
                    if (this.posY > 15){
                    this.posY -= this.speed;
                    }
                    break;
                case 'ArrowDown':
                    if (this.posY < 500 - 15 - this.heigth){
                    this.posY += this.speed;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.posX > 15){
                    this.posX -= this.speed;
                    }
                    break;
                case 'ArrowRight':
                    if (this.posX < 800 - 15 - this.heigth){
                    this.posX += this.speed;
                    }
                    break; 
            }
        }
    };
    const dobby = new Dobby(50, 200, 80, 80); 



    class Obstacle {
        constructor (x, y){
            this.posX = x;
            this.posY = y;
            this.width = 60;
            this.heigth = 60;
            this.speed = 5;
            this.img = new Image(); 
            this.img.src = './images/voldemort-obstacle.png'
        }

        draw = () => {
           localGame.context.drawImage(this.img,this.posX, this.posY, this.width, this.heigth);
        }

        updatePosition = () =>{             //alteração de posição do obstáculo, cada posX - cada speed, vai movimentando
            //console.log('update pos')
            this.posX -= this.speed;
        }
    };

    const obst = new Obstacle (600,300)


    class Premium {
        constructor (x, y){
            this.posX = x;
            this.posY = y;
            this.width = 35;
            this.heigth = 35;
            this.speed = 6;
            this.img = new Image(); 
            this.img.src = './images/socks.png'
        }

        draw = () => {
           localGame.context.drawImage(this.img,this.posX, this.posY, this.width, this.heigth);
        }


        updatePosition = () =>{             //alteração de posição do obstáculo, cada posX - cada speed, vai movimentando
            //console.log('update pos')
            this.posX -= this.speed;
        }

    };

    const premium = new Premium (500,500)

        

    function updateLocalGame(){     //atualização do local game, que é a área do meu game
        localGame.frames += 1
        localGame.clear()
        background.draw()
        dobby.draw()
        localGame.updatePremium()
        localGame.premium.forEach((socks) =>{
            socks.updatePosition()
            socks.draw()
        })
        localGame.updateObstacles()
        localGame.obstacles.forEach((obst) => {
            obst.updatePosition()
            obst.draw()
        })              
    };







    /*Event Listener todos aqui*/
    document.getElementById('start-button').onclick = () => {
        localGame.start();
    };
    document.addEventListener('keydown', (e) => {     //e => é o evento 
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        dobby.move(e.key)
    });




};

