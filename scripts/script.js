window.onload = () => {
   

    //function startGame(){};

    class LocalGame{
        constructor(){
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            //console.log('oi')
        };
        start = () => {
            updateLocalGame();   
            //console.log('estou no start')   
        };
    };

    const localGame = new LocalGame();


    class BackgroundGame {
        constructor () {
            this.img = new Image()
            this.img.src = './images/hogwarts-background.jpg';     /*fundo do jogo, Hogwars aqui*/
            //console.log('oi oi')
        };
        draw = () => { 
            //console.log(localGame)
            localGame.context.drawImage(this.img, 0, 0, 800, 500);
        };
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
            
        }
        draw = () => {
            localGame.context.drawImage(this.img,this.posX, this.posY, this.width, this.heigth);
        };
    };

    const dobby = new Dobby(50, 200, 70, 70); 






    function updateLocalGame(){     /*atualização do local game, que é a área do meu game*/
        background.draw()
        dobby.draw()
        //console.log('estou no update localgame')
    };


    /*Event Listener todos aqui*/
    document.getElementById('start-button').onclick = () => {
        localGame.start();
    };

};

