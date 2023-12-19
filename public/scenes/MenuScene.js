class MenuScene extends Phaser.Scene {
    constructor(){
        super({ 
            key: 'MenuScene', 
        });
        this.shapes = [];
        this.startGameText = null;
        this.flashText = true;
    }

    createShapes() {
        const velocity = 100; // Speed of the shapes

        // Circle
        this.circle = this.add.circle(100, 100, 15, 0x00ffffee);
        this.circle.velocity = new Phaser.Math.Vector2(velocity, velocity);

        // Square
        this.square = this.add.rectangle(200, 200, 30, 30, 0x00ffffee);
        this.square.velocity = new Phaser.Math.Vector2(-velocity, velocity);

        // Triangle
        this.triangle = this.add.triangle(300, 300, 0, -15, 15, 15, -15, 15, 0x00ffffee);
        this.triangle.velocity = new Phaser.Math.Vector2(velocity, -velocity);

        // Array of shapes for easier updating
        this.shapes = [this.circle, this.square, this.triangle];
    }

    toggleTextVisibility() {
        this.flashText = !this.flashText;
        this.startGameText.setVisible(this.flashText);
    }

    startGame() {
        // Logic to start the game, for example transitioning to a new scene
        this.scene.start('GameScene'); // Replace 'GameScene' with the key of your main game scene
    }    

    preload() {
        this.load.image('title', './assets/title.jpg')
    }

    create() {
        // Add the title sprite to the center of the screen
        let titleSprite = this.add.sprite(this.cameras.main.centerX, 0, 'title').setOrigin(0.5, 0);
        // Calculate the scale ratio based on the width
        let scaleRatio = this.cameras.main.width / titleSprite.width;
        // Set the scale of the sprite
        titleSprite.setScale(scaleRatio);
        // Adjust the y position to place the sprite at the top, considering its scaled height
        titleSprite.setY(titleSprite.displayHeight * 0.2);

        // Add flashing 'Press to Start' text
        this.startGameText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 100, 
            'PRESS TO START', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 200, 
            'ABOUT', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Make the 'Press to Start' text interactive and add the event
        this.startGameText.setInteractive();
        this.startGameText.on('pointerdown', this.startGame, this);

        // Timer for flashing text
        this.time.addEvent({
            delay: 500,                
            callback: this.toggleTextVisibility,
            callbackScope: this,
            loop: true
        });
        
        this.createShapes();
    }

    update() {
        this.shapes.forEach((shape) => {
            // Update the position of each shape
            shape.x += shape.velocity.x * this.game.loop.delta / 1000;
            shape.y += shape.velocity.y * this.game.loop.delta / 1000;

            // Reverse the velocity if the shape hits the edge of the screen
            if (shape.x < 0 || shape.x > this.cameras.main.width) {
                shape.velocity.x *= -1;
            }
            if (shape.y < 0 || shape.y > this.cameras.main.height) {
                shape.velocity.y *= -1;
            }
        });
    }
}

export default MenuScene;