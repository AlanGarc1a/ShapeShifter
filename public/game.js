import MenuScene from "./scenes/MenuScene.js";

const config = {
  width: 600,
  height: 1024,
  backgroundColor: '#5ac0d4',
  parent: 'game-container',
  type: Phaser.CANVAS,
  physics: {
    default: "arcade",
  },
  scene: [MenuScene],
};

const game = new Phaser.Game(config);

export {game};
