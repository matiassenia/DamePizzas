// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicializar el juego
const game = new Phaser.Game(config);

let score = 0;
let scoreText;
let lives = 3;
let livesText;
let gameOverText;
let catchSound, dangerousSound, gameOverSound;
let backgroundMusic;

function preload() {
    // Cargar imágenes
    this.load.image('pizza', 'img/pizza-img.png');
    this.load.image('background', 'img/aserrinfondorojo.png');
    this.load.image('catcher', 'img/me_catcher.png');
    this.load.image('garbage', 'img/basura.png'); // Cargar imagen de basura

    // Cargar música y efectos de sonido
    this.load.audio('backgroundMusic', 'music/background-music.wav');
    this.load.audio('catch', 'sound/catch.wav');
    this.load.audio('dangerous', 'sound/ouch.wav');
    this.load.audio('gameOver', 'sound/game_over.mp3');
}

function create() {
    // Fondo
    this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);

    // Cesta
    this.catcher = this.physics.add.image(400, 550, 'catcher')
        .setDisplaySize(250, 190)
        .setCollideWorldBounds(true);  // Asegura que la cesta no salga de los límites del juego

    this.catcher.setSize(230, 160);  // Ajustamos el área de colisión
    this.catcher.setOffset(320, 850);  // Centrar el área de colisión
    this.catcher.setOrigin(0.5, 0.5);  // Centrar el sprite visualmente

    // Grupo de pizzas y basura con reciclaje automático
    this.pizzas = this.physics.add.group({
        defaultKey: 'pizza',
        maxSize: 10,
        runChildUpdate: true
    });

    this.garbage = this.physics.add.group({
        defaultKey: 'garbage',
        maxSize: 10,
        runChildUpdate: true
    });

    // Crear la primera pizza y basura
    this.time.addEvent({
        delay: 1500,
        callback: dropPizza,
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 2500,
        callback: dropGarbage,
        callbackScope: this,
        loop: true
    });

    // Puntaje
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Vidas
    livesText = this.add.text(600, 16, 'Lives: 3', { fontSize: '32px', fill: '#fff' });

    // Game Over text
    gameOverText = this.add.text(400, 300, '', { fontSize: '64px', fill: '#ff0000' }).setOrigin(0.5, 0.5).setVisible(false);

    // Cargar y reproducir la música de fondo
    backgroundMusic = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
    backgroundMusic.play();

    // Cargar los efectos de sonido
    catchSound = this.sound.add('catch');
    dangerousSound = this.sound.add('dangerous');
    gameOverSound = this.sound.add('gameOver');

    // Colisiones
    this.physics.add.overlap(this.catcher, this.pizzas, catchPizza, null, this);
    this.physics.add.overlap(this.catcher, this.garbage, hitGarbage, null, this);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Mover la cesta con las teclas de flecha
    if (this.cursors.left.isDown) {
        this.catcher.setVelocityX(-500);
    } else if (this.cursors.right.isDown) {
        this.catcher.setVelocityX(500);
    } else {
        this.catcher.setVelocityX(0);
    }

    // Mover la cesta con el ratón o toque
    if (this.input.activePointer.isDown) {
        this.catcher.x = this.input.x;
    }
}

function dropPizza() {
    let pizzaX = Phaser.Math.Between(50, 750);
    let pizza = this.pizzas.get(pizzaX, 10, 'pizza');
    
    if (!pizza) return; // No crear si no hay espacio en el grupo

    pizza.setDisplaySize(150, 90);
    pizza.setVelocityY(120 + score / 15);
    pizza.setActive(true);
    pizza.setVisible(true);

    pizza.update = function () {
        if (this.y > 600) {
            this.setActive(false);
            this.setVisible(false);
            loseLife(); // Perder vida si la pizza no es atrapada
        }
    };
}

function dropGarbage() {
    let garbageX = Phaser.Math.Between(50, 750);
    let garbage = this.garbage.get(garbageX, 10, 'garbage');

    if (!garbage) return; // No crear si no hay espacio en el grupo

    garbage.setDisplaySize(120, 80);  
    garbage.setSize(110, 70);
    garbage.setOffset(5, 5);  // Ajustar el área de colisión para que sea más preciso
    garbage.setVelocityY(120 + score / 15);
    garbage.setActive(true);
    garbage.setVisible(true);

    garbage.update = function () {
        if (this.y > 600) {
            this.setActive(false);
            this.setVisible(false);
        }
    };
}

function catchPizza(catcher, pizza) {
    pizza.setActive(false).setVisible(false); // Reutiliza la pizza
    score += 10;
    scoreText.setText('Score: ' + score);

    // Reproducir sonido de atrapar pizza
    catchSound.play();
}

function hitGarbage(catcher, garbage) {
    garbage.setActive(false).setVisible(false); // Hacemos que la basura sea invisible y reusable
    loseLife(); // Reduce una vida

    // Reproducir sonido de peligro
    dangerousSound.play();
}

function loseLife() {
    lives -= 1;
    livesText.setText('Lives: ' + lives);

    if (lives === 0) {
        gameOver(); // Llamar a la función de Game Over
    }
}

function gameOver() {
    // Detener la música de fondo
    backgroundMusic.stop();

    // Reproducir sonido de game over
    gameOverSound.play();

    // Mostrar mensaje de Game Over
    gameOverText.setText('Game Over');
    gameOverText.setVisible(true);

    // Pausar la física del juego
    this.physics.pause();

    // Mostrar puntaje final
    let finalScoreText = this.add.text(400, 400, `Final Score: ${score}`, { fontSize: '48px', fill: '#ffffff' }).setOrigin(0.5, 0.5);

    // Reiniciar el juego después de 3 segundos
    this.time.delayedCall(3000, resetGame, [], this);
}

function resetGame() {
    // Reiniciar variables
    score = 0;
    lives = 3;
    scoreText.setText('Score: 0');
    livesText.setText('Lives: 3');
    gameOverText.setVisible(false);

    // Eliminar elementos antiguos
    this.pizzas.clear(true, true);
    this.garbage.clear(true, true);

    // Reanudar la física
    this.physics.resume();

    // Reproducir la música de fondo nuevamente
    backgroundMusic.play();
}
